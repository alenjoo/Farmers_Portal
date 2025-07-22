import express from "express";

import { updateCartStatus ,handleViewResult , updateWinner} from "../controllers/admincart.js";
const router = express.Router();

router.put("/",updateCartStatus);
router.get("/:loginId/:productId", handleViewResult);
router.get("/:productId",updateWinner);


export default router;