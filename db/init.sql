CREATE TYPE issue_status AS ENUM ('backlog', 'todo', 'in_progress', 'done', 'cancelled');
CREATE TYPE issue_priority AS ENUM ('no_priority', 'urgent', 'high', 'medium', 'low');

CREATE TABLE issues (
  id            SERIAL PRIMARY KEY,
  identifier    TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  description   TEXT DEFAULT '',
  status        issue_status NOT NULL DEFAULT 'todo',
  priority      issue_priority NOT NULL DEFAULT 'no_priority',
  assignee      TEXT DEFAULT NULL,
  label         TEXT DEFAULT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate identifier like MC-1, MC-2, etc.
CREATE OR REPLACE FUNCTION set_issue_identifier()
RETURNS TRIGGER AS $$
BEGIN
  NEW.identifier := 'MC-' || NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_identifier
  BEFORE INSERT ON issues
  FOR EACH ROW
  EXECUTE FUNCTION set_issue_identifier();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed data
INSERT INTO issues (title, description, status, priority) VALUES
  ('Get familiar with Linear', E'Welcome to Linear!\n\nWatch an introductory video and access a list of resources below.', 'todo', 'no_priority'),
  ('Set up your teams', 'Organize your workspace by creating teams for different groups.', 'todo', 'no_priority'),
  ('Connect your tools', 'Integrate Linear with your existing development tools.', 'todo', 'no_priority'),
  ('Import your data', 'Migrate your existing issues and projects into Linear.', 'todo', 'no_priority');
