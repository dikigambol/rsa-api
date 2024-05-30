const express = require("express");
const {
  createUser,
  signIn,
  configUser,
} = require("../controllers/usersController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const router = express.Router();

// auth
router.post("/login", signIn);
router.post("/create-user", requireSuperadmin, createUser);
router.get("/user", requireSuperadmin, configUser);
router.post("/user", requireSuperadmin, configUser);

module.exports = router;
