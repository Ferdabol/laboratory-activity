const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for comments
let commentsDB = {};

// POST comment
app.post("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.headers.authorization?.split(" ")[1]; // simple token example

  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (!content) return res.status(400).json({ error: "Empty comment" });

  const newComment = {
    id: Date.now().toString(),
    postId,
    content,
    userId,
    createdAt: new Date().toISOString(),
  };

  if (!commentsDB[postId]) commentsDB[postId] = [];
  commentsDB[postId].push(newComment);

  res.status(201).json(newComment);
});

// GET comments
app.get("/api/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  res.json(commentsDB[postId] || []);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
