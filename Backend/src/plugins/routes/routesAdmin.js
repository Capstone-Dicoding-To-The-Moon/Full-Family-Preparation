const {
  addAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getImage,
  adminLogin,
} = require('../handlers/adminHandlers');
const {
  routesHelper,
  routesHelperStream,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

// Cuma bisa diliat admin
const routesAdmin = [
  routesHelper('GET', '/admin', getAllAdmin), // admin
  routesHelper('GET', '/admin/{id}', getAdminById), // admin
  routesHelper('GET', '/admin/image/{name}', getImage), // admin
  routesHelperStream('PUT', '/admin', updateAdmin), // admin
  routesHelper('DELETE', '/admin', deleteAdmin), // admin
  routesHelperStream('POST', '/admin', addAdmin), // admin
  routesHelperWithoutAuth('POST', '/admin-login', adminLogin), // everyone
];
module.exports = routesAdmin;
