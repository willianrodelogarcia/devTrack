const db = require('../databases/posgresql')();

const createUser = async userData => {
  const { id, email, name, avatar_url } = userData;
  const [user] = await db('users')
    .insert({
      id,
      email,
      name,
      avatar_url,
    })
    .returning('*');
  return user;
};

const findAll = async () => {
  return await db('users').select('*');
};

const syncUser = async userData => {
  const { id, email, user_metadata: metadata } = userData;
  const [user] = await db('users')
    .insert({
      id,
      email,
      name: metadata.full_name,
      avatar_url: metadata.avatar_url,
    })
    .onConflict('id')
    .merge(['email', 'name', 'avatar_url'])
    .returning('*');
  return user;
};

const findById = async id => {
  return await db('users').where({ id }).first();
};

module.exports = {
  createUser,
  findAll,
  syncUser,
  findById,
};
