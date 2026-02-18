# Contributing to Autonomous Analyst

Thank you for considering contributing to Autonomous Analyst! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a branch for your changes
5. Make your changes
6. Test your changes
7. Submit a pull request

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

- **Bug fixes** - Help us fix issues in the codebase
- **New features** - Add new functionality
- **Documentation** - Improve our docs
- **Tests** - Add or improve test coverage
- **Performance improvements** - Make the code faster or more efficient
- **Refactoring** - Improve code quality

## Development Setup

### Prerequisites

- Node.js 16+ and npm
- Firebase account
- Git
- TypeScript knowledge

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Autonomus-Analyst.git
cd Autonomus-Analyst

# Add upstream remote
git remote add upstream https://github.com/Ghulam-Mustafa-Keerio/Autonomus-Analyst.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# Run development server
npm run dev

# Run type checking
npm run typecheck

# Run linter
npm run lint
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable and function names
- Add type annotations where beneficial
- Avoid using `any` type unless absolutely necessary

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Follow existing code formatting
- Run `npm run lint` before committing

### File Organization

- Place components in `src/components/`
- Place utilities in `src/lib/`
- Place hooks in `src/hooks/`
- Place AI modules in `src/ai/`
- Keep files focused and single-purpose

### Comments

- Write self-documenting code when possible
- Add comments for complex logic
- Use JSDoc for functions and classes
- Keep comments up-to-date with code changes

## Commit Guidelines

We follow conventional commits for clear commit messages:

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(analysis): add correlation matrix calculation

Implements Pearson correlation coefficient calculation
for numerical features in the dataset.

Closes #123
```

```
fix(firebase): resolve authentication timeout issue

Increases timeout for Firebase authentication to handle
slow network connections.

Fixes #456
```

## Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, maintainable code
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to GitHub and open a PR from your fork
   - Fill out the PR template
   - Link any related issues
   - Request review from maintainers

### PR Requirements

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added for new functionality
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Linting passes

## Reporting Bugs

### Before Submitting

- Check if the bug has already been reported
- Ensure you're using the latest version
- Verify it's actually a bug and not a feature

### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.0.0]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 1.0.0]

**Additional Context**
Any other relevant information.
```

## Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been requested
2. Clearly describe the feature and its use case
3. Explain why it would be valuable
4. Consider the scope and complexity
5. Be open to discussion and feedback

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Explain the problem this feature would solve.

**Proposed Solution**
Describe how you envision this working.

**Alternatives**
Describe alternative solutions you've considered.

**Additional Context**
Any other relevant information.
```

## Questions?

If you have questions, feel free to:

- Open an issue with the "question" label
- Contact the maintainers
- Check existing documentation

## Recognition

Contributors will be recognized in:

- The project's README
- Release notes
- GitHub contributors page

Thank you for contributing to Autonomous Analyst! 🎉
