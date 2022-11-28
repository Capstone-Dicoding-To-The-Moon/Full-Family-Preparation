const {
  getAllPost,
  getPostWithCommentById,
  getAllPostWithOrderDate,
  getPostByCategories,
  updatePost,
  deletePostById,
  addPost,
  updateUpVote,
  updateDownVote,
  getPostById,
} = require('../handlers/postHandlers');
const {
  routesHelper,
  routesHelperStream,
  routesHelperWithoutAuth,
} = require('../helpers/routesHelper');

const routesPost = [
  routesHelperWithoutAuth('GET', '/posts', getAllPost), // everyone
  routesHelperWithoutAuth('GET', '/posts/{id}', getPostById), // everyone
  routesHelperWithoutAuth('GET', '/postsDates', getAllPostWithOrderDate), // everyone
  routesHelperWithoutAuth('GET', '/postsCat/{id}', getPostByCategories), // everyone
  routesHelperWithoutAuth('GET', '/postsCom/{id}', getPostWithCommentById), // everyone
  routesHelperStream('PUT', '/posts', updatePost), // user
  routesHelper('PUT', '/postsUpVote', updateUpVote), // user
  routesHelper('PUT', '/postsDownVote', updateDownVote), // user
  routesHelper('DELETE', '/posts', deletePostById), // user
  routesHelperStream('POST', '/posts', addPost), // user
];
module.exports = routesPost;
