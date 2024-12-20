const express = require('express');
const fs = require('fs')
const ngrok = require('ngrok');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the videos
app.use(express.static(path.join(__dirname, 'public')));

const videoFiles = fs.readdirSync(path.join(__dirname, 'public')).filter(file => file.endsWith('.mp4'));

// Get the list of videos
app.get('/api/videos', (req, res) => {
    res.json(videoFiles);
});

// Video routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  // Connect ngrok and get the public URL
  const url = await ngrok.connect(PORT);
  console.log(`ngrok tunnel opened at: ${url}`);
});

