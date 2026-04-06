const { userService } = require('../services');

const createUser = async (req, res) => {
  const { id: userId, email, name, avatar_url } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const user = await userService.createUser({
    id: userId,
    email,
    name,
    avatar_url:
      avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
  });
  res.status(201).json({ user });
};

const getUser = async (req, res) => {
  const users = await userService.getUser();
  res.json({ users });
};

const syncUser = async (req, res) => {
  const { id, email, user_metadata } = req.user;

  const user = await userService.syncUser({ id, email, ...user_metadata });
  res.json({ user });
};

const getUserById = async (req, res) => {
  const { id } = req.user;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user });
};

module.exports = {
  createUser,
  getUser,
  syncUser,
  getUserById,
};
