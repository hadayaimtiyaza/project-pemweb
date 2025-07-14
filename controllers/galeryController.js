const Galeri = require('../models/Galery');
const fs = require('fs');
const path = require('path');


exports.getGaleries = async (req, res) => {
  try {
    const galeries = await Galeri.find();
    res.json(galeries);
  } catch (err) {
    console.error('Gagal mengambil galeri:', err);
    res.status(500).json({ message: 'Gagal mengambil galeri' });
  }
};
exports.createGalery = async (req, res) => {
    try {
        const newGaleri = new Galeri({
          judul: req.body.judul,
          kolom: req.body.kolom,
          gambar: req.file.filename
        });
    
        await newGaleri.save();
        res.status(201).json({ message: 'Galeri disimpan', galeri: newGaleri });
      } catch (err) {
        console.error('Gagal simpan galeri:', err);
        res.status(500).json({ message: 'Gagal simpan galeri' });
      }
};

exports.updateGalery = async (req, res) => {
    const { id } = req.params;

    try {
      const existingGaleri = await Galeri.findById(id);
      if (!existingGaleri) {
        return res.status(404).json({ message: 'Galeri tidak ditemukan' });
      }
    
      const kolomBaru = req.body.kolom;
    
      const galeriLain = await Galeri.findOne({ kolom: kolomBaru, _id: { $ne: id } });
    
      if (galeriLain) {
        await Galeri.findByIdAndUpdate(galeriLain._id, { kolom: existingGaleri.kolom });
      }
    
      const updatedData = {
        judul: req.body.judul,
        kolom: kolomBaru,
      };
    
      if (req.file) {
        if (existingGaleri.gambar) {
          const oldImagePath = path.join(__dirname, '..', 'uploads/galeri', existingGaleri.gambar);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updatedData.gambar = req.file.filename;
      }
    
      const updatedGaleri = await Galeri.findByIdAndUpdate(id, updatedData, { new: true });
      res.json({ message: 'Galeri diperbarui', galeri: updatedGaleri });
    
    } catch (err) {
      console.error('Gagal update galeri:', err);
      res.status(500).json({ message: 'Gagal update galeri' });
    }
};

exports.deleteGalery = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Galeri.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'galeri tidak ditemukan' });
    }

    if (deleted.gambar) {
      const filePath = path.join(__dirname, '..', 'uploads/galeri', deleted.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Galeri berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus galeri:', err);
    res.status(500).json({ message: 'Gagal menghapus galeri' });
  }
};