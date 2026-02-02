import { z } from "zod";

// GitHub User Schema
export const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  html_url: z.string(),
  type: z.string(),
});

// GitHub Repository Schema
export const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  owner: githubUserSchema,
  description: z.string().nullable(),
  html_url: z.string(),
  clone_url: z.string(),
  ssh_url: z.string(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  default_branch: z.string(),
  topics: z.array(z.string()),
  language: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  private: z.boolean(),
});

// GitHub Issue Schema
export const githubIssueSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  state: z.enum(["open", "closed"]),
  user: githubUserSchema,
  assignees: z.array(githubUserSchema),
  labels: z.array(z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    description: z.string().nullable(),
  })),
  html_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().nullable(),
  comments: z.number(),
});

// GitHub Pull Request Schema
export const githubPRSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  state: z.enum(["open", "closed"]),
  merged: z.boolean().optional(),
  user: githubUserSchema,
  assignees: z.array(githubUserSchema),
  requested_reviewers: z.array(githubUserSchema),
  labels: z.array(z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    description: z.string().nullable(),
  })),
  html_url: z.string(),
  diff_url: z.string(),
  patch_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().nullable(),
  merged_at: z.string().nullable(),
  head: z.object({
    ref: z.string(),
    sha: z.string(),
  }),
  base: z.object({
    ref: z.string(),
    sha: z.string(),
    repo: z.object({
      name: z.string(),
      owner: z.object({
        login: z.string(),
      }),
    }),
  }),
  changed_files: z.number().optional(),
  additions: z.number().optional(),
  deletions: z.number().optional(),
  comments: z.number().optional(),
  review_comments: z.number().optional(),

});



// GitHub Branch Schema
export const githubBranchSchema = z.object({
  name: z.string(),
  commit: z.object({
    sha: z.string(),
    url: z.string(),
  }),
  protected: z.boolean(),
});

// Input Schemas for Tools
export const issuesInputSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().optional().describe("Repository name (required for repo-level, omitted for org-wide)"),
  org: z.string().optional().describe("Organization name for org-wide issues"),
  state: z.enum(["open", "closed", "all"]).default("open").describe("Issue state filter"),
  labels: z.string().optional().describe("Comma-separated list of label names"),
  assignee: z.string().optional().describe("Username of assignee"),
  per_page: z.number().min(1).max(100).default(30).describe("Number of results per page"),
  page: z.number().optional().describe("Page number for pagination"),
});

export const prsInputSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  state: z.enum(["open", "closed", "all"]).default("open").describe("PR state filter"),
  base: z.string().optional().describe("Base branch name"),
  head: z.string().optional().describe("Head branch name"),
  per_page: z.number().min(1).max(100).default(30).describe("Number of results per page"),
});

// Analysis Schemas
export const repoAnalysisSchema = z.object({
  health_score: z.number().min(0).max(100),
  metrics: z.object({
    issue_close_rate: z.number(),
    pr_merge_rate: z.number(),
    commit_frequency: z.number(),
    contributor_count: z.number(),
  }),
  areas_of_improvement: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const contributorStatsSchema = z.object({
  user: githubUserSchema,
  total_commits: z.number(),
  additions: z.number(),
  deletions: z.number(),
});

export const repoActivitySchema = z.object({
  daily_commits: z.array(z.object({
    date: z.string(),
    count: z.number(),
  })),
  active_contributors: z.number(),
});

// Type exports
export type GitHubUser = z.infer<typeof githubUserSchema>;
export type GitHubRepo = z.infer<typeof githubRepoSchema>;
export type GitHubIssue = z.infer<typeof githubIssueSchema>;
export type GitHubPR = z.infer<typeof githubPRSchema>;
export type GitHubBranch = z.infer<typeof githubBranchSchema>;
export type IssuesInput = z.infer<typeof issuesInputSchema>;
export type PRsInput = z.infer<typeof prsInputSchema>;
export type RepoAnalysis = z.infer<typeof repoAnalysisSchema>;
export type ContributorStats = z.infer<typeof contributorStatsSchema>;
export type RepoActivity = z.infer<typeof repoActivitySchema>;
