const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Statische Dateien aus "public" ausliefern
app.use(express.static(path.join(__dirname, 'public')));

// Fallback für Single-Page-Apps
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
