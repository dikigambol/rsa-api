const express = require("express");
const {
  createStruktural,
  updateStruktural,
  deleteStruktural,
  getStruktural,
  getStrukturalById,
} = require("../controllers/strukturalController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const router = express.Router();

// auth
router.post("/struktural", requireSuperadmin, createStruktural);
router.put("/struktural/:id", requireSuperadmin, updateStruktural);
router.delete("/struktural/:id", requireSuperadmin, deleteStruktural);
router.get("/struktural", getStruktural);
router.get("/struktural/:id", getStrukturalById);

module.exports = router;
