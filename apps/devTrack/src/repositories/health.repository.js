const db = require('../databases/posgresql')();

const checkHealth = async () => {
  try {
    await db.raw('SELECT 1');
    return { status: 'OK' };
  } catch (error) {
    console.error('Database connection error:', error);
    return { status: 'ERROR', error: 'Database connection failed' };
  }
};

module.exports = {
  checkHealth,
};
