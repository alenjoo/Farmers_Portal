import express from "express";
import { getProductsByUserId } from "../controllers/display.js";

const router = express.Router();

router.get("/:loginId", getProductsByUserId);

export default router;
