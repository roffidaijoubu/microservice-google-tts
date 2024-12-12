const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ttsRouter = require('./routes/tts');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tts', ttsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 