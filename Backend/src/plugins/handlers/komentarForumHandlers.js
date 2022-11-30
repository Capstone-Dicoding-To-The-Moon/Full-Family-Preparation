const {
  response200Handler,
  response201Handler,
  response400Handler,
  response401Handler,
  response404Handler,
} = require('../helpers/responseHelper');
const { userChecker } = require('../helpers/usersChecker');

const getKomentarForum = async (request, h) => {
  const { prisma } = request.server.app;
  const komentarForum = await prisma.komentarForum.findMany({});
  return response200Handler(h, 'get', komentarForum);
};

const getKomentarForumById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'komentar forum', 'id');
  }

  const komentarForumById = await prisma.komentarForum.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (komentarForumById) {
    return response200Handler(h, 'get', komentarForumById);
  }

  return response404Handler(h, 'get', 'komentar forum', 'Id');
};

const updateKomentarForum = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);
  const { content } = request.payload;

  if (!id) {
    return response400Handler(h, 'update', 'komentar forum', 'id');
  }

  if (!content) {
    return response400Handler(h, 'update', 'komentar forum', 'content');
  }

  const now = new Date(Date.now());

  let updatedKomentarForum = await prisma.komentarForum.findUnique({
    where: { id },
  });

  if (!updatedKomentarForum) {
    return response404Handler(h, 'update', 'komentar forum', 'Id');
  }

  if (updatedKomentarForum.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author komentar forum');
  }

  updatedKomentarForum = await prisma.komentarForum.update({
    where: {
      id,
    },
    data: {
      content,
      updatedAt: now,
    },
  });

  return response200Handler(h, 'update', updatedKomentarForum);
};

const deleteKomentarForum = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'delete', 'komentar forum', 'id');
  }

  let deletedKomentarForum = await prisma.komentarForum.findUnique({
    where: { id },
  });

  if (!deletedKomentarForum) {
    return response404Handler(h, 'delete', 'komentar forum', 'Id');
  }

  if (deletedKomentarForum.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author komentar forum');
  }

  deletedKomentarForum = await prisma.komentarForum.delete({
    where: {
      id,
    },
  });

  return response200Handler(h, 'delete', deletedKomentarForum);
};

const addKomentarForum = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { content, forumId } = request.payload;

  if (!content) {
    return response400Handler(h, 'add', 'komentar forum', 'content');
  }

  if (!forumId) {
    return response400Handler(h, 'add', 'komentar forum', 'forum id');
  }

  const createdKomentarForum = await prisma.komentarForum.create({
    data: {
      content,
      authorId: requesterUser.data.id,
      forumId,
    },
  });

  return response201Handler(h, 'komentar forum', createdKomentarForum);
};

module.exports = {
  getKomentarForum,
  getKomentarForumById,
  updateKomentarForum,
  deleteKomentarForum,
  addKomentarForum,
};
