const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { Product } = models;
const path = require('path');

syncAndSeed()
  .then(()=> {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${ port }`));
  });
