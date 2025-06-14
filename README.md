# JSON Formatter

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fjson.clocktowerassoc.com&label=json.clocktowerassoc.com)](https://json.clocktowerassoc.com)

A fast, beautiful, and privacy-focused JSON formatter and validator tool built for developers.

## Features

- ⚡ **Lightning Fast** - Instant formatting with no server roundtrips
- 🔒 **Privacy First** - Your data never leaves your browser
- ✨ **Beautiful Output** - Syntax highlighted and perfectly formatted
- 🔧 **Smart Auto-Fix** - Automatically repairs common JSON errors
- 🎨 **Dark/Light Mode** - Easy on the eyes, day or night
- 📋 **Copy to Clipboard** - One-click copying
- 🔗 **URL Sharing** - Generate shareable links with JSON data
- 🎲 **Sample Generator** - Try different JSON examples instantly
- ⌨️ **Keyboard Shortcuts** - Developer-friendly shortcuts

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Format JSON
- `Ctrl/Cmd + Shift + C` - Copy formatted JSON
- `Ctrl/Cmd + K` - Clear input

## Auto-Fix Feature

The JSON formatter includes a smart auto-fix feature that can repair common JSON errors automatically. When your JSON has syntax errors, a "Fix" button will appear that can handle:

### What It Fixes:
- **Trailing commas**: `{"name": "Alice",}` → `{"name": "Alice"}`
- **Unquoted property names**: `{name: "Alice"}` → `{"name": "Alice"}`
- **Single quotes**: `{'name': 'Alice'}` → `{"name": "Alice"}`
- **Missing commas**: `{"a": 1 "b": 2}` → `{"a": 1, "b": 2}`
- **Missing brackets**: `{"name": "Alice"` → `{"name": "Alice"}`
- **Extra brackets**: `{"name": "Alice"}}` → `{"name": "Alice"}`

### What It Won't Fix:
This is a lightweight tool designed for common copy/paste errors. For complex structural issues, consider using dedicated JSON repair tools.

**Perfect for**: Fixing JSON copied from code snippets, incomplete pastes, or data with wrong quote types.

## URL Sharing

### Generate Share Links
Click the "Share" button to automatically generate a shareable URL with your JSON data. The link is copied to your clipboard and can be shared with others.

### URL Parameters
You can also manually create links by appending `?json=` followed by URL-encoded JSON:
```
https://json.clocktowerassoc.com/?json=%7B%22name%22%3A%22Alice%22%7D
```

**Note**: URLs are limited to ~2,000 characters for broad compatibility. Large JSON files may not be shareable via URL.

## Status & Monitoring

The website includes a health check endpoint at `/health.json` that returns service status information. The status badge above automatically checks if the site is accessible.

## Deployment

This tool is designed to be hosted on GitHub Pages. To deploy:

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. The GitHub Actions workflow will automatically deploy your changes

### Health Check
A health check endpoint is available at `https://json.clocktowerassoc.com/health.json` that returns:
```json
{
  "status": "ok",
  "service": "JSON Formatter",
  "timestamp": "static",
  "version": "1.0.0"
}
```

## Technology Stack

- Vanilla JavaScript (no frameworks, no dependencies)
- CSS3 with custom properties for theming
- Prism.js for syntax highlighting
- GitHub Actions for CI/CD

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues or Problems?

If you encounter any issues or have suggestions for improvements, please [create an issue](https://github.com/TickTockBent/json_formatter/issues) on our GitHub repository. We appreciate your feedback and will do our best to address any problems promptly.

## License

MIT License - feel free to use this tool for any purpose.

---

Built by [Clocktower & Associates](https://www.clocktowerassoc.com)