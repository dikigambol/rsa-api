const express = require("express");
const {
  createStruktural,
  updateStruktural,
  deleteStruktural,
  getStruktural,
  getStrukturalById,
} = require("../controllers/strukturalController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const { requireSuperadminHMAC } = require("../middlewares/requireSuperadminHMAC");
const router = express.Router();

router.post("/struktural", requireSuperadmin, createStruktural);
router.put("/struktural/:id", requireSuperadmin, updateStruktural);
router.delete("/struktural/:id", requireSuperadmin, deleteStruktural);
router.get("/struktural", getStruktural);
router.get("/struktural/:id", getStrukturalById);

router.post("/struktural-hmac", requireSuperadminHMAC, createStruktural);
router.put("/struktural-hmac/:id", requireSuperadminHMAC, updateStruktural);
router.delete("/struktural-hmac/:id", requireSuperadminHMAC, deleteStruktural);
router.get("/struktural-hmac", getStruktural);
router.get("/struktural-hmac/:id", getStrukturalById);

module.exports = router;
