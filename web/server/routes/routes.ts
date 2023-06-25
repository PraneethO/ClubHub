import { Router } from "express";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean;
    idUsed?: string;
    type?: boolean;
  }
}

const router = Router();

// ! Auth Routes
import authController from "../controllers/authController";
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
import studentController from "../controllers/studentController";
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
import organizationController from "../controllers/organizationController";
router
  .post("/organizations", (req, res) => {
    organizationController.createNewOrg(req, res);
  })
  .get("/organizations", (req, res) => {
    organizationController.getOrgInfo(req, res);
  })
  .patch("/organizations", (req, res) => {
    organizationController.updateOrg(req, res);
  })
  .delete("/organizations", (req, res) => {
    organizationController.deleteOrg(req, res);
  });

// ! Auto Correct Route
import autoController from "../controllers/autoController";
router.get("/schools/autocomplete", (req, res) => {
  autoController.schoolAutoCorrect(req, res);
});
router.get("/search/autocomplete", (req, res) => {
  autoController.searchAll(req, res);
});

// ! Position Routes
import positionController from "../controllers/positionController";
router.get("/positions/:id", (req, res) => {
  positionController.getPositionById(req, res);
});
router.post("/positions/crud", (req, res) => {
  positionController.createPosition(req, res);
});
router.delete("/positions/crud", (req, res) => {
  positionController.deletePosition(req, res);
});
router.patch("/positions/crud", (req, res) => {
  positionController.updatePosition(req, res);
});
router.get("/positions/crud/org", (req, res) => {
  positionController.getPositionByOrganization(req, res);
});
router.get("/positionstemp", (req, res) => {
  positionController.getAllPositions(req, res);
});

// ! File Routes
import fileController from "../controllers/fileController";
router.patch("/files/image", upload.single("image"), (req, res) => {
  fileController.updateImage(req, res);
});
router.patch("/files/resume", upload.single("resume"), (req, res) => {
  fileController.updateResume(req, res);
});

export default router;
