const {
  response200Handler,
  response201Handler,
  response400Handler,
  response404Handler,
} = require('../helpers/responseHelper');
const { adminChecker } = require('../helpers/usersChecker');

const getRole = async (request, h) => {
  const { prisma } = request.server.app;
  const role = await prisma.role.findMany({});
  return response200Handler(h, 'get', role);
};

const getRoleById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'role', 'id');
  }

  const roleById = await prisma.role.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!roleById) {
    return response404Handler(h, 'get', 'role', 'Id');
  }

  return response200Handler(h, 'get', roleById);
};

const addRole = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await adminChecker(prisma, h, uId, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { role } = request.payload;

  if (!role) {
    return response400Handler(h, 'add', 'role', 'role');
  }

  const createdRole = await prisma.role.create({
    data: {
      role,
    },
  });

  return response201Handler(h, 'forum', createdRole);
};

module.exports = { getRole, getRoleById, addRole };
