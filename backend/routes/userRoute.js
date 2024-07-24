import express from "express";
import {
  addReview,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser, registerUser
} from "../controllers/userController.js";
import fileUpload from "../middleware/file-upload.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/addreview", fileUpload.single("image"), addReview);
router.post("/register", registerUser);
router.post("/login", loginUser);



export default router;
