import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import stateRoute from "./routes/stateRoute.js";
import placeRoute from "./routes/placeRoute.js";

import { join } from "path";

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads/images", express.static(join("uploads", "images")));

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/states", stateRoute);
app.use("/api/places", placeRoute);
mongoose.set('strictQuery', false); 

const url = 'mongodb+srv://vaddem37:vaddem37@cluster0.agcw8th.mongodb.net/project?retryWrites=true&w=majority';
mongoose.connect(url).then(()=> {
    //if connection was successful then we start our backend server
    console.log("Mongodb server connected!! at 3001")
    app.listen(3001);
}).catch(err => {
    console.log(err);
});
