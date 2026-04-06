const {
  projectService,
  devlogService,
  blockerService,
} = require('../services');

const getStats = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await projectService.getTotalProjectsByUserId(userId);
    const totalProjects = projects.length;

    const devlogsTotal = await devlogService.getDevlogsTotalByUserId(userId);
    const devlogStreak = await devlogService.getDevlogStreakByUserId(userId);
    const openBlockersTotal =
      await blockerService.getTotalOpenBlockersByUserId(userId);

    const streak = calcStreak(devlogStreak);

    res.json({
      totalProjects,
      devlogsTotal: Number(devlogsTotal) || 0,
      openBlockersTotal: Number(openBlockersTotal) || 0,
      streak,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

const getActivity = async (req, res) => {
  const userId = req.user.id;
  const weeks = Math.min(parseInt(req.query.weeks) || 20, 52);
  const date = new Date();
  date.setDate(date.getDate() - weeks * 7);
  try {
    const rows = await devlogService.getDevlogsActivityByUserId(
      userId,
      date.toISOString().split('T')[0],
    );
    const byDate = {};
    for (const row of rows) {
      const d = row.log_date;
      if (!byDate[d]) byDate[d] = { date: d, count: 0, energy: 0 };
      byDate[d].count++;
      byDate[d].energy += row.energy_level || 0;
    }
    res.json(Object.values(byDate));
  } catch (error) {
    console.error('Error fetching dashboard activity:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard activity' });
  }
};

const getTimeline = async (req, res) => {
  const userId = req.user.id;
  try {
    const timeline = await devlogService.getDevlogsTimelineByUserId(userId);
    res.json(timeline);
  } catch (error) {
    console.error('Error fetching dashboard timeline:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard timeline' });
  }
};

const getBlockers = async (req, res) => {
  const userId = req.user.id;
  try {
    const blockers = await blockerService.getAllOpenBlockersByUserId(userId);
    res.json(blockers);
  } catch (error) {
    console.error('Error fetching blockers:', error);
    res.status(500).json({ error: 'Failed to fetch blockers' });
  }
};

function calcStreak(dates) {
  if (!dates.length) return 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  // la racha solo cuenta si el último log es de hoy o ayer
  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (prev - curr) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

module.exports = {
  getStats,
  getActivity,
  getTimeline,
  getBlockers,
};
