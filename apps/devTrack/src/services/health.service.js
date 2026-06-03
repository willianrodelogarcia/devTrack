const { healthRepository } = require('../repositories');

const checkHealth = async () => {
  try {
    const healthStatus = await healthRepository.checkHealth();
    return healthStatus;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

module.exports = {
  checkHealth,
};
