import express from "express";
import { getAllStates } from "../controllers/stateController.js";

const router = express.Router();

router.get("/getstates", getAllStates);

export default router;
