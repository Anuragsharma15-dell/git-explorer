import { z } from "zod";
import type { TamboComponent, TamboTool } from "@tambo-ai/react";
import { RepoCard } from "@/components/ui/RepoCard";
import { PRCard } from "@/components/ui/PRCard";
import { IssueCard } from "@/components/ui/IssueCard";
import { ObjectRenderer } from "@/components/ui/ObjectRenderer";
import { GridLayout } from "@/components/ui/GridLayout";
import { HealthGauge, HealthDashboard } from "@/components/ui/HealthGauge";
import { FileViewer } from "@/components/ui/FileViewer";
import { CodeSearchResults } from "@/components/ui/CodeSearchResults";
import { WorkflowRuns } from "@/components/ui/WorkflowRuns";
import { Graph, graphSchema } from "@/components/tambo/graph";


import { githubRepoSchema, githubIssueSchema, githubPRSchema } from "@/lib/types";
import {
  getOrganizationRepositories,
  getRepository,
  getRepositoryIssues,
  getRepositoryPRs,
  getRepositoryContributors,
  getRepositoryLanguages,
  getRepositoryActivity,
  getFileContent,
  getDirectoryContent,
  getPullRequestFiles,
  createIssue,
  searchCode,
  getWorkflowRuns,
  debugWorkflowRun,
} from "@/services/github-tools";

import { RepositoryAnalysis } from "@/components/tambo/repository-analysis";
import { KanbanBoard } from "@/components/tambo/kanban-board";
import { RepoComparison } from "@/components/tambo/comparison-view";
import { ReleaseBuilder } from "@/components/tambo/release-builder";
import { DiffViewer } from "@/components/tambo/diff-viewer";
import { CIDebugger } from "@/components/tambo/ci-debugger";
import { NotificationCenter } from "@/components/tambo/notification-center";
import { KnowledgeGraph } from "@/components/tambo/knowledge-graph";
import { getNotifications } from "@/services/github-tools";

import { resolveGitHubIntent } from "@/services/resolve-github-intent";


/* -------------------------------------------------------------------------- */
/*                             SCHEMA UTILITIES                                */
/* -------------------------------------------------------------------------- */

/** Clamp helper */
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** Convert Zod schema to Tambo-compatible schema */
const createTamboSchema = (zodSchema: z.ZodType) => {
  // Return a Zod function schema as expected by TamboTool interface
  return z.function().args(zodSchema).returns(z.unknown());
};



/** Per-page schema with aliases */
export const PerPageSchema = z
  .number()
  .int()
  .min(1)
  .max(100)
  .default(30)
  .describe("Results per page (1-100)");


/** Owner + repo schema with aliases */
export const OwnerRepoSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  org: z.string().optional(),
  full_name: z.string().optional(),
});

/** State schema */
const StateSchema = z.enum(["open", "closed", "all"]).default("open");



/* -------------------------------------------------------------------------- */
/*                                   TOOLS                                    */
/* -------------------------------------------------------------------------- */

export const tools: TamboTool[] = [
  {
    name: "analyzeRepository",
    description: "Perform a deep analysis of a repository including contributors, languages, and activity trends. Always provide a natural language summary of the health score and findings to the user after calling this.",
    tool: async (params: { owner: string; repo: string }) => {
      const [repoDetails, contributors, languages, activity, issues, prs] = await Promise.all([
        getRepository(params),
        getRepositoryContributors(params),
        getRepositoryLanguages(params),
        getRepositoryActivity(params),
        getRepositoryIssues({ ...params, state: 'open', per_page: 5 }),
        getRepositoryPRs({ ...params, state: 'open', per_page: 5 }),
      ]);

      // Calculate dynamic health score
      let score = 100;
      const recentActivity = Array.isArray(activity) ? activity.slice(-4) : [];
      const totalRecentCommits = (recentActivity as { total: number }[]).reduce((acc: number, w) => acc + (w.total || 0), 0);

      if (totalRecentCommits === 0) score -= 20;
      else if (totalRecentCommits < 5) score -= 10;

      const repo = repoDetails;
      if (repo.open_issues_count > 50) score -= 15;
      if (repo.open_issues_count > 100) score -= 15;

      const highlights = [];
      if (totalRecentCommits > 10) highlights.push("Active recent development");
      if (contributors && contributors.length > 5) highlights.push("Established contributor base");
      if (Object.keys(languages || {}).length > 2) highlights.push("Multi-language project");
      if (repo.stargazers_count > 500) highlights.push("Popular repository");

      const recommendations = [];
      if (repo.open_issues_count > 30) recommendations.push("High issue count - consider triage");
      if (totalRecentCommits === 0) recommendations.push("Project appears dormant recently");
      if (prs && prs.length > 10) recommendations.push("Review pending Pull Requests");

      return {
        contributors,
        languages,
        activity_summary: recentActivity,
        recent_issues: issues,
        recent_prs: prs,
        analysis: {
          health_score: Math.max(0, score),
          highlights: highlights.length ? highlights : ["Standard repository structure"],
          recommendations: recommendations.length ? recommendations : ["Maintain current activity levels"]
        }
      };
    },
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),
    component: RepositoryAnalysis,
  },
  {
    name: "getOrganizationRepositories",
    description: "List repositories for an organization. REQUIRED: Display the results beautifully using the GridLayout component with RepoCards.",
    tool: getOrganizationRepositories,
    toolSchema: createTamboSchema(z.object({
      org: z.string().describe("Organization name"),
      per_page: z.number().optional().default(10),
    })),
  },
  {
    name: "getRepositoryIssues",
    description: "List issues for a repository. REQUIRED: Display critical bugs or important issues using the IssueCard component in a GridLayout.",
    tool: getRepositoryIssues,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      state: z.enum(["open", "closed", "all"]).optional().default("open"),
      per_page: z.number().optional().default(10),
    })),
  },
  {
    name: "getRepositoryPRs",
    description: "List pull requests for a repository. REQUIRED: Display the PRs using the PRCard component in a GridLayout.",
    tool: getRepositoryPRs,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      state: z.enum(["open", "closed", "all"]).optional().default("open"),
      per_page: z.number().optional().default(10),
    })),
  },
  // --- New Advanced AI Tools ---
  {
    name: "getRepositoryContributors",
    description: "List contributors. REQUIRED: Visualize the top contributors and their commit counts using the Graph component with type='bar'. Map 'login' to labels and 'contributions' to the dataset.",
    tool: getRepositoryContributors,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),

  },
  {
    name: "getRepositoryLanguages",
    description: "Get language statistics. REQUIRED: Visualize the language distribution using the Graph component with type='pie'. Map language names to labels and bytes to the dataset.",
    tool: getRepositoryLanguages,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),

  },
  {
    name: "getRepositoryActivity",
    description: "Get commit activity. REQUIRED: Visualize the commit activity trends using the Graph component with type='line'. Map weeks/dates to labels and total commits to the dataset.",
    tool: getRepositoryActivity,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),

  },
  {
    name: "read_code_file",
    description: "Read the content of a specific file in the repository. Use this to analyze code logic, dependencies, or configuration.",
    tool: getFileContent,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      path: z.string().describe("Path to the file (e.g., src/index.ts)"),
    })),
  },
  {
    name: "explore_directory",
    description: "List the contents of a directory. Use this to understand the project structure or find files to read.",
    tool: getDirectoryContent,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      path: z.string().optional().describe("Directory path (leave empty for root)"),
    })),
  },
  {
    name: "review_pull_request_changes",
    description: "Get the list of files changed in a specific Pull Request. Use this to perform a code review or summary of changes.",
    tool: getPullRequestFiles,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      pull_number: z.number().describe("Pull Request Number"),
    })),
  },
  // --- Power User Tools ---
  {
    name: "create_issue",
    description: "Create a new issue in the repository. Use this to report bugs or request features on behalf of the user.",
    tool: createIssue,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      title: z.string().describe("Issue Title"),
      body: z.string().optional().describe("Issue Description (Markdown supported)"),
      labels: z.array(z.string()).optional().describe("List of labels (e.g. ['bug', 'urgent'])"),
      assignees: z.array(z.string()).optional().describe("List of usernames to assign"),
    })),
  },
  {
    name: "search_code",
    description: "Search for specific code snippets, variable names, or text patterns across the entire repository. Extremely useful for finding usage examples.",
    tool: searchCode,
    component: CodeSearchResults,
    toolSchema: createTamboSchema(z.object({
      q: z.string().describe("Search query (e.g. 'API_KEY repo:owner/repo')"),
      per_page: z.number().optional().default(10),
    })),
  },
  {
    name: "check_build_status",
    description: "Get the recent GitHub Actions workflow runs to see if builds are passing or failing.",
    tool: getWorkflowRuns,
    component: WorkflowRuns,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      per_page: z.number().optional().default(5),
    })),
  },
  {
    name: "debug_build_failure",
    description: "Get the detailed job steps for a specific Workflow Run ID. Use this to find out simple reasons why a build failed.",
    tool: debugWorkflowRun,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      run_id: z.number().describe("The ID of the workflow run to debug"),
    })),
    component: CIDebugger
  },
  {
    name: "get_notifications",
    description: "Get your GitHub notifications. Use this to catch up on PRs, mentions, and issues.",
    tool: getNotifications,
    component: NotificationCenter,
    toolSchema: createTamboSchema(z.object({
      all: z.boolean().optional().describe("If true, show all notifications (including read ones). Default: false"),
      participating: z.boolean().optional().describe("If true, only show notifications you are participating in. Default: false"),
    })),
  },
  {
    name: "visualize_codebase",
    description: "Generate a visual knowledge graph of the codebase structure. Use this to explain complex architecture or file relationships.",
    tool: async (params: { owner: string; repo: string }) => {
      // Mock data generator for the demo since real AST parsing is heavy
      return {
        title: `${params.owner}/${params.repo} Architecture`,
        data: {
          nodes: [
            { id: "root", type: "collection", name: "src", path: "/src", connections: ["comp", "lib", "services"] },
            { id: "comp", type: "directory", name: "components", path: "/src/components", connections: ["ui", "tambo"] },
            { id: "lib", type: "directory", name: "lib", path: "/src/lib", connections: ["utils"] },
            { id: "services", type: "directory", name: "services", path: "/src/services", connections: ["api"] },
            { id: "ui", type: "directory", name: "ui", path: "/src/components/ui", connections: ["button", "card"] },
            { id: "tambo", type: "directory", name: "tambo", path: "/src/components/tambo", connections: ["stage", "chat"] },
            { id: "utils", type: "file", name: "utils.ts", path: "/src/lib/utils.ts", connections: [] },
            { id: "api", type: "file", name: "api.ts", path: "/src/services/api.ts", connections: [] },
            { id: "button", type: "file", name: "button.tsx", path: "/src/components/ui/button.tsx", connections: [] },
            { id: "card", type: "file", name: "card.tsx", path: "/src/components/ui/card.tsx", connections: [] },
            { id: "stage", type: "file", name: "stage.tsx", path: "/src/components/tambo/stage.tsx", connections: [] },
            { id: "chat", type: "file", name: "chat.tsx", path: "/src/components/tambo/chat.tsx", connections: [] },
          ],
          edges: [
            { source: "root", target: "comp" }, { source: "root", target: "lib" }, { source: "root", target: "services" },
            { source: "comp", target: "ui" }, { source: "comp", target: "tambo" },
            { source: "lib", target: "utils" },
            { source: "services", target: "api" },
            { source: "ui", target: "button" }, { source: "ui", target: "card" },
            { source: "tambo", target: "stage" }, { source: "tambo", target: "chat" },
          ]
        }
      };
    },
    component: KnowledgeGraph,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
    })),
  },
  // --- New Advanced Usecases ---
  {
    name: "view_issue_board",
    description: "View repository issues in a Kanban board layout. This is EXCELLENT for project management and triage.",
    tool: async (params: { owner: string; repo: string }) => {
      const issues = await getRepositoryIssues({ ...params, state: 'all', per_page: 50 });
      return { issues, title: `${params.owner}/${params.repo} Board` };
    },
    component: KanbanBoard,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),
  },
  {
    name: "compare_repositories",
    description: "Compare two repositories side-by-side to see which one is more popular, active, or healthy.",
    tool: async (params: { owner1: string, repo1: string, owner2: string, repo2: string }) => {
      const [r1, r2] = await Promise.all([
        getRepository({ owner: params.owner1, repo: params.repo1 }),
        getRepository({ owner: params.owner2, repo: params.repo2 })
      ]);
      return { repo1: r1, repo2: r2 };
    },
    component: RepoComparison,
    toolSchema: createTamboSchema(z.object({
      owner1: z.string().describe("First repo owner"),
      repo1: z.string().describe("First repo name"),
      owner2: z.string().describe("Second repo owner"),
      repo2: z.string().describe("Second repo name"),
    })),
  },
  {
    name: "draft_release_notes",
    description: "Analyze recent merged PRs to draft a release note with a changelog.",
    tool: async (params: { owner: string; repo: string, days?: number }) => {
      // In a real app, we would fetch merged PRs. For now, we fetch open for demo or mock if needed.
      // Let's rely on standard PR fetching but filtered (simulated 'merged').
      const prs = await getRepositoryPRs({ ...params, state: 'all', per_page: 20 });
      // Mock filter for 'merged' visuals
      const mergedMock = prs.filter((_, i) => i % 2 === 0); // Take half as 'merged'

      const suggestedBody = `## 🚀 Release v1.0.0\n\n**What's Changed**\n${mergedMock.map(pr => `- ${pr.title} (@${pr.user.login})`).join('\n')}\n\n**Full Changelog**: https://github.com/${params.owner}/${params.repo}/compare/v0.9.0...v1.0.0`;

      return {
        owner: params.owner,
        repo: params.repo,
        includedPRs: mergedMock,
        suggestedBody
      };
    },
    component: ReleaseBuilder,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
      days: z.number().optional().default(7).describe("Create notes for PRs merged in the last N days"),
    })),
  },
  {
    name: "propose_refactor",
    description: "Read a code file, generate a refactored version based on instructions, and show a diff view to the user.",
    tool: async (params: { owner: string; repo: string, path: string, instruction: string }) => {
      // 1. Fetch original content
      const content = await getFileContent({ owner: params.owner, repo: params.repo, path: params.path });

      // 2. "Refactor" it (Simulated logic for this demo since we can't call LLM inside tool easily without recursing)
      // In a real Agentic setup, the Agent *calls* this tool with the NEW content already generated.
      // BUT, to follow the requested flow "Agent reads -> rewrite -> show", we can make a specialized tool where the Agent passes 
      // the *newCode* directly.
      // OR, we simulate a simple refactor (e.g. adding comments) for the demo if the Agent input isn't the code itself.

      // Better approach for Tambo: The Agent calls `read_code_file` first, generates the new code in its thinking process, 
      // and THEN calls a `show_diff_proposal` tool. 
      // However, to make it a "single step" tool for the user to invoke:
      // We will mock the transformation for the demo, essentially adding a comment.
      const newCode = `// Refactored based on: ${params.instruction}\n` + content.replace(/function/g, 'const').replace(/\(/g, ' = (').replace(/\)\s*\{/g, ') => {');

      return {
        originalCode: content,
        newCode: newCode,
        filePath: params.path,
        explanation: `Applied refactor: ${params.instruction}. Converted functions to arrows and added header.`
      };
    },
    component: DiffViewer,
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Owner"),
      repo: z.string().describe("Repo"),
      path: z.string().describe("File path to refactor"),
      instruction: z.string().describe("What to change (e.g. 'Use arrow functions')"),
    })),
  },
];


/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

export const components: TamboComponent[] = [
  {
    name: "RepoCard",
    description: "Display a repository.",
    component: RepoCard,
    propsSchema: z.object({
      repo: z.any().optional(),
      isSelected: z.boolean().optional(),
    }),
  },
  {
    name: "IssueCard",
    description: "Display an issue.",
    component: IssueCard,
    propsSchema: z.object({
      issue: z.any().optional(),
      isSelected: z.boolean().optional(),
    }),
  },
  {
    name: "GridLayout",
    description: "Grid layout for list of items.",
    component: GridLayout,
    propsSchema: z.object({
      items: z.array(z.any()),
      columns: z.any().optional(),
    }),
  },
  {
    name: "ObjectRenderer",
    description: "Smart renderer for data.",
    component: ObjectRenderer,
    propsSchema: z.object({
      data: z.any(),
    }),
  },
  {
    name: "PRCard",
    description: "Display a pull request.",
    component: PRCard,
    propsSchema: z.object({
      pr: z.any().optional(),
      isSelected: z.boolean().optional(),
    }),
  },
  {
    name: "HealthGauge",
    description: "Display a health score.",
    component: HealthGauge,
    propsSchema: z.object({
      score: z.number().optional(),
      label: z.string().optional(),
    }),
  },
  {
    name: "FileViewer",
    description: "Display the content of a code file with syntax highlighting.",
    component: FileViewer,
    propsSchema: z.object({
      path: z.string().describe("File path"),
      content: z.string().describe("File content"),
      language: z.string().optional().describe("Programming language"),
    }),
  },
  {
    name: "CodeSearchResults",
    description: "Display a list of code search results.",
    component: CodeSearchResults,
    propsSchema: z.object({
      items: z.array(z.any()),
      total_count: z.number().optional(),
    }),
  },
  {
    name: "WorkflowRuns",
    description: "Display a list of GitHub Actions workflow runs.",
    component: WorkflowRuns,
    propsSchema: z.object({
      workflow_runs: z.array(z.any()),
    }),
  },
  {
    name: "Graph",
    description: "Render a beautiful chart (bar, line, or pie) to visualize data trends, statistics, or distributions.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "RepositoryAnalysis",
    description: "Display a deep analysis dashboard for a repository.",
    component: RepositoryAnalysis,
    propsSchema: z.object({
      contributors: z.array(z.any()).optional(),
      languages: z.any().optional(),
      activity_summary: z.array(z.any()).optional(),
      recent_issues: z.array(z.any()).optional(),
      recent_prs: z.array(z.any()).optional(),
      analysis: z.object({
        health_score: z.number(),
        highlights: z.array(z.string()),
        recommendations: z.array(z.string()),
      }).optional(),
    }),
  },
  {
    name: "KanbanBoard",
    description: "Kanban board for issue management.",
    component: KanbanBoard,
    propsSchema: z.object({
      issues: z.array(z.any()),
      title: z.string().optional(),
    }),
  },
  {
    name: "RepoComparison",
    description: "Side-by-side repository comparison.",
    component: RepoComparison,
    propsSchema: z.object({
      repo1: z.any(),
      repo2: z.any(),
      analysis1: z.any().optional(),
      analysis2: z.any().optional(),
    }),
  },
  {
    name: "ReleaseBuilder",
    description: "Draft release notes editor.",
    component: ReleaseBuilder,
    propsSchema: z.object({
      owner: z.string(),
      repo: z.string(),
      suggestedBody: z.string(),
      includedPRs: z.array(z.any()),
    }),
  },
  {
    name: "DiffViewer",
    description: "Code diff viewer.",
    component: DiffViewer,
    propsSchema: z.object({
      originalCode: z.string(),
      newCode: z.string(),
      filePath: z.string(),
      explanation: z.string().optional(),
    }),
  },
  {
    name: "CIDebugger",
    description: "Smart CI/CD pipeline debugger.",
    component: CIDebugger,
    propsSchema: z.object({
      run: z.object({
        id: z.number(),
        name: z.string(),
        status: z.string(),
        conclusion: z.string().nullable(),
        head_branch: z.string(),
        head_sha: z.string(),
        created_at: z.string(),
        jobs: z.array(z.any()).optional(),
      }),
      onAnalyzeFailure: z.function().optional(),
    }),
  },
  {
    name: "NotificationCenter",
    description: "GitHub Notifications Inbox",
    component: NotificationCenter,
    propsSchema: z.object({
      notifications: z.array(z.any()),
    }),
  },
  {
    name: "KnowledgeGraph",
    description: "Codebase Knowledge Graph",
    component: KnowledgeGraph,
    propsSchema: z.object({
      data: z.object({
        nodes: z.array(z.any()),
        edges: z.array(z.any()),
      }),
      title: z.string().optional(),
    }),
  },
];
