const express = require("express");
const {
  createDivisi,
  updateDivisi,
  deleteDivisi,
  getDivisi,
} = require("../controllers/divisiController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const router = express.Router();

// auth
router.post("/divisi", requireSuperadmin, createDivisi);
router.put("/divisi/:id", requireSuperadmin, updateDivisi);
router.delete("/divisi/:id", requireSuperadmin, deleteDivisi);
router.get("/divisi", getDivisi);

module.exports = router;
