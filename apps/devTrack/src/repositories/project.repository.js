const db = require('../databases/posgresql')();

const createProject = async projectData => {
  const {
    user_id,
    name,
    description,
    emoji,
    motivation,
    phase,
    status,
    github_repo_url,
    stack,
  } = projectData;

  const [project] = await db('projects')
    .insert({
      user_id,
      name,
      description,
      emoji: emoji || '📁',
      motivation,
      phase: phase || 'idea',
      status,
      github_repo_url,
      stack: JSON.stringify(stack || {}),
    })
    .returning('*');

  return project;
};

const findAll = async () => {
  return await db('projects').select('*');
};

const findByUserId = async userId => {
  return await db('projects').where('user_id', userId).select('*');
};

const findByProjectId = async ({ projectId, userId }) => {
  return await db('projects')
    .where({ id: projectId, user_id: userId })
    .select('*');
};

const findTotalProjectsByUserId = async userId => {
  const result = await db('projects')
    .where('user_id', userId)
    .count('id as total');
  return result[0].total;
};

module.exports = {
  findAll,
  findByUserId,
  createProject,
  findByProjectId,
  findTotalProjectsByUserId,
};
