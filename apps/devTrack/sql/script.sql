create extension if not exists "uuid-ossp";

CREATE TABLE users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  avatar_url text,
  create_at timestamp default now()
);

create table projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id),
  name text,
  description text,
  emoji text,
  motivation text,
  phase text,
  status text,
  github_repo_url text,
  stack jsonb,
  create_at timestamp default now()
);

create table devlogs (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id),
  log_date date,
  mood text,
  energy_level int,
  what_i_did text,
  next_step text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table blockers (
  id uuid primary key default uuid_generate_v4(),
  devlog_id uuid not null references devlogs(id),
  description text,
  status text,
  resolved_at date
);

create table commits (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id),
  devlog_id uuid not null references devlogs(id),
  sha text,
  message text,
  branch text,
  committed_at timestamp default now(),
  html_url text
);

select * from users;

insert into projects (user_id,name,description,)

drop table users;
drop table projects;
drop table devlogs;
drop table blockers;
drop table commits;