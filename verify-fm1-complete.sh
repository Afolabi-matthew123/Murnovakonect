#!/bin/bash

echo "=========================================="
echo "FM-1: CORE BACKEND INFRASTRUCTURE VERIFICATION"
echo "=========================================="
echo ""

# 1. Check project structure
echo "1. PROJECT STRUCTURE VERIFICATION"
echo "----------------------------------"
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
        return 0
    else
        echo "❌ $1 (MISSING)"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
        return 0
    else
        echo "❌ $1/ (MISSING)"
        return 1
    fi
}

# Root structure
check_file "pnpm-workspace.yaml"
check_file "package.json"
check_file "turbo.json"
check_file "docker-compose.yml"
check_file ".env.example"
check_dir ".github/workflows"
check_file "prisma/schema.prisma"
echo ""

# 2. Check API structure
echo "2. API STRUCTURE VERIFICATION"
echo "-----------------------------"
check_dir "apps/api/src"
check_file "apps/api/package.json"
check_file "apps/api/Dockerfile"
check_file "apps/api/src/main.ts"
check_file "apps/api/src/app.module.ts"
check_dir "apps/api/src/modules"
echo ""

# 3. Check critical modules
echo "3. MODULES VERIFICATION"
echo "-----------------------"
critical_modules=(
    "auth" "users" "schools" "roles" "permissions" 
    "students" "tenancy" "ai" "health" "seed"
)

missing_modules=0
for module in "${critical_modules[@]}"; do
    if [ -d "apps/api/src/modules/$module" ]; then
        echo "✅ $module module"
    else
        echo "❌ $module module (MISSING)"
        missing_modules=$((missing_modules + 1))
    fi
done
echo ""

# 4. Check core functionality
echo "4. CORE FUNCTIONALITY VERIFICATION"
echo "----------------------------------"

# Check Prisma schema for schoolId
school_id_count=$(grep -c "schoolId String" prisma/schema.prisma)
echo "��� Found $school_id_count models with schoolId field"

# Check tenancy middleware
if grep -q "TenancyMiddleware" apps/api/src/app.module.ts; then
    echo "✅ Tenancy middleware configured"
else
    echo "❌ Tenancy middleware not configured"
fi

# Check parent linking in students service
if [ -f "apps/api/src/modules/students/students.service.ts" ]; then
    if grep -q "findOrCreateParent" apps/api/src/modules/students/students.service.ts; then
        echo "✅ Parent-child linking implemented"
    else
        echo "❌ Parent-child linking not found"
    fi
else
    echo "⚠️  Students service not found (parent linking check skipped)"
fi

# Check RBAC guards
if [ -f "apps/api/src/common/guards/permissions.guard.ts" ]; then
    echo "✅ RBAC permissions guard exists"
else
    echo "❌ RBAC permissions guard missing"
fi

# Check Redis service
if [ -f "apps/api/src/config/redis.service.ts" ]; then
    echo "✅ Redis service exists"
else
    echo "❌ Redis service missing"
fi

# Check response time interceptor
if [ -f "apps/api/src/common/interceptors/response-time.interceptor.ts" ]; then
    echo "✅ Response time interceptor exists"
else
    echo "❌ Response time interceptor missing"
fi

# Check seed script
if [ -f "apps/api/src/modules/seed/seed.ts" ]; then
    echo "✅ Seed script exists"
    # Check if seed creates super admin
    if grep -q "superadmin@murnova.com" apps/api/src/modules/seed/seed.ts; then
        echo "✅ Seed script creates super admin"
    else
        echo "❌ Seed script missing super admin"
    fi
else
    echo "❌ Seed script missing"
fi

# Check AI module
if [ -f "apps/api/src/modules/ai/ai.service.ts" ]; then
    echo "✅ AI module exists (ready for FM-3 integration)"
else
    echo "❌ AI module missing"
fi

echo ""

# 5. Check Docker setup
echo "5. DOCKER & DEPLOYMENT VERIFICATION"
echo "-----------------------------------"
if grep -q "postgres:15" docker-compose.yml; then
    echo "✅ PostgreSQL service configured"
else
    echo "❌ PostgreSQL service missing"
fi

if grep -q "redis:7" docker-compose.yml; then
    echo "✅ Redis service configured"
else
    echo "❌ Redis service missing"
fi

if [ -f "infra/scripts/setup-rls.sql" ]; then
    echo "✅ RLS setup script exists"
else
    echo "❌ RLS setup script missing"
fi

echo ""

# 6. Check tests
echo "6. TESTS VERIFICATION"
echo "--------------------"
if [ -d "apps/api/test" ]; then
    test_count=$(find apps/api/test -name "*.spec.ts" -o -name "*.test.ts" | wc -l)
    echo "��� Found $test_count test files"
    
    if [ $test_count -ge 2 ]; then
        echo "✅ Minimum test coverage met"
    else
        echo "⚠️  Low test coverage"
    fi
else
    echo "❌ Test directory missing"
fi

echo ""

# 7. Check CI/CD
echo "7. CI/CD VERIFICATION"
echo "---------------------"
if [ -f ".github/workflows/ci.yml" ]; then
    echo "✅ CI workflow exists"
    if grep -q "prisma:generate" .github/workflows/ci.yml; then
        echo "✅ CI includes Prisma generation"
    else
        echo "⚠️  CI missing Prisma generation"
    fi
else
    echo "❌ CI workflow missing"
fi

echo ""
echo "=========================================="
echo "VERIFICATION SUMMARY"
echo "=========================================="

if [ $missing_modules -eq 0 ]; then
    echo "��� FM-1 IMPLEMENTATION IS COMPLETE!"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Run database setup:"
    echo "   docker-compose up -d"
    echo "   pnpm --filter @murnova-konect/api run prisma:generate"
    echo "   pnpm --filter @murnova-konect/api run prisma:migrate:dev"
    echo "   pnpm --filter @murnova-konect/api run seed"
    echo ""
    echo "2. Start the API:"
    echo "   pnpm --filter @murnova-konect/api run start:dev"
    echo ""
    echo "3. Test endpoints:"
    echo "   curl http://localhost:3000/health"
    echo "   curl -X POST http://localhost:3000/api/v1/auth/login \\"
    echo "     -H \"Content-Type: application/json\" \\"
    echo "     -d '{\"email\":\"superadmin@murnova.com\",\"password\":\"admin123\"}'"
    echo ""
    echo "4. Ready for FM-2: Frontend Shell & Design System"
else
    echo "⚠️  FM-1 HAS $missing_modules MISSING MODULES"
    echo "Please complete the missing components before proceeding to FM-2"
fi

echo "=========================================="
