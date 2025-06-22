# Docker Setup for Beribturing Rental Platform

This mono-repo contains a comprehensive Docker setup for the Beribturing rental platform with three React applications and supporting infrastructure.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Renter App    │    │   Owner App     │    │   Admin App     │
│   (Port 3000)   │    │   (Port 3001)   │    │   (Port 3002)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                ┌─────────────────────────────┐
                │    Reverse Proxy (Nginx)    │
                │      (Port 80/443)          │
                └─────────────────────────────┘
                                │
                        ┌───────────────┐
                        │ API Backend   │
                        │ (Port 8080)   │
                        └───────────────┘
```

## Components

### Applications
- **Renter App** - Customer-facing React application for browsing and booking rentals
- **Owner App** - Property owner dashboard for managing listings and bookings  
- **Admin App** - Administrative dashboard for platform management
- **API Stub** - Shared TypeScript library with API models and clients

### Infrastructure
- **Nginx Reverse Proxy** - Routes traffic based on subdomain/path
- **Docker Networks** - Isolated network for inter-service communication
- **Health Checks** - Monitoring for all services

## Quick Start

### Production Deployment
```bash
# Clone and navigate to project
git clone <repo-url>
cd frontend-beribturing

# Copy environment template
cp .env.example .env

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Development Mode
```bash
# Start in development mode with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
```

## Access URLs

### Production
- **Renter App**: http://localhost:3000 or http://renter.localhost
- **Owner App**: http://localhost:3001 or http://owner.localhost  
- **Admin App**: http://localhost:3002 or http://admin.localhost
- **Reverse Proxy**: http://localhost (routes to renter app by default)

### Development
- **Renter App**: http://localhost:3000 (Vite dev server)
- **Owner App**: http://localhost:3001 (Vite dev server)
- **Admin App**: http://localhost:3002 (Vite dev server) 
- **API Mock**: http://localhost:8080 (JSON Server)

## Environment Configuration

Create a `.env` file from `.env.example`:

```bash
# API Configuration
VITE_API_URL=http://localhost:8080

# Environment  
NODE_ENV=production

# Application URLs (for reverse proxy)
RENTER_APP_URL=http://renter.localhost
OWNER_APP_URL=http://owner.localhost
ADMIN_APP_URL=http://admin.localhost
```

## Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start (after code changes)
docker-compose up -d --build

# View service status
docker-compose ps

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f renter-app
```

### Development Workflow
```bash
# Start development environment
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Rebuild specific service
docker-compose build renter-app

# Execute command in running container
docker-compose exec renter-app sh

# Scale services (if needed)
docker-compose up -d --scale renter-app=2
```

### Maintenance
```bash
# Remove all containers and volumes
docker-compose down -v

# Clean up unused images
docker system prune -a

# View resource usage
docker stats

# Backup volumes
docker run --rm -v beribturing-nginx-logs:/data -v $(pwd):/backup alpine tar czf /backup/nginx-logs.tar.gz -C /data .
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Change ports in docker-compose.yml if needed
   ```

2. **Build Failures**
   ```bash
   # Clean rebuild
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Memory Issues**
   ```bash
   # Increase Docker memory limit
   # Docker Desktop: Settings > Resources > Memory
   
   # Or use smaller Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=2048"
   ```

### Health Checks
```bash
# Check service health
docker-compose ps

# Manual health check
curl -f http://localhost:3000/
curl -f http://localhost:3001/
curl -f http://localhost:3002/
```

### Logs Analysis
```bash
# Follow all logs
docker-compose logs -f

# Filter by service
docker-compose logs -f renter-app

# Search logs
docker-compose logs | grep ERROR

# Export logs
docker-compose logs > app-logs.txt
```

## Production Considerations

### Security
- Use HTTPS in production
- Set proper CORS headers
- Configure secure headers in nginx
- Use secrets management for sensitive data

### Performance
- Enable nginx gzip compression (already configured)
- Use CDN for static assets
- Configure proper caching headers
- Monitor resource usage

### Monitoring
- Set up health check endpoints
- Configure log aggregation
- Monitor container metrics
- Set up alerting

### Scaling
```bash
# Scale specific services
docker-compose up -d --scale renter-app=3

# Use load balancer for multiple instances
# Configure nginx upstream blocks
```

## File Structure

```
├── apps/
│   ├── admin-app/
│   │   ├── Dockerfile          # Admin app container
│   │   └── nginx.conf          # App-specific nginx config
│   ├── owner-app/
│   │   ├── Dockerfile          # Owner app container  
│   │   └── nginx.conf          # App-specific nginx config
│   └── renter-app/
│       ├── Dockerfile          # Renter app container
│       └── nginx.conf          # App-specific nginx config
├── packages/
│   └── api-stub/
│       └── Dockerfile          # API stub build container
├── nginx/
│   ├── nginx.conf              # Main nginx configuration
│   └── conf.d/
│       ├── default.conf        # Default routing config
│       └── multi-app.conf      # Multi-app routing config
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development overrides
├── Dockerfile                  # Multi-app single container build
├── .env.example                # Environment template
└── README.Docker.md            # This file
```

## Next Steps

1. **Backend Integration**: Add your API backend service to docker-compose.yml
2. **Database**: Add PostgreSQL/MySQL service if needed
3. **Caching**: Add Redis service for session/cache management  
4. **CI/CD**: Integrate with your deployment pipeline
5. **Monitoring**: Add Prometheus/Grafana for metrics
6. **SSL**: Configure SSL certificates for HTTPS