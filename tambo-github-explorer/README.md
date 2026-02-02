# GitHub Explorer x Tambo

<img width="1384" height="598" alt="image" src="https://github.com/user-attachments/assets/f11e5a44-9fc0-4fa5-9dd8-f1d8d13d4a99" />


A natural language interface for basic GitHub operations powered by [Tambo AI](https://tambo.co). Find repositories, issues, pull requests and preview the data in ui components.

## Demo

https://github.com/user-attachments/assets/4af35274-7c53-42c7-b725-11622598ef28


## Setup

### Prerequisites

- Node.js 18+ or Bun
- GitHub Personal Access Token
- [Tambo](https://tambo.co) Account with API Key

### Installation

```bash
git clone https://github.com/nermalcat69/tambo-github-explorer
cd tambo-github-explorer

# Install dependencies (using npm, pnpm, or bun)
npm install
# or
pnpm install
# or
bun install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Add your API keys to `.env`:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_NEXT_PUBLIC_TAMBO_API_KEY
NEXT_PUBLIC_TAMBO_URL=https://api.tambo.co
GITHUB_TOKEN=your_github_personal_access_token
```

### API Keys Setup

#### Tambo API Key

https://github.com/user-attachments/assets/ce0580cb-2049-4653-ac93-0ce406049818


1. Sign up on [Tambo](https://tambo.co)
2. Create a Project and then Generate an API Key
3. For support, join their [Discord community](https://discord.gg/hpT8n7XdyN)

### GitHub Token Setup



https://github.com/user-attachments/assets/db9ffe57-2e7e-4bd8-b63f-bf9ce9c9fdfa



1. Go to GitHub Settings > Developer settings > Personal access tokens(Fine-grained tokens)
2. Generate a new token.

### Local Development

```bash
# Start the development server

npm run dev
# or
pnpm dev
# or
bun dev
```

The application will be available at `http://localhost:3000`

### Environment Variables

Configure your API keys:

```bash
NEXT_PUBLIC_TAMBO_API_KEY=your_NEXT_PUBLIC_TAMBO_API_KEY_here
GITHUB_TOKEN=your_github_token_here
```

## Usage Examples

- "Find 4 repositories in vercel org"
- "show me 5 issues from facebook/react"
- "find me 2 prs from vercel/examples"
- "Get repository health metrics for tambo-ai/tambo"
- "Show me open issues with bug label from microsoft/vscode"
- "Find recent pull requests from the main branch"

## Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Tambo AI Documentation](https://docs.tambo.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
