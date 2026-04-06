import { createSupabaseBrowserClient } from './supabase';

async function getTocken() {
  const supabase = createSupabaseBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token;
}

async function apiFetch(path, options = {}) {
  const token = await getTocken();
  const baseUrl = import.meta.env.PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || 'Unknown error');
  }

  if (res.status === 204) {
    return res.json();
  }
}

export const api = {
  projects: {
    list: () => apiFetch('/projects'),
    listByUser: () => apiFetch('/projects/user'),
    create: data =>
      apiFetch('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: projectId => apiFetch(`/projects/${projectId}`),
  },
  users: {
    list: () => apiFetch('/users'),
    sync: () => apiFetch('/users/sync', { method: 'POST' }),
    getMe: () => apiFetch('/users/me'),
  },
  devlogs: {
    list: projectId => apiFetch(`/devlogs/project?projectId=${projectId}`),
    get: id => apiFetch(`/devlogs/${id}`),
    create: data =>
      apiFetch('/devlogs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiFetch(`/devlogs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  blockers: {
    create: data =>
      apiFetch('/blockers', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiFetch(`/blockers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  dashboard: {
    stats: () => apiFetch('/api/dashboard/stats'),
    activity: (weeks = 20) =>
      apiFetch(`/api/dashboard/activity?weeks=${weeks}`),
    timeline: () => apiFetch('/api/dashboard/timeline'),
    blockers: () => apiFetch('/api/dashboard/blockers'),
  },
};
