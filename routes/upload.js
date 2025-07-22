import express from "express";
import { uploadProduct } from "../controllers/upload.js";

const router = express.Router();

router.post("/", uploadProduct);

export default router;
