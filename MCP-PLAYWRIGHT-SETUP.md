# MCP Playwright Setup & Conflict Resolution

## Overview
This document describes the solution for preventing Playwright MCP browser conflicts in Claude Code (Cursor) development environment.

## Problem Solved
- Multiple Playwright MCP processes causing browser conflicts
- "Browser is already in use" errors
- Session persistence issues across Claude Code sessions
- Lack of proper process isolation

## Solution Components

### 1. MCP Playwright Manager Script
**File**: `scripts/mcp-playwright-init.js`

A comprehensive Node.js script that manages Playwright MCP server lifecycle with:
- **Isolated Browser Profiles**: Each session gets a unique browser profile
- **Process Management**: Clean startup/shutdown with proper cleanup
- **Session Tracking**: Lock files and session IDs prevent conflicts
- **Error Handling**: Robust error handling and recovery mechanisms

### 2. Package.json Scripts
Added npm scripts for easy management:
```bash
npm run mcp:playwright:init      # Initialize MCP Playwright
npm run mcp:playwright:status    # Check current status
npm run mcp:playwright:shutdown  # Clean shutdown
npm run mcp:playwright:cleanup   # Force cleanup
```

### 3. Shell Script Wrapper
**File**: `scripts/start-mcp-playwright.sh`
Bash script for easy initialization from command line.

## Usage Instructions

### Quick Start
```bash
cd /mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure
npm run mcp:playwright:init
```

### Manual Initialization
```bash
node scripts/mcp-playwright-init.js init
```

### Check Status
```bash
npm run mcp:playwright:status
```

### Clean Shutdown
```bash
npm run mcp:playwright:shutdown
```

## How It Works

### Initialization Process
1. **Cleanup**: Terminates existing MCP Playwright processes
2. **Profile Creation**: Creates isolated browser profile with unique session ID
3. **Lock File**: Creates session tracking file with metadata
4. **Configuration**: Generates MCP server config with isolation settings
5. **Verification**: Ensures Playwright browsers are properly installed

### Isolation Mechanism
- **Unique Session IDs**: Format `mcp-{timestamp}-{randomId}`
- **Isolated Profiles**: Each session uses separate browser profile directory
- **Environment Variables**:
  - `PLAYWRIGHT_BROWSER_PROFILE`: Points to isolated profile
  - `PLAYWRIGHT_ISOLATED`: Enables isolation mode
  - `MCP_SESSION_ID`: Session tracking

### File Structure
```
project-root/
├── .mcp-config.json              # Generated MCP server configuration
├── .mcp-playwright.lock          # Session lock file
├── .mcp-profiles/                # Isolated browser profiles
│   └── mcp-{sessionId}/         # Per-session profile directory
├── .playwright-browsers/         # Playwright browser installations
│   ├── chromium-1187/
│   └── ffmpeg-1011/
└── scripts/
    ├── mcp-playwright-init.js    # Main management script
    └── start-mcp-playwright.sh   # Shell wrapper
```

## Configuration Details

### MCP Server Configuration
The script generates `.mcp-config.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": [
        "path/to/node_modules/@playwright/mcp/dist/index.js"
      ],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "path/to/.playwright-browsers",
        "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD": "false",
        "PLAYWRIGHT_BROWSER_PROFILE": "path/to/.mcp-profiles/mcp-sessionId",
        "PLAYWRIGHT_ISOLATED": "true",
        "MCP_SESSION_ID": "unique-session-id"
      }
    }
  }
}
```

### Session Lock File
`.mcp-playwright.lock` contains:
```json
{
  "sessionId": "mcp-1758017538362-etmhpup1c",
  "profilePath": "/path/to/.mcp-profiles/mcp-sessionId",
  "pid": 12345,
  "timestamp": "2025-09-16T10:12:18.386Z",
  "hostname": "EVFDSPLaptop"
}
```

## Troubleshooting

### Common Issues

#### 1. "Browser is already in use" Error
**Solution**: Run cleanup and reinitialize
```bash
npm run mcp:playwright:cleanup
npm run mcp:playwright:init
```

#### 2. Script Hangs During Initialization
**Causes**:
- Existing processes not terminating
- Browser download timeout

**Solution**:
```bash
pkill -f playwright
npm run mcp:playwright:cleanup
npm run mcp:playwright:init
```

#### 3. Permission Errors
**Solution**: Ensure proper file permissions
```bash
chmod +x scripts/start-mcp-playwright.sh
```

#### 4. Node.js Module Errors
**Solution**: Verify ES module configuration
- Project has `"type": "module"` in package.json
- Script uses ES import syntax

### Debug Mode
The script includes debug output showing:
- Command execution
- Process arguments
- Initialization steps
- Error details

### Manual Recovery
If all else fails:
```bash
# Kill all Playwright processes
pkill -f playwright

# Remove all MCP files
rm -rf .mcp-*

# Clean browser profiles
rm -rf .mcp-profiles

# Reinitialize
npm run mcp:playwright:init
```

## Best Practices

### Development Workflow
1. **Start Session**: Run `npm run mcp:playwright:init` before using Playwright MCP tools
2. **Check Status**: Use `npm run mcp:playwright:status` to verify session health
3. **Clean Shutdown**: Run `npm run mcp:playwright:shutdown` when done

### Session Management
- **One Session Per Project**: Don't run multiple sessions in same project
- **Clean Shutdown**: Always shutdown properly to avoid orphaned processes
- **Status Monitoring**: Check status if experiencing issues

### Maintenance
- **Profile Cleanup**: Script automatically keeps latest 3 profiles
- **Log Monitoring**: Watch script output for errors
- **Regular Testing**: Verify setup after system updates

## Integration with Claude Code

### MCP Server Registration

**Note**: The configuration generated by this script provides the isolated setup needed for Playwright MCP. However, Claude Code (Cursor) requires MCP server configuration in its main configuration file.

#### For Claude Code (Cursor):
1. Initialize session: `npm run mcp:playwright:init`
2. The generated `.mcp-config.json` contains the server configuration with isolation
3. Copy the server configuration to your Claude Code MCP configuration file
4. The isolated environment variables ensure conflict-free operation

#### Configuration Example for Claude Code:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": [
        "/absolute/path/to/node_modules/@playwright/mcp/dist/index.js"
      ],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "/absolute/path/to/.playwright-browsers",
        "PLAYWRIGHT_BROWSER_PROFILE": "/absolute/path/to/.mcp-profiles/mcp-sessionId",
        "PLAYWRIGHT_ISOLATED": "true",
        "MCP_SESSION_ID": "unique-session-id"
      }
    }
  }
}
```

### Environment Variables
The script sets up proper environment variables for:
- Browser path isolation
- Profile separation
- Session tracking
- Conflict prevention

## Security Considerations

### Browser Profile Isolation
- Each session has separate profile directory
- No data sharing between sessions
- Automatic cleanup of old profiles

### Process Management
- Selective process termination (only MCP Playwright)
- Session lock files prevent multiple instances
- Proper error handling and recovery

## Future Improvements

### Potential Enhancements
1. **Health Monitoring**: Background health checks
2. **Auto-Recovery**: Automatic session recovery on failure
3. **Multi-Project Support**: Cross-project session management
4. **Performance Monitoring**: Session performance metrics

### Configuration Options
- **Browser Selection**: Support for Firefox, Safari
- **Profile Persistence**: Optional profile persistence
- **Logging Levels**: Configurable debug output

## Files Created/Modified

### New Files
- `scripts/mcp-playwright-init.js` - Main management script
- `scripts/start-mcp-playwright.sh` - Shell wrapper
- `MCP-PLAYWRIGHT-SETUP.md` - This documentation

### Modified Files
- `package.json` - Added npm scripts for MCP management

### Generated Files
- `.mcp-config.json` - MCP server configuration
- `.mcp-playwright.lock` - Session lock file
- `.mcp-profiles/` - Isolated browser profile directories

## Conclusion

This solution provides robust, conflict-free Playwright MCP integration for Claude Code development environment. The isolated session approach ensures reliable browser automation without the common issues of process conflicts and browser lockups.

The automated management scripts make it easy to maintain proper session hygiene and recover from any issues quickly.