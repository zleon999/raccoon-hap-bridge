#!/usr/bin/env bash
# Exit on error
set -e

CONFIG_FILE="/data/options.json"

if [ -f "$CONFIG_FILE" ]; then
    HAP_PORT=$(jq '.hap_port' "$CONFIG_FILE")
    DEVICES=$(jq -c '.devices' "$CONFIG_FILE")
else
    HAP_PORT=51826
    DEVICES='[{"name":"Living Room Light","type":"LIGHTBULB"}]'
fi

export HAP_PORT DEVICES

echo "Starting Raccoon HAP Bridge..."
node index.js
