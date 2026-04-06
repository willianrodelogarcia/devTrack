const { projectService } = require('../services');

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProjectByUserId = async (req, res) => {
  const id = req.user?.id;
  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    const projects = await projectService.getProjectsByUserId(id);
    res.json({ projects });
  } catch (error) {
    console.error('Error fetching projects by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const createProject = async (req, res) => {
  const { id: userId } = req.user;
  const {
    name,
    description,
    emoji,
    motivation,
    phase,
    status,
    github_repo_url,
    stack,
  } = req.body;

  const projectData = {
    name,
    description,
    emoji,
    motivation,
    phase,
    status,
    github_repo_url,
    stack,
    user_id: userId,
  };

  try {
    const project = await projectService.createProject(projectData);
    res.status(201).json({ project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

const getProjectById = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;

  try {
    const project = await projectService.getProjectByProjectId({
      projectId,
      userId,
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ project });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

module.exports = {
  getAllProjects,
  getProjectByUserId,
  createProject,
  getProjectById,
};
