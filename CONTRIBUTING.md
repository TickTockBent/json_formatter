# Contributing to JSON Formatter

First off, thank you for considering contributing to JSON Formatter! It's people like you that make this tool better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our values:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and expected**
- **Include screenshots if relevant**
- **Include your browser and OS information**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Ensure your code follows the existing style
4. Test your changes thoroughly
5. Update documentation if needed
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/json_formatter.git
cd json_formatter
```

2. Open `index.html` in your browser to test locally
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# Or use a local server
python3 -m http.server 8000
```

3. Make your changes and test them

## Style Guidelines

### JavaScript Style

- Use ES6+ features where appropriate
- Keep functions small and focused
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code style

### CSS Style

- Use CSS custom properties for theming
- Follow BEM naming convention where applicable
- Keep selectors specific but not overly nested
- Mobile-first responsive design
- Use semantic class names

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add dark mode toggle functionality

- Implement theme switcher in header
- Store preference in localStorage
- Update styles for dark mode support

Fixes #123
```

## Testing

Before submitting a pull request:

1. Test in multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices or using browser dev tools
3. Verify all features work in both light and dark modes
4. Check for console errors
5. Validate HTML and CSS

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README. We appreciate every contribution, no matter how small!

---

Thank you for contributing to JSON Formatter! 🎉