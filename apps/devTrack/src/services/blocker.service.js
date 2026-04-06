const { blockersRepository } = require('../repositories');
const { assertDevlogOwner } = require('./devlog.service');

const createBlocker = async ({ devlogId, userId, ...blockerData }) => {
  try {
    const isOwner = await assertDevlogOwner({ devlogId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const blocker = await blockersRepository.createBlocker({
      devlogId,
      ...blockerData,
    });
    return blocker;
  } catch (error) {
    console.error('Error creating blocker:', error);
    throw error;
  }
};

const updateBlocker = async ({
  blockerId,
  projectId,
  userId,
  ...blockerData
}) => {
  try {
    const isOwner = await assertProjectOwner({ projectId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    const blocker = await blockersRepository.updateBlocker(
      blockerId,
      blockerData,
    );
    return blocker;
  } catch (error) {
    console.error('Error updating blocker:', error);
    throw error;
  }
};

const deleteBlocker = async ({ blockerId, projectId, userId }) => {
  try {
    const isOwner = await assertProjectOwner({ projectId, userId });
    if (!isOwner) {
      throw new Error('Access denied: User is not the owner of the project');
    }
    await blockersRepository.deleteBlocker(blockerId);
  } catch (error) {
    console.error('Error deleting blocker:', error);
    throw error;
  }
};

const getTotalOpenBlockersByUserId = async userId => {
  try {
    const total =
      await blockersRepository.findTotalOpenBlockersByUserId(userId);
    return total;
  } catch (error) {
    console.error('Error fetching total open blockers by user ID:', error);
    throw error;
  }
};

const getAllOpenBlockersByUserId = async userId => {
  try {
    const blockers =
      await blockersRepository.findAllOpenBlockersByUserId(userId);
    return blockers;
  } catch (error) {
    console.error('Error fetching all open blockers by user ID:', error);
    throw error;
  }
};

module.exports = {
  createBlocker,
  updateBlocker,
  deleteBlocker,
  getTotalOpenBlockersByUserId,
  getAllOpenBlockersByUserId,
};
