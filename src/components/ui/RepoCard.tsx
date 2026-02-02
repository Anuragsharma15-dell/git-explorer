"use client";

import { GitHubRepo } from "@/lib/types";
import { useChatInput } from "@/contexts/chat-input-context";
import { Star, GitFork, Eye, Calendar, ExternalLink, GitPullRequest, AlertCircle, TrendingUp, Activity } from "lucide-react";


interface RepoCardProps {
  repo?: GitHubRepo | unknown; // Allow raw objects for delegation
  onSelect?: (repo: GitHubRepo) => void;
  isSelected?: boolean;
}

export function RepoCard({ repo, onSelect }: RepoCardProps) {
  const { setInputValue } = useChatInput();

  if (!repo) {
    return (
      <div className="glass rounded-2xl p-6 border border-border/50 bg-muted/30">
        <div className="text-sm font-medium text-muted-foreground italic text-center">Repository details not available</div>
      </div>
    );
  }

  // Handle raw objects safely
  const repoData = (typeof repo === 'object' && repo !== null) ? (repo as GitHubRepo) : {} as GitHubRepo;

  const formatNumber = (num: number | undefined) => {
    if (num == null) return '0';
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleActionClick = (action: 'prs' | 'issues' | 'analyze') => {
    const fullName = `${repoData.owner?.login}/${repoData.name}`;
    if (action === 'prs') setInputValue(`Show me the pull requests for ${fullName}`);
    else if (action === 'issues') setInputValue(`Show me the issues for ${fullName}`);
    else if (action === 'analyze') setInputValue(`Analyze the repository ${fullName} and give me a code health report`);
  };

  return (
    <div
      className="group relative glass rounded-2xl p-5 transition-all duration-300 hover:premium-shadow border border-border/50 hover:border-primary/30 bg-card overflow-hidden"
      onClick={() => onSelect?.(repoData)}
    >
      {/* Accent Gradient Blur */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">{repoData.owner?.login || 'Repository'}</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground">{formatDate(repoData.updated_at)}</span>
            </div>
            <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
              {repoData.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black text-primary uppercase">Public</div>
            {repoData.html_url && (
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-muted-backdrop text-muted-foreground transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {repoData.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {repoData.description}
          </p>
        )}

        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/40 mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-muted-foreground mb-0.5">Stars</span>
            <div className="flex items-center gap-1.5 text-foreground font-bold text-xs uppercase tracking-tight">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {formatNumber(repoData.stargazers_count)}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-muted-foreground mb-0.5">Forks</span>
            <div className="flex items-center gap-1.5 text-foreground font-bold text-xs uppercase tracking-tight">
              <GitFork className="w-3 h-3 text-blue-400" />
              {formatNumber(repoData.forks_count)}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-muted-foreground mb-0.5">Health</span>
            <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-tight">
              <TrendingUp className="w-3 h-3" />
              85%
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            {repoData.language && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-[10px] font-bold text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {repoData.language}
              </div>
            )}
            <div className="flex-1" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleActionClick('analyze'); }}
            className="flex-1 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:premium-shadow active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            Analyze
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); handleActionClick('prs'); }}
              className="w-9 h-9 rounded-xl glass hover:bg-muted font-bold text-foreground transition-all flex items-center justify-center cursor-pointer group/btn"
              title="Show PRs"
            >
              <GitPullRequest className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleActionClick('issues'); }}
              className="w-9 h-9 rounded-xl glass hover:bg-muted font-bold text-foreground transition-all flex items-center justify-center cursor-pointer group/btn"
              title="Show Issues"
            >
              <AlertCircle className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
