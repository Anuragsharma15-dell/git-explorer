"use client";

import { GitHubPR } from "@/lib/types";
import { useChatInput } from "@/contexts/chat-input-context";
import { GitPullRequest, Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";


interface PRCardProps {
  pr?: GitHubPR | unknown; // Allow raw objects for delegation
  onSelect?: (pr: GitHubPR) => void;
  isSelected?: boolean;
}

export function PRCard({ pr, onSelect }: PRCardProps) {
  if (!pr) {
    return (
      <div className="glass rounded-xl p-4 border border-border/50 bg-muted/30">
        <div className="text-sm font-medium text-muted-foreground italic text-center">Pull request details not available</div>
      </div>
    );
  }

  // Handle raw objects safely
  const prData = (typeof pr === 'object' && pr !== null) ? (pr as GitHubPR) : {} as GitHubPR;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const status = prData.state === 'closed' ? (prData.merged_at ? 'merged' : 'closed') : 'open';

  const statusStyles = {
    open: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    merged: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    closed: "bg-rose-500/10 text-rose-600 border-rose-500/20"
  };

  const handleClick = () => {
    if (prData.html_url) window.open(prData.html_url, '_blank');
    onSelect?.(prData);
  };

  return (
    <div
      className="group relative glass rounded-xl p-4 transition-all duration-300 hover:premium-shadow border border-border/50 hover:border-primary/30 bg-card cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter ${statusStyles[status]}`}>
              {status}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">#{prData.number}</span>
            <div className="flex-1" />
            <span className="text-[10px] text-muted-foreground font-medium">{formatDate(prData.created_at)}</span>
          </div>

          <h3 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-3">
            {prData.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                {prData.user?.avatar_url ? (
                  <img src={prData.user.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground truncate max-w-[80px]">
                {prData.user?.login}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600">
                <CheckCircle className="w-3 h-3" />
                {prData.additions || 0}
              </div>
              <div className="flex items-center gap-0.5 text-[9px] font-bold text-rose-600">
                <XCircle className="w-3 h-3" />
                {prData.deletions || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
