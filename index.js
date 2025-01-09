const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const database = JSON.parse(fs.readFileSync('./database.json', 'utf8'));
    const user = database.users.find(user => user.username === username && user.password === password);

    if (user) {
        res.redirect('/dashboard.html');
    } else {
        res.status(401).send('Login gagal: Username atau password salah.');
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
