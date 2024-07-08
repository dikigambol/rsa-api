const express = require("express");
const {
  createDivisi,
  updateDivisi,
  deleteDivisi,
  getDivisi,
} = require("../controllers/divisiController");
const { requireSuperadmin } = require("../middlewares/requireSuperadmin");
const { requireSuperadminHMAC } = require("../middlewares/requireSuperadminHMAC");
const router = express.Router();

router.post("/divisi", requireSuperadmin, createDivisi);
router.put("/divisi/:id", requireSuperadmin, updateDivisi);
router.delete("/divisi/:id", requireSuperadmin, deleteDivisi);
router.get("/divisi", getDivisi);

router.post("/divisi-hmac", requireSuperadminHMAC, createDivisi);
router.put("/divisi-hmac/:id", requireSuperadminHMAC, updateDivisi);
router.delete("/divisi-hmac/:id", requireSuperadminHMAC, deleteDivisi);
router.get("/divisi-hmac", getDivisi);

module.exports = router;
