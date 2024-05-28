const express = require("express");
const {
  createUser,
  detailUser,
} = require("../controllers/usersController");

const router = express.Router();

// auth
router.post("/create-user", createUser);
router.get("/detail-user", detailUser);
router.post("/detail-user", detailUser);

module.exports = router;
