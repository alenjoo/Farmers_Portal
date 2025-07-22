import express from "express";
import { winnerproduct ,getWinnersDetails, updateReceivedStatus} from "../controllers/winner.js";

const router = express.Router();

router.get("/order/:loginid",winnerproduct);

router.get("/full", getWinnersDetails);
router.put("/received/:winnerId", updateReceivedStatus);
export default router;