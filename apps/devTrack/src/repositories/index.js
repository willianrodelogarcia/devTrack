const userRepository = require('./user.repository');
const projectRepository = require('./project.repository');
const devlogsRepository = require('./devlogs.repository');
const blockersRepository = require('./blockers.repository');
const healthRepository = require('./health.repository');

module.exports = {
  userRepository,
  projectRepository,
  devlogsRepository,
  blockersRepository,
  healthRepository,
};
