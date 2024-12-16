<h1 align="center">Google TTS Microservice</h1>
<div align="center">
<img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" alt="Awesome Badge"/>
<img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
<a href="https://discord.gg/JgjExyntw4"><img src="https://img.shields.io/discord/733027681184251937.svg?style=flat&label=Join%20Community&color=7289DA" alt="Join Community Badge"/></a>
<a href="https://twitter.com/oristarium"><img src="https://img.shields.io/twitter/follow/oristarium.svg?style=social" /></a>
<br>

<i>A lightweight microservice that converts text to speech using Google's Text-to-Speech API, optimized for performance and ease of use.</i>

<a href="https://github.com/roffidaijoubu/microservice-google-tts/stargazers"><img src="https://img.shields.io/github/stars/roffidaijoubu/microservice-google-tts" alt="Stars Badge"/></a>
<a href="https://github.com/roffidaijoubu/microservice-google-tts/network/members"><img src="https://img.shields.io/github/forks/roffidaijoubu/microservice-google-tts" alt="Forks Badge"/></a>
<a href="https://github.com/roffidaijoubu/microservice-google-tts/pulls"><img src="https://img.shields.io/github/issues-pr/roffidaijoubu/microservice-google-tts" alt="Pull Requests Badge"/></a>
<a href="https://github.com/roffidaijoubu/microservice-google-tts/issues"><img src="https://img.shields.io/github/issues/roffidaijoubu/microservice-google-tts" alt="Issues Badge"/></a>
<a href="https://github.com/roffidaijoubu/microservice-google-tts/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/roffidaijoubu/microservice-google-tts?color=2b9348"></a>
<a href="https://github.com/roffidaijoubu/microservice-google-tts/blob/master/LICENSE"><img src="https://img.shields.io/github/license/roffidaijoubu/microservice-google-tts?color=2b9348" alt="License Badge"/></a>

<h3 align="center">Made with ❤️ by</h3>
<img alt="Oristarium Logo" src="https://ucarecdn.com/87bb45de-4a95-40d7-83c6-73866de942d5/-/crop/5518x2493/1408,2949/-/preview/1000x1000/"> </img>

<i>Love the project? Please consider <a href="https://trakteer.id/oristarium">donating</a> to help us improve!</i>

</div>

## Features

- Convert text to speech in multiple languages
- Support for long text (auto-splits text longer than 200 characters)
- Simple REST API with JSON responses
- Built-in test UI at `/test`
- Docker containerization with resource management
- Automatic HTTPS with Traefik
- Health check endpoint
- Non-root container security
- CI/CD pipeline with GitHub Actions

## API Reference

### POST `/`

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

### GET `/test`

Provides a web interface for testing the text-to-speech conversion.

### GET `/health`

Health check endpoint.

**Response:**
```json
{
    "status": "ok"
}
```

## Local Development

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

The service will be available at `http://localhost:3001`

## Deployment

### Using GitHub Actions

This project includes a CI/CD pipeline that automatically builds and deploys the microservice when you push to the main branch. Here's how to set it up:

1. Fork this repository
2. Set up the following GitHub Secrets in your repository (Settings > Secrets and variables > Actions):

```bash
# Docker Hub Credentials
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_token  # Use an access token, not your password

# VPS SSH Details
VPS_SSH_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
            your_private_key_here
            -----END OPENSSH PRIVATE KEY-----
VPS_USER=your_vps_username
VPS_HOST=your_vps_ip_or_domain
DOMAIN=your_tts_domain  # e.g., tts.example.com

# Let's Encrypt SSL
TRAEFIK_ACME_EMAIL=your_email@example.com  # Email for SSL certificate notifications

# Optional: Custom Deploy Path (defaults to /var/www/microservice-google-tts)
DEPLOY_PATH=/path/to/your/deployment
```

3. The deployment process will:
   - Build and push Docker image to Docker Hub
   - Create required directories on VPS
   - Set up Docker network if needed
   - Handle Traefik deployment intelligently:
     - Use existing Traefik if found
     - Deploy new Traefik instance if none exists
   - Deploy the microservice

### Key Features of the Deployment

1. **Shared Traefik Infrastructure**:
   - One Traefik instance can serve multiple microservices
   - Automatic SSL certificate management
   - Shared network for service discovery

2. **Smart Service Management**:
   - Checks for existing Traefik instance
   - Only deploys Traefik if needed
   - Maintains SSL certificates across deployments

3. **Flexible Configuration**:
   - Configurable deployment path
   - Environment-based settings
   - Automatic network creation

4. **Resource Management**:
   - CPU and memory limits
   - Proper logging configuration
   - Automatic container restarts

### Manual Deployment

If you prefer to deploy manually:

```bash
# Create web network if it doesn't exist
docker network create web

# Create deployment directory
mkdir -p /var/www/microservice-google-tts
cd /var/www/microservice-google-tts

# Create SSL certificates directory
mkdir -p letsencrypt

# Create .env file
cat > .env << EOL
DOMAIN=your_tts_domain
TRAEFIK_ACME_EMAIL=your_email@example.com
EOL

# Download docker-compose.yml
wget https://raw.githubusercontent.com/yourusername/your-repo/main/docker-compose.yml

# Start services
docker-compose up -d
```

### Directory Structure

```
/var/www/microservice-google-tts/
├── docker-compose.yml
├── .env
└── letsencrypt/
    └── acme.json  # SSL certificates
```

### Checking Deployment

1. Check service status:
```bash
docker ps
docker-compose ps
```

2. View logs:
```bash
docker-compose logs -f microservice-google-tts
```

3. Test endpoints:
- API: `https://your_domain/`
- Test Interface: `https://your_domain/test`
- Health Check: `https://your_domain/health`

### Troubleshooting

1. If Traefik is not starting:
```bash
docker logs traefik
```

2. Check network connectivity:
```bash
docker network inspect web
```

3. Clean up all containers:
```bash
docker-compose down --remove-orphans
docker system prune -a --volumes  # Warning: This removes all unused containers, images, and volumes
```

## Credits

This project leverages the excellent [google-tts](https://github.com/zlargon/google-tts) library by zlargon, which provides a reliable way to interact with Google's Text-to-Speech service without requiring API keys. Special thanks to all the contributors of this project! 🙏

The library provides key features that make this microservice possible:
- Support for multiple languages
- Handling of long text by auto-splitting
- Base64 audio encoding
