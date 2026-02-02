# Local Setup Guide

This guide will help you set up the GitHub Explorer project locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** or **Bun** (recommended)
- **Git**
- A **GitHub account** with access to create Personal Access Tokens
- A **Tambo AI account** with API access

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tambo-github
```

### 2. Install Dependencies

This project uses **Bun** as the package manager (recommended):

```bash
bun install
```

Alternatively, you can use npm or pnpm:

```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_NEXT_PUBLIC_TAMBO_API_KEY_here
NEXT_PUBLIC_TAMBO_URL=https://api.tambo.co
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 4. Initialize Tambo

```bash
npx tambo init
```

### 5. Start Development Server

```bash
bun dev
# or
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Detailed Setup Instructions

### GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Tambo GitHub Explorer")
4. Select the following scopes:
   - `public_repo` - Access public repositories
   - `repo` - Full control of private repositories (if needed)
   - `read:user` - Read user profile data
   - `user:email` - Access user email addresses
5. Click "Generate token"
6. Copy the token immediately (you won't see it again)
7. Add it to your `.env` file as `GITHUB_TOKEN`

### Tambo AI API Key

1. Visit [tambo.co](https://tambo.co) and sign up/log in
2. Navigate to your API settings
3. Generate a new API key
4. Copy the key and add it to your `.env` file as `NEXT_PUBLIC_TAMBO_API_KEY`

## Development Workflow

### Running the Application

```bash
# Development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Type checking
bun run type-check

# Linting
bun run lint
```

### Key Features to Test

1. **Repository Search**: Search for GitHub repositories
2. **Repository Analysis**: Get AI-powered insights
3. **Issue Management**: View and classify issues
4. **PR Analysis**: Analyze pull requests with AI
5. **Release Notes**: Generate automated release notes

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_TAMBO_API_KEY` | Your Tambo AI API key | Yes |
| `NEXT_PUBLIC_TAMBO_URL` | Tambo API endpoint | Yes |
| `GITHUB_TOKEN` | GitHub Personal Access Token | Yes |

## Troubleshooting

### Common Issues

**1. "Invalid API Key" Error**
- Verify your Tambo API key is correct
- Ensure the key has proper permissions
- Check that `NEXT_PUBLIC_TAMBO_API_KEY` is set in `.env`

**2. GitHub API Rate Limiting**
- Ensure your GitHub token is valid
- Check rate limit status in browser dev tools
- Consider using a token with higher rate limits

**3. Build Errors**
- Run `bun run type-check` to identify TypeScript issues
- Ensure all dependencies are installed
- Clear `.next` folder and rebuild

**4. Environment Variables Not Loading**
- Ensure `.env` is in the project root
- Restart the development server after changes
- Check that variables start with `NEXT_PUBLIC_` for client-side access

### Development Tips

1. **Hot Reload**: The development server supports hot reload for most changes
2. **TypeScript**: The project uses strict TypeScript - fix type errors promptly
3. **Tailwind CSS**: Use existing utility classes for consistent styling
4. **Component Structure**: Follow the existing pattern for new components

## Production Deployment

### Build Process

```bash
# Install dependencies
bun install

# Build the application
bun run build

# Start production server
bun start
```

### Environment Setup

For production deployment:

1. Set all required environment variables
2. Use production-grade GitHub tokens
3. Configure proper CORS settings for Tambo API
4. Set up monitoring and logging

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for all new code
3. Test new features thoroughly
4. Update documentation as needed
5. Follow the commit message conventions

## Support

For issues and questions:

- Check the [Tambo AI documentation](https://docs.tambo.co)
- Review GitHub API documentation
- Check existing issues in the repository
- Create a new issue with detailed information

---

**Happy coding!** 🚀