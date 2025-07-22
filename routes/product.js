import express from "express";
import {
  searchProducts,
  updateProductPrice,
  searchProductsByLocation,getProductLoginId
} from "../controllers/product.js";

const router = express.Router();

router.get("/", searchProducts);
router.get("/search/:name/:location", searchProductsByLocation);
router.put("/:id", updateProductPrice);
router.get("/checkou/:id", getProductLoginId);

export default router;
