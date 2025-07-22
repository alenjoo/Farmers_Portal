import express from "express";
import { getPendingRequests, approveRequest } from "../controllers/adminbid.js";

const router = express.Router();

// Route to handle GET request for fetching pending requests
router.get("/", getPendingRequests);
router.put('/:id/approve', approveRequest);



export default router;
