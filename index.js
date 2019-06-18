const express = require('express');
const helmet = require('helmet');

const server = express();

const lambdaDb = require('./lambda-model.js')

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res) => {
  lambdaDb.find()
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request", err})
  })
});

server.get('/api/zoos/:id', (req, res) => {
  lambdaDb.findById(req.params.id)
  .then(zoo => {
    if(zoo){
      res.status(200).json(zoo)
    } else {
      res.status(404).json({message: "Role not found"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request", err})
  })
});

server.post('/api/zoos', (req, res) => {
  lambdaDb.add(req.body)
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request", err})
  })
});

server.put('/api/zoos/:id', (req, res) => {
  lambdaDb.update(req.params.id, req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({message: `${count} records updated`})
    } else {
      res.status(404).json({message: "Role not found"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request", err})
  })
});

server.delete('/api/zoos/:id', (req, res) => {
  lambdaDb.remove(req.params.id)
  .then(count => {
    if(count > 0) {
      const unit = count > 1 ? 'records' : 'record'
      res.status(200).json({message: `${count} ${unit} deleted`})
    } else {
      res.status(404).json({message: "Role not found"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request", err})
  })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
