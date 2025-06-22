const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const paginatedList = require('./paginatedList');
const create = require('./create');
const methods = createCRUDController('Query');

methods.list = paginatedList;
methods.create = create;
module.exports = methods;
