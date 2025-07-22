import express from "express";
import { submitComplaint ,submitReview, getComplaints, getReviews} from "../controllers/complain.js";

const router = express.Router();

router.post("/", submitComplaint);
router.post("/review",submitReview);
router.get("/",getComplaints);
router.get("/rev", getReviews);


export default router;