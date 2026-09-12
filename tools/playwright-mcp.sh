#!/bin/sh
# Launches the Playwright MCP server for Claude Code (see .mcp.json).
#
# On a normal machine this uses Playwright MCP's default browser (Google Chrome).
# In Claude Code on the web, Chrome is absent but a Chromium build is pre-installed
# under $PLAYWRIGHT_BROWSERS_PATH, so we point the server at that instead. That
# container runs as root without user namespaces, so Chromium's own sandbox has
# to be turned off there (the container is the sandbox).
set -e
if [ -n "$PLAYWRIGHT_BROWSERS_PATH" ] && [ -x "$PLAYWRIGHT_BROWSERS_PATH/chromium" ]; then
  exec npx -y @playwright/mcp@latest --headless --no-sandbox \
    --executable-path "$PLAYWRIGHT_BROWSERS_PATH/chromium" "$@"
fi
exec npx -y @playwright/mcp@latest --headless "$@"
