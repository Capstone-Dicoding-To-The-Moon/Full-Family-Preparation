const {
  response200Handler,
  response201Handler,
  response400Handler,
  response404Handler,
} = require('../helpers/responseHelper');
const { adminChecker } = require('../helpers/usersChecker');

const getAllKategori = async (request, h) => {
  const { prisma } = request.server.app;
  const kategori = await prisma.kategori.findMany({});
  return response200Handler(h, 'get', kategori);
};

const getKategoriById = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'kategori', 'id');
  }

  const kategoriById = await prisma.kategori.findUnique({
    where: {
      id,
    },
  });

  if (kategoriById) {
    return response200Handler(h, 'get', kategoriById);
  }

  return response404Handler(h, 'get', 'kategori', 'Id');
};

const updateKategoriById = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, uId, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);
  const { name, title } = request.payload;

  if (!id) {
    return response400Handler(h, 'update', 'kategori', 'id');
  }

  if (!name) {
    return response400Handler(h, 'update', 'kategori', 'name');
  }

  if (!title) {
    return response400Handler(h, 'update', 'kategori', 'title');
  }

  const now = new Date(Date.now());

  let updatedKategori;
  try {
    updatedKategori = await prisma.kategori.update({
      where: {
        id,
      },
      data: {
        title,
        updatedAt: now,
        updatedBy: requesterUser.data.name,
      },
    });
  } catch (e) {
    return response404Handler(h, 'update', 'kategori', 'Id');
  }

  return response200Handler(h, 'update', updatedKategori);
};

const deleteKategoriById = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'delete', 'kategori', 'id');
  }

  let deletedKategori;

  try {
    deletedKategori = await prisma.kategori.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    return response404Handler(h, 'delete', 'kategori', 'Id');
  }

  return response200Handler(h, 'delete', deletedKategori);
};

const addKategori = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { title } = request.payload;

  if (!title) {
    return response400Handler(h, 'add', 'kategori', 'title');
  }

  const createdKategori = await prisma.kategori.create({
    data: {
      title,
      authorId: requesterUser.data.id,
      updatedBy: requesterUser.data.name,
    },
  });

  return response201Handler(h, 'forum', createdKategori);
};

module.exports = {
  getAllKategori,
  getKategoriById,
  updateKategoriById,
  deleteKategoriById,
  addKategori,
};
