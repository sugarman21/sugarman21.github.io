const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// Passwort konfigurieren
const CORRECT_PASSWORD = 'admin1234';

app.use(express.static(__dirname));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Login-Formular verarbeiten
app.post('/login', (req, res) => {
  const password = req.body.password;
  if (password === CORRECT_PASSWORD) {
    res.cookie('authenticated', 'true', { httpOnly: true });
    res.redirect('/admin.html');
  } else {
    res.send('<h3>Falsches Passwort. <a href="/system.html">Zurück</a></h3>');
  }
});

// Zugriffsschutz für admin.html
app.get('/admin.html', (req, res, next) => {
  if (req.cookies.authenticated === 'true') {
    next();
  } else {
    res.redirect('/system.html');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
