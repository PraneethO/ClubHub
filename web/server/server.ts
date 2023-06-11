// Praneeth O - Idfk when this was mde check the github reports - Server Code for Club Hub

// Imports and Requirements to Run
require("dotenv").config();
import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);

const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");

import session from "express-session";
import cors from "cors";

import corsOptions from "./config/corsOptions";

app.use(cors(corsOptions));

import connectDB from "./config/dbConn";
import mongoose from "mongoose";

// Set up MongoDB session store
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions",
});
connectDB();

app.use(errorHandler);
app.use(logger);
app.use(express.json());

// Session keywords
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

// Routes defined here
import router from "./routes/routes";
app.use("/api", router);

// DO NOT DELETE: This is a catchall, so add all of your routes above this and the 404 will handle the rest
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Random Database Connection --> Makes Sure of Connection to Database
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err: any) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`),
    "mongoErrLog.log";
});
