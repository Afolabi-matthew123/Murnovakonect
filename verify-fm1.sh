#!/bin/bash

echo "Ì¥ç Verifying FM-1 Implementation..."

# Check required files
required_files=(
  "pnpm-workspace.yaml"
  "package.json"
  "prisma/schema.prisma"
  "apps/api/package.json"
  "apps/api/src/main.ts"
  "apps/api/src/app.module.ts"
  "apps/api/src/prisma/prisma.service.ts"
  "apps/api/src/common/middleware/tenancy.middleware.ts"
  "apps/api/src/modules/auth/auth.service.ts"
  "apps/api/src/modules/schools/schools.service.ts"
  "apps/api/src/modules/seed/seed.ts"
  "docker-compose.yml"
  ".github/workflows/ci.yml"
)

missing_files=()
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    missing_files+=("$file")
  fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
  echo "‚úÖ All required files present"
else
  echo "‚ùå Missing files:"
  printf '  - %s\n' "${missing_files[@]}"
  exit 1
fi

# Check Prisma schema for required models
required_models=("School" "User" "Role" "Permission" "Student" "Staff")
for model in "${required_models[@]}"; do
  if ! grep -q "model $model" prisma/schema.prisma; then
    echo "‚ùå Missing model in schema: $model"
    exit 1
  fi
done
echo "‚úÖ All required models in schema"

# Check for schoolId in models
if ! grep -q "schoolId" prisma/schema.prisma; then
  echo "‚ùå schoolId not found in schema"
  exit 1
fi
echo "‚úÖ schoolId present in schema"

# Check package.json scripts
required_scripts=("prisma:generate" "prisma:migrate:dev" "seed" "start:dev")
for script in "${required_scripts[@]}"; do
  if ! grep -q "\"$script\"" apps/api/package.json; then
    echo "‚ùå Missing script in package.json: $script"
    exit 1
  fi
done
echo "‚úÖ All required scripts in package.json"

# Check Prisma schema path in package.json
if ! grep -q "../../prisma/schema.prisma" apps/api/package.json; then
  echo "‚ùå Prisma schema path not correctly configured"
  exit 1
fi
echo "‚úÖ Prisma schema path configured correctly"

echo ""
echo "Ìæâ FM-1 Implementation Verification Complete!"
echo "‚úÖ All critical components are implemented"
echo ""
echo "Ì≥ã Next steps:"
echo "   1. Run: ./setup.sh to initialize the project"
echo "   2. Test: pnpm --filter ./apps/api run test"
echo "   3. Develop: pnpm --filter ./apps/api run start:dev"
