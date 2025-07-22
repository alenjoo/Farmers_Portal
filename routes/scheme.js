// routes/schemeRoutes.js

import express from "express";
import { createScheme ,getSchemesByLand, getAllSchemes} from "../controllers/scheme.js";

const router = express.Router();

// Route to insert a new scheme
router.post("/", createScheme);
router.get("/land", getSchemesByLand); // Update the route to match the endpoint in server.js
router.get("/page", getAllSchemes);
export default router;
