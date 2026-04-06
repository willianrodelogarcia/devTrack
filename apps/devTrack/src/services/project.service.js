const { projectRepository } = require('../repositories');

const createProject = async projectData => {
  try {
    const project = await projectRepository.createProject(projectData);
    return project;
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

const getProjects = async () => {
  try {
    const projects = await projectRepository.findAll();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

const getProjectsByUserId = async userId => {
  try {
    const projects = await projectRepository.findByUserId(userId);
    return projects;
  } catch (error) {
    console.error('Error fetching projects by user ID:', error);
  }
};

const getProjectByProjectId = async ({ projectId, userId }) => {
  try {
    const project = await projectRepository.findByProjectId({
      projectId,
      userId,
    });
    return project;
  } catch (error) {
    console.error('Error fetching project by project ID:', error);
  }
};

const assertProjectOwner = async ({ projectId, userId }) => {
  const project = await getProjectByProjectId({ projectId, userId });
  if (!project) {
    throw new Error('Project not found or access denied');
  }
  return !!project;
};

const getTotalProjectsByUserId = async userId => {
  try {
    const total = await projectRepository.findTotalProjectsByUserId(userId);
    return total;
  } catch (error) {
    console.error('Error fetching total projects by user ID:', error);
    throw error;
  }
};

module.exports = {
  getProjects,
  getProjectsByUserId,
  createProject,
  getProjectByProjectId,
  assertProjectOwner,
  getTotalProjectsByUserId,
};
