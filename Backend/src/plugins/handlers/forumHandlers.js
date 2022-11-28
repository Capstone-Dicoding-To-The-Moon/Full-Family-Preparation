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
const { userChecker } = require('../helpers/usersChecker');

const helper = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].user) {
      data[i].author = data[i].user.name;
      delete data[i].user;
    }
    data[i].vote = data[i].thumbs_up - data[i].thumbs_down;

    delete data[i].thumbs_up;
    delete data[i].thumbs_down;
  }
};

const getAllForum = async (request, h) => {
  const { prisma } = request.server.app;
  const forum = await prisma.forum.findMany({
    orderBy: [
      {
        thumbs_up: 'desc',
      },
      {
        thumbs_down: 'asc',
      },
    ],
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  helper(forum);

  return response200Handler(h, 'get', forum);
};

const getForumById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'forum', 'id');
  }

  const forumById = [
    await prisma.forum.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }),
  ];

  if (!forumById) {
    return response404Handler(h, 'get', 'forum', 'Id');
  }

  helper(forumById);

  return response200Handler(h, 'get', forumById[0]);
};

const getAllForumWithOrderDate = async (request, h) => {
  const { prisma } = request.server.app;
  const forumWithOrderDate = await prisma.forum.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  helper(forumWithOrderDate);

  return response200Handler(h, 'get', forumWithOrderDate);
};

const getForumByCategories = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'forum', 'id');
  }

  const forumByCategories = await prisma.forum.findMany({
    where: {
      kategori_forum: {
        some: {
          kategoriId: id,
        },
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      kategori_forum: true,
    },
  });

  if (forumByCategories.length < 1) {
    return response404Handler(h, 'get', 'forum', 'Id');
  }

  helper(forumByCategories);

  return response200Handler(h, 'get', forumByCategories);
};

// Kayak getPostWithCommentById
const getForumWithDiscussionById = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'forum', 'id');
  }

  const data = await prisma.forum.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!data) {
    return response404Handler(h, 'get', 'forum', 'Id');
  }

  const forumWithKomentar = [data];

  const komentar = await prisma.komentarForum.findMany({
    where: {
      forumId: id,
    },
    orderBy: [
      {
        thumbs_up: 'desc',
      },
      {
        thumbs_down: 'asc',
      },
    ],
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  helper(forumWithKomentar);
  helper(komentar);

  forumWithKomentar[0].komentar = komentar;

  return response200Handler(h, 'get', forumWithKomentar[0]);
};

const updateForum = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { id, title, oldImage, newImage } = request.payload;

  if (!id) {
    return response400Handler(h, 'update', 'forum', 'id');
  }

  if (!title) {
    return response400Handler(h, 'update', 'forum', 'title');
  }

  const forumNow = await prisma.forum.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      authorId: true,
      image_large: true,
      image_small: true,
    },
  });

  if (!forumNow) {
    return response404Handler(h, 'update', 'forum', 'Id');
  }

  let image_large = forumNow.image_large;
  let image_small = forumNow.image_small;

  if (oldImage !== newImage.hapi.filename) {
    deleteSavedImage(image_large, image_small);

    const dataImage = saveImage(newImage, 'forum');
    image_large = dataImage.data.large;
    image_small = dataImage.data.small;
  }

  if (forumNow.authorId == requesterUser.data.id) {
    const now = new Date(Date.now());
    const updatedForum = [
      await prisma.forum.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          image_large,
          image_small,
          updatedAt: now,
        },
      }),
    ];

    helper(updatedForum);

    return response200Handler(h, 'update', updatedForum[0]);
  }
  return response401Handler(h, 'author forum.');
};

const updateUpVote = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'update', 'thumbs up forum', 'id');
  }

  let { thumbs_up } = await prisma.forum.findUnique({
    where: {
      id,
    },
  });

  if (!thumbs_up) {
    return response404Handler(h, 'update', 'thumbs up forum', 'Id');
  }

  const forum = await prisma.forum.update({
    where: {
      id,
    },
    data: {
      thumbs_up: thumbs_up + 1,
    },
  });

  return response200Handler(h, 'update', forum);
};

const updateDownVote = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'update', 'thumbs down forum', 'id');
  }

  let { thumbs_down } = await prisma.forum.findUnique({
    where: {
      id,
    },
  });

  if (!thumbs_down) {
    return response404Handler(h, 'update', 'thumbs up forum', 'Id');
  }

  const forum = await prisma.forum.update({
    where: {
      id,
    },
    data: {
      thumbs_down: thumbs_down + 1,
    },
  });

  return response200Handler(h, 'update', forum);
};

const deleteForumById = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'delete', 'forum', 'id');
  }

  let deletedForum = await prisma.forum.findUnique({ where: { id } });

  if (!deletedForum) {
    return response404Handler(h, 'delete', 'forum', 'Id');
  }

  if (deletedForum.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author forum');
  }

  deletedForum = await prisma.forum.delete({
    where: {
      id,
    },
  });

  return response200Handler(h, 'delete', deletedForum);
};

const addForum = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { title, image } = request.payload;

  let dataImage;

  if (!title) {
    return response400Handler(h, 'add', 'forum', 'title');
  }

  if (validateImageExtension(image)) {
    if (image.hapi.filename) {
      dataImage = await saveImage(image, 'forum');
    }
  } else {
    return response400HandlerImage(h);
  }

  const createdForum = await prisma.forum.create({
    data: {
      title,
      authorId: requesterUser.data.id,
      image_large: dataImage?.data.large,
      image_small: dataImage?.data.small,
    },
  });

  return response201Handler(h, 'forum', createdForum);
};

module.exports = {
  getAllForum,
  getForumById,
  getAllForumWithOrderDate,
  getForumByCategories,
  getForumWithDiscussionById,
  updateForum,
  updateUpVote,
  updateDownVote,
  deleteForumById,
  addForum,
};
