import State from "../models/State.js";
import Place from "../models/Place.js";
import { v4 as uuid } from "uuid";

const addPlace = async (req, res) => {
  const { stateName, placeName, address, description, image, budget } =
    req.body;
  const createPlace = new Place({
    id: uuid(),
    stateName,
    placeName,
    image,
    address,
    description,
    budget,
    experience: [],
  });
  const place = await createPlace.save();
  // console.log(place);
  return res.status(201).json(place);
};

const addState = async (req, res) => {
  const { stateName } = req.body;
  const createState = new State({
    id: uuid(),
    stateName,
  });

  const state = await createState.save();
  // console.log(state);
  return res.status(201).json(state);
};

export { addPlace, addState };
