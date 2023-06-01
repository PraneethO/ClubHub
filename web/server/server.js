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

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 2, // 2 years
    },
  })
);

// ! Actual Routes (Look Here)

// ! Authenticatoin Routes (Login, Signup, Logout)
const authController = require("./controllers/authController");
app
  .route("/api/auth")
  .post((req, res) => {
    authController.loginUser(req, res);
  })
  .delete((req, res) => {
    authController.logoutUser(req, res);
  });

// ! User Routes (get info, update info, delete info)
const userController = require("./controllers/userController");
app
  .route("/api/users")
  .post((req, res) => {
    userController.createNewUser(req, res);
  })
  .get((req, res) => {
    userController.getUserInfo(req, res);
  })
  .patch((req, res) => {
    userController.updateUser(req, res);
  })
  .delete((req, res) => {
    userController.deleteUser(req, res);
  });

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
