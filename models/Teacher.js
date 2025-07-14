const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    jabatan: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
    nip: {
        type: String,
        required: true,
    },
    gambar: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
