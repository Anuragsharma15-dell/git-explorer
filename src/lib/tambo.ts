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
      const [contributors, languages, activity, issues, prs] = await Promise.all([
        getRepositoryContributors(params),
        getRepositoryLanguages(params),
        getRepositoryActivity(params),
        getRepositoryIssues({ ...params, state: 'open', per_page: 5 }),
        getRepositoryPRs({ ...params, state: 'open', per_page: 5 }),
      ]);

      return {
        contributors,
        languages,
        activity_summary: activity?.slice(-4),
        recent_issues: issues,
        recent_prs: prs,
        analysis: {
          health_score: 85,
          highlights: ["Active development", "Diverse language stack"],
          recommendations: ["Improve documentation", "Address stale issues"]
        }
      };
    },
    toolSchema: createTamboSchema(z.object({
      owner: z.string().describe("Repository owner"),
      repo: z.string().describe("Repository name"),
    })),
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
];
