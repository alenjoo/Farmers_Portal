// routes/approvedProducts.js

import express from "express";
import { getApprovedProducts } from "../controllers/adminbidaccept.js";

const router = express.Router();

router.get("/approved-products", getApprovedProducts);

export default router;
