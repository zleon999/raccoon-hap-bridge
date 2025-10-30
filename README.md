# Raccoon HAP Bridge

Home Assistant Add-on using `hap-nodejs` to create multiple configurable HomeKit accessories.

## Features

- Multiple devices support
- Configurable device name and type
- HAP server running inside Docker
- Works with Home Assistant Add-on system

## Installation

1. Add this repository to your Home Assistant Add-on store.
2. Install the "Raccoon HAP Bridge" add-on.
3. Start the add-on.

## Configuration

- **hap_port**: TCP port for the HAP server (default: 51826)
- **devices**: Array of devices to expose

Example:

```json
{
  "hap_port": 51826,
  "devices": [
    {"name": "Living Room Light", "type": "LIGHTBULB"},
    {"name": "Bedroom Fan", "type": "FAN"}
  ]
}
