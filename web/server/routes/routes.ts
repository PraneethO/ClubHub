import { Router } from "express";

const router = Router();

// ! Auth Routes
const authController = require("../controllers/authController");
router
  .post("/auth/login", (req, res) => {
    authController.loginUser(req, res);
  })
  .delete("/auth", (req, res) => {
    authController.logoutUser(req, res);
  })
  .post("/auth", (req, res) => {
    authController.checkUserStatus(req, res);
  });

// ! User Routes
const studentController = require("../controllers/studentController");
router
  .post("/users", (req, res) => {
    studentController.createNewUser(req, res);
  })
  .get("/users", (req, res) => {
    studentController.getUserInfo(req, res);
  })
  .patch("/users", (req, res) => {
    studentController.updateUser(req, res);
  })
  .delete("/users", (req, res) => {
    studentController.deleteUser(req, res);
  });

// ! Organization Routes
const organizationController = require("../controllers/organizationController");
router
  .post("/organizations", (req, res) => {
    organizationController.createNewOrg(req, res);
  })
  .get("/organizations", (req, res) => {
    organizationController.getOrg(req, res);
  })
  .patch("/organizations", (req, res) => {
    organizationController.updateOrg(req, res);
  })
  .delete("/organizations", (req, res) => {
    organizationController.deleteOrg(req, res);
  });
export default router;
