const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    res.send(data);
  });
});

app.get('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    res.send(data);
  });
});

app.post('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    const cart = JSON.parse(data);
    cart.push(req.body);

    addToStats('add', req.body.name);

    fs.writeFile('./db/cart.json', JSON.stringify(cart), (err) => {
      if(err) {
        return console.log(err);
      }

      res.send(req.body);
    });
  });
});

app.patch('/cart/:id', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let cart = JSON.parse(data);

    const oldQuantity = cart.find((item) => item.id === +req.params.id).quantity;
    const newQuantity = req.body.quantity;

    if (oldQuantity < newQuantity) {
      addToStats('add', cart.find((item) => item.id === +req.params.id).name);
    } else {
      addToStats('delete', cart.find((item) => item.id === +req.params.id).name);
    }

    cart = cart.map((item) => {
      if(item.id === +req.params.id) {
        return { ...item, ...req.body };
      }

      return item;
    });

    fs.writeFile('./db/cart.json', JSON.stringify(cart), (err) => {
      if(err) {
        return console.log(err);
      }

      res.send(cart.find((item) => item.id === +req.params.id));
    });
  });
});

app.delete('/cart/:id', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let cart = JSON.parse(data);

    addToStats('delete', cart.find((item) => item.id === +req.params.id).name);

    cart = cart.filter((cartItem) => cartItem.id !== +req.params.id);

    fs.writeFile('./db/cart.json', JSON.stringify(cart), (err) => {
      if(err) {
        return console.log(err);
      }

      res.send(data);
    });
  });
});

function addToStats (operation, name) {
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let stats = JSON.parse(data);

    stats.push({ operation: operation, name: name, time: Date().toLocaleString() });

    fs.writeFile('./db/stats.json', JSON.stringify(stats), (err) => {
      if(err) {
        return console.log(err);
      }
    });
  });
};

app.listen(3000, () => {
  console.log('Server has been started!');
});