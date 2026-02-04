import { z } from "zod";
import { githubAPI } from "./github-api";
import {
  issuesInputSchema,
  prsInputSchema,
} from "../lib/types";

// Organization Repository Tools
export const getOrganizationRepositories = async (input: { org: string; per_page?: number }) => {
  try {
    return await githubAPI.getOrganizationRepositories(input.org, input.per_page);
  } catch (error) {
    throw new Error(`Failed to fetch organization repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getRepository = async (input: { owner: string; repo: string }) => {
  try {
    return await githubAPI.getRepository(input.owner, input.repo);
  } catch (error) {
    throw new Error(`Failed to fetch repository details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Issues Tools
export const getRepositoryIssues = async (input: z.infer<typeof issuesInputSchema>) => {
  console.log('[GitHub Tools] getRepositoryIssues called with:', input);
  try {
    const issues = await githubAPI.getRepositoryIssues(input);
    console.log(`[GitHub Tools] Successfully fetched ${issues.length} issues`);
    return issues;
  } catch (error) {
    console.error('[GitHub Tools] Failed to fetch issues:', error);
    throw new Error(`Failed to fetch issues: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Pull Requests Tools
export const getRepositoryPRs = async (input: z.infer<typeof prsInputSchema>) => {
  try {
    return await githubAPI.getRepositoryPRs(input);
  } catch (error) {
    throw new Error(`Failed to fetch pull requests: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Analytics Tools
export const getRepositoryContributors = async (input: { owner: string; repo: string }) => {
  try {
    return await githubAPI.getRepositoryContributors(input.owner, input.repo);
  } catch (error) {
    throw new Error(`Failed to fetch contributors: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getRepositoryLanguages = async (input: { owner: string; repo: string }) => {
  try {
    return await githubAPI.getRepositoryLanguages(input.owner, input.repo);
  } catch (error) {
    throw new Error(`Failed to fetch languages: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getRepositoryActivity = async (input: { owner: string; repo: string }) => {
  try {
    return await githubAPI.getRepositoryActivity(input.owner, input.repo);
  } catch (error) {
    throw new Error(`Failed to fetch activity: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};


// --- Advanced Tools (Reader) ---

export const getFileContent = async (input: { owner: string; repo: string; path: string }) => {
  try {
    return await githubAPI.getFileContent(input.owner, input.repo, input.path);
  } catch (error) {
    throw new Error(`Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getDirectoryContent = async (input: { owner: string; repo: string; path?: string }) => {
  try {
    return await githubAPI.getDirectoryContent(input.owner, input.repo, input.path || "");
  } catch (error) {
    throw new Error(`Failed to list directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getPullRequestFiles = async (input: { owner: string; repo: string; pull_number: number }) => {
  try {
    return await githubAPI.getPullRequestFiles(input.owner, input.repo, input.pull_number);
  } catch (error) {
    throw new Error(`Failed to fetch PR files: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// --- Power User Tools (Writer & Search & CI) ---

export const createIssue = async (input: { owner: string; repo: string; title: string; body?: string; labels?: string[]; assignees?: string[] }) => {
  try {
    return await githubAPI.createIssue(input.owner, input.repo, input.title, input.body, input.labels, input.assignees);
  } catch (error) {
    throw new Error(`Failed to create issue: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const searchCode = async (input: { q: string; per_page?: number }) => {
  try {
    return await githubAPI.searchCode(input.q, input.per_page);
  } catch (error) {
    throw new Error(`Failed to search code: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getWorkflowRuns = async (input: { owner: string; repo: string; per_page?: number }) => {
  try {
    return await githubAPI.getWorkflowRuns(input.owner, input.repo, input.per_page);
  } catch (error) {
    throw new Error(`Failed to fetch workflow runs: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const debugWorkflowRun = async (input: { owner: string; repo: string; run_id: number }) => {
  try {
    const jobs = await githubAPI.getWorkflowRunJobs(input.owner, input.repo, input.run_id);
    // Logic to only return failed steps could be here, but let's return all for the agent to analyze
    return jobs;
  } catch (error) {
    throw new Error(`Failed to debug workflow run: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getNotifications = async (input: { all?: boolean; participating?: boolean }) => {
  try {
    return await githubAPI.getNotifications(input.all, input.participating);
  } catch (error) {
    throw new Error(`Failed to fetch notifications: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
