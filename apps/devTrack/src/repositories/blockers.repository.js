const db = require('../databases/posgresql')();

const createBlocker = async blockerData => {
  return await db('blockers').insert(blockerData).returning('*');
};

const findAll = async () => {
  return await db('blockers').select('*');
};

const findByDevlogId = async devlogId => {
  return await db('blockers').select('*').where('devlog_id', devlogId);
};

const updateBlocker = async (blockerId, blockerData) => {
  return await db('blockers')
    .where('id', blockerId)
    .update(blockerData)
    .returning('*');
};

const deleteBlocker = async blockerId => {
  return await db('blockers').where('id', blockerId).del();
};

const findTotalOpenBlockersByUserId = async userId => {
  const result = await db('blockers')
    .join('devlogs', 'blockers.devlog_id', 'devlogs.id')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where({ 'projects.user_id': userId, 'blockers.status': 'open' })
    .count('blockers.id as total');
  return result[0].total;
};

const findAllOpenBlockersByUserId = async userId => {
  return await db('blockers')
    .join('devlogs', 'blockers.devlog_id', 'devlogs.id')
    .join('projects', 'devlogs.project_id', 'projects.id')
    .where('projects.user_id', userId)
    .where('blockers.status', 'open')
    .select(
      'blockers.id',
      'blockers.description',
      'blockers.created_at',
      'devlogs.log_date',
      'projects.id as project_id',
      'projects.name as project_name',
      'projects.emoji as project_emoji',
    )
    .orderBy('blockers.created_at', 'asc');
};

module.exports = {
  findAll,
  findByDevlogId,
  createBlocker,
  updateBlocker,
  deleteBlocker,
  findTotalOpenBlockersByUserId,
  findAllOpenBlockersByUserId,
};
