const { devlogService } = require('../services');

const createDevlog = async (req, res) => {
  const { id: userId } = req.user;
  const { project_id, log_date, mood, energy_level, what_i_did, next_steps } =
    req.body;

  if (!project_id) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    const devlog = await devlogService.createDevlog({
      project_id,
      log_date,
      mood,
      energy_level,
      what_i_did,
      next_steps,
      userId,
    });
    res.status(201).json(devlog);
  } catch (error) {
    console.error('Error creating devlog:', error);
    res.status(500).json({ error: 'Failed to create devlog' });
  }
};

const getAllDevlogs = async (req, res) => {
  try {
    const devlogs = await devlogService.getAllDevlogs();
    res.json(devlogs);
  } catch (error) {
    console.error('Error fetching devlogs:', error);
    res.status(500).json({ error: 'Failed to fetch devlogs' });
  }
};

const getDevlogsByProjectId = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  try {
    const devlogs = await devlogService.getDevlogsByProjectId({
      projectId,
      userId,
    });
    res.json(devlogs);
  } catch (error) {
    console.error('Error fetching devlogs by project ID:', error);
    res.status(500).json({ error: 'Failed to fetch devlogs' });
  }
};

const getDevlogTodayByProjectId = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  try {
    const devlog = await devlogService.getDevlogsTodayByProjectId({
      projectId,
      userId,
    });
    res.json(devlog);
  } catch (error) {
    console.error("Error fetching today's devlog by project ID:", error);
    res.status(500).json({ error: "Failed to fetch today's devlog" });
  }
};

const updateDevlog = async (req, res) => {
  const { devlogId } = req.params;
  const { mood, energy_level, what_i_did, next_steps } = req.body;
  const userId = req.user.id;

  try {
    const updatedDevlog = await devlogService.updateDevlog({
      devlogId,
      userId,
      mood,
      energy_level,
      what_i_did,
      next_steps,
    });
    res.json(updatedDevlog);
  } catch (error) {
    console.error('Error updating devlog:', error);
    res.status(500).json({ error: 'Failed to update devlog' });
  }
};

module.exports = {
  getAllDevlogs,
  getDevlogsByProjectId,
  getDevlogTodayByProjectId,
  createDevlog,
  updateDevlog,
};
