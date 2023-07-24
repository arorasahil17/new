const Cities = require("../model/city");

const saveCity = async (req, res) => {
  try {
    const { name, state } = req.body;
    let city = new Cities({ name, state });
    const newCity = await city.save();
    res.status(201).json({ message: "city added successfully", city: newCity });
  } catch (err) {
    res.status(500).send(`Error saving State ${err}`);
  }
};

const getCities = async (req, res) => {
  try {
    const { stateID } = req.params;
    const cities = await Cities.find({ state: stateID });
    console.log(cities);
    res.send(cities);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch Cities" });
  }
};

module.exports = { saveCity, getCities };
