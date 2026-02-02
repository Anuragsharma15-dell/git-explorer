"use client";

import { GitHubIssue } from "@/lib/types";
import { useChatInput } from "@/contexts/chat-input-context";
import { AlertCircle, MessageCircle, Calendar, User, CheckCircle } from "lucide-react";

interface IssueCardProps {
  issue?: GitHubIssue | unknown; // Allow raw objects for delegation
  onSelect?: (issue: GitHubIssue) => void;
  isSelected?: boolean;
}

export function IssueCard({ issue, onSelect }: IssueCardProps) {
  const { } = useChatInput();
  // Handle undefined issue prop
  if (!issue) {
    return (
      <div className="border rounded-md p-3 border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">Issue data not available</div>
      </div>
    );
  }

  // Handle raw objects - detect if this is an issue object
  if (typeof issue === 'object' && issue !== null) {
    const issueObj = issue as Record<string, unknown>;
    // If it doesn't look like an issue, return a fallback
    if (!issueObj.id || !issueObj.title || !issueObj.number || !issueObj.state) {
      return (
        <div className="border rounded-md p-3 border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500">Invalid issue data</div>
          <div className="text-xs text-gray-400 mt-1">
            Keys: {Object.keys(issueObj).join(', ')}
          </div>
        </div>
      );
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const issueData = issue as GitHubIssue;

  const getStatusIcon = () => {
    return issueData.state === 'open' ? 
      <AlertCircle className="w-4 h-4 text-green-600" /> : 
      <CheckCircle className="w-4 h-4 text-purple-600" />;
  };

  const getStatusColor = () => {
    return issueData.state === 'open' ? 'text-green-600' : 'text-purple-600';
  };


  const handleClick = () => {
    if (issueData.html_url) {
      window.open(issueData.html_url, '_blank');
    }
    onSelect?.(issueData);
  };

  return (
    <div 
      className="
        border rounded-md p-3 cursor-pointer transition-all duration-200
        hover:border-gray-300 border-gray-200 bg-white
      "
      onClick={handleClick}
    >
      <div className="flex items-start gap-2">
        <div className="mt-1">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 pr-2">
              {issueData.title}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              #{issueData.number}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1.5">
            <span className={getStatusColor()}>
              {issueData.state.charAt(0).toUpperCase() + issueData.state.slice(1)}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{issueData.user?.login || 'Unknown user'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(issueData.created_at)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{issueData.comments || 0}</span>
              </div>
              {issueData.assignees && issueData.assignees.length > 0 && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{issueData.assignees.length} assigned</span>
                </div>
              )}
            </div>
            
            {issueData.labels && issueData.labels.length > 0 && (
              <div className="flex gap-1">
                {issueData.labels.slice(0, 2).map((label: Record<string, unknown>, index: number) => (
                  <span
                    key={(label.id as string | number) || `${label.name as string}-${index}`}
                    className="px-2 py-1 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full"
                  >
                    {label.name as string}
                  </span>
                ))}
                {issueData.labels.length > 2 && (
                  <span className="px-2 py-1 text-xs text-gray-500">
                    +{issueData.labels.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          
          {issueData.body && (
             <p className="text-xs text-gray-700 mt-1.5 line-clamp-2">
               {issueData.body?.substring(0, 100)}...
             </p>
           )}
        </div>
      </div>
    </div>
  );
}