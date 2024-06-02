-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Jun 2024 pada 13.18
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrd_jwt_rsa`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_user`
--

CREATE TABLE `detail_user` (
  `tgl_masuk` date NOT NULL,
  `gender` varchar(100) NOT NULL,
  `no_ktp` varchar(100) NOT NULL,
  `no_hp` int(13) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat_domisili` text NOT NULL,
  `alamat_ktp` text NOT NULL,
  `tempat_lahir` varchar(100) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `status_nikah` varchar(100) NOT NULL,
  `tgl_keluar` date DEFAULT NULL,
  `pendidikan` varchar(100) NOT NULL,
  `posisi` varchar(100) NOT NULL,
  `divisi` varchar(100) NOT NULL,
  `jabatan` varchar(100) NOT NULL,
  `no_pegawai` int(25) NOT NULL,
  `id_detail` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_user`
--

INSERT INTO `detail_user` (`tgl_masuk`, `gender`, `no_ktp`, `no_hp`, `email`, `alamat_domisili`, `alamat_ktp`, `tempat_lahir`, `tgl_lahir`, `status_nikah`, `tgl_keluar`, `pendidikan`, `posisi`, `divisi`, `jabatan`, `no_pegawai`, `id_detail`) VALUES
('2024-01-01', 'Laki-Laki', '1234567890123456', 2147483647, 'yanuar@gmail.com', 'Jalan Merdeka No. 123', 'Jalan Jendral Sudirman No. 456', 'Jakarta', '1990-05-15', 'Single', NULL, 'S2', 'Karyawan', '3', 'Senior Engineer', 1234, 1),
('2024-06-02', 'Laki-Laki', '12341312', 12313123, 'diki@asia.ac.id', 'Jalan Merdeka No. 12', 'Jalan Jendral Sudirman No. 45', 'Malang', '2024-06-02', 'Menikah', NULL, 'SMA/SMK', 'Karyawan', '4', 'Tidur Saja', 4567, 2),
('2024-06-02', 'Laki-Laki', '123456', 123456, 'westlakewetland@gmail.com', 'Jalan Merdeka No. 12', 'Jalan Jendral Sudirman No. 456', 'Pasuruan', '2024-06-12', 'Single', NULL, 'S3', 'Dosen', '4', 'OB', 1324, 3),
('2024-06-28', 'Perempuan', '4564573452', 1212313434, 'upt_si@asia.ac.id', 'Jalan Merdeka No. 12321', 'Jalan Jendral Sudirman No. 4567', 'Jakarta', '2024-06-29', 'Menikah', NULL, 'S2', 'Dosen', '3', 'Senior Engineer Tapi Boong', 9876, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi`
--

CREATE TABLE `divisi` (
  `id_divisi` int(10) NOT NULL,
  `ket_divisi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `divisi`
--

INSERT INTO `divisi` (`id_divisi`, `ket_divisi`) VALUES
(3, 'HRD'),
(4, 'UPT-SI');

-- --------------------------------------------------------

--
-- Struktur dari tabel `izin_pegawai`
--

CREATE TABLE `izin_pegawai` (
  `id_izin` int(10) NOT NULL,
  `no_pegawai` int(25) NOT NULL,
  `tgl_izin` date NOT NULL,
  `keterangan` text NOT NULL,
  `status_izin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `struktural`
--

CREATE TABLE `struktural` (
  `id_struktural` int(10) NOT NULL,
  `id_divisi` int(10) NOT NULL,
  `atasan` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `struktural`
--

INSERT INTO `struktural` (`id_struktural`, `id_divisi`, `atasan`) VALUES
(3, 4, 1324);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(10) NOT NULL,
  `no_pegawai` int(25) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `default_password` varchar(100) NOT NULL,
  `level_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `no_pegawai`, `nama`, `password`, `default_password`, `level_user`) VALUES
(5, 1234, 'Yanuar', '$2a$10$DHqBs3DHXG3Ty6HWExbrieOXI3ikeRVlU080jiwr4Y9rIJXaDOq7W', '3e17tl', 'superadmin'),
(9, 4567, 'Nur Akbar', '$2a$10$pgMR/ynfpnn88m3siOUByuZUv6wjzqg.fEKpzX70GmiPn55GQE1wC', 'r0ydvy', 'user'),
(13, 1324, 'Akbar Telolet', '$2a$10$QdZr.ctJQ9Z3LWGne/ZIouSDIs6fNVHlU.oAf4s0Jaytp1m2qXff6', 'bpnzr9', 'user'),
(14, 9876, 'Kasman Gemink', '$2a$10$eLyNd//ClrjfpE44ecNnKeMcgAY03Y4NPzpYB1msW.RDQz9yXWMye', 'fbyly0', 'superadmin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detail_user`
--
ALTER TABLE `detail_user`
  ADD PRIMARY KEY (`id_detail`),
  ADD UNIQUE KEY `no_pegawai` (`no_pegawai`);

--
-- Indeks untuk tabel `divisi`
--
ALTER TABLE `divisi`
  ADD PRIMARY KEY (`id_divisi`);

--
-- Indeks untuk tabel `izin_pegawai`
--
ALTER TABLE `izin_pegawai`
  ADD PRIMARY KEY (`id_izin`),
  ADD KEY `no_pegawai` (`no_pegawai`);

--
-- Indeks untuk tabel `struktural`
--
ALTER TABLE `struktural`
  ADD PRIMARY KEY (`id_struktural`),
  ADD UNIQUE KEY `id_divisi` (`id_divisi`),
  ADD KEY `relation_2` (`atasan`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `no_pegawai` (`no_pegawai`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_user`
--
ALTER TABLE `detail_user`
  MODIFY `id_detail` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `divisi`
--
ALTER TABLE `divisi`
  MODIFY `id_divisi` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `izin_pegawai`
--
ALTER TABLE `izin_pegawai`
  MODIFY `id_izin` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `struktural`
--
ALTER TABLE `struktural`
  MODIFY `id_struktural` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_user`
--
ALTER TABLE `detail_user`
  ADD CONSTRAINT `detail_user_ibfk_1` FOREIGN KEY (`no_pegawai`) REFERENCES `user` (`no_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `izin_pegawai`
--
ALTER TABLE `izin_pegawai`
  ADD CONSTRAINT `izin_pegawai_ibfk_1` FOREIGN KEY (`no_pegawai`) REFERENCES `user` (`no_pegawai`);

--
-- Ketidakleluasaan untuk tabel `struktural`
--
ALTER TABLE `struktural`
  ADD CONSTRAINT `relation_1` FOREIGN KEY (`id_divisi`) REFERENCES `divisi` (`id_divisi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relation_2` FOREIGN KEY (`atasan`) REFERENCES `user` (`no_pegawai`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
