const { DATABASE_URL } = process.env;

module.exports = {
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: { min: 1, max: 10 },
  },
};
