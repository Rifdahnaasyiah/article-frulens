const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

// Tambahkan rute default
app.get('/', (req, res) => {
    res.send('Selamat datang di API Frulens!');
});

// Middleware
app.use(express.json());
app.use('/images', express.static('images')); // Melayani file gambar statis
app.use('/api', routes);

// Jalankan server dan menangani error apabila port sudah digunakan
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});
