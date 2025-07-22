import express from "express";
import { insertAddress , getAddressByLoginId , getAddressByloginId} from "../controllers/address.js";

const router = express.Router();

router.post("/",insertAddress);
router.get("/",getAddressByLoginId);
router.get("/checkoutaddress/:loginId", getAddressByloginId);
export default router;