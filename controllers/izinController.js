const db = require("../config/db");
const Izin = require("../models/izinModel");
const Struktural = require("../models/strukturalModel");

exports.getIzinByAtasan = async (req, res) => {
  try {
    const response = await Struktural.findAll({
      where: { atasan: req.params.nopeg },
      attributes: ["id_divisi"],
    });
    const arrDivisi = response.map((item) => item.id_divisi);
    if(arrDivisi.length != 0){
      const [results] = await db.query(
        `SELECT user.nama, divisi.ket_divisi, izin_pegawai.id_izin, izin_pegawai.tgl_izin, izin_pegawai.keterangan, izin_pegawai.status_izin FROM izin_pegawai JOIN detail_user ON izin_pegawai.no_pegawai = detail_user.no_pegawai JOIN user ON izin_pegawai.no_pegawai = user.no_pegawai JOIN divisi ON detail_user.divisi = divisi.id_divisi WHERE detail_user.divisi IN (${arrDivisi.toString()})`
      );
      res.status(200).json(results);
    }else{
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getIzinByOwner = async (req, res) => {
  try {
    const response = await Izin.findAll({
      where: { no_pegawai: req.params.nopeg },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createIzin = async (req, res) => {
  let { no_pegawai, tgl_izin, keterangan, status_izin } = req.body;
  try {
    const response = await Struktural.findOne({
      where: { atasan: no_pegawai }
    });
    let status_val
    if(response != null){
      status_val = 1
    }else{
      status_val = 0
    }
    let newIzin = new Izin({
      no_pegawai,
      tgl_izin,
      keterangan,
      status_izin: status_val,
    });
    await newIzin.save();
    res.status(200).json({ status: "Berhasil Tambah!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

exports.updateIzin = async (req, res) => {
  try {
    await Izin.update(req.body, {
      where: { id_izin: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Edit!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

exports.deleteIzin = async (req, res) => {
  try {
    await Izin.destroy({
      where: { id_izin: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Hapus!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

exports.verifyIzin = async (req, res) => {
  const { id_izin, status_izin } = req.body;
  try {
    await Izin.update(
      { status_izin },
      {
        where: { id_izin: id_izin },
      }
    );
    res.status(200).json({ status: "Berhasil Edit!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};
