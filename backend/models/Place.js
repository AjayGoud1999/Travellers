import mongoose from "mongoose";

const { Schema, model } = mongoose;

const placeSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    placeName: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    stateName: {
      type: String,
      require: true,
    },
    budget: {
      type: String,
      require: false,
    },
    description: {
      type: String,
      require: true,
    },
    experience: [{ type: String, ref: "Review", require: false }],
  },
  {
    timestamps: true,
  }
);

export default model("Place", placeSchema);
