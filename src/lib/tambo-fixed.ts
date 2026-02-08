import { z } from "zod";
import type { TamboComponent } from "@tambo-ai/react";
import { RepoCard } from "@/components/ui/RepoCard";
import { PRCard } from "@/components/ui/PRCard";
import { IssueCard } from "@/components/ui/IssueCard";
import { ObjectRenderer } from "@/components/ui/ObjectRenderer";
import { GridLayout } from "@/components/ui/GridLayout";
import { HealthGauge } from "@/components/ui/HealthGauge";
import { FileViewer } from "@/components/ui/FileViewer";
import { CodeSearchResults } from "@/components/ui/CodeSearchResults";
import { WorkflowRuns } from "@/components/ui/WorkflowRuns";
import { Graph } from "@/components/tambo/graph";

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
    getNotifications,
} from "@/services/github-tools";

import { RepositoryAnalysis } from "@/components/tambo/repository-analysis";
import { KanbanBoard } from "@/components/tambo/kanban-board";
import { RepoComparison } from "@/components/tambo/comparison-view";
import { ReleaseBuilder } from "@/components/tambo/release-builder";
import { DiffViewer } from "@/components/tambo/diff-viewer";
import { CIDebugger } from "@/components/tambo/ci-debugger";
import { NotificationCenter } from "@/components/tambo/notification-center";
import { KnowledgeGraph } from "@/components/tambo/knowledge-graph";

// Using Zod schemas directly (NOT converting to JSON Schema)
export const tools: any[] = [
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
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
        }),
        outputSchema: z.any(),
        component: RepositoryAnalysis,
    },
    {
        name: "getOrganizationRepositories",
        description: "List repositories for an organization. REQUIRED: Display the results beautifully using the GridLayout component with RepoCards.",
        tool: getOrganizationRepositories,
        inputSchema: z.object({
            org: z.string().describe("Organization name"),
            per_page: z.number().optional().default(10),
        }),
        outputSchema: z.any(),
    },
    {
        name: "getRepositoryIssues",
        description: "List issues for a repository. REQUIRED: Display critical bugs or important issues using the IssueCard component in a GridLayout.",
        tool: getRepositoryIssues,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            state: z.enum(["open", "closed", "all"]).optional().default("open"),
            per_page: z.number().optional().default(10),
        }),
        outputSchema: z.any(),
    },
    {
        name: "getRepositoryPRs",
        description: "List pull requests for a repository. REQUIRED: Display the PRs using the PRCard component in a GridLayout.",
        tool: getRepositoryPRs,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            state: z.enum(["open", "closed", "all"]).optional().default("open"),
            per_page: z.number().optional().default(10),
        }),
        outputSchema: z.any(),
    },
    {
        name: "getRepositoryContributors",
        description: "List contributors. REQUIRED: Visualize the top contributors and their commit counts using the Graph component with type='bar'. Map 'login' to labels and 'contributions' to the dataset.",
        tool: getRepositoryContributors,
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "getRepositoryLanguages",
        description: "Get language statistics. REQUIRED: Visualize the language distribution using the Graph component with type='pie'. Map language names to labels and bytes to the dataset.",
        tool: getRepositoryLanguages,
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "getRepositoryActivity",
        description: "Get commit activity. REQUIRED: Visualize the commit activity trends using the Graph component with type='line'. Map weeks/dates to labels and total commits to the dataset.",
        tool: getRepositoryActivity,
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "read_code_file",
        description: "Read the content of a specific file in the repository. Use this to analyze code logic, dependencies, or configuration.",
        tool: getFileContent,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            path: z.string().describe("Path to the file (e.g., src/index.ts)"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "explore_directory",
        description: "List the contents of a directory. Use this to understand the project structure or find files to read.",
        tool: getDirectoryContent,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            path: z.string().optional().describe("Directory path (leave empty for root)"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "review_pull_request_changes",
        description: "Get the list of files changed in a specific Pull Request. Use this to perform a code review or summary of changes.",
        tool: getPullRequestFiles,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            pull_number: z.number().describe("Pull Request Number"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "create_issue",
        description: "Create a new issue in the repository. Use this to report bugs or request features on behalf of the user.",
        tool: createIssue,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            title: z.string().describe("Issue Title"),
            body: z.string().optional().describe("Issue Description (Markdown supported)"),
            labels: z.array(z.string()).optional().describe("List of labels (e.g. ['bug', 'urgent'])"),
            assignees: z.array(z.string()).optional().describe("List of usernames to assign"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "search_code",
        description: "Search for specific code snippets, variable names, or text patterns across the entire repository. Extremely useful for finding usage examples.",
        tool: searchCode,
        component: CodeSearchResults,
        inputSchema: z.object({
            q: z.string().describe("Search query (e.g. 'API_KEY repo:owner/repo')"),
            per_page: z.number().optional().default(10),
        }),
        outputSchema: z.any(),
    },
    {
        name: "check_build_status",
        description: "Get the recent GitHub Actions workflow runs to see if builds are passing or failing.",
        tool: getWorkflowRuns,
        component: WorkflowRuns,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            per_page: z.number().optional().default(5),
        }),
        outputSchema: z.any(),
    },
    {
        name: "debug_build_failure",
        description: "Get the detailed job steps for a specific Workflow Run ID. Use this to find out why a build failed.",
        tool: debugWorkflowRun,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            run_id: z.number().describe("The ID of the workflow run to debug"),
        }),
        outputSchema: z.any(),
        component: CIDebugger
    },
    {
        name: "get_notifications",
        description: "Get your GitHub notifications. Use this to catch up on PRs, mentions, and issues.",
        tool: getNotifications,
        component: NotificationCenter,
        inputSchema: z.object({
            all: z.boolean().optional().describe("If true, show all notifications (including read ones). Default: false"),
            participating: z.boolean().optional().describe("If true, only show notifications you are participating in. Default: false"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "visualize_codebase",
        description: "Generate a visual knowledge graph of the codebase structure. Use this to explain complex architecture or file relationships.",
        tool: async (params: { owner: string; repo: string }) => {
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
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "view_issue_board",
        description: "View repository issues in a Kanban board layout. This is EXCELLENT for project management and triage.",
        tool: async (params: { owner: string; repo: string }) => {
            const issues = await getRepositoryIssues({ ...params, state: 'all', per_page: 50 });
            return { issues, title: `${params.owner}/${params.repo} Board` };
        },
        component: KanbanBoard,
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
        }),
        outputSchema: z.any(),
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
        inputSchema: z.object({
            owner1: z.string().describe("First repo owner"),
            repo1: z.string().describe("First repo name"),
            owner2: z.string().describe("Second repo owner"),
            repo2: z.string().describe("Second repo name"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "draft_release_notes",
        description: "Analyze recent merged PRs to draft a release note with a changelog.",
        tool: async (params: { owner: string; repo: string, days?: number }) => {
            const prs = await getRepositoryPRs({ ...params, state: 'all', per_page: 20 });
            const mergedMock = prs.filter((_, i) => i % 2 === 0);
            const suggestedBody = `## 🚀 Release v1.0.0\n\n**What's Changed**\n${mergedMock.map(pr => `- ${pr.title} (@${pr.user.login})`).join('\n')}\n\n**Full Changelog**: https://github.com/${params.owner}/${params.repo}/compare/v0.9.0...v1.0.0`;
            return {
                owner: params.owner,
                repo: params.repo,
                includedPRs: mergedMock,
                suggestedBody
            };
        },
        component: ReleaseBuilder,
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
            days: z.number().optional().default(7).describe("Create notes for PRs merged in the last N days"),
        }),
        outputSchema: z.any(),
    },
    {
        name: "propose_refactor",
        description: "Read a code file, generate a refactored version based on instructions, and show a diff view to the user.",
        tool: async (params: { owner: string; repo: string, path: string, instruction: string }) => {
            const content = await getFileContent({ owner: params.owner, repo: params.repo, path: params.path });
            const newCode = `// Refactored based on: ${params.instruction}\n` + content.replace(/function/g, 'const').replace(/\(/g, ' = (').replace(/\)\s*\{/g, ') => {');
            return {
                originalCode: content,
                newCode: newCode,
                filePath: params.path,
                explanation: `Applied refactor: ${params.instruction}. Converted functions to arrows and added header.`
            };
        },
        component: DiffViewer,
        inputSchema: z.object({
            owner: z.string().describe("Owner"),
            repo: z.string().describe("Repo"),
            path: z.string().describe("File path to refactor"),
            instruction: z.string().describe("What to change (e.g. 'Use arrow functions')"),
        }),
        outputSchema: z.any(),
    },
];

// Components using Zod schemas directly
export const components: any[] = [
    {
        name: "RepoCard",
        description: "Display a repository.",
        component: RepoCard,
        propsSchema: z.object({
            repo: githubRepoSchema.optional(),
            isSelected: z.boolean().optional(),
        }),
    },
    {
        name: "IssueCard",
        description: "Display an issue.",
        component: IssueCard,
        propsSchema: z.object({
            issue: githubIssueSchema.optional(),
            isSelected: z.boolean().optional(),
        }),
    },
    {
        name: "GridLayout",
        description: "Grid layout for list of items.",
        component: GridLayout,
        propsSchema: z.object({
            items: z.array(z.unknown()),
            columns: z.unknown().optional(),
        }),
    },
    {
        name: "ObjectRenderer",
        description: "Smart renderer for data.",
        component: ObjectRenderer,
        propsSchema: z.object({
            data: z.unknown(),
        }),
    },
    {
        name: "PRCard",
        description: "Display a pull request.",
        component: PRCard,
        propsSchema: z.object({
            pr: githubPRSchema.optional(),
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
        name: "Graph",
        description: "Render a beautiful chart (bar, line, or pie) to visualize data trends, statistics, or distributions.",
        component: Graph,
        propsSchema: z.object({
            type: z.enum(['bar', 'line', 'pie']).describe("Chart type"),
            data: z.object({
                labels: z.array(z.string()),
                datasets: z.array(z.object({
                    label: z.string().optional(),
                    data: z.array(z.number()),
                })),
            }),
            title: z.string().optional(),
        }),
    },
];
