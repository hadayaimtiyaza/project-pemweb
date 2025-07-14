const mongoose = require('mongoose');

const galeriSchema = new mongoose.Schema({
    judul: String,
    gambar: String,
    kolom: Number,
}, { timestamps: true });

module.exports = mongoose.model('Galeri', galeriSchema);
