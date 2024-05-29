const express = require("express");
const {
  createUser,
  detailUser,
  signIn,
} = require("../controllers/usersController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");

const router = express.Router();

// auth
router.post("/login", signIn);
router.post("/create-user", requireSuperadmin, createUser);
router.get("/detail-user", requireSuperadmin, detailUser);
router.post("/detail-user", requireSuperadmin, detailUser);

module.exports = router;
