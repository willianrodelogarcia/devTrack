const db = require('../databases/posgresql')();

const createDevlog = async devlogData => {
  return await db('devlogs')
    .insert(devlogData)
    .onConflict(['project_id', 'log_date'])
    .merge([
      'mood',
      'energy_level',
      'what_i_did',
      'next_steps',
      'work_types',
      'updated_at',
    ])
    .returning('*');
};

const findAll = async () => {
  return await db('devlogs').select('*');
};

const findByProjectId = async projectId => {
  return await db('devlogs').select('*').where('project_id', projectId);
};

const findById = async devlogId => {
  return await db('devlogs').select('*').where('id', devlogId).first();
};

const findByProjectIdAndDate = async (projectId, date) => {
  return await db('devlogs')
    .select('*')
    .where('project_id', projectId)
    .andWhere(db.raw('DATE(created_at) = ?', [date]))
    .first();
};

const updateDevlog = async (devlogId, devlogData) => {
  return await db('devlogs')
    .where('id', devlogId)
    .update(devlogData)
    .returning('*');
};

const findDevlogByIdAndProjectUserId = async (devlogId, userId) => {
  return await db('devlogs')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where({ 'devlogs.id': devlogId, 'projects.user_id': userId })
    .first();
};

const findDevlogsTotalByUserId = async userId => {
  const result = await db('devlogs')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where('projects.user_id', userId)
    .count('devlogs.id as total');
  return result[0].total;
};

const findDevlogStreakByUserId = async userId => {
  const result = await db('devlogs')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where('projects.user_id', userId)
    .orderBy('devlogs.log_date', 'desc')
    .pluck('devlogs.log_date');
  return result;
};

const findDevlogsActivityByUserId = async (userId, date) => {
  const result = await db('devlogs')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where('projects.user_id', userId)
    .where('devlogs.log_date', '>=', date)
    .select('devlogs.log_date', 'devlogs.energy_level', 'devlogs.mood')
    .orderBy('devlogs.log_date', 'asc');
  return result;
};

const findDevlogsTimelineByUserId = async userId => {
  const result = await db('devlogs')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where('projects.user_id', userId)
    .select(
      'devlogs.id',
      'devlogs.log_date',
      'devlogs.mood',
      'devlogs.energy_level',
      'devlogs.what_i_did',
      'projects.id as project_id',
      'projects.name as project_name',
      'projects.emoji as project_emoji',
    )
    .orderBy('devlogs.log_date', 'desc')
    .limit(30);
  return result;
};

module.exports = {
  findAll,
  findByProjectId,
  findById,
  findByProjectIdAndDate,
  createDevlog,
  updateDevlog,
  findDevlogByIdAndProjectUserId,
  findDevlogsTotalByUserId,
  findDevlogStreakByUserId,
  findDevlogsActivityByUserId,
  findDevlogsTimelineByUserId,
};
