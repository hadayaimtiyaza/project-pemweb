require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ ini yang benar
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const galeriRoutes = require('./routes/galeriRoutes');

const app = express();
connectDB();

app.use(cors()); // ✅ aktifkan CORS dulu
app.use(express.json()); // parsing JSON

app.use('/uploads', express.static('uploads'));

app.use('/api/articles', articleRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/galeries', galeriRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
