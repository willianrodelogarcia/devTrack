const { devlogsRepository, blockersRepository } = require('../repositories');
const { assertProjectOwner } = require('./project.service');

const createDevlog = async devlogData => {
  const {
    project_id: projectId,
    userId,
    mood,
    energy_level,
    what_i_did,
    next_steps,
    log_date,
  } = devlogData;
  try {
    const isOwner = await assertProjectOwner({ projectId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const devLogMap = {
      project_id: projectId,
      mood,
      energy_level,
      what_i_did,
      next_steps,
    };
    const date = log_date || new Date().toISOString().split('T')[0];
    const devlog = await devlogsRepository.createDevlog({
      devLogMap,
      log_date: date,
    });
    return devlog;
  } catch (error) {
    console.error('Error creating devlog:', error);
    throw error;
  }
};

const getAllDevlogs = async () => {
  try {
    const devlogs = await devlogsRepository.findAll();
    return devlogs;
  } catch (error) {
    console.error('Error fetching devlogs:', error);
    throw error;
  }
};

const getDevlogsByProjectId = async ({ projectId, userId }) => {
  try {
    const isOwner = await assertProjectOwner({ projectId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const devlogs = await devlogsRepository.findByProjectId(projectId);
    return devlogs;
  } catch (error) {
    console.error('Error fetching devlogs by project ID:', error);
    throw error;
  }
};

const getDevlogsById = async ({ devlogId, userId }) => {
  try {
    const devlog = await devlogsRepository.findById(devlogId);
    if (!devlog) {
      throw new Error('Devlog not found');
    }
    const isOwner = await assertProjectOwner({
      projectId: devlog.project_id,
      userId,
    });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const blockers = await blockersRepository.findByDevlogId(devlogId);
    return { ...devlog, blockers };
  } catch (error) {
    console.error('Error fetching devlog by ID:', error);
    throw error;
  }
};

const getDevlogsTodayByProjectId = async ({ projectId, userId }) => {
  try {
    const isOwner = await assertProjectOwner({ projectId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const today = new Date().toISOString().split('T')[0];
    const devlog = await devlogsRepository.findByProjectIdAndDate(
      projectId,
      today,
    );
    if (!devlog) {
      return null;
    }
    const blockers = await blockersRepository.findByDevlogId(devlog.id);
    return { ...devlog, blockers };
  } catch (error) {
    console.error("Error fetching today's devlogs by project ID:", error);
    throw error;
  }
};

const updateDevlog = async ({ devlogId, userId, ...updateData }) => {
  try {
    const devlog = await devlogsRepository.findById(devlogId);
    if (!devlog) {
      throw new Error('Devlog not found');
    }
    const isOwner = await assertProjectOwner({
      projectId: devlog.project_id,
      userId,
    });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const updatedDevlog = await devlogsRepository.updateDevlog({
      ...devlog,
      ...updateData,
      id: devlogId,
    });
    return updatedDevlog;
  } catch (error) {
    console.error('Error updating devlog:', error);
    throw error;
  }
};

const getDevlogByIdAndProjectUserId = async ({ devlogId, userId }) => {
  try {
    const devlog = await devlogsRepository.findDevlogByIdAndProjectUserId({
      devlogId,
      userId,
    });
    return devlog;
  } catch (error) {
    console.error('Error fetching devlog by ID and project user ID:', error);
    throw error;
  }
};

const assertDevlogOwner = async ({ devlogId, userId }) => {
  const devlog = await getDevlogByIdAndProjectUserId({ devlogId, userId });
  if (!devlog) {
    throw new Error('Devlog not found or access denied');
  }
  return !!devlog;
};

const getDevlogsTotalByUserId = async userId => {
  try {
    const total = await devlogsRepository.findDevlogsTotalByUserId(userId);
    return total;
  } catch (error) {
    console.error('Error fetching total devlogs by user ID:', error);
    throw error;
  }
};

const getDevlogStreakByUserId = async userId => {
  try {
    const streak = await devlogsRepository.findDevlogStreakByUserId(userId);
    return streak;
  } catch (error) {
    console.error('Error fetching devlog streak by user ID:', error);
    throw error;
  }
};

const getDevlogsActivityByUserId = async (userId, date) => {
  try {
    const activity = await devlogsRepository.findDevlogsActivityByUserId(
      userId,
      date,
    );
    return activity;
  } catch (error) {
    console.error('Error fetching devlogs activity by user ID:', error);
    throw error;
  }
};

const getDevlogsTimelineByUserId = async userId => {
  try {
    const timeline =
      await devlogsRepository.findDevlogsTimelineByUserId(userId);
    return timeline;
  } catch (error) {
    console.error('Error fetching devlogs timeline by user ID:', error);
    throw error;
  }
};

module.exports = {
  createDevlog,
  getAllDevlogs,
  getDevlogsByProjectId,
  updateDevlog,
  getDevlogsById,
  getDevlogsTodayByProjectId,
  getDevlogByIdAndProjectUserId,
  assertDevlogOwner,
  getDevlogsTotalByUserId,
  getDevlogStreakByUserId,
  getDevlogsActivityByUserId,
  getDevlogsTimelineByUserId,
};
