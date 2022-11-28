const {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getImage,
  userLogin,
} = require('../handlers/userHandlers');
const {
  routesHelper,
  routesHelperStream,
  routesHelperWithoutAuth,
  routesHelperStreamWithoutAuth,
} = require('../helpers/routesHelper');

// everyone
// admin
// user

const routesUser = [
  routesHelper('GET', '/user', getUser), // admin
  routesHelper('GET', '/user/{id}', getUserById), // user
  routesHelper('GET', '/user/image/{name}', getImage), // user
  routesHelperStream('PUT', '/user', updateUser), // user
  routesHelper('DELETE', '/user', deleteUser), // user
  routesHelperStreamWithoutAuth('POST', '/user', addUser), // everyone -> routes register
  routesHelperWithoutAuth('POST', '/user-login', userLogin), // everyone
];
module.exports = routesUser;
