const { response200Handler } = require('../helpers/responseHelper');

const getAllLogOrderByIdDescending = async (request, h) => {
  const { prisma } = request.server.app;
  const log = await prisma.log.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return response200Handler(h, 'get', log);
};

module.exports = {
  getAllLogOrderByIdDescending,
};
