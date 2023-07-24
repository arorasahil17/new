const Countries = require("../model/country");

const saveCountry = async (req, res) => {
  try {
    const countryName = req.body.name;
    const prevCountry = await Countries.findOne({ name: countryName });
    if (prevCountry) {
      res.status(400).send("Country already exist");
      return;
    }
    let country = new Countries({ name: countryName });
    const savedCountry = await country.save();
    return res
      .status(201)
      .json({ message: "Country added successfully", data: savedCountry });
  } catch (err) {
    console.log("Error in adding Country:", err);
    return res.status(500).send(`Internal Server Error ${err}`);
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await Countries.find();
    res.send(countries);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { saveCountry, getCountries };
