const express = require('express');
const app = express();
const port = 3000; // ou o número de porta que você desejar


// Defina as rotas do seu aplicativo
app.get('/', (req, res) => {
  res.send('Servidor web local com Node.js');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está executando em http://localhost:${port}`);
});

