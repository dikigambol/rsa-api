const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

const userRoute = require("./routes/userRoutes.js");

config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});
app.use(userRoute);

app.listen(port, () => {
  console.log("Server berjalan di port " + port);
});
