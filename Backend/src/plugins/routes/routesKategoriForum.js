const {
  getKategoriForum,
  getKategoriForumById,
  addKategoriForum,
} = require('../handlers/kategoriForumHandlers');
const {
  routesHelper,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesKategoriForum = [
  routesHelperWithoutAuth('GET', '/kategori_forum', getKategoriForum), // everyone
  routesHelperWithoutAuth('GET', '/kategori_forum/{id}', getKategoriForumById), // everyone
  routesHelper('POST', '/kategori_forum', addKategoriForum), // user
];

module.exports = routesKategoriForum;
