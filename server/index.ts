import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'CreatorAI Neural Engine v4.8.2',
    cudaCluster: 'Active (4x H100)',
    time: new Date().toISOString()
  });
});

// --- Authentication Endpoints ---
app.post('/api/auth/signin', (req, res) => {
  const { name, email, handle } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = db.createUser(name, handle || name.toLowerCase().replace(/\s+/g, ''), email);
  res.json({
    success: true,
    user
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, handle } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = db.createUser(name, handle || name.toLowerCase().replace(/\s+/g, ''), email);
  res.json({
    success: true,
    user
  });
});

// --- Projects Endpoints ---
app.get('/api/projects', (req, res) => {
  const projects = db.getProjects();
  res.json({ projects });
});

app.post('/api/projects', (req, res) => {
  const { title, duration } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Project title is required' });
  }

  const project = db.createProject(title, duration);
  res.status(201).json({ project });
});

// --- Neural Analysis Pipeline Endpoints ---
app.post('/api/analysis/start', (req, res) => {
  const { projectId = 'proj-1' } = req.body;
  const job = db.createJob(projectId);
  res.json({
    success: true,
    jobId: job.jobId,
    job
  });
});

app.get('/api/analysis/status/:jobId', (req, res) => {
  const job = db.getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Analysis job not found' });
  }
  res.json({ job });
});

// --- Clips Endpoints ---
app.get('/api/clips', (req, res) => {
  const clips = db.getClips();
  res.json({ clips });
});

app.put('/api/clips/:id', (req, res) => {
  const updated = db.updateClip(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Clip not found' });
  }
  res.json({ success: true, clip: updated });
});

// --- Repurposing Endpoints ---
app.get('/api/repurpose', (req, res) => {
  const pieces = db.getRepurposed();
  res.json({ pieces });
});

app.put('/api/repurpose/:id', (req, res) => {
  const updated = db.updateRepurposed(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Repurposed card not found' });
  }
  res.json({ success: true, piece: updated });
});

// --- Script Generation Endpoint ---
app.post('/api/scripts/generate', (req, res) => {
  const { topic = 'AI in software development', format = '60s Viral Short' } = req.body;
  
  const script = `[00:00 - 00:03 HOOK]
(Camera punches in, serious tone)
"If your current job is typing boilerplate code into an IDE... you need to see this."

[00:03 - 00:15 THE CONTRARIAN TRUTH]
"Here's what nobody in tech admits out loud:
LLMs don't get tired. They don't misplace semicolons.
And autonomous agents can now architect services faster than you can switch tabs."

[00:15 - 00:35 ARCHITECTURE > SYNTAX]
"The engineers who thrive aren't the fastest typists.
They're the ones who orchestrate models, state boundaries, and feedback loops.
Topic: ${topic}."

[00:35 - 00:45 CALL TO ACTION]
"Save this breakdown for your next technical sprint.
Follow for weekly breakdowns of the new AI engineering paradigm."`;

  res.json({
    success: true,
    script,
    pacingWpm: 154,
    predictedRetention: 86.4,
    format
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`⚡ CreatorAI Neural Engine Backend is RUNNING!`);
  console.log(`📡 URL: http://127.0.0.1:${PORT}`);
  console.log(`🩺 Healthcheck: http://127.0.0.1:${PORT}/api/health`);
  console.log(`===============================================`);
});
