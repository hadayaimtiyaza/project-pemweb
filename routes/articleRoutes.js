const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/articleController');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/artikel'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  });
const upload = multer({ storage });

router.post('/upload', upload.single('gambar'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Gagal upload' });
    res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});


router.get('/', controller.getAllArticles);
router.post('/', upload.single('gambar'), controller.createArticle);
router.put('/:id', upload.single('gambar'), controller.updateArticle);
router.delete('/:id', controller.deleteArticle);
router.get('/latest', controller.getLatestArticle);
router.get('/detail/:id', controller.getArticleById);

module.exports = router;