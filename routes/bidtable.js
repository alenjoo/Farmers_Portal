// routes/bidRoutes.js

import express from "express";
import {
  insertBid,
  getProductBidHistory,
  updateBidInterestedStatus,
  setWinner,
  getWinnerDetails, // Import the new function
} from "../controllers/bidtable.js"; // Update import path

const router = express.Router();

// Route for inserting a bid for a specific product
router.post("/update/:productId", insertBid);
router.get("/:productId", getProductBidHistory);
router.post("/winner", setWinner);
router.put("/:productId", updateBidInterestedStatus);

router.get("/winner/:productId", getWinnerDetails);

export default router;
