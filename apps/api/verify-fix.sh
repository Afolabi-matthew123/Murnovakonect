#!/bin/bash

echo "=== VERIFYING AUTHENTICATION FIX ==="
echo ""

echo "1. Checking AuthController decorators:"
echo "--------------------------------------"
if grep -A2 "async login" src/modules/auth/auth.controller.ts | grep -q "@Public()"; then
  echo "✅ Login endpoint has @Public()"
else
  echo "❌ Login endpoint missing @Public()"
fi

if grep -A2 "async refresh" src/modules/auth/auth.controller.ts | grep -q "@Public()"; then
  echo "✅ Refresh endpoint has @Public()"
else
  echo "❌ Refresh endpoint missing @Public()"
fi

if grep -A2 "async register" src/modules/auth/auth.controller.ts | grep -q "@Public()"; then
  echo "✅ Register endpoint has @Public()"
else
  echo "❌ Register endpoint missing @Public()"
fi

echo ""
echo "2. Checking AuthController login method:"
echo "----------------------------------------"
if grep -q "loginWithUser" src/modules/auth/auth.controller.ts; then
  echo "✅ AuthController calls loginWithUser(user)"
else
  echo "❌ AuthController doesn't call loginWithUser"
fi

echo ""
echo "3. Checking AuthService methods:"
echo "--------------------------------"
if grep -q "async loginWithUser" src/modules/auth/auth.service.ts; then
  echo "✅ AuthService has loginWithUser method"
else
  echo "❌ AuthService missing loginWithUser method"
fi

if grep -q "async generateTokens" src/modules/auth/auth.service.ts; then
  echo "✅ AuthService has generateTokens method"
else
  echo "❌ AuthService missing generateTokens method"
fi

echo ""
echo "4. Checking HealthController:"
echo "-----------------------------"
if [ -f "src/modules/health/health.controller.ts" ]; then
  if grep -q "@Public()" src/modules/health/health.controller.ts; then
    echo "✅ HealthController has @Public()"
  else
    echo "❌ HealthController missing @Public()"
  fi
else
  echo "⚠️ HealthController not found"
fi

echo ""
echo "5. Checking JwtAuthGuard:"
echo "-------------------------"
if [ -f "src/common/guards/jwt-auth.guard.ts" ]; then
  if grep -q "Reflector" src/common/guards/jwt-auth.guard.ts && grep -q "IS_PUBLIC_KEY" src/common/guards/jwt-auth.guard.ts; then
    echo "✅ JwtAuthGuard has Reflector and checks IS_PUBLIC_KEY"
  else
    echo "❌ JwtAuthGuard missing Reflector or IS_PUBLIC_KEY"
  fi
else
  echo "⚠️ JwtAuthGuard not found"
fi

echo ""
echo "=== SUMMARY ==="
echo "All checks should show ✅ for authentication to work properly."
echo "Restart your API and test with:"
echo "curl -X POST http://localhost:3000/api/auth/login \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\":\"superadmin@murnova.com\",\"password\":\"admin123\"}'"
