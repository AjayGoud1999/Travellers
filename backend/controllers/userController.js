import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Review from "../models/Review.js";
import Place from "../models/Place.js";
import { v4 as uuid } from "uuid";


// Get user
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json("User not found");
      } else {
        return res.status(200).json(user);
      }
    } else {
      return res.status(400).json("Invalid user id");
    }
  } catch (err) {
    throw new Error(err);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users in db");
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    
    const userId = req.params.id; // Assuming you get the userId from the request parameters
    const { firstName, lastName, username, email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.username = username;
    existingUser.email = email;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ msg: "Password should be at least 6 characters" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      existingUser.password = passwordHash;
    }

    // Save updated user
    await existingUser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you get the userId from the request parameters

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await existingUser.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const addReview = async (req, res, next) => {
  const { review, creator, placeId } = req.body;
  const createReview = JSON.stringify({
    id: uuid(),
    review,
    image: req?.file?.path,
    userName: creator,
    placeId,
  });

  // const reviewResponse = await createReview.save();
  const updatePlaceExperience = await Place.updateOne(
    { id: placeId },
    { $push: { experience: createReview } }
  );
  // console.log(updatePlaceExperience);
  return res.status(201).json("Review Added");
};


// Registration
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password,isAdmin} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if(password.length <6)
    return res.status(400).json({msg:" password should aleast 6"})

    //pwd encryption
    const passwordHash = await bcrypt.hash(password,10)

    const newUser =  new User({
      firstName, lastName, username, email,password:passwordHash,isAdmin
    })

    //save new user
    await newUser.save()

    res.status(201).json({ status:201,message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong Credentials");
    }

    const { password, createdAt, updatedAt, _id, ...rest } = user._doc;

    console.log(rest);
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
    console.log("err", err);
  }
};



export { getUserById, getAllUsers, updateUser, deleteUser, addReview ,registerUser, loginUser};
