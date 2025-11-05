# Database Migration Guide

**Project:** saas202521
**Database:** PostgreSQL 16
**Environments:** Development, Staging, Production

---

## Overview

Database migrations track changes to your database schema over time. This guide covers creating, testing, and deploying migrations safely across all environments.

**Supported ORMs:**
- **Python**: Django ORM, SQLAlchemy (Flask/FastAPI)
- **Node.js**: Prisma, TypeORM, Sequelize

---

## What are Migrations?

Migrations are version-controlled scripts that modify database structure:

**Examples:**
- Adding a new table
- Adding/removing columns
- Changing column types
- Adding indexes
- Creating constraints
- Updating data

**Why migrations?**
- ✅ Track database changes in git
- ✅ Apply same changes across environments
- ✅ Safely update production databases
- ✅ Rollback if needed
- ✅ Team coordination (no manual SQL)

---

## Migration Workflow

### Standard Flow

```
1. Make model changes (code)
   ↓
2. Generate migration file (automatic)
   ↓
3. Review migration (check SQL)
   ↓
4. Test locally (development)
   ↓
5. Commit migration to git
   ↓
6. Deploy to staging (auto-runs migration)
   ↓
7. Test in staging
   ↓
8. Deploy to production (auto-runs migration)
```

---

## Python (Django)

### Creating Migrations

**After making model changes:**

```python
# Example model change in models.py
class User(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=100)
    # NEW: Adding phone number field
    phone = models.CharField(max_length=20, blank=True, default='')
```

**Generate migration:**
```bash
python manage.py makemigrations

# Output:
# Migrations for 'users':
#   users/migrations/0002_user_phone.py
#     - Add field phone to user
```

**Review generated migration:**
```python
# users/migrations/0002_user_phone.py
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=20),
        ),
    ]
```

### Running Migrations Locally

```bash
# Apply migrations
python manage.py migrate

# Output:
# Running migrations:
#   Applying users.0002_user_phone... OK

# Check migration status
python manage.py showmigrations

# Show SQL without running
python manage.py sqlmigrate users 0002
```

### Data Migrations

**For updating existing data:**

```bash
# Create empty migration
python manage.py makemigrations --empty users --name populate_phone_numbers
```

**Edit migration:**
```python
# users/migrations/0003_populate_phone_numbers.py
from django.db import migrations

def populate_phone_numbers(apps, schema_editor):
    User = apps.get_model('users', 'User')
    # Update existing users
    for user in User.objects.filter(phone=''):
        user.phone = '000-000-0000'  # Default value
        user.save()

class Migration(migrations.Migration):
    dependencies = [
        ('users', '0002_user_phone'),
    ]

    operations = [
        migrations.RunPython(populate_phone_numbers),
    ]
```

### Common Django Migration Commands

```bash
# Create migrations for all apps
python manage.py makemigrations

# Create migration for specific app
python manage.py makemigrations users

# Show migrations
python manage.py showmigrations

# Show SQL for migration
python manage.py sqlmigrate users 0002

# Apply all migrations
python manage.py migrate

# Migrate specific app
python manage.py migrate users

# Rollback to specific migration
python manage.py migrate users 0001

# Fake a migration (mark as applied without running)
python manage.py migrate users 0002 --fake
```

---

## Python (SQLAlchemy + Alembic)

### Setup Alembic

```bash
# Install
pip install alembic

# Initialize
alembic init alembic
```

**Configure `alembic.ini`:**
```ini
sqlalchemy.url = postgresql://localhost:5421/saas202521
```

### Creating Migrations

**After making model changes:**

```python
# Example model change in models.py
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    # NEW: Adding phone field
    phone = Column(String(20), default='')
```

**Generate migration:**
```bash
# Auto-generate from models
alembic revision --autogenerate -m "Add phone field to users"

# Manual migration (empty template)
alembic revision -m "Add phone field to users"
```

**Review generated migration:**
```python
# alembic/versions/abc123_add_phone_field.py
def upgrade():
    op.add_column('users', sa.Column('phone', sa.String(20), nullable=True))

def downgrade():
    op.drop_column('users', 'phone')
```

### Running Migrations

```bash
# Apply all pending migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# Show current version
alembic current

# Show migration history
alembic history
```

---

## Node.js (Prisma)

### Creating Migrations

**After making schema changes:**

```prisma
// prisma/schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  // NEW: Adding phone field
  phone String @default("")
}
```

**Generate and apply migration:**
```bash
# Development (creates migration and applies)
npx prisma migrate dev --name add-phone-field

# Output:
# Applying migration `20250115_add_phone_field`
# ✔ Generated Prisma Client
```

**Migration file created:**
```sql
-- prisma/migrations/20250115_add_phone_field/migration.sql
ALTER TABLE "User" ADD COLUMN "phone" TEXT NOT NULL DEFAULT '';
```

### Running Migrations

```bash
# Development (creates + applies)
npx prisma migrate dev

# Production/Staging (applies only)
npx prisma migrate deploy

# Check migration status
npx prisma migrate status

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Data Migrations with Prisma

**Create seed file:**
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Update existing users
  await prisma.user.updateMany({
    where: { phone: '' },
    data: { phone: '000-000-0000' }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Run seed:**
```bash
npx prisma db seed
```

---

## Node.js (TypeORM)

### Creating Migrations

**After making entity changes:**

```typescript
// src/entities/User.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // NEW: Adding phone field
  @Column({ default: '' })
  phone: string;
}
```

**Generate migration:**
```bash
npm run typeorm migration:generate -- -n AddPhoneToUser

# Or directly:
typeorm migration:generate -n AddPhoneToUser
```

**Migration file:**
```typescript
// src/migrations/1642123456789-AddPhoneToUser.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUser1642123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }
}
```

### Running Migrations

```bash
# Run pending migrations
npm run typeorm migration:run

# Rollback last migration
npm run typeorm migration:revert

# Show migrations
npm run typeorm migration:show
```

---

## Best Practices

### 1. Always Review Generated Migrations

**Check for:**
- ✅ Correct column names and types
- ✅ Proper indexes
- ✅ Data loss prevention (e.g., dropping columns)
- ✅ Performance impact (large table alterations)

**Example issue:**
```python
# ❌ BAD: Changing column type can lose data
operations = [
    migrations.AlterField('user', 'age', models.IntegerField()),  # Was CharField
]

# ✅ GOOD: Preserve data with multi-step migration
operations = [
    migrations.AddField('user', 'age_int', models.IntegerField(null=True)),
    migrations.RunPython(convert_age_to_int),
    migrations.RemoveField('user', 'age'),
    migrations.RenameField('user', 'age_int', 'age'),
]
```

### 2. Test Migrations on Production-Like Data

```bash
# Create staging database copy
pg_dump -h prod-db -U user -d prod_db > prod_backup.sql
psql -h localhost -U user -d staging_db < prod_backup.sql

# Run migrations on staging
python manage.py migrate
```

### 3. Make Migrations Reversible

**Always include rollback logic:**

```python
# Django
def forwards(apps, schema_editor):
    # Upgrade logic
    pass

def backwards(apps, schema_editor):
    # Rollback logic
    pass

class Migration(migrations.Migration):
    operations = [
        migrations.RunPython(forwards, backwards),
    ]
```

### 4. Avoid Dangerous Operations

**❌ Dangerous:**
- Dropping columns with data
- Changing column types without conversion
- Adding NOT NULL columns without defaults
- Large table restructuring without downtime plan

**✅ Safe alternatives:**
- Use multi-step migrations
- Add nullable columns first, then make NOT NULL
- Use background jobs for data migrations on large tables
- Test on production-size datasets

### 5. One Logical Change Per Migration

**❌ BAD: Multiple unrelated changes**
```python
operations = [
    migrations.AddField('user', 'phone', ...),
    migrations.CreateModel('Product', ...),
    migrations.AlterField('order', 'status', ...),
]
```

**✅ GOOD: Separate migrations**
```python
# Migration 1: Add phone to user
# Migration 2: Create product model
# Migration 3: Update order status
```

---

## Deployment Migrations

### Automatic (Recommended)

Migrations run automatically during deployment via GitHub Actions.

**Staging (on push to develop):**
```yaml
# .github/workflows/deploy-staging.yml
- name: Run migrations
  run: |
    python manage.py migrate
    # or: npx prisma migrate deploy
```

**Production (on release tag):**
```yaml
# .github/workflows/deploy-production.yml
- name: Run migrations
  run: |
    python manage.py migrate --no-input
    # or: npx prisma migrate deploy
```

### Manual

**Staging:**
```bash
bash scripts/migrate-db-azure.sh staging
```

**Production:**
```bash
bash scripts/migrate-db-azure.sh production
```

### Zero-Downtime Migrations

For production with active users:

**Phase 1: Add new column (nullable)**
```python
class Migration(migrations.Migration):
    operations = [
        migrations.AddField('user', 'new_field', models.CharField(max_length=100, null=True)),
    ]
```

**Phase 2: Populate new column**
```python
# Deploy code that writes to both old and new columns
# OR use background job to populate
```

**Phase 3: Make column NOT NULL**
```python
class Migration(migrations.Migration):
    operations = [
        migrations.AlterField('user', 'new_field', models.CharField(max_length=100, null=False)),
    ]
```

**Phase 4: Remove old column**
```python
class Migration(migrations.Migration):
    operations = [
        migrations.RemoveField('user', 'old_field'),
    ]
```

---

## Troubleshooting

### "Duplicate column" Error

**Problem:** Migration tries to create existing column

**Solution:**
```bash
# Django: Fake the migration
python manage.py migrate users 0002 --fake

# Prisma: Mark as applied
npx prisma migrate resolve --applied 20250115_add_phone_field
```

### "No such column" Error in Tests

**Problem:** Test database not migrated

**Solution:**
```bash
# Django: Migrate test database
python manage.py migrate --database=test

# Prisma: Reset test database
NODE_ENV=test npx prisma migrate reset --force
```

### Migration Fails in Production

**Immediate actions:**

1. **Don't panic** - database is probably fine
2. **Check error message** in deployment logs
3. **Don't run migration again** until you understand the issue

**Common causes:**
- Column already exists (safe - fake it)
- Data constraint violation (fix data first)
- Timeout (large table - need different approach)
- Permission issue (check database user permissions)

**Recovery:**
```bash
# 1. Connect to database
psql "$DATABASE_URL"

# 2. Check current schema
\d tablename

# 3. Manually fix if needed
ALTER TABLE ... ;

# 4. Mark migration as applied
python manage.py migrate users 0002 --fake
```

### Rollback a Migration

**Django:**
```bash
# Rollback to previous migration
python manage.py migrate users 0001

# Show applied migrations
python manage.py showmigrations users
```

**Alembic:**
```bash
# Rollback one migration
alembic downgrade -1

# Rollback to specific version
alembic downgrade abc123
```

**Prisma:**
```bash
# Prisma doesn't support rollback natively
# Need to create new migration to reverse changes
```

---

## Production Deployment Checklist

Before deploying migrations to production:

- [ ] Migration tested in development
- [ ] Migration tested in staging with production-like data
- [ ] Migration reviewed by team member
- [ ] Rollback plan documented
- [ ] Database backup created
- [ ] Estimated migration time known (< 30 seconds ideal)
- [ ] Downtime plan if migration takes > 1 minute
- [ ] Monitoring alerts configured
- [ ] Team notified of deployment

**Create backup:**
```bash
bash scripts/backup-db-azure.sh production
```

**Estimate migration time:**
```sql
-- Check table size
SELECT pg_size_pretty(pg_total_relation_size('tablename'));

-- Check row count
SELECT COUNT(*) FROM tablename;
```

**Rules of thumb:**
- < 100K rows: Usually fast (< 5 seconds)
- 100K - 1M rows: May be slow (5-30 seconds)
- > 1M rows: Likely slow (30+ seconds, plan for downtime)

---

## Resources

- **Django Migrations**: https://docs.djangoproject.com/en/stable/topics/migrations/
- **Alembic**: https://alembic.sqlalchemy.org/
- **Prisma Migrations**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- **TypeORM Migrations**: https://typeorm.io/migrations
- **PostgreSQL ALTER TABLE**: https://www.postgresql.org/docs/current/sql-altertable.html

---

**Questions?** Contact database team or post in #dev-help.
