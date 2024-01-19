// Create web server
// ----------------
// Imports
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Comments storage
const commentsByPostId = {};

// Routes
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
    console.log('Listening on 4001');
});