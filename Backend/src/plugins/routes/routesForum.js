const {
  getAllForum,
  getForumById,
  addForum,
  getAllForumWithOrderDate,
  getForumByCategories,
  getForumWithDiscussionById,
  updateForum,
  updateUpVote,
  updateDownVote,
  deleteForumById,
} = require('../handlers/forumHandlers');
const {
  routesHelper,
  routesHelperStream,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesForum = [
  routesHelperWithoutAuth('GET', '/forum', getAllForum), // everyone
  routesHelperWithoutAuth('GET', '/forum/{id}', getForumById), // everyone
  routesHelperWithoutAuth('GET', '/forumDates', getAllForumWithOrderDate), // everyone
  routesHelperWithoutAuth('GET', '/forumCat/{id}', getForumByCategories), // everyone
  routesHelperWithoutAuth('GET', '/forumDis/{id}', getForumWithDiscussionById), // everyone
  routesHelperStream('PUT', '/forum', updateForum), // user
  routesHelper('PUT', '/forumUpVote', updateUpVote), // user
  routesHelper('PUT', '/forumDownVote', updateDownVote), // user
  routesHelper('DELETE', '/forum', deleteForumById), // user
  routesHelperStream('POST', '/forum', addForum), // user
];

module.exports = routesForum;
