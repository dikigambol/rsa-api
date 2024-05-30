const Struktural = require("../models/strukturalModel");

exports.getStruktural = async (req, res) => {
  try {
    const response = await Struktural.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStrukturalById = async (req, res) => {
  try {
    const response = await Struktural.findOne({
      where: { id_struktural: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createStruktural = async (req, res) => {
  let { id_divisi, atasan } = req.body;
  try {
    let newStruktural = new Struktural({ id_divisi, atasan });
    await newStruktural.save();
    res.status(200).json({ status: "Berhasil Tambah!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

exports.updateStruktural = async (req, res) => {
  try {
    await Struktural.update(req.body, {
      where: { id_struktural: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Edit!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

exports.deleteStruktural = async (req, res) => {
  try {
    await Struktural.destroy({
      where: { id_struktural: req.params.id },
    });
    res.status(200).json({ status: "Berhasil Hapus!" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};
