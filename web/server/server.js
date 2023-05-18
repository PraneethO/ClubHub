// Praneeth O - Idfk when this was mde check the github reports - Server Code for Club Hub

// Imports and Requirements to Run
require("dotenv").config();
const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const PORT = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);

// Set up MongoDB session store
const store = new MongoDBStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions",
});

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

var sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "strict",
  },
  store: store,
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// ! Actual Routes (Look Here)
// User Route (Login, Signup, Etc.)
const userController = require("./controllers/userController");
app.route("/api/users").post((req, res) => {
  userController.createNewUser(req, res);
});
// TODO: Setup code to update or delete users

// Club Route (Login, Signup, Same thing as user but slightly different for organizational purposes)
const clubController = require("./controllers/clubController");
app.route("/api/clubs").post((req, res) => {
  clubController.createNewClub(req, res);
});
// TODO: Same thing as the todo above

// DO NOT DELETE: This is a catchall, so add all of your routes above this and the 404 will handle the rest
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// Random Database Connection --> Makes Sure of Connection to Database
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`),
    "mongoErrLog.log";
});
