const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// 🔐 Passwort-Konfiguration
const CORRECT_PASSWORD = 'admin1234';

// 📁 Pfad zum Frontend-Ordner (z. B. public/)
const publicPath = path.join(__dirname, 'public');

// 📦 Middleware
app.use(express.static(publicPath)); // Static-Dateien (HTML, CSS, JS)
app.use(express.urlencoded({ extended: true })); // Formulardaten
app.use(cookieParser()); // Cookies lesen/schreiben

// 🔐 Login-Formular POST
app.post('/login', (req, res) => {
  const password = req.body.password;

  if (password === CORRECT_PASSWORD) {
    res.cookie('authenticated', 'true', { httpOnly: true });
    res.redirect('/admin.html');
  } else {
    res.send('<h3>❌ Falsches Passwort. <a href="/system.html">Zurück</a></h3>');
  }
});

// 🔒 Zugriffsschutz für admin.html
app.get('/admin.html', (req, res, next) => {
  if (req.cookies.authenticated === 'true') {
    res.sendFile(path.join(publicPath, 'admin.html'));
  } else {
    res.redirect('/system.html');
  }
});

// 🔓 Logout (optional)
app.get('/logout', (req, res) => {
  res.clearCookie('authenticated');
  res.redirect('/system.html');
});

// 🚀 Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});
