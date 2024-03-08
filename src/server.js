const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const fameCutoffRoute = require('./routes/cutoff.routes');
const moeRoute = require('./routes/moe.routes');

const port = process.env.PORT || 3000;
const uri = 'mongodb://test:test@ac-snvzbge-shard-00-00.erpjyn6.mongodb.net:27017,ac-snvzbge-shard-00-01.erpjyn6.mongodb.net:27017,ac-snvzbge-shard-00-02.erpjyn6.mongodb.net:27017/?ssl=true&replicaSet=atlas-u5ei8l-shard-0&authSource=admin&retryWrites=true&w=majority&appName=WoTFame';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/fame', fameCutoffRoute);
app.use('/get', moeRoute);

const server = http.createServer(app);

mongoose.connect(uri, {});

app.listen(process.env.PORT, () =>
  console.log(`MongoDB listening at port: ${port}`)
);

server.listen(4001, () => {
  console.log('Socket listening at port: 4001');
});

module.exports = app;