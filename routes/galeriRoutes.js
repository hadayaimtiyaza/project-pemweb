const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/galeryController');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/galeri'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });
const upload = multer({ storage });

router.post('/upload', upload.single('gambar'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Gagal upload' });
    res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});


router.get('/', controller.getGaleries);
router.post('/', upload.single('gambar'), controller.createGalery);
router.put('/:id', upload.single('gambar'), controller.updateGalery);
router.delete('/:id', controller.deleteGalery);

module.exports = router;