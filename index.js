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
            // Login berhasil, arahkan ke dashboard (menggunakan redirect)
            res.redirect('/dashboard'); // Redirect ke /dashboard
        } else {
            // Jika login gagal
            res.status(401).send('Login gagal: Username atau password salah.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Endpoint untuk menampilkan dashboard setelah login
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
