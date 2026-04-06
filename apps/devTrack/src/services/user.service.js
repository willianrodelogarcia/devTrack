const { userRepository } = require('../repositories');

const createUser = async user => {
  try {
    const newUser = await userRepository.createUser(user);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const getUser = async () => {
  try {
    const users = await userRepository.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const syncUser = async user => {
  try {
    const syncedUser = await userRepository.syncUser(user);
    return syncedUser;
  } catch (error) {
    console.error('Error syncing user:', error);
  }
};

const getUserById = async id => {
  try {
    const user = await userRepository.findById(id);
    return user;
  } catch (error) {
    console.error('Error fetching user by id:', error);
  }
};

module.exports = {
  createUser,
  getUser,
  syncUser,
  getUserById,
};
