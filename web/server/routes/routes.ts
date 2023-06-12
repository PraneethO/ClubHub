import { Router } from "express";

declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean;
    idUsed?: string;
    type?: boolean;
  }
}

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
  .post("/students", (req, res) => {
    studentController.createNewStudent(req, res);
  })
  .get("/students", (req, res) => {
    studentController.getStudentInfo(req, res);
  })
  .patch("/students", (req, res) => {
    studentController.updateStudent(req, res);
  })
  .delete("/students", (req, res) => {
    studentController.deleteStudent(req, res);
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
