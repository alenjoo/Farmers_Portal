import express from "express";
import {submitApplication,getUsersAppliedForSchemes
} from "../controllers/apply.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/users", getUsersAppliedForSchemes);
export default router;
