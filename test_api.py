#!/usr/bin/env python3
import json
import os
import urllib.request
import urllib.error

# Determine base URL
codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
    print(f"Testing in Codespace: {codespace_name}")
else:
    base_url = "http://localhost:8000"
    print("Testing locally")


print(f"Base URL: {base_url}\n")

# API endpoints to test
endpoints = [
    "/api/",
    "/api/users/",
    "/api/teams/",
    "/api/activities/",
    "/api/workouts/",
    "/api/leaderboards/"
]

# Test each endpoint
for endpoint in endpoints:
    url = f"{base_url}{endpoint}"
    print(f"=== Testing {endpoint} ===")
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            data = response.read()
            status = response.status
            print(f"Status: {status}")
            
            # Try to parse and pretty print JSON
            try:
                json_data = json.loads(data)
                print(json.dumps(json_data, indent=2)[:500])  # Print first 500 chars
                if len(json.dumps(json_data)) > 500:
                    print("... (truncated)")
            except json.JSONDecodeError:
                print(data.decode('utf-8')[:500])
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")
    except Exception as e:
        print(f"Error: {str(e)}")
    print()

print("=== API Testing Complete ===")
