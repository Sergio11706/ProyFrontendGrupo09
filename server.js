const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/proyFrontendGrupo09')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/proyFrontendGrupo09/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});