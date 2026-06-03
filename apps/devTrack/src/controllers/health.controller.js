const { healthService } = require('../services');

const checkHealth = async (req, res) => {
  try {
    const healthStatus = await healthService.checkHealth();
    res.json(healthStatus);
  } catch (error) {
    console.error('Error checking health:', error);
    res.status(500).json({ status: 'ERROR', error: 'Failed to check health' });
  }
};

module.exports = {
  checkHealth,
};
