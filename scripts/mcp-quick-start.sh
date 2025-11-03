#!/bin/bash

# Quick Start Script for MCP Playwright
# Provides easy commands for common operations

set -e

PROJECT_ROOT="/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure"

echo "======================================"
echo "EVFBS MCP Playwright Quick Start"
echo "======================================"

cd "$PROJECT_ROOT"

case "${1:-help}" in
    "start"|"init")
        echo "🚀 Initializing MCP Playwright..."
        npm run mcp:playwright:init
        ;;

    "status")
        echo "📊 Checking MCP Playwright status..."
        npm run mcp:playwright:status
        ;;

    "stop"|"shutdown")
        echo "🛑 Shutting down MCP Playwright..."
        npm run mcp:playwright:shutdown
        ;;

    "clean"|"cleanup")
        echo "🧹 Cleaning up MCP Playwright..."
        npm run mcp:playwright:cleanup
        ;;

    "restart")
        echo "🔄 Restarting MCP Playwright..."
        npm run mcp:playwright:shutdown
        sleep 2
        npm run mcp:playwright:init
        ;;

    "config")
        echo "⚙️ Current MCP Configuration:"
        if [ -f ".mcp-config.json" ]; then
            cat .mcp-config.json | jq .
        else
            echo "No configuration found. Run 'start' first."
        fi
        ;;

    "help"|*)
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  start     - Initialize MCP Playwright session"
        echo "  status    - Check current session status"
        echo "  stop      - Shutdown current session"
        echo "  clean     - Force cleanup all sessions"
        echo "  restart   - Restart current session"
        echo "  config    - Show current configuration"
        echo "  help      - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 start     # Start new session"
        echo "  $0 status    # Check if running"
        echo "  $0 restart   # Clean restart"
        ;;
esac