const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta dist/proyfrontendgrupo09/browser
app.use(express.static(path.join(__dirname, 'dist/proyfrontendgrupo09/browser')));

// Para cualquier otra ruta, servir el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/proyfrontendgrupo09/browser/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});