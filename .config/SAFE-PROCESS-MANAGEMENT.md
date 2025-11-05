# Safe Process Management

**Critical:** Never use commands that kill ALL processes of a type. Always target specific processes by PID or port.

---

## ❌ DANGEROUS Commands (Never Use)

```bash
# DON'T: Kills ALL Node.js processes system-wide
taskkill /F /IM node.exe

# DON'T: Kills ALL processes matching pattern
pkill -f node

# DON'T: Kills ALL analytics processes (affects other projects)
pkill -f analytics
```

**Why dangerous:**
- Kills processes from other projects
- Terminates background terminals
- Disrupts other users' work
- Can cause data loss

---

## ✅ SAFE Commands (Always Use)

### Windows: Kill by Port

```powershell
# Step 1: Find process using specific port
netstat -ano | findstr :3021

# Step 2: Kill only that specific PID
taskkill /F /PID <PID>

# Example for port 3009:
netstat -ano | findstr :3009
taskkill /F /PID 12345
```

### Mac/Linux: Kill by Port

```bash
# Step 1: Find process using specific port
lsof -ti:3021

# Step 2: Kill only that process
kill $(lsof -ti:3021)

# Or as one-liner:
lsof -ti:3009 | xargs kill -9
```

### Docker: Stop Project-Specific Containers

```bash
# DON'T: Stop all containers
docker stop $(docker ps -aq)

# DO: Stop only this project's containers
docker-compose down

# Or stop specific container by name
docker stop saas202521-postgres
docker stop saas202521-redis
```

---

## Process Management by Scenario

### 1. Dev Server Port Conflict

**Symptom:** "Port 3009 is already in use"

```powershell
# Windows
netstat -ano | findstr :3009
taskkill /F /PID <PID from output>

# Mac/Linux
lsof -ti:3009 | xargs kill
```

### 2. Multiple Processes to Stop

```powershell
# Windows - Stop project-specific ports
netstat -ano | findstr :3021
netstat -ano | findstr :8021
# Then kill each PID individually

# Mac/Linux - Kill multiple ports safely
for port in 3009 8009; do kill $(lsof -ti:$port) 2>/dev/null; done
```

### 3. Database Connection Issues

```bash
# DON'T restart all databases
# DO restart only this project's database
docker-compose restart postgres

# Or by container name
docker restart saas202521-postgres
```

### 4. Clean Restart of This Project Only

```bash
# Stop all services for THIS project
docker-compose down

# Kill dev servers on THIS project's ports
# Windows:
netstat -ano | findstr :3021
taskkill /F /PID <PID>
netstat -ano | findstr :8021
taskkill /F /PID <PID>

# Mac/Linux:
kill $(lsof -ti:3021) 2>/dev/null
kill $(lsof -ti:8021) 2>/dev/null

# Restart services
docker-compose up -d
npm run dev
```

---

## Port Registry for This Project

This project uses these ports (see `.env.local`):

- Frontend: `3021`
- Backend: `8021`
- PostgreSQL: `5421`
- Redis: `6421`
- MongoDB: `27021` (if enabled)

**Only kill processes on YOUR project's ports.**

---

## Claude Code Guidance

When Claude needs to stop/restart processes:

1. ✅ **Always use port-specific targeting**
2. ✅ **Use `docker-compose` for containers** (not `docker stop $(...)`)
3. ✅ **Verify PID before killing** (show user the netstat output)
4. ❌ **Never use `/IM node.exe` or similar broad patterns**
5. ❌ **Never use `pkill` without specific PID**

### Example Claude Workflow

```
User: "The dev server won't start, says port is in use"

Claude:
1. Run: netstat -ano | findstr :3009
2. Identify the PID using port 3009
3. Run: taskkill /F /PID <specific-PID>
4. Restart: npm run dev
```

---

## Emergency Scenarios

### "I need to restart everything for THIS project"

```bash
# Safe project restart (Windows)
docker-compose down
netstat -ano | findstr :3009 # Note the PID
taskkill /F /PID <PID>
netstat -ano | findstr :8009 # Note the PID
taskkill /F /PID <PID>
docker-compose up -d
npm run dev
```

### "I accidentally killed all Node processes"

```bash
# Restart other projects
cd /c/devop/saas202507
npm run dev &

cd /c/devop/saas202506
npm run dev &

cd /c/devop/saas202521
npm run dev
```

---

## Verification

After killing processes, verify:

```powershell
# Windows - Check port is free
netstat -ano | findstr :3009
# Should return nothing

# Mac/Linux - Check port is free
lsof -ti:3009
# Should return nothing
```

---

## Summary: The Golden Rule

**Always target processes by:**
1. ✅ Specific PID
2. ✅ Specific port number
3. ✅ Specific container name

**Never target processes by:**
1. ❌ Process name (`node.exe`, `/IM node`)
2. ❌ Pattern matching (`pkill -f`)
3. ❌ Broad wildcards

**Remember:** Other projects and terminals are running. Only kill YOUR project's processes.

---

**Version:** 1.0
**Last Updated:** 2025-10-26
