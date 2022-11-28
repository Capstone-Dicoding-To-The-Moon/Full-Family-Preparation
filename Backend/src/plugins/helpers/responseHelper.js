const keysMethod = {
  add: 'menambahkan',
  get: 'mendapatkan',
  update: 'memperbarui',
  delete: 'menghapus',
};

const successMethod = {
  get: 'didapatkan',
  update: 'diperbarui',
  delete: 'dihapus',
};

const responseHelper = (h, status, message, code, data = '') => {
  const response = h
    .response({
      status,
      message,
    })
    .code(code);
  if (Boolean(data)) {
    response.source.data = data;
  }
  return response;
};

const response200Handler = (h, action, data) => {
  return responseHelper(
    h,
    'success',
    `Data berhasil ${successMethod[action]}`,
    200,
    data,
  );
};

const response201Handler = (h, kategori, data) => {
  return responseHelper(
    h,
    'success',
    `${kategori} berhasil ditambahkan.`,
    201,
    data,
  );
};

const response400Handler = (h, action, kategori, penentu, message = null) => {
  const second = message ? message : `Mohon isi ${penentu} ${kategori}.`;
  return responseHelper(
    h,
    'failed',
    `Gagal ${keysMethod[action]} ${kategori}. ${second}`,
    400,
  );
};

const response400HandlerImage = (h) => {
  return responseHelper(
    h,
    'failed',
    'Gagal menambahkan gambar. Mohon memberikan gambar dengan ekstensi [jpg, jpeg, atau png]',
    400,
  );
};

const response401Handler = (h, penentu) => {
  return responseHelper(h, 'failed', `Unauthorized, invalid ${penentu}.`, 401);
};

const response404Handler = (h, action, kategori, penentu) => {
  return responseHelper(
    h,
    'failed',
    `Gagal ${keysMethod[action]} data ${kategori}. ${penentu} tidak ditemukan`,
    404,
  );
};

module.exports = {
  response200Handler,
  response201Handler,
  response400Handler,
  response400HandlerImage,
  response401Handler,
  response404Handler,
};
