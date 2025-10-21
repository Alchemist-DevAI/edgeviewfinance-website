#!/usr/bin/env node

/**
 * MCP Playwright Initialization Script
 * Prevents browser conflicts by managing isolated browser profiles
 * For use with Claude Code (Cursor) MCP integration
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PlaywrightMCPManager {
    constructor() {
        this.projectRoot = process.cwd();
        this.browsersDir = path.join(this.projectRoot, '.playwright-browsers');
        this.mcpProfilesDir = path.join(this.projectRoot, '.mcp-profiles');
        this.lockFile = path.join(this.projectRoot, '.mcp-playwright.lock');
        this.sessionId = `mcp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    log(message) {
        console.log(`[MCP-Playwright] ${new Date().toISOString()}: ${message}`);
    }

    error(message, err = null) {
        console.error(`[MCP-Playwright ERROR] ${new Date().toISOString()}: ${message}`);
        if (err) console.error(err);
    }

    // Clean up any existing processes and lock files
    cleanup() {
        try {
            this.log('Cleaning up existing processes and profiles...');

            // Kill any existing Playwright processes - be more selective
            try {
                execSync('pkill -f "playwright.*mcp" || true', { stdio: 'ignore', timeout: 5000 });
                this.log('Terminated existing MCP Playwright processes');
            } catch (e) {
                this.log('No MCP Playwright processes to terminate');
            }

            // Remove lock files
            if (fs.existsSync(this.lockFile)) {
                fs.unlinkSync(this.lockFile);
                this.log('Removed existing lock file');
            }

            // Clean up old MCP profiles (keep last 3 for debugging)
            if (fs.existsSync(this.mcpProfilesDir)) {
                try {
                    const profiles = fs.readdirSync(this.mcpProfilesDir)
                        .filter(dir => dir.startsWith('mcp-'))
                        .map(dir => {
                            const profilePath = path.join(this.mcpProfilesDir, dir);
                            try {
                                return {
                                    name: dir,
                                    path: profilePath,
                                    mtime: fs.statSync(profilePath).mtime
                                };
                            } catch (err) {
                                return null;
                            }
                        })
                        .filter(Boolean)
                        .sort((a, b) => b.mtime - a.mtime);

                    // Remove old profiles, keep latest 3
                    profiles.slice(3).forEach(profile => {
                        try {
                            fs.rmSync(profile.path, { recursive: true, force: true });
                            this.log(`Removed old profile: ${profile.name}`);
                        } catch (err) {
                            this.log(`Could not remove profile ${profile.name}: ${err.message}`);
                        }
                    });
                } catch (err) {
                    this.log(`Could not clean profiles: ${err.message}`);
                }
            }

            this.log('Cleanup completed');
        } catch (err) {
            this.error('Error during cleanup:', err);
        }
    }

    // Create isolated browser profile
    createIsolatedProfile() {
        try {
            if (!fs.existsSync(this.mcpProfilesDir)) {
                fs.mkdirSync(this.mcpProfilesDir, { recursive: true });
            }

            const profilePath = path.join(this.mcpProfilesDir, this.sessionId);
            fs.mkdirSync(profilePath, { recursive: true });

            this.log(`Created isolated profile: ${this.sessionId}`);
            return profilePath;
        } catch (err) {
            this.error('Failed to create isolated profile:', err);
            throw err;
        }
    }

    // Check if Playwright is properly installed
    checkInstallation() {
        try {
            this.log('Checking Playwright installation...');

            const playwrightPath = path.join(this.projectRoot, 'node_modules', '.bin', 'playwright');
            if (!fs.existsSync(playwrightPath)) {
                throw new Error('Playwright not found in node_modules');
            }

            // Quick check if Chromium exists
            let chromiumExists = false;
            try {
                chromiumExists = fs.existsSync(path.join(this.browsersDir, 'chromium-1187'));
                if (!chromiumExists && fs.existsSync(this.browsersDir)) {
                    const browserDirs = fs.readdirSync(this.browsersDir, { withFileTypes: true });
                    chromiumExists = browserDirs.some(dirent => dirent.isDirectory() && dirent.name.startsWith('chromium'));
                }
            } catch (err) {
                this.log('Could not check for existing Chromium installation');
            }

            if (!chromiumExists) {
                this.log('Installing Chromium browser...');
                // Only install if not present
                execSync(`"${playwrightPath}" install chromium`, {
                    stdio: 'pipe',
                    timeout: 30000 // 30 second timeout
                });
            }

            this.log('Playwright installation verified');
            return true;
        } catch (err) {
            this.error('Playwright installation check failed:', err);
            return false;
        }
    }

    // Create lock file with session information
    createLockFile(profilePath) {
        const lockData = {
            sessionId: this.sessionId,
            profilePath,
            pid: process.pid,
            timestamp: new Date().toISOString(),
            hostname: os.hostname()
        };

        fs.writeFileSync(this.lockFile, JSON.stringify(lockData, null, 2));
        this.log(`Lock file created: ${this.lockFile}`);
    }

    // Generate MCP server configuration for isolated mode
    generateMCPConfig(profilePath) {
        const config = {
            "mcpServers": {
                "playwright": {
                    "command": "node",
                    "args": [
                        path.join(this.projectRoot, "node_modules", "@playwright/mcp", "dist", "index.js")
                    ],
                    "env": {
                        "PLAYWRIGHT_BROWSERS_PATH": this.browsersDir,
                        "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD": "false",
                        "PLAYWRIGHT_BROWSER_PROFILE": profilePath,
                        "PLAYWRIGHT_ISOLATED": "true",
                        "MCP_SESSION_ID": this.sessionId
                    }
                }
            }
        };

        const configPath = path.join(this.projectRoot, '.mcp-config.json');
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        this.log(`MCP configuration generated: ${configPath}`);

        return config;
    }

    // Initialize everything
    async initialize() {
        try {
            this.log('Initializing MCP Playwright setup...');

            // Step 1: Cleanup
            this.cleanup();

            // Step 2: Check installation
            if (!this.checkInstallation()) {
                throw new Error('Playwright installation failed');
            }

            // Step 3: Create isolated profile
            const profilePath = this.createIsolatedProfile();

            // Step 4: Create lock file
            this.createLockFile(profilePath);

            // Step 5: Generate MCP config
            this.generateMCPConfig(profilePath);

            this.log('MCP Playwright initialization completed successfully');
            this.log(`Session ID: ${this.sessionId}`);
            this.log(`Profile Path: ${profilePath}`);

            return {
                success: true,
                sessionId: this.sessionId,
                profilePath,
                lockFile: this.lockFile
            };

        } catch (err) {
            this.error('Initialization failed:', err);
            return {
                success: false,
                error: err.message
            };
        }
    }

    // Status check
    status() {
        try {
            if (!fs.existsSync(this.lockFile)) {
                return { active: false, message: 'No active MCP Playwright session' };
            }

            const lockData = JSON.parse(fs.readFileSync(this.lockFile, 'utf8'));

            return {
                active: true,
                sessionId: lockData.sessionId,
                profilePath: lockData.profilePath,
                pid: lockData.pid,
                timestamp: lockData.timestamp,
                hostname: lockData.hostname
            };
        } catch (err) {
            return { active: false, error: err.message };
        }
    }

    // Shutdown
    shutdown() {
        try {
            this.log('Shutting down MCP Playwright session...');

            // Remove lock file
            if (fs.existsSync(this.lockFile)) {
                fs.unlinkSync(this.lockFile);
                this.log('Lock file removed');
            }

            // Kill processes
            try {
                execSync('pkill -f playwright', { stdio: 'ignore' });
                this.log('Playwright processes terminated');
            } catch (e) {
                // Expected if no processes found
            }

            this.log('Shutdown completed');
            return { success: true };
        } catch (err) {
            this.error('Shutdown failed:', err);
            return { success: false, error: err.message };
        }
    }
}

// CLI interface
const isMainModule = import.meta.url === `file://${__filename}`;

if (isMainModule || process.argv[1]?.includes('mcp-playwright-init.js')) {
    const manager = new PlaywrightMCPManager();
    const command = process.argv[2] || 'init';

    console.log(`[DEBUG] Running command: ${command}`);
    console.log(`[DEBUG] Arguments: ${JSON.stringify(process.argv)}`);

    switch (command) {
        case 'init':
            manager.initialize().then(result => {
                console.log(`[DEBUG] Initialize result:`, result);
                process.exit(result.success ? 0 : 1);
            }).catch(err => {
                console.error(`[DEBUG] Initialize error:`, err);
                process.exit(1);
            });
            break;

        case 'status':
            const status = manager.status();
            console.log(JSON.stringify(status, null, 2));
            break;

        case 'shutdown':
            const shutdownResult = manager.shutdown();
            process.exit(shutdownResult.success ? 0 : 1);
            break;

        case 'cleanup':
            manager.cleanup();
            break;

        default:
            console.log('Usage: node mcp-playwright-init.js [init|status|shutdown|cleanup]');
            process.exit(1);
    }
}

export default PlaywrightMCPManager;