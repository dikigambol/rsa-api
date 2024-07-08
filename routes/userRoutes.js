const express = require("express");
const {
  createUser,
  signIn,
  configUser,
} = require("../controllers/usersController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const { requireSuperadminHMAC } = require("../middlewares/requireSuperadminHMAC");
const { fakeToken } = require("../controllers/fakeTokenController");
const router = express.Router();

router.post("/login", signIn);
router.post("/create-user", requireSuperadmin, createUser);
router.get("/user", requireSuperadmin, configUser);
router.post("/user", requireSuperadmin, configUser);
router.post("/fake-token", configUser);

router.post("/create-user-hmac", requireSuperadminHMAC, createUser);
router.get("/user-hmac", requireSuperadminHMAC, configUser);
router.post("/user-hmac", requireSuperadminHMAC, configUser);
router.post("/fake-token/:type/:nopeg", fakeToken);

module.exports = router;