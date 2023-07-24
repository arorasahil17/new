const States = require("../model/state");

const saveState = async (req, res) => {
  try {
    const { name, country } = req.body;
    let state = new States({ name, country });
    const newState = await state.save();
    res
      .status(201)
      .json({ message: "State added successfully", state: newState });
  } catch (err) {
    res.status(500).send(`Error saving State ${err}`);
  }
};

const getStates = async (req, res) => {
  try {
    const { countryId } = req.params;
    const states = await States.find({ country: countryId });
    res.json(states);
  } catch (err) {
    res.status(500).send({ error: `Failed to fetch States` });
  }
};

module.exports = { saveState, getStates };
