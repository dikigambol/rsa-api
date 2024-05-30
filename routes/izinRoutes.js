const express = require("express");
const {
  createIzin,
  updateIzin,
  deleteIzin,
  getIzinByOwner,
  getIzinByAtasan,
  verifyIzin,
} = require("../controllers/izinController.js");
const { requireOwner } = require("../middlewares/requireOwner.js");
const router = express.Router();

// auth
router.post("/izin/:nopeg", requireOwner, createIzin);
router.put("/izin/:id/:nopeg", requireOwner, updateIzin);
router.delete("/izin/:id/:nopeg", requireOwner, deleteIzin);
router.get("/izin/:nopeg", requireOwner, getIzinByOwner);
router.get("/izin-atasan/:nopeg", requireOwner, getIzinByAtasan);
router.post("/izin-verifikasi/:nopeg", requireOwner, verifyIzin);

module.exports = router;
