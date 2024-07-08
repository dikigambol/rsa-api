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
const { requireOwnerHMAC } = require("../middlewares/requireOwnerHMAC.js");
const router = express.Router();

router.post("/izin/:nopeg", requireOwner, createIzin);
router.put("/izin/:id/:nopeg", requireOwner, updateIzin);
router.delete("/izin/:id/:nopeg", requireOwner, deleteIzin);
router.get("/izin/:nopeg", requireOwner, getIzinByOwner);
router.get("/izin-atasan/:nopeg", requireOwner, getIzinByAtasan);
router.post("/izin-verifikasi/:nopeg", requireOwner, verifyIzin);

router.post("/izin-hmac/:nopeg", requireOwnerHMAC, createIzin);
router.put("/izin-hmac/:id/:nopeg", requireOwnerHMAC, updateIzin);
router.delete("/izin-hmac/:id/:nopeg", requireOwnerHMAC, deleteIzin);
router.get("/izin-hmac/:nopeg", requireOwnerHMAC, getIzinByOwner);
router.get("/izin-atasan-hmac/:nopeg", requireOwnerHMAC, getIzinByAtasan);
router.post("/izin-verifikasi-hmac/:nopeg", requireOwnerHMAC, verifyIzin);

module.exports = router;
