import express from "express";
import { addBankAccount ,getAccountByLoginId} from "../controllers/account.js";

const router=express.Router();

router.post("/",addBankAccount);
router.get("/",getAccountByLoginId);

export default router;