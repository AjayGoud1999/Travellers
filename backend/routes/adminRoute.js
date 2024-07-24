import express from "express";
import { addPlace, addState } from "../controllers/adminController.js";

const router = express.Router();

router.post("/addstate", addState);

router.post("/addplace", addPlace);

export default router;
