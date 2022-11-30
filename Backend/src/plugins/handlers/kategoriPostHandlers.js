const {
  response200Handler,
  response400Handler,
  response404Handler,
  response201Handler,
} = require('../helpers/responseHelper');

const getKategoriPost = async (request, h) => {
  const { prisma } = request.server.app;
  const kategoriPost = await prisma.kategoriPost.findMany({});
  return response200Handler(h, 'get', kategoriPost);
};

const getKategoriPostById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'kategori post', 'id');
  }

  const kategoriPostById = await prisma.kategoriPost.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (kategoriPostById) {
    return response200Handler(h, 'get', kategoriPostById);
  }

  return response404Handler(h, 'get', 'kategori post', 'Id');
};

const addKategoriPost = async (request, h) => {
  const { prisma } = request.server.app;
  const { postId, kategoriId } = request.payload;

  if (!postId) {
    return response400Handler(h, 'add', 'kategori post', 'post id');
  }

  if (!kategoriId) {
    return response400Handler(h, 'add', 'kategori post', 'kategori id');
  }

  const createdKategoriPost = await prisma.kategoriPost.create({
    data: {
      postId,
      kategoriId,
    },
  });

  return response201Handler(h, 'kategori forum', createdKategoriPost);
};

module.exports = { getKategoriPost, getKategoriPostById, addKategoriPost };
