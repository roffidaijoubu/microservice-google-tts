const googleTTS = require('google-tts-api');

const convertTextToSpeech = async (text, lang) => {
  try {
    // For texts longer than 200 characters
    if (text.length > 200) {
      const results = await googleTTS.getAllAudioBase64(text, {
        lang,
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
        splitPunct: ',.?'
      });
      
      // Combine all base64 audio segments
      return results.map(result => result.base64).join('');
    }
    
    // For shorter texts
    const base64 = await googleTTS.getAudioBase64(text, {
      lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000
    });
    
    return base64;
  } catch (error) {
    console.error('TTS Service Error:', error);
    throw error;
  }
};

module.exports = { convertTextToSpeech }; 