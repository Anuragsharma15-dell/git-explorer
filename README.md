# 🚀 Tambo GitHub Explorer

> **AI-Powered GitHub Repository Management with Generative UI**

An intelligent, conversational interface for exploring and managing GitHub repositories. Built with [Tambo AI](https://tambo.ai) and Next.js, this application transforms natural language into powerful GitHub operations with beautiful, interactive visualizations.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tambo AI](https://img.shields.io/badge/Tambo-AI_Powered-purple)](https://tambo.ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## ✨ What Makes This Special

**Tambo GitHub Explorer** isn't just another GitHub client—it's an AI-powered conversation with your repositories. Instead of clicking through endless menus, just **ask** what you want to know:

- 🗣️ **"Show me issues in facebook/react as a Kanban board"** → Interactive project board
- 📊 **"Analyze vercel/next.js"** → Full repository health analysis
- 🔍 **"Compare Next.js with Remix"** → Side-by-side repository comparison
- 🐛 **"Debug the latest failed build"** → CI/CD failure analysis
- 📈 **"Show me contributor activity as a chart"** → Beautiful visualizations

All through natural language. All with intelligent, generative UI.

---

## 🎯 Key Features

### 🤖 20+ AI-Powered Tools

1. **Repository Analysis** - Deep dive into repo health, activity, and trends
2. **Issue Management** - View, filter, and organize issues
3. **Pull Request Tracking** - Monitor PRs with intelligent insights
4. **Kanban Boards** - Interactive issue boards with drag-and-drop
5. **CI/CD Debugging** - Analyze GitHub Actions workflow failures
6. **Code Search** - Semantic code search across repositories
7. **Contributor Analytics** - Visualize who's building what
8. **Repository Comparison** - Side-by-side repo analysis
9. **Release Notes** - Auto-generate release notes from PRs
10. **Code Refactoring** - AI-suggested improvements with diff view
11. **Codebase Visualization** - Interactive knowledge graphs
12. **Notification Center** - Stay on top of mentions and updates
13. **Directory Explorer** - Navigate codebases effortlessly
14. **File Viewer** - Syntax-highlighted code reading
15. **Language Statistics** - Pie charts of repo languages
16. **Activity Trends** - Line charts of commit activity
17. **Workflow Status** - Check build/deploy status
18. **Issue Creation** - Create issues via conversation
19. **PR File Changes** - Review what changed in PRs
20. **Notifications** - Your GitHub inbox, intelligently surfaced

### 🎨 Generative UI Components

The AI doesn't just fetch data—it **generates the perfect UI** for your query:

- **📊 Interactive Charts** - Bar, line, and pie charts auto-generated from data
- **🎯 Kanban Boards** - Drag-and-drop issue management
- **🔬 Code Viewers** - Syntax-highlighted, searchable code
- **📈 Health Gauges** - Visual repository health metrics
- **🔄 Diff Viewers** - Side-by-side code comparisons
- **🛠️ CI Debuggers** - Step-by-step failure analysis
- **🌐 Knowledge Graphs** - Visual codebase architecture
- **📋 Data Grids** - Smart tables for repos, issues, PRs

### 🧠 Natural Language Interface

Talk to GitHub like you're talking to a teammate:

```
You: "What are the most popular Next.js alternatives?"
AI: [Fetches trending repos, shows comparison grid]

You: "Show me critical bugs in facebook/react"
AI: [Filters issues, displays as cards with priority badges]

You: "Why did the last build fail?"
AI: [Analyzes workflow run, highlights failing step]
```

---

## 🏗️ Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe codebase
- **Tailwind CSS** - Utility-first styling

### AI & Tools
- **Tambo AI SDK** - AI agent orchestration
- **Tambo MCP** - Model Context Protocol integration
- **Zod** - Schema validation
- **OpenAI** - LLM backend (via Tambo)

### UI Libraries
- **Framer Motion** - Smooth animations
- **dnd-kit** - Drag-and-drop interactions
- **Lucide Icons** - Beautiful icon set
- **React Syntax Highlighter** - Code highlighting
- **Recharts** - Data visualization

### Authentication & APIs
- **NextAuth.js** - GitHub OAuth integration
- **GitHub REST API** - Repository data
- **GitHub Actions API** - CI/CD insights

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- GitHub account
- Tambo AI API key ([get one here](https://tambo.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tambo-github-explorer.git
   cd tambo-github-explorer
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   # Tambo AI
   NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
   NEXT_PUBLIC_TAMBO_URL=https://api.tambo.co

   # GitHub API
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # GitHub OAuth (create app at github.com/settings/developers)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💡 Usage Examples

### 1. **Repository Analysis**
```
You: "Analyze vercel/next.js"
```
→ Returns: Health score, contributor stats, language breakdown, recent activity

### 2. **Kanban Board**
```
You: "Show me facebook/react issues as a Kanban board"
```
→ Returns: Interactive board with To Do / In Progress / Done columns

### 3. **CI/CD Debugging**
```
You: "Why did the latest build fail in my repo?"
```
→ Returns: Detailed job breakdown, failed steps, error logs

### 4. **Repository Comparison**
```
You: "Compare Next.js with Remix"
```
→ Returns: Side-by-side stats (stars, forks, activity, languages)

### 5. **Code Search**
```
You: "Find all usages of 'useEffect' in facebook/react"
```
→ Returns: Searchable results with file paths and line numbers

### 6. **Contributor Insights**
```
You: "Show me top contributors to shadcn/ui as a chart"
```
→ Returns: Bar chart of commit counts

---

## 🎨 Screenshots

### Landing Page
Beautiful, modern design with smooth animations and clear value proposition.

### Chat Interface
Conversational AI that understands GitHub. Just ask and watch it work.

### Kanban Board
Real GitHub issues organized in an interactive, drag-and-drop board.

### Repository Analysis
Comprehensive health analysis with visualizations and actionable insights.

### CI/CD Debugger
Step-by-step workflow analysis to quickly identify build failures.

---

## 🏆 Why This Wins Hackathons

### 1. **Innovation**: Generative UI for GitHub
   - Not just another GitHub client
   - UI adapts intelligently to user queries
   - Combines AI conversation with interactive visualizations

### 2. **Technical Excellence**
   - Built with latest tech (React 19, Next.js 15)
   - Type-safe with TypeScript + Zod
   - Leverages cutting-edge Tambo AI SDK

### 3. **Real-World Impact**
   - Solves actual developer pain points
   - Saves hours navigating GitHub's complex UI
   - Makes repository management accessible

### 4. **Beautiful Design**
   - Premium, modern aesthetics
   - Smooth animations and micro-interactions
   - Glassmorphism and dark mode

### 5. **Fully Functional**
   - 20+ working tools
   - Real GitHub API integration
   - OAuth authentication
   - Production-ready code

---

## 🧪 Technical Highlights

### Architecture

```
tambo-github-explorer/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Landing page
│   │   ├── chat/           # Chat interface
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── tambo/          # AI-powered components
│   │   │   ├── kanban-board.tsx
│   │   │   ├── repository-analysis.tsx
│   │   │   ├── ci-debugger.tsx
│   │   │   ├── diff-viewer.tsx
│   │   │   └── knowledge-graph.tsx
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── tambo-fixed.ts  # Tambo tools configuration
│   │   └── types.ts        # TypeScript types
│   └── services/
│       ├── github-api.ts   # GitHub API client
│       └── github-tools.ts # GitHub tool implementations
└── public/                 # Static assets
```

### Key Design Decisions

1. **Tambo AI Integration** - Uses Tambo's SDK for AI orchestration, enabling natural language → tool execution
2. **Component-Driven** - Every tool can render custom UI (Kanban, charts, diff viewers)
3. **Type Safety** - Zod schemas ensure data integrity between AI and tools
4. **Server Components** - Leverage Next.js 15 for optimal performance
5. **OAuth Flow** - Secure GitHub authentication with NextAuth

---

## 🔧 Configuration

### Tambo Tools

All 20 tools are configured in `src/lib/tambo-fixed.ts` with:
- **Input schemas** (what the AI needs to call the tool)
- **Output schemas** (what data the tool returns)
- **Components** (how the UI should render)

Example:
```typescript
{
  name: "view_issue_board",
  description: "View repository issues in a Kanban board",
  tool: async (params) => {
    const issues = await getRepositoryIssues(params);
    return { issues, title: `${params.owner}/${params.repo} Board` };
  },
  component: KanbanBoard,
  inputSchema: z.object({
    owner: z.string(),
    repo: z.string(),
  }),
}
```

### GitHub API

The GitHub API client (`src/services/github-api.ts`) handles:
- Authentication (OAuth token)
- Rate limiting
- Error handling
- Response caching

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Tambo AI** - For the incredible AI orchestration platform
- **Vercel** - For Next.js and deployment platform
- **GitHub** - For the comprehensive REST API
- **React Team** - For the amazing React 19 features

---

## 📧 Contact

**Built by:** [Your Name]
**Email:** your.email@example.com
**Twitter:** [@yourhandle](https://twitter.com/yourhandle)
**GitHub:** [@yourusername](https://github.com/yourusername)

---

## 🌟 Star This Repo!

If you found this project useful, please consider giving it a ⭐️ on GitHub!

**Live Demo:** [https://tambo-github-explorer.vercel.app](https://tambo-github-explorer.vercel.app)

---

<div align="center">
  
### Made with ❤️ using Tambo AI
  
**Turning conversations into code, one query at a time**

</div>
