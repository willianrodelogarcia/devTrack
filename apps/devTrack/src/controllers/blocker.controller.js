const { blockerService } = require('../services');

const createBlocker = async (req, res) => {
  const { devlogId, description } = req.body;
  const userId = req.user.id;

  if (!devlogId || !description) {
    return res
      .status(400)
      .json({ error: 'Devlog ID and description are required' });
  }

  try {
    const blocker = await blockerService.createBlocker({
      devlogId,
      userId,
      description,
    });
    res.status(201).json(blocker);
  } catch (error) {
    console.error('Error creating blocker:', error);
    res.status(500).json({ error: 'Failed to create blocker' });
  }
};

const updateBlocker = async (req, res) => {
  const { blockerId } = req.params;
  const { devlogId, description } = req.body;
  const userId = req.user.id;

  if (!devlogId || !description) {
    return res
      .status(400)
      .json({ error: 'Devlog ID and description are required' });
  }

  try {
    const blocker = await blockerService.updateBlocker({
      blockerId,
      devlogId,
      userId,
      description,
    });
    res.json(blocker);
  } catch (error) {
    console.error('Error updating blocker:', error);
    res.status(500).json({ error: 'Failed to update blocker' });
  }
};

module.exports = {
  createBlocker,
  updateBlocker,
};
