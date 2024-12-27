const express = require('express');
const bodyParser = require('body-parser');
const dosenController = require('./controllers/dosenController');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use('/Dosen', dosenController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});