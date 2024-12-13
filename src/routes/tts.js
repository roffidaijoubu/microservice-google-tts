const express = require('express');
const router = express.Router();
const { convertTextToSpeech } = require('../services/ttsService');

router.post('/', async (req, res) => {
  try {
    const { text, lang = 'id' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioBase64 = await convertTextToSpeech(text, lang);
    return res.json({ audio: audioBase64 });
  } catch (error) {
    console.error('TTS Error:', error);
    return res.status(500).json({ error: 'Failed to convert text to speech' });
  }
});

module.exports = router; 