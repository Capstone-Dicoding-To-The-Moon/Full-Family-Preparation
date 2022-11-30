const { getToken } = require('../helpers/authHelper');
const {
  response200Handler,
  response201Handler,
  response400Handler,
  response400HandlerImage,
  response401Handler,
  response404Handler,
} = require('../helpers/responseHelper');
const {
  validateImageExtension,
  deleteSavedImage,
  saveImage,
} = require('../helpers/saveImageHelper');
const { adminChecker } = require('../helpers/usersChecker');

const getAllAdmin = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, id, 'get');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const admin = await prisma.user.findMany({
    where: {
      roleId: 1,
    },
  });

  return response200Handler(h, 'get', admin);
};

const getAdminById = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'admin', 'id');
  }

  const admin = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (admin) {
    return response200Handler(h, 'get', admin);
  }

  return response404Handler(h, 'get', 'admin', 'Id');
};

const addAdmin = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, id, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { name, email, image } = request.payload;

  let dataImage;

  if (!name) {
    return response400Handler(h, 'add', 'admin', 'name');
  }

  if (!email) {
    return response400Handler(h, 'add', 'admin', 'email');
  }

  const check = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (check) {
    return response400Handler(h, 'add', 'admin', null, 'Email admin sudah ada');
  }

  if (validateImageExtension(image)) {
    if (image.hapi.filename) {
      dataImage = await saveImage(image, 'user');
    }
  } else {
    return response400HandlerImage(h);
  }

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      image_large: dataImage?.data.large,
      image_small: dataImage?.data.small,
      roleId: 1,
    },
  });

  return response201Handler(h, 'Admin', admin);
};

const updateAdmin = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, id, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  // Hidden input is email and oldImage
  const { name, email, oldImage, newImage } = request.payload;

  if (!name) {
    return response400Handler(h, 'update', 'admin', 'name');
  }

  if (!email) {
    return response400Handler(h, 'update', 'admin', 'email');
  }

  const adminNow = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!adminNow) {
    return response404Handler(h, 'update', 'admin', 'Email');
  }

  let image_large = adminNow.image_large;
  let image_small = adminNow.image_small;

  if (oldImage !== newImage.hapi.filename) {
    deleteSavedImage(image_large, image_small);

    const dataImage = saveImage(newImage, 'user');
    image_large = dataImage.data.large;
    image_small = dataImage.data.small;
  }

  const now = new Date(Date.now());

  const admin = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      image_large,
      image_small,
      updatedAt: now,
    },
  });

  return response200Handler(h, 'update', admin);
};

const deleteAdmin = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  // Untuk liat response headersnya
  // request.headers.['content-type']
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, id, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { email } = request.payload;

  if (!email) {
    return response400Handler(h, 'delete', 'admin', 'email');
  }

  let admin = await prisma.user.findUnique({ where: { email } });

  if (!admin) {
    return response404Handler(h, 'delete', 'admin', 'Email');
  }

  admin = await prisma.user.delete({
    where: {
      email,
    },
  });

  return response200Handler(h, 'delete', admin);
};

// For view image
const getImage = async (request, h) => {
  const { name } = request.params;
  return h.file(`./uploads/user/${name}`);
};

const adminLogin = async (request, h) => {
  const { prisma } = request.server.app;
  const { email, password } = request.payload;

  if (!email) {
    return response400Handler(h, 'get', 'admin', 'email');
  }

  if (!password) {
    return response400Handler(h, 'get', 'admin', 'password');
  }

  const admin = await prisma.user.findUnique({ where: { email } });
  if (!admin) {
    return response404Handler(h, 'get', 'admin', 'Email');
  }

  if (admin.roleId != 1) {
    return response401Handler(h, 'role');
  }

  if (admin.password !== password) {
    return response400Handler(h, 'get', 'admin', 'password dengan benar');
  }

  const token = getToken(admin.id);

  return response200Handler(h, 'get', token);
};

module.exports = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  addAdmin,
  getImage,
  adminLogin,
};
