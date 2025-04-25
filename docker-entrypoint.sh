#!/bin/sh
set -e

# Deploy commands to Discord
node deploy-commands-global.js

# Start main application
exec node index.js