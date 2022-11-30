const { getAllLogOrderByIdDescending } = require('../handlers/logHandlers');
const { routesHelper } = require('../helpers/routesHelper');

// Routes yang bisa diliat sama admin aja
const routesLog = [routesHelper('GET', '/log', getAllLogOrderByIdDescending)];
module.exports = routesLog;
