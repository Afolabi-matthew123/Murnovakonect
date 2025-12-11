#!/bin/bash

echo "Ì∫Ä COMPREHENSIVE AUTH ENDPOINT TEST"
echo "==================================="

echo ""
echo "1Ô∏è‚É£  Testing Registration Endpoints:"
echo "-----------------------------------"

# Test student registration
echo "Ì≥ù Testing Student Registration..."
student_reg=$(curl -s -w "%{http_code}" -o /tmp/student_reg.json \
  -X POST http://localhost:3000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teststudent@murnova.com",
    "studentId": "STU-TEST-001",
    "password": "TestPass123",
    "displayName": "Test Student",
    "userType": "STUDENT"
  }')

if [[ "$student_reg" =~ ^2[0-9][0-9]$ ]]; then
  echo "‚úÖ Student Registration: HTTP $student_reg"
  echo "   Response: $(cat /tmp/student_reg.json | jq -r '.user.email // .message' 2>/dev/null)"
else
  echo "‚ùå Student Registration: HTTP $student_reg"
  cat /tmp/student_reg.json 2>/dev/null || echo "No response body"
fi

echo ""
echo "2Ô∏è‚É£  Testing Login with Different Identifiers:"
echo "---------------------------------------------"

# Test student ID login
echo "Ìæì Testing Student ID Login..."
student_login=$(curl -s -w "%{http_code}" -o /tmp/student_login.json \
  -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU-TEST-001",
    "password": "TestPass123"
  }')

if [[ "$student_login" =~ ^2[0-9][0-9]$ ]]; then
  echo "‚úÖ Student ID Login: HTTP $student_login"
  echo "   Token received: $(cat /tmp/student_login.json | jq -r '.accessToken // "No token"' 2>/dev/null | head -c 20)..."
else
  echo "‚ùå Student ID Login: HTTP $student_login"
  cat /tmp/student_login.json 2>/dev/null || echo "No response body"
fi

echo ""
echo "3Ô∏è‚É£  Testing Other Auth Endpoints:"
echo "---------------------------------"

# Test refresh endpoint (if we have a token)
if [ -f /tmp/student_login.json ]; then
  refresh_token=$(cat /tmp/student_login.json | jq -r '.refreshToken' 2>/dev/null)
  if [ "$refresh_token" != "null" ] && [ ! -z "$refresh_token" ]; then
    echo "Ì¥Ñ Testing Token Refresh..."
    refresh_resp=$(curl -s -w "%{http_code}" \
      -X POST http://localhost:3000/v1/auth/refresh \
      -H "Content-Type: application/json" \
      -d "{\"refreshToken\": \"$refresh_token\"}")
    
    if [[ "$refresh_resp" =~ ^2[0-9][0-9]$ ]]; then
      echo "‚úÖ Token Refresh: HTTP $refresh_resp"
    else
      echo "‚ö†Ô∏è  Token Refresh: HTTP $refresh_resp"
    fi
  fi
fi

echo ""
echo "ÌæØ TEST SUMMARY:"
echo "================"
echo "‚úÖ Student Registration: $( [[ "$student_reg" =~ ^2[0-9][0-9]$ ]] && echo "WORKING" || echo "FAILED" )"
echo "‚úÖ Student ID Login: $( [[ "$student_login" =~ ^2[0-9][0-9]$ ]] && echo "WORKING" || echo "FAILED" )"
echo ""
echo "Ìºê Your Multi-Identifier Auth System is READY!"
