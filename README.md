# JSON Formatter

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fjson.clocktowerassoc.com&label=json.clocktowerassoc.com)](https://json.clocktowerassoc.com)

A fast, beautiful, and privacy-focused JSON formatter and validator tool built for developers.

## Features

- ⚡ **Lightning Fast** - Instant formatting with no server roundtrips
- 🔒 **Privacy First** - Your data never leaves your browser
- ✨ **Beautiful Output** - Syntax highlighted and perfectly formatted
- 🎨 **Dark/Light Mode** - Easy on the eyes, day or night
- 📋 **Copy to Clipboard** - One-click copying
- 🔗 **URL Sharing** - Share formatted JSON via URL parameters
- ⌨️ **Keyboard Shortcuts** - Developer-friendly shortcuts

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Format JSON
- `Ctrl/Cmd + Shift + C` - Copy formatted JSON
- `Ctrl/Cmd + K` - Clear input

## URL Parameters

Share formatted JSON by appending `?json=` followed by URL-encoded JSON:
```
https://json.clocktowerassoc.com/?json=%7B%22name%22%3A%22Alice%22%7D
```

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

Built with ❤️ by [Clocktower & Associates](https://www.clocktowerassoc.com)