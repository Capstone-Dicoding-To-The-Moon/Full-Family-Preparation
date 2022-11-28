const {
  getKategoriPost,
  getKategoriPostById,
  addKategoriPost,
} = require('../handlers/kategoriPostHandlers');
const {
  routesHelper,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesKategoriPost = [
  routesHelperWithoutAuth('GET', '/kategori_post', getKategoriPost), // everyone
  routesHelperWithoutAuth('GET', '/kategori_post/{id}', getKategoriPostById), // everyone
  routesHelper('POST', '/kategori_post', addKategoriPost), // user
];

module.exports = routesKategoriPost;
