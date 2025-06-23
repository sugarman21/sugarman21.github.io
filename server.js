const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Statische Dateien direkt aus dem Projekt-Root bereitstellen
app.use(express.static(__dirname));

// Fallback: bei nicht gefundenen Pfaden trotzdem index.html ausliefern (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
