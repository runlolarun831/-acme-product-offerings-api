const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { Product, Company, Offering } = models;
const path = require('path');

 app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname,'index.html')));

app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/companies', (req, res, next)=> {
  Company.findAll()
    .then(companies => res.send(companies))
    .catch(next);
});

app.get('/api/offerings', (req, res, next)=> {
  Offering.findAll()
    .then(offerings => res.send(offerings))
    .catch(next);
});


syncAndSeed()
  .then(()=> {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${ port }`));
  });
