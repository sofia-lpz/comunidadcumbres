import express from 'express'
import bodyParser from 'body-parser';
import {router} from './api/router.js'
import dotenv from 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api", router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`cumbres escuchando en el puerto ${PORT}`);
});

