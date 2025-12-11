#!/bin/bash

echo "=== AUTHENTICATION TEST SCRIPT ==="
echo ""
echo "Make sure your API is running on http://localhost:3000"
echo ""

# Test 1: Health endpoint
echo "1. Testing health endpoint (should be public):"
curl -s -w "\nStatus: %{http_code}\n" http://localhost:3000/api/health
echo ""

# Test 2: Login endpoint
echo "2. Testing login endpoint with superadmin:"
echo "Request: POST /api/auth/login"
echo 'Body: {"email":"superadmin@murnova.com","password":"admin123"}'
echo ""
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@murnova.com","password":"admin123"}')

# Split response and status code
HTTP_CODE=$(echo "$RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "Response:"
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Success! HTTP $HTTP_CODE"
  echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
  
  # Extract token if response is JSON
  if echo "$RESPONSE_BODY" | grep -q "accessToken"; then
    TOKEN=$(echo "$RESPONSE_BODY" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
    if [ -n "$TOKEN" ]; then
      echo ""
      echo "3. Testing protected endpoint with token:"
      echo "Request: GET /api/users"
      echo "Authorization: Bearer $TOKEN"
      curl -s -w "\nStatus: %{http_code}\n" -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/users
    fi
  fi
elif [ "$HTTP_CODE" = "401" ]; then
  echo "❌ Unauthorized! HTTP $HTTP_CODE"
  echo "Possible issues:"
  echo "  - Wrong credentials"
  echo "  - User doesn't exist"
  echo "  - LocalAuthGuard not working"
  echo "  - Password hash mismatch"
  echo ""
  echo "Response body:"
  echo "$RESPONSE_BODY"
else
  echo "⚠️  Unexpected response: HTTP $HTTP_CODE"
  echo "Response body:"
  echo "$RESPONSE_BODY"
fi

echo ""
echo "=== TROUBLESHOOTING ==="
echo "If login returns 401, check:"
echo "1. Run: pnpm prisma studio (check if superadmin exists)"
echo "2. Check password hash with bcrypt.compare"
echo "3. Add console.log to LocalStrategy.validate()"
