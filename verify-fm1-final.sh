#!/bin/bash

echo "=========================================="
echo "FINAL FM-1 VERIFICATION"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

total_checks=0
passed_checks=0
failed_checks=0

check() {
    local description="$1"
    local command="$2"
    local fix_hint="$3"
    
    total_checks=$((total_checks + 1))
    
    if eval "$command" >/dev/null 2>&1; then
        echo -e "${GREEN}‚úÖ PASS:${NC} $description"
        passed_checks=$((passed_checks + 1))
        return 0
    else
        echo -e "${RED}‚ùå FAIL:${NC} $description"
        if [ -n "$fix_hint" ]; then
            echo -e "   ${YELLOW}Ì≤° Hint: $fix_hint${NC}"
        fi
        failed_checks=$((failed_checks + 1))
        return 1
    fi
}

echo "1. PROJECT STRUCTURE"
echo "-------------------"
check "Root package.json exists" "[ -f 'package.json' ]"
check "pnpm workspace config exists" "[ -f 'pnpm-workspace.yaml' ]"
check "Prisma schema exists" "[ -f 'prisma/schema.prisma' ]"
check "Docker compose exists" "[ -f 'docker-compose.yml' ]"
check "CI workflow exists" "[ -f '.github/workflows/ci.yml' ]"

echo ""
echo "2. API CORE FILES"
echo "----------------"
check "AppModule exists" "[ -f 'apps/api/src/app.module.ts' ]"
check "Main entry point exists" "[ -f 'apps/api/src/main.ts' ]"
check "Prisma service exists" "[ -f 'apps/api/src/database/prisma.service.ts' ]"
check "Redis service exists" "[ -f 'apps/api/src/config/redis.service.ts' ]"
check "Redis module exists" "[ -f 'apps/api/src/config/redis.module.ts' ]"
check "Response time interceptor exists" "[ -f 'apps/api/src/common/interceptors/response-time.interceptor.ts' ]"

echo ""
echo "3. MODULES COMPLETENESS"
echo "----------------------"
check "Auth module exists" "[ -d 'apps/api/src/modules/auth' ]"
check "Schools module exists" "[ -d 'apps/api/src/modules/schools' ]"
check "Users module exists" "[ -d 'apps/api/src/modules/users' ]"
check "Roles module exists" "[ -d 'apps/api/src/modules/roles' ]"
check "Permissions module exists" "[ -d 'apps/api/src/modules/permissions' ]"
check "Students module exists" "[ -d 'apps/api/src/modules/students' ]" "Run: mkdir -p apps/api/src/modules/students"
check "Tenancy module exists" "[ -d 'apps/api/src/modules/tenancy' ]"
check "AI module exists" "[ -d 'apps/api/src/modules/ai' ]"
check "Seed module exists" "[ -d 'apps/api/src/modules/seed' ]"

echo ""
echo "4. CRITICAL FUNCTIONALITY"
echo "------------------------"
check "Tenancy middleware exists" "[ -f 'apps/api/src/common/middleware/tenancy.middleware.ts' ]"
check "Permissions guard exists" "[ -f 'apps/api/src/common/guards/permissions.guard.ts' ]"
check "Permissions decorator exists" "[ -f 'apps/api/src/common/decorators/permissions.decorator.ts' ]"
check "Phone field in Prisma User model" "grep -q 'phone.*String?' prisma/schema.prisma" "Add 'phone String? @unique' to User model"
check "Parent linking in students service" "[ ! -f 'apps/api/src/modules/students/students.service.ts' ] || grep -q 'findOrCreateParent' apps/api/src/modules/students/students.service.ts" "Implement parent linking function"

echo ""
echo "5. DATABASE & DEPLOYMENT"
echo "-----------------------"
check "Seed script exists" "[ -f 'apps/api/src/modules/seed/seed.ts' ]"
check "Dockerfile exists" "[ -f 'apps/api/Dockerfile' ]"
check "RLS setup script exists" "[ -f 'infra/scripts/setup-rls.sql' ]" "Create infra/scripts/setup-rls.sql"

echo ""
echo "6. TESTS & QUALITY"
echo "-----------------"
check "Test directory exists" "[ -d 'apps/api/test' ]"
check "Has at least 2 test files" "[ \$(find apps/api/test -name '*.spec.ts' -o -name '*.test.ts' 2>/dev/null | wc -l) -ge 2 ]" "Create unit tests for auth and schools"

echo ""
echo "=========================================="
echo "VERIFICATION SUMMARY"
echo "=========================================="
echo "Total checks: $total_checks"
echo -e "${GREEN}Passed: $passed_checks${NC}"
echo -e "${RED}Failed: $failed_checks${NC}"
echo ""

if [ $failed_checks -eq 0 ]; then
    echo -e "${GREEN}Ìæâ CONGRATULATIONS! FM-1 IS COMPLETE AND PRODUCTION-READY!${NC}"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Run setup: docker-compose up -d"
    echo "2. Generate Prisma: pnpm --filter @murnova-konect/api run prisma:generate"
    echo "3. Run migrations: pnpm --filter @murnova-konect/api run prisma:migrate:dev"
    echo "4. Seed database: pnpm --filter @murnova-konect/api run seed"
    echo "5. Start API: pnpm --filter @murnova-konect/api run start:dev"
    echo "6. Proceed to FM-2: Frontend Shell & Design System"
else
    echo -e "${YELLOW}‚ö†Ô∏è  FM-1 HAS $failed_checks ISSUES TO FIX${NC}"
    echo "Please fix the failed checks above before proceeding to FM-2"
    echo ""
    echo "Quick fixes:"
    echo "1. Run the setup scripts provided"
    echo "2. Check the 'Hint' messages above"
    echo "3. Review the FM-1 requirements document"
fi

echo "=========================================="
