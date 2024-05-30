const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

const userRoute = require("./routes/userRoutes.js");
const divisiRoute = require("./routes/divisiRoutes.js");
const strukturalRoute = require("./routes/strukturalRoutes.js");
const izinRoute = require("./routes/izinRoutes.js");

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
app.use(divisiRoute);
app.use(strukturalRoute);
app.use(izinRoute);

app.listen(port, () => {
  console.log("Server berjalan di port " + port);
});
