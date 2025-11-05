# Docker Commands - Quick Reference

**Project:** saas202521
**Docker Compose Version:** v2 (required)

---

## Essential Commands

### Start Services

```bash
# Start all services in background
docker compose up -d

# Start specific service
docker compose up -d postgres
docker compose up -d backend

# Start with build (rebuild images)
docker compose up -d --build

# Start and view logs
docker compose up
```

### Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (CAUTION: deletes data)
docker compose down -v

# Stop specific service
docker compose stop postgres
```

### View Status

```bash
# Check running containers
docker compose ps

# Expected output shows:
# - Service names
# - Status (running/stopped)
# - Port mappings
```

### View Logs

```bash
# All services (live tail)
docker compose logs -f

# Specific service
docker compose logs -f postgres
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100 postgres

# Since timestamp
docker compose logs --since 30m postgres

# Search logs for errors
docker compose logs | grep -i error
docker compose logs postgres | grep -i "connection failed"
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart postgres
docker compose restart backend
```

---

## Database Commands

### PostgreSQL

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U postgres -d database

# Run SQL command
docker compose exec postgres psql -U postgres -d database -c "SELECT version();"

# Backup database
docker compose exec postgres pg_dump -U postgres database > backup.sql

# Restore database
cat backup.sql | docker compose exec -T postgres psql -U postgres database

# Check connection
docker compose exec postgres pg_isready
# Expected: /var/run/postgresql:5432 - accepting connections
```

### Redis

```bash
# Connect to Redis CLI
docker compose exec redis redis-cli

# Ping Redis
docker compose exec redis redis-cli ping
# Expected: PONG

# View all keys
docker compose exec redis redis-cli KEYS '*'

# Get value
docker compose exec redis redis-cli GET session:abc123

# Flush all data (CAUTION)
docker compose exec redis redis-cli FLUSHALL
```

### MongoDB (if used)

```bash
# Connect to MongoDB shell
docker compose exec mongo mongosh

# Show databases
docker compose exec mongo mongosh --eval "show dbs"

# Backup database
docker compose exec mongo mongodump --out /backup

# Restore database
docker compose exec mongo mongorestore /backup
```

---

## Troubleshooting

### Check Service Health

```bash
# Backend health check
curl http://localhost:8021/health

# Frontend
curl http://localhost:3021

# PostgreSQL
docker compose exec postgres pg_isready

# Redis
docker compose exec redis redis-cli ping
```

### Validate Configuration

```bash
# Validate docker-compose.yml syntax
docker compose config

# Should output parsed YAML without errors
```

### View Resource Usage

```bash
# Container stats (CPU, memory)
docker stats

# Disk usage
docker system df

# Detailed info
docker compose ps --format json | jq
```

### Port Conflicts

```bash
# Check what's using a port (Windows PowerShell)
netstat -ano | findstr :5421

# Kill process (Windows)
taskkill /F /PID <PID>

# Check what's using a port (macOS/Linux)
lsof -ti:5421

# Kill process (macOS/Linux)
kill $(lsof -ti:5421)
```

### Container Issues

```bash
# Remove all stopped containers
docker compose rm

# Remove all containers, networks, volumes (NUCLEAR option)
docker compose down -v
docker system prune -a

# Rebuild specific service
docker compose build backend
docker compose up -d backend
```

---

## Development Workflow

### Code Changes (Backend)

```bash
# Backend auto-reloads with volume mounts
# Just save your files

# If dependencies changed:
docker compose restart backend

# If Dockerfile changed:
docker compose build backend
docker compose up -d backend
```

### Code Changes (Frontend)

```bash
# Frontend auto-reloads with volume mounts
# Just save your files

# If dependencies changed (package.json):
docker compose exec frontend npm install
docker compose restart frontend
```

### Database Migrations

**For Alembic (Python):**
```bash
# Run migrations
docker compose exec backend alembic upgrade head

# Create new migration
docker compose exec backend alembic revision --autogenerate -m "description"

# Rollback migration
docker compose exec backend alembic downgrade -1
```

**For Prisma (Node.js):**
```bash
# Run migrations
docker compose exec backend npx prisma migrate deploy

# Create new migration
docker compose exec backend npx prisma migrate dev --name description
```

**For Django:**
```bash
# Run migrations
docker compose exec backend python manage.py migrate

# Create new migration
docker compose exec backend python manage.py makemigrations
```

---

## Cleanup

### Remove Unused Resources

```bash
# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune

# Nuclear option (CAUTION: removes all stopped containers, networks, images)
docker system prune -a --volumes
```

### Reset Project

```bash
# Stop and remove everything
docker compose down -v

# Remove images (replace with your image names)
docker rmi $(docker images -q saas202521-*)

# Start fresh
docker compose up -d --build
```

---

## Production Commands

### Build for Production

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Tag images
docker tag saas202521-backend registry.example.com/saas202521-backend:latest

# Push to registry
docker push registry.example.com/saas202521-backend:latest
```

### View Production Logs

```bash
# Production logs
docker compose -f docker-compose.prod.yml logs -f

# Save logs to file
docker compose -f docker-compose.prod.yml logs > logs.txt
```

---

## Useful Aliases

Add these to your shell profile (.bashrc, .zshrc, or PowerShell profile):

```bash
# Bash/Zsh
alias dcu='docker compose up -d'
alias dcd='docker compose down'
alias dcl='docker compose logs -f'
alias dcp='docker compose ps'
alias dcr='docker compose restart'

# PowerShell
function dcu { docker compose up -d }
function dcd { docker compose down }
function dcl { docker compose logs -f }
function dcp { docker compose ps }
function dcr { docker compose restart }
```

---

## Common Issues & Solutions

### Issue: Port already in use

```bash
# Find and kill process using port
netstat -ano | findstr :5432  # Windows
lsof -ti:5432 | xargs kill    # macOS/Linux

# Or change port in docker-compose.yml
```

### Issue: Container won't start

```bash
# Check logs
docker compose logs backend

# Remove and rebuild
docker compose down
docker compose up -d --build
```

### Issue: Database connection refused

```bash
# Check PostgreSQL is running
docker compose ps postgres

# Check logs for errors
docker compose logs -f postgres

# Restart database
docker compose restart postgres
```

### Issue: Out of disk space

```bash
# Check usage
docker system df

# Clean up
docker system prune -a --volumes
```

### Issue: "Error response from daemon: Conflict"

```bash
# Container name already in use
docker compose down
docker compose up -d

# If still fails, remove containers manually
docker rm -f $(docker ps -aq)
```

### Issue: Slow performance

```bash
# Check resource usage
docker stats

# Limit resources in docker-compose.yml:
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
```

---

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3021 | http://localhost:3021 |
| Backend | 8021 | http://localhost:8021 |
| PostgreSQL | 5421 | localhost:5421 |
| Redis | 6421 | localhost:6421 |
| MongoDB | 27021 | localhost:27021 |

---

## Quick Diagnostics

Run this sequence when troubleshooting:

```bash
# 1. Check Docker Compose version (must be v2)
docker compose version

# 2. Validate configuration
docker compose config

# 3. Check service status
docker compose ps

# 4. Check logs for errors
docker compose logs --tail=50 | grep -i error

# 5. Check resource usage
docker stats --no-stream

# 6. Test connectivity
curl http://localhost:8021/health
docker compose exec postgres pg_isready
docker compose exec redis redis-cli ping
```

---

## References

- **Docker Compose Docs:** https://docs.docker.com/compose/
- **Development Guide:** `DEVELOPMENT-GUIDE.md`
- **Testing Checklist:** `TESTING-CHECKLIST.md`

---

**Remember:** Always use `docker compose` (v2) not `docker-compose` (v1). Check version with `docker compose version`.
