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
const { adminChecker, userChecker } = require('../helpers/usersChecker');

const getUser = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, id, 'get');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const users = await prisma.user.findMany({
    where: {
      roleId: 2,
    },
  });

  return response200Handler(h, 'get', users);
};

const getUserById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'user', 'id');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (user) {
    return response200Handler(h, 'get', user);
  }

  return response404Handler(h, 'get', 'user', 'Id');
};

const addUser = async (request, h) => {
  const { prisma } = request.server.app;
  const { name, email, image } = request.payload;

  let dataImage;

  if (!name) {
    return response400Handler(h, 'add', 'user', 'name');
  }

  if (!email) {
    return response400Handler(h, 'add', 'user', 'email');
  }

  const check = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (check) {
    return response400Handler(h, 'add', 'user', null, 'Email user sudah ada');
  }

  if (validateImageExtension(image)) {
    if (image.hapi.filename) {
      dataImage = await saveImage(image, 'user');
    }
  } else {
    return response400HandlerImage(h);
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      image_large: dataImage?.data.large,
      image_small: dataImage?.data.small,
      roleId: 2,
    },
  });

  return response201Handler(h, 'User', user);
};

const updateUser = async (request, h) => {
  const { userId: id } = request.auth.credentials;
  const { prisma } = request.server.app;
  const { name, email, oldImage, newImage } = request.payload;

  const requesterUser = await userChecker(prisma, h, id, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  if (!name) {
    return response400Handler(h, 'update', 'user', 'name');
  }

  if (!email) {
    return response400Handler(h, 'update', 'user', 'email');
  }

  const userNow = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userNow) {
    return response404Handler(h, 'update', 'user', 'Email');
  }

  if (requesterUser.data.roleId != 1 || userNow.id === requesterUser.data.id) {
    return response401Handler(h, 'user request');
  }

  let image_large = userNow.image_large;
  let image_small = userNow.image_small;

  if (oldImage !== newImage.hapi.filename) {
    deleteSavedImage(image_large, image_small);

    const dataImage = saveImage(newImage, 'user');
    image_large = dataImage.data.large;
    image_small = dataImage.data.small;
  }

  const now = new Date(Date.now());

  const user = await prisma.user.update({
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

  return response200Handler(h, 'update', user);
};

const deleteUser = async (request, h) => {
  const { userId: id } = request.auth.credentials;

  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, id, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { email } = request.payload;

  if (!email) {
    return response400Handler(h, 'delete', 'user', 'email');
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return response404Handler(h, 'delete', 'user', 'Email');
  }

  if (requesterUser.roleId != 1 || requesterUser.id !== user.id) {
    return response401Handler(h, 'role');
  }

  user = await prisma.user.delete({
    where: {
      email,
    },
  });

  return response200Handler(h, 'delete', user);
};

// For view image
const getImage = async (request, h) => {
  const { name } = request.params;
  return h.file(`./uploads/user/${name}`);
};

const userLogin = async (request, h) => {
  const { prisma } = request.server.app;
  const { email, password } = request.payload;

  if (!email) {
    return response400Handler(h, 'get', 'user', 'email');
  }

  if (!password) {
    return response400Handler(h, 'get', 'user', 'password');
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return response404Handler(h, 'get', 'user', 'Email');
  }

  if (user.roleId != 2) {
    return response401Handler(h, 'role');
  }

  if (user.password !== password) {
    return response400Handler(h, 'get', 'admin', 'password dengan benar');
  }

  const token = getToken(user.id);

  return response200Handler(h, 'get', token);
};

module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser,
  getImage,
  userLogin,
};
