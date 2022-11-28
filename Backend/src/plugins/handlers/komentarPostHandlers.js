const {
  response200Handler,
  response201Handler,
  response400Handler,
  response401Handler,
  response404Handler,
} = require('../helpers/responseHelper');

const getKomentarPost = async (request, h) => {
  const { prisma } = request.server.app;
  const komentarPost = await prisma.komentarPost.findMany({});
  return response200Handler(h, 'get', komentarPost);
};

const getKomentarPostById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'komentar post', 'id');
  }

  const komentarPostById = await prisma.komentarPost.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (komentarPostById) {
    return response200Handler(h, 'get', komentarPostById);
  }

  return response404Handler(h, 'get', 'komentar post', 'Id');
};

const updateKomentarPost = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);
  const { content } = request.payload;

  if (!id) {
    return response400Handler(h, 'update', 'komentar post', 'id');
  }

  if (!content) {
    return response400Handler(h, 'update', 'komentar post', 'content');
  }

  const now = new Date(Date.now());

  let updatedKomentarPost = await prisma.komentarPost.findUnique({
    where: { id },
  });

  if (!updatedKomentarPost) {
    return response404Handler(h, 'update', 'komentar post', 'Id');
  }

  if (updatedKomentarPost.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author komentar post');
  }

  updatedKomentarPost = await prisma.komentarPost.update({
    where: {
      id,
    },
    data: {
      content,
      updatedAt: now,
    },
  });

  return response200Handler(h, 'update', updatedKomentarPost);
};

const deleteKomentarPost = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'delete', 'komentar post', 'id');
  }

  let deletedKomentarPost = await prisma.komentarPost.findUnique({
    where: { id },
  });

  if (!deletedKomentarPost) {
    return response404Handler(h, 'delete', 'komentar post', 'Id');
  }

  if (deletedKomentarPost.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author komentar post');
  }

  deletedKomentarPost = await prisma.komentarPost.delete({
    where: {
      id,
    },
  });

  return response200Handler(h, 'delete', deletedKomentarPost);
};

const addKomentarPost = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { content, postId } = request.payload;

  if (!content) {
    return response400Handler(h, 'add', 'komentar post', 'content');
  }

  if (!postId) {
    return response400Handler(h, 'add', 'komentar post', 'post id');
  }

  const createdKomentarPost = await prisma.komentarPost.create({
    data: {
      content,
      authorId: requesterUser.data.id,
      postId,
    },
  });

  return response201Handler(h, 'komentar post', createdKomentarPost);
};

module.exports = {
  getKomentarPost,
  getKomentarPostById,
  updateKomentarPost,
  deleteKomentarPost,
  addKomentarPost,
};
