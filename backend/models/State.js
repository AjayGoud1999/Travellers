import mongoose from "mongoose";

const { Schema, model } = mongoose;

const stateSchema = new Schema(
  {
    stateName: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("State", stateSchema);
