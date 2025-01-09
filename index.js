const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing form data
app.use(express.urlencoded({ extended: true }));

// Middleware untuk melayani file statis dari folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).send('Username dan password wajib diisi!');
    }

    try {
        // Baca file database.json
        const databasePath = path.join(__dirname, 'database.json');
        const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

        // Cari user di database
        const user = database.users.find(
            user => user.username === username && user.password === password
        );

        if (user) {
            // Jika login berhasil, arahkan ke dashboard.html
            res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
        } else {
            // Jika login gagal
            res.status(401).send('Login gagal: Username atau password salah.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
