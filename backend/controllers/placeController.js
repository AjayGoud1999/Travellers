import Place from "../models/Place.js";

const getAllPlacesByState = async (req, res) => {
  const { state } = req.params;
  const placeData = await Place.find({ stateName: state }).select({
    _id: 0,
  });
  // console.log(placeData);
  if (placeData) {
    return res.status(200).json(placeData);
  }

  return res.status(404).json("Place data not found");
};

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  const placeData = await Place.find({ id: id }).select({
    _id: 0,
  });
  // console.log(placeData);
  if (placeData) {
    return res.status(200).json(placeData);
  }

  return res.status(404).json("Place data not found");
};

const getAllPlaces = async (req, res) => {
  const placeData = await Place.find({}).select({
    _id: 0,
  });
  // console.log(placeData);
  if (placeData) {
    return res.status(200).json(placeData);
  }

  return res.status(404).json("Place data not found");
};

export { getAllPlacesByState, getPlaceById, getAllPlaces };
