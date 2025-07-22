import express from "express";
import { createMessage ,getMessageByLoginId ,createPayment, getPaymentDetails} from "../controllers/message.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:loginId",getMessageByLoginId);
router.post("/table",createPayment);
router.get("/payment/:productId", getPaymentDetails);
export default router;
