const User = require("../models/userModel.js");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { config } = require("dotenv");
const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');
const DetailUser = require("../models/detailUserModel.js");
config();

exports.createUser = async (req, res) => {
  let { no_pegawai, nama, level_user } = req.body;

  try {
    const randomPassword = generateRandomPassword(6);
    const hashedPassword = await hashPassword(randomPassword);
    const data = {
      no_pegawai,
      nama,
      password: hashedPassword,
      default_password: randomPassword,
      level_user
    };
    let newUser = new User(data);
    await newUser.save();
    res.status(200).json({
      status: "Berhasil Tambah!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal Tambah!",
      error: error.message,
    });
  }
};

exports.configUser = async (req, res) => {
  let { no_pegawai, nama, tgl_masuk, gender, no_ktp, no_hp, email, alamat_domisili,
    alamat_ktp, tempat_lahir, tgl_lahir, status_nikah, tgl_keluar, pendidikan,
    posisi, divisi, jabatan } = req.body;
  if (req.method === 'GET') {
    if (!req.query.nopeg) {
      try {
        const [results] = await db.query(
          "SELECT `user`.`no_pegawai`, `user`.`nama`, `user`.`level_user`, `user`.`default_password`, IFNULL(`divisi`.`ket_divisi`, NULL) as `divisi`, `detail_user`.`tgl_masuk`, `detail_user`.`gender`, `detail_user`.`no_ktp`, `detail_user`.`no_hp`, `detail_user`.`email`, `detail_user`.`alamat_domisili`, `detail_user`.`alamat_ktp`, `detail_user`.`tempat_lahir`, `detail_user`.`tgl_lahir`, `detail_user`.`status_nikah`, `detail_user`.`tgl_keluar`, `detail_user`.`pendidikan`, `detail_user`.`posisi`, `detail_user`.`jabatan` FROM `user` LEFT JOIN `detail_user` ON `user`.`no_pegawai` = `detail_user`.`no_pegawai` LEFT JOIN `divisi` ON `detail_user`.`divisi` = `divisi`.`id_divisi`;"
        );
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const [results] = await db.query(
          "SELECT `user`.`no_pegawai`, `user`.`nama`, `detail_user`.`tgl_masuk`, `detail_user`.`gender`, `detail_user`.`no_ktp`, `detail_user`.`no_hp`, `detail_user`.`email`, `detail_user`.`alamat_domisili`, `detail_user`.`alamat_ktp`, `detail_user`.`tempat_lahir`, `detail_user`.`tgl_lahir`, `detail_user`.`status_nikah`, `detail_user`.`tgl_keluar`, `detail_user`.`pendidikan`, `detail_user`.`posisi`, `detail_user`.`divisi`, `detail_user`.`jabatan` FROM `user` LEFT JOIN `detail_user` ON `user`.`no_pegawai` = `detail_user`.`no_pegawai` WHERE `user`.`no_pegawai` = " + req.query.nopeg
        );
        res.status(200).json(results[0] ?? { status: "invalid nopeg!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  } else if (req.method === 'POST') {
    try {
      const [results] = await db.query(
        `SELECT CASE WHEN EXISTS (SELECT * FROM detail_user WHERE no_pegawai = '${no_pegawai}') THEN true ELSE false END AS result_arr`
      );
      const data = {
        no_pegawai,
        tgl_masuk, gender, no_ktp, no_hp, email, alamat_domisili,
        alamat_ktp, tempat_lahir, tgl_lahir, status_nikah, tgl_keluar, pendidikan,
        posisi, divisi, jabatan
      };
      if (results[0].result_arr === 0) {
        let newUser = new DetailUser(data);
        await User.update(
          { nama: nama },
          {
            where: {
              no_pegawai: no_pegawai,
            },
          }
        );
        await newUser.save();
        res.status(200).json({
          status: "Berhasil Tambah!",
        });
      } else {
        try {
          await DetailUser.update(
            data,
            {
              where: {
                no_pegawai: no_pegawai,
              },
            }
          );
          await User.update(
            { nama: nama },
            {
              where: {
                no_pegawai: no_pegawai,
              },
            }
          );
          res.status(200).json({
            status: "Berhasil Ubah!",
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// fungsi untuk login pengguna 
exports.signIn = async (req, res) => {
  try {
    const { no_pegawai, password } = req.body;
    const response = await User.findOne({ where: { no_pegawai: parseInt(no_pegawai) } });

    if (!response) {
      return res.status(404).json({ error: "Invalid username" });
    }

    const login = await bcrypt.compare(password, response.password);
    if (!login) {
      return res.status(404).json({ error: "Invalid password" });
    }

    // membuat pasangan kunci RSA tiap user 
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048, // Panjang modulus kunci dalam bit
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    const keysDir = path.join(__dirname, '../secrets/keys');
    const publicKeyPath = path.join(keysDir, `public_key_${response.no_pegawai}.pem`);
    const privateKeyPath = path.join(keysDir, `private_key_${response.no_pegawai}.pem`);

    // Menghapus file kunci yang sudah ada jika ada
    if (fs.existsSync(publicKeyPath)) {
      fs.unlinkSync(publicKeyPath);
    }
    if (fs.existsSync(privateKeyPath)) {
      fs.unlinkSync(privateKeyPath);
    }

    // Menyimpan kunci publik dan privat ke file
    fs.writeFileSync(publicKeyPath, publicKey);
    fs.writeFileSync(privateKeyPath, privateKey);

    const payload = { nopeg: response.no_pegawai, name: response.nama, role: response.level_user, claim: "created for HRD Asia" };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '12h' });

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
