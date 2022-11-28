const {
  getKomentarForum,
  getKomentarForumById,
  addKomentarForum,
  updateKomentarForum,
  deleteKomentarForum,
} = require('../handlers/komentarForumHandlers');
const {
  routesHelper,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesKomentarForum = [
  routesHelperWithoutAuth('GET', '/komentar_forum', getKomentarForum), // everyone
  routesHelperWithoutAuth('GET', '/komentar_forum/{id}', getKomentarForumById), // everyone
  routesHelper('PUT', '/komentar_forum', updateKomentarForum), // user
  routesHelper('DELETE', '/komentar_forum', deleteKomentarForum), // user
  routesHelper('POST', '/komentar_forum', addKomentarForum), // user
];

module.exports = routesKomentarForum;
