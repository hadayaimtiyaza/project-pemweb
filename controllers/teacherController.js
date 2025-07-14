const Teacher = require('../models/Teacher'); 
const fs = require('fs');
const path = require('path');

// Validasi sederhana
const validateTeacher = (data) => {
  if (!data) return false;
  const { jabatan, nama, nip } = data;
  return jabatan && nama && nip;
};

// GET semua teacher
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data guru' });
  }
};

// POST tambah teacher
exports.createTeacher = async (req, res) => {
  if (!validateTeacher(req.body)) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Gambar harus diunggah.' });
  }

  try {
    const newTeacher = new Teacher({
      jabatan: req.body.jabatan,
      nama: req.body.nama,
      nip: req.body.nip,
      gambar: req.file.filename
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Guru disimpan', guru: newTeacher });
  } catch (err) {
    console.error('Gagal simpan guru:', err);
    res.status(500).json({ message: 'Gagal simpan guru' });
  }
};

// PUT edit teacher
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;

  if (!validateTeacher(req.body)) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const teacherLama = await Teacher.findById(id);
    if (!teacherLama) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' });
    }

    const updatedData = {
      jabatan: req.body.jabatan,
      nama: req.body.nama,
      nip: req.body.nip,
    };

    if (req.file) {
      // Hapus gambar lama jika ada
      if (teacherLama.gambar) {
        const oldPath = path.join(__dirname, '..', 'uploads/guru', teacherLama.gambar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updatedData.gambar = req.file.filename;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Guru diperbarui', guru: updatedTeacher });
  } catch (err) {
    console.error('Gagal update guru:', err);
    res.status(500).json({ message: 'Gagal update guru' });
  }
};

// DELETE hapus teacher
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' });
    }

    if (teacher.gambar) {
      const filePath = path.join(__dirname, '..', 'uploads/guru', teacher.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Guru & gambar berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus guru:', err);
    res.status(500).json({ message: 'Gagal menghapus guru' });
  }
};
