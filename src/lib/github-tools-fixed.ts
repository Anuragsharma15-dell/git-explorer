import { z } from "zod";
import {
    getOrganizationRepositories,
    getRepository,
    getRepositoryIssues,
    getRepositoryPRs,
} from "@/services/github-tools";

/**
 * Simplified GitHub tools without components or complex schemas
 * Testing if the issue is with schema complexity
 */
export const githubToolsFixed: any[] = [
    {
        name: "get_organization_repos",
        description: "List repositories for a GitHub organization. Example: 'Show me repos from vercel' or 'List facebook repositories'",
        tool: async (input: { org: string; per_page?: number }) => {
            try {
                const repos = await getOrganizationRepositories(input);
                return {
                    success: true,
                    count: repos.length,
                    repositories: repos.slice(0, 5) // Limit to 5 for demo
                };
            } catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Failed to fetch repositories'
                };
            }
        },
        inputSchema: z.object({
            org: z.string().describe("Organization name (e.g., 'vercel', 'facebook')"),
            per_page: z.number().optional().default(10).describe("Number of repos to fetch")
        }),
        outputSchema: z.object({
            success: z.boolean(),
            count: z.number().optional(),
            repositories: z.array(z.any()).optional(),
            error: z.string().optional()
        })
    },
    {
        name: "get_repository_info",
        description: "Get detailed information about a specific repository. Example: 'Tell me about vercel/next.js' or 'Show info for facebook/react'",
        tool: async (input: { owner: string; repo: string }) => {
            try {
                const repo = await getRepository(input);
                return {
                    success: true,
                    repository: {
                        name: repo.name,
                        full_name: repo.full_name,
                        description: repo.description,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        open_issues: repo.open_issues_count,
                        language: repo.language,
                        url: repo.html_url
                    }
                };
            } catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Failed to fetch repository info'
                };
            }
        },
        inputSchema: z.object({
            owner: z.string().describe("Repository owner/organization name"),
            repo: z.string().describe("Repository name")
        }),
        outputSchema: z.object({
            success: z.boolean(),
            repository: z.any().optional(),
            error: z.string().optional()
        })
    },
    {
        name: "list_repository_issues",
        description: "List issues from a repository. Example: 'Show open issues in vercel/next.js' or 'List bugs in facebook/react'",
        tool: async (input: { owner: string; repo: string; state?: 'open' | 'closed' | 'all' }) => {
            try {
                const issues = await getRepositoryIssues({
                    owner: input.owner,
                    repo: input.repo,
                    state: input.state || 'open',
                    per_page: 10
                });
                return {
                    success: true,
                    count: issues.length,
                    issues: issues.map(issue => ({
                        number: issue.number,
                        title: issue.title,
                        state: issue.state,
                        labels: issue.labels,
                        created_at: issue.created_at
                    }))
                };
            } catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Failed to fetch issues'
                };
            }
        },
        inputSchema: z.object({
            owner: z.string().describe("Repository owner"),
            repo: z.string().describe("Repository name"),
            state: z.enum(['open', 'closed', 'all']).optional().default('open').describe("Issue state filter")
        }),
        outputSchema: z.object({
            success: z.boolean(),
            count: z.number().optional(),
            issues: z.array(z.any()).optional(),
            error: z.string().optional()
        })
    }
];
