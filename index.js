const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON dan form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username dan password wajib diisi!');
    }

    try {
        // Baca file database.json
        const database = JSON.parse(fs.readFileSync('./database.json', 'utf8'));

        // Cari user di database
        const user = database.users.find(
            user => user.username === username && user.password === password
        );

        if (user) {
            // Login berhasil, arahkan ke dashboard.html
            res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
        } else {
            // Login gagal
            res.status(401).send('Login gagal: Username atau password salah.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
