const { getRole, getRoleById, addRole } = require('../handlers/roleHandlers');
const { routesHelper } = require('../helpers/routesHelper');

// Cuma bisa diliat admin
const routesRole = [
  routesHelper('GET', '/roles', getRole),
  routesHelper('GET', '/roles/{id}', getRoleById),
  routesHelper('POST', '/roles', addRole),
];

module.exports = routesRole;
