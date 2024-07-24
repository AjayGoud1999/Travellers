import express from "express";
import {
  getAllPlacesByState,
  getPlaceById,
  getAllPlaces,
} from "../controllers/placeController.js";

const router = express.Router();

router.get("/getplaces/:state", getAllPlacesByState);
router.get("/getplace/:id", getPlaceById);
router.get("/getplaces", getAllPlaces);

export default router;
