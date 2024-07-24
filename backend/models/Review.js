import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    review: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    placeId: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Review", reviewSchema);
