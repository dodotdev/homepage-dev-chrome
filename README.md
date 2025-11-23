# Homepage.dev Chrome Extension

> **Version 0.3 Beta**

Transform every new tab into your personalized [Homepage.dev](https://homepage.dev) dashboard.

## Features

- **New Tab Override** - Every new tab opens your Homepage.dev dashboard instantly
- **Quick Access Icon** - Click the extension icon to open Homepage.dev anytime
- **Smart Tab Handling** - Focuses existing Homepage.dev tab if already open, or opens a new one
- **Lightweight** - Minimal footprint, instant redirects, no tracking

## Installation

### Chrome Web Store
*(Coming soon)*

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the folder containing this extension

## Usage

- **New Tab**: Simply open a new tab (`Cmd/Ctrl + T`) to go directly to Homepage.dev
- **Extension Icon**: Click the Homepage.dev icon in your toolbar to open your dashboard

## Permissions

This extension requests minimal permissions:

- `tabs` - Required for smart tab management (focusing existing tabs)
- `host_permissions` for `homepage.dev` - Required to detect existing Homepage.dev tabs

**No data is collected. No analytics. No tracking.**

## Development

```
homepage-dev-chrome/
├── manifest.json      # Extension configuration (Manifest V3)
├── newtab.html        # New tab redirect page
├── background.js      # Service worker for icon click handling
└── assets/            # Extension icons
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

### Local Development

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Links

- [Homepage.dev](https://homepage.dev)
- [GitHub Repository](https://github.com/dodotdev/homepage-dev-chrome)
- [Report Issues](https://github.com/dodotdev/homepage-dev-chrome/issues)
