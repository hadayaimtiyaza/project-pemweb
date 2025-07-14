const Article = require('../models/Article');
const fs = require('fs');
const path = require('path');

// Validasi sederhana
const validateArticle = (data) => {
  if (!data) return false;
  const { judul, konten, penulis, tanggal } = data;
  return judul && konten && penulis && tanggal;
};

// GET semua article
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error('Gagal mengambil artikel:', err);
    res.status(500).json({ message: 'Gagal mengambil artikel' });
  }
};

// POST tambah article
exports.createArticle = async (req, res) => {
  if (!validateArticle(req.body)) {
    return res.status(400).json({ message: 'Semua field wajib diisi (kecuali tag).' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Gambar harus diunggah.' });
  }

  try {
    const newArticle = new Article({
      judul: req.body.judul,
      konten: req.body.konten,
      penulis: req.body.penulis,
      tanggal: req.body.tanggal,
      tag: req.body.tag || '',
      gambar: req.file.filename
    });

    await newArticle.save();
    res.status(201).json({ message: 'Artikel disimpan', artikel: newArticle });
  } catch (err) {
    console.error('Gagal simpan artikel:', err);
    res.status(500).json({ message: 'Gagal simpan artikel' });
  }
};

// PUT edit article
exports.updateArticle = async (req, res) => {
  const { id } = req.params;

  if (!validateArticle(req.body)) {
    return res.status(400).json({ message: 'Semua field harus diisi, kecuali tag.' });
  }

  try {
    const existingArticle = await Article.findById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    const updatedData = {
      judul: req.body.judul,
      konten: req.body.konten,
      penulis: req.body.penulis,
      tanggal: req.body.tanggal,
      tag: req.body.tag || existingArticle.tag
    };

    // Jika ada gambar baru, hapus yang lama
    if (req.file) {
      if (existingArticle.gambar) {
        const oldImagePath = path.join(__dirname, '..', 'uploads/artikel', existingArticle.gambar);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar = req.file.filename;
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Artikel diperbarui', artikel: updatedArticle });
  } catch (err) {
    console.error('Gagal update artikel:', err);
    res.status(500).json({ message: 'Gagal update artikel' });
  }
};

// DELETE hapus article
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    if (deleted.gambar) {
      const filePath = path.join(__dirname, '..', 'uploads/artikel', deleted.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Artikel & gambar berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus artikel:', err);
    res.status(500).json({ message: 'Gagal menghapus artikel' });
  }
};

// GET artikel terbaru
exports.getLatestArticle = async (req, res) => {
  try {
    const latest = await Article.find().sort({ tanggal: -1 }).limit(1).exec();
    if (!latest || latest.length === 0) {
      return res.json({ message: 'Belum ada artikel' });
    }
    res.json(latest[0]);
  } catch (err) {
    console.error('Gagal mengambil artikel terbaru:', err);
    res.status(500).json({ message: 'Gagal mengambil artikel terbaru' });
  }
};

exports.getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
    res.json(article);
  } catch (err) {
    console.error('Gagal mengambil artikel:', err);
    res.status(500).json({ message: 'Gagal mengambil artikel' });
  }
};
