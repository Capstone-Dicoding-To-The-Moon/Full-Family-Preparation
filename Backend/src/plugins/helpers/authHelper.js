const Jwt = require('@hapi/jwt');

const getToken = (userId) => {
  const token = Jwt.token.generate(
    {
      aud: 'family_preparation_aud',
      iss: 'family_preparation_iss',
      sub: 'family_preparation_sub',
      user: userId,
      group: 'family_preparatioon_group',
    },
    {
      key: 'secret_shared_many',
    },
    {
      ttlSec: 24 * 60 * 60, // 4 hours
    },
  );

  return token;
};

module.exports = { getToken };
