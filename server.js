const express = require('express');
const session = require('express-session');
const path = require('path');
const users = require('./users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies & Sessions
app.use(session({
  secret: 'dein-geheimer-session-key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

// Statische Dateien aus aktuellem Verzeichnis
app.use(express.static(__dirname));

// Login-Route (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user.username;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Ungültige Zugangsdaten' });
  }
});

// Login-Status prüfen
app.get('/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// Logout (POST)
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// Zugriffsschutz für index.html (GET)
app.get('/index.html', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.redirect('/login.html');
  }
});

// Zugriffsschutz für aout.html (GET)
app.get('/aout.html', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.redirect('/login.html');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
