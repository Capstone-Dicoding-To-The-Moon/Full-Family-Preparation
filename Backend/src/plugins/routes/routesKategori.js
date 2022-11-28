const {
  getAllKategori,
  getKategoriById,
  addKategori,
  updateKategoriById,
  deleteKategoriById,
} = require('../handlers/kategoriHandlers');
const {
  routesHelper,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesKategori = [
  routesHelperWithoutAuth('GET', '/categories', getAllKategori), // everyone
  routesHelperWithoutAuth('GET', '/categories/{id}', getKategoriById), // everyone
  routesHelper('PUT', '/categories', updateKategoriById), // admin
  routesHelper('DELETE', '/categories', deleteKategoriById), // admin
  routesHelper('POST', '/categories', addKategori), // admin
];

module.exports = routesKategori;
