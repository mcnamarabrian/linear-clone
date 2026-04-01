import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = parseInt(process.env.PORT || "4000", 10);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "error" });
  }
});

// List all issues
app.get("/api/issues", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// Get single issue
app.get("/api/issues/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issue" });
  }
});

// Create issue
app.post("/api/issues", async (req, res) => {
  const { title, description, status, priority, assignee, label } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO issues (title, description, status, priority, assignee, label)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        description || "",
        status || "backlog",
        priority || "no_priority",
        assignee || null,
        label || null,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// Update issue
app.patch("/api/issues/:id", async (req, res) => {
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const key of ["title", "description", "status", "priority", "assignee", "label"]) {
    if (req.body[key] !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(req.body[key]);
      idx++;
    }
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(req.params.id);
  try {
    const result = await pool.query(
      `UPDATE issues SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update issue" });
  }
});

// Delete issue
app.delete("/api/issues/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM issues WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete issue" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
