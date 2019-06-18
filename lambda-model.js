const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3'
  },
  useNullAsDefault: true, //required only for sqlite3
  //debug: true
}

const db = knex(knexConfig)

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
return db('zoos')
}
function findById(id) {
return db('zoos')
.where({ id })
.first()
}
function add(role) {
return db('zoos')
.insert(role, 'id')
}
function update(id, change) {
return db('zoos')
.where({ id })
.update(change)
}
function remove(id) {
return db('zoos')
.where({ id })
.delete()
}
