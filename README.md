# Google TTS Microservice

A lightweight microservice that converts text to speech using Google's Text-to-Speech API. This service is built with Node.js and Express, containerized with Docker, and includes automatic deployment via GitHub Actions.

## Features

- Convert text to speech in multiple languages
- Support for long text (auto-splits text longer than 200 characters)
- Simple REST API
- Built-in test UI at `/test`
- Docker containerization
- Automatic HTTPS with Traefik
- CI/CD pipeline with GitHub Actions

## API Endpoints

### POST `/convert`

Converts text to speech.

**Request Body:**
```json
{
    "text": "Text to convert to speech",
    "lang": "en"  // Language code (default: "id")
}
```

**Response:**
```json
{
    "audio": "base64_encoded_audio_data"
}
```

**Supported Languages:**
- `id` - Indonesian
- `en` - English
- `ja` - Japanese
- `ko` - Korean

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/roffidaijoubu/microservice-google-tts.git
cd microservice-google-tts
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The service will be available at `http://localhost:3001`

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t roffidaijoubu/microservice-google-tts .
```

2. Run with docker-compose:
```bash
docker-compose up -d
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
```

## CI/CD Pipeline

The service uses GitHub Actions for continuous integration and deployment. On push to the main branch:

1. Builds the Docker image
2. Pushes to Docker Hub
3. Deploys to production server using Traefik for HTTPS and routing

Required GitHub Secrets:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `VPS_SSH_KEY`
- `VPS_USER`
- `VPS_HOST`

## Testing
Visit `/test` for a web interface to test the text-to-speech conversion.

## License
ISC

## Author
roffidaijoubu


This README includes:
1. Project overview
2. Features list
3. API documentation
4. Setup instructions for both local development and Docker
5. Environment variables
6. CI/CD information
7. Testing instructions
8. License and author information

Would you like me to make any adjustments to this README?
