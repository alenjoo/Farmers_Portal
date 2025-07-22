import express from "express";
import { getProfileData ,getProfileDataFarmer} from "../controllers/profile.js";
const router = express.Router();

router.get("/:loginid",getProfileData);
router.get("/farmer/:loginid", getProfileDataFarmer);
export default router;