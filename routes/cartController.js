import express from "express";
import {
  addToCart,
  getCartProductsByUserId,
  updatecartPrice,getProductLoginId,getStatus
   
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add/:productid/:price/:loginid", addToCart);
router.get("/:loginid", getCartProductsByUserId);
router.put("/:loginid/:productid", updatecartPrice);
router.get("/checkou/:id", getProductLoginId);
router.get("/status/:id",getStatus);
export default router;
