const Divisi = require("../models/divisiModel.js");

exports.getDivisi = async (req, res) => {
  try {
    const response = await Divisi.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createDivisi = async (req, res) => {
  let { ket_divisi } = req.body;
  try {
    let newDivisi = new Divisi({ ket_divisi });
    await newDivisi.save();
    res.status(200).json({ status: "Berhasil Tambah!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateDivisi = async (req, res) => {
  try {
    await Divisi.update(req.body, {
      where: { id_divisi: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Edit!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteDivisi = async (req, res) => {
  try {
    await Divisi.destroy({
      where: { id_divisi: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Hapus!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
