import State from "../models/State.js";

const getAllStates = async (req, res) => {
  const stateData = await State.find({}).select({ _id: 0 });

  if (stateData) {
    return res.status(200).json(stateData);
  }

  return res.status(404).json("State data not found");
};

export { getAllStates };
