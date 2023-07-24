require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const countryRouter = require("./routes/country");
const stateRouter = require("./routes/state");
const cityRouter = require("./routes/city");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", userRouter);
app.use("/", countryRouter);
app.use("/", stateRouter);
app.use("/", cityRouter);

main();

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!");
  } catch (err) {
    console.log(`Connection failed ${err}`);
  }
}

app.listen(port, () => console.log(`Server is running on ${port}`));
