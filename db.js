
const knexconfig= require('./knexfile');
const connection = require('knex')( knexconfig.development );



module.exports = connection;


