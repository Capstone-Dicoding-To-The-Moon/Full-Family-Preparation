const { response404Handler, response401Handler } = require('./responseHelper');

const adminChecker = async (prisma, h, id, action) => {
  const admin = await prisma.user.findUnique({ where: { id } });

  if (!admin) {
    return {
      dataError: response404Handler(h, action, 'admin', 'Id'),
      error: true,
    };
  }

  if (admin.roleId != 1) {
    return {
      dataError: response401Handler(h, 'role'),
      error: true,
    };
  }
  return {
    data: admin,
  };
};

const userChecker = async (prisma, h, id, action) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return {
      dataError: response404Handler(h, action, 'user', 'Id'),
      error: true,
    };
  }

  return {
    data: user,
  };
};

module.exports = { adminChecker, userChecker };
