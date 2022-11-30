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

const getAllPost = async (request, h) => {
  const { prisma } = request.server.app;
  const post = await prisma.post.findMany({
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

  helper(post);

  return response200Handler(h, 'get', post);
};

const getPostById = async (request, h) => {
  const { prisma } = request.server.app;
  const { id } = request.params;

  if (!id) {
    return response400Handler(h, 'get', 'post', 'id');
  }

  const postById = [
    await prisma.post.findUnique({
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

  if (!postById) {
    return response404Handler(h, 'get', 'post', 'Id');
  }

  helper(postById);

  return response200Handler(h, 'get', postById[0]);
};

const getPostWithCommentById = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'post', 'id');
  }

  const data = await prisma.post.findUnique({
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
  });

  if (!data) {
    return response404Handler(h, 'get', 'post', 'Id');
  }

  const postCommentById = [data];

  const komentar_post = await prisma.komentarPost.findMany({
    where: {
      postId: id,
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

  helper(postCommentById);
  helper(komentar_post);

  postCommentById[0].komentar = komentar_post;

  return response200Handler(h, 'get', postCommentById[0]);
};

const getAllPostWithOrderDate = async (request, h) => {
  const { prisma } = request.server.app;
  const postWithOrderDate = await prisma.post.findMany({
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

  helper(postWithOrderDate);

  return response200Handler(h, 'get', postWithOrderDate);
};

const getPostByCategories = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.params.id, 10);

  if (!id) {
    return response400Handler(h, 'get', 'post', 'id');
  }

  const postByCategories = await prisma.post.findMany({
    where: {
      kategori_post: {
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
    },
  });

  if (postByCategories.length < 1) {
    return response404Handler(h, 'get', 'post', 'Id');
  }

  helper(postByCategories);

  return response200Handler(h, 'get', postByCategories);
};

const updatePost = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'update');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { id, title, content, oldImage, newImage } = request.payload;

  if (!id) {
    return response400Handler(h, 'update', 'post', 'id');
  }

  if (!title) {
    return response400Handler(h, 'update', 'post', 'title');
  }

  if (!content) {
    return response400Handler(h, 'update', 'post', 'content');
  }

  const postNow = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      authorId: true,
      image_large: true,
      image_small: true,
    },
  });

  if (!postNow) {
    return response404Handler(h, 'update', 'post', 'Id');
  }

  let image_large = postNow.image_large;
  let image_small = postNow.image_small;

  if (oldImage !== newImage.hapi.filename) {
    deleteSavedImage(image_large, image_small);

    const dataImage = saveImage(newImage, 'post');
    image_large = dataImage.data.large;
    image_small = dataImage.data.small;
  }

  if (postNow.authorId == requesterUser.data.id) {
    const now = new Date(Date.now());
    const updatedPost = [
      await prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          content,
          image_large,
          image_small,
          updatedAt: now,
        },
      }),
    ];

    helper(updatedPost);

    return response200Handler(h, 'update', updatedPost[0]);
  }
  return response401Handler(h, 'author post.');
};

const updateUpVote = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'update', 'thumbs up post', 'id');
  }

  let { thumbs_up } = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!thumbs_up) {
    return response404Handler(h, 'update', 'thumbs up post', 'Id');
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      thumbs_up: thumbs_up + 1,
    },
  });

  return response200Handler(h, 'update', post);
};

const updateDownVote = async (request, h) => {
  const { prisma } = request.server.app;
  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'update', 'thumbs down post', 'id');
  }

  let { thumbs_down } = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!thumbs_down) {
    return response404Handler(h, 'update', 'thumbs up forum', 'Id');
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      thumbs_down: thumbs_down + 1,
    },
  });

  return response200Handler(h, 'update', post);
};

const deletePostById = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'delete');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const id = parseInt(request.payload.id, 10);

  if (!id) {
    return response400Handler(h, 'delete', 'post', 'id');
  }

  let deletedPost = await prisma.post.findUnique({ where: { id } });

  if (!deletedPost) {
    return response404Handler(h, 'delete', 'post', 'Id');
  }

  if (deletedPost.authorId != requesterUser.data.id) {
    return response401Handler(h, 'author post');
  }

  deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });

  return response200Handler(h, 'delete', deletedPost);
};

const addPost = async (request, h) => {
  const { userId: uId } = request.auth.credentials;
  const { prisma } = request.server.app;

  const requesterUser = await userChecker(prisma, h, uId, 'add');
  if (requesterUser.error) {
    return requesterUser.dataError;
  }

  const { title, content, image } = request.payload;

  let dataImage;

  if (!title) {
    return response400Handler(h, 'add', 'post', 'title');
  }

  if (!content) {
    return response400Handler(h, 'add', 'post', 'content');
  }

  if (validateImageExtension(image)) {
    if (image.hapi.filename) {
      dataImage = await saveImage(image, 'post');
    }
  } else {
    return response400HandlerImage(h);
  }

  const createdPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: requesterUser.data.id,
      image_large: dataImage?.data.large,
      image_small: dataImage?.data.small,
    },
  });

  return response201Handler(h, 'post', createdPost);
};

module.exports = {
  getAllPost,
  getPostById,
  getPostWithCommentById,
  getAllPostWithOrderDate,
  getPostByCategories,
  updatePost,
  updateUpVote,
  updateDownVote,
  deletePostById,
  addPost,
};
