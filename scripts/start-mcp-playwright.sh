#!/bin/bash

# MCP Playwright Startup Script
# Prevents browser conflicts for Claude Code (Cursor) MCP integration

set -e

PROJECT_ROOT="/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure"
SCRIPT_PATH="$PROJECT_ROOT/scripts/mcp-playwright-init.js"

echo "=========================================="
echo "MCP Playwright Startup Script"
echo "Project: $PROJECT_ROOT"
echo "=========================================="

# Change to project directory
cd "$PROJECT_ROOT"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    exit 1
fi

# Check if the initialization script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "ERROR: MCP Playwright initialization script not found: $SCRIPT_PATH"
    exit 1
fi

# Run initialization
echo "Initializing MCP Playwright..."
node "$SCRIPT_PATH" init

if [ $? -eq 0 ]; then
    echo "✅ MCP Playwright initialized successfully!"
    echo ""
    echo "You can now use Playwright MCP tools in Claude Code without conflicts."
    echo ""
    echo "To check status: node scripts/mcp-playwright-init.js status"
    echo "To shutdown:     node scripts/mcp-playwright-init.js shutdown"
    echo ""
else
    echo "❌ MCP Playwright initialization failed!"
    exit 1
fi