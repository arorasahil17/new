const Users = require("../model/user");

const saveUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
    } = req.body;
    let user = new Users({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
    });
    const userExist = await Users.findOne({ email: email });
    if (userExist) {
      res.status(400).send("user already exist");
      return;
    }
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "user added successfully", data: savedUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = saveUser;
