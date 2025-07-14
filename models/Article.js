const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true,
    },
    konten: {
        type: String,
        required: true,
    },
    penulis: {
        type: String,
        required: true,
    },
    tanggal: {
        type: String,
        required: true,
    },
    gambar: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
