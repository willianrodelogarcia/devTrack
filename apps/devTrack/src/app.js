const express = require('express');
const cors = require('cors');
const { PORT, ALLOWED_ORIGIN } = process.env;
const {
  userRouter,
  projectRouter,
  devlogRouter,
  blockerRouter,
  dashboardRouter,
} = require('./routers');

const app = express();

const start = async () => {
  app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
  app.use(express.json());

  app.use('/api/users', userRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/devlogs', devlogRouter);
  app.use('/api/blockers', blockerRouter);
  app.use('/api/dashboard', dashboardRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = start;
