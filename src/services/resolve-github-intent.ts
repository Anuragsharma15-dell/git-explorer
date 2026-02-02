// src/services/resolve-github-intent.ts
import { z } from "zod";

export type ResolvedIntent =
  | { kind: "list_org_repos"; params: { org: string; per_page?: number } }
  | { kind: "list_issues"; params: { owner: string; repo: string; state?: "open" | "closed" | "all"; per_page?: number } }
  | { kind: "list_prs"; params: { owner: string; repo: string; state?: "open" | "closed" | "all"; per_page?: number } };

export const resolveGitHubIntentInputSchema = z.object({
  input: z.string().min(1).describe("Natural language request: 'show 4 repos from [org]', 'show 4 issues from [owner/repo]', or 'show 4 pull requests from [owner/repo]'"),
  fallback_per_page: z.number().int().min(1).max(100).optional().default(4),
});

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

/** Extract count from text, defaulting to 4 */
function extractCount(text: string): number {
  const match = text.match(/\b(\d{1,2})\b/);
  if (match) {
    const n = parseInt(match[1], 10);
    return clamp(n, 1, 100);
  }
  return 4; // Default to 4
}

/** Extract organization name from text */
function extractOrg(text: string): string | undefined {
  const match = text.match(/\bfrom\s+([a-z0-9-_]+)(?:\s+org)?\b/i);
  return match?.[1];
}

/** Extract owner/repo from text */
function extractRepo(text: string): { owner: string; repo: string } | undefined {
  const match = text.match(/\bfrom\s+([a-z0-9-_]+)\/([a-z0-9-_.]+)\b/i);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return undefined;
}

/**
 * Main resolver
 */
export function resolveGitHubIntent(input: z.infer<typeof resolveGitHubIntentInputSchema>): ResolvedIntent {
  const { input: textRaw } = resolveGitHubIntentInputSchema.parse(input);
  const text = textRaw.trim().toLowerCase();

  const count = extractCount(text);
  const state: "open" | "closed" | "all" = "open"; // Default to open

  // Check for repo-specific requests (issues or PRs)
  const repo = extractRepo(text);
  if (repo) {
    if (text.includes("issue")) {
      return { kind: "list_issues", params: { ...repo, state, per_page: count } };
    }
    if (text.includes("pull request") || text.includes("pr")) {
      return { kind: "list_prs", params: { ...repo, state, per_page: count } };
    }
  }

  // Check for org repos request
  const org = extractOrg(text);
  if (org && text.includes("repo")) {
    return { kind: "list_org_repos", params: { org, per_page: count } };
  }

  // Default fallback - assume org repos if we have an org
  if (org) {
    return { kind: "list_org_repos", params: { org, per_page: count } };
  }

  // If no clear pattern, default to a generic org (for demo purposes)
  return { kind: "list_org_repos", params: { org: "vercel", per_page: count } };
}
