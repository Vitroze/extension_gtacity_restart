# Extension GtaCityRP Restart

`Extension GtaCityRP` is a simple browser extension that displays the remaining time until the next server restart on the GtaCityRP forum. It is designed to work with Chrome, Edge, and Firefox browsers.

## Supported websites

The extension runs on:

- `gtacityrp.fr` (Only the main page where the list of servers is displayed)

## Quick installation

### Chrome / Edge

1. Open your browser.
2. Go to `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `extension_gtacity_restart` project folder.
6. The extension will appear in your browser.

### Firefox

1. Open Firefox.
2. Go to `about:addons`.
3. Select the **Extensions** tab.
4. Enable **Developer mode**.
5. Click **Load Temporary Add-on**.
6. Select the `manifest.json` file from the `extension_gtacity_restart` project folder.
7. The extension will be installed temporarily for testing.

## Usage

Once installed:

1. Open the [GtaCityRP Forum](https://gtacityrp.fr/index.php) in your browser.
2. View the list of servers on the main page
3. You'll see when the next reboot is scheduled

No additional configuration is required.

## Project structure

```text
extension_gtacity_restart/
├── script.js
├── manifest.json
└── README.md
```
