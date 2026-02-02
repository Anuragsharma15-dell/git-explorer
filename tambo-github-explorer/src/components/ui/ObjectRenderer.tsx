"use client";

import React from "react";
import { RepoCard } from "./RepoCard";
import { IssueCard } from "./IssueCard";
import { PRCard } from "./PRCard";


/**
 * Utility component that detects object types and delegates to appropriate card components.
 * This replaces the complex object handling logic previously in CardGroup.
 */

interface ObjectRendererProps {
  data: unknown;
  index?: number;
  onSelect?: (item: unknown) => void;
  isSelected?: boolean;
}

const toText = (v: unknown) => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "[object]";
  }
};

export function ObjectRenderer({ data, onSelect, isSelected = false }: ObjectRendererProps) {
  // Handle non-objects
  if (typeof data !== "object" || data === null) {
    return (
      <div className="p-4 border rounded-lg bg-card">
        <p className="text-sm text-foreground">{toText(data)}</p>
      </div>
    );
  }

  // Skip empty objects
  if (Object.keys(data).length === 0) {
    return null;
  }

  const obj = data as Record<string, unknown>;

  // Detect repository objects
  if (obj.id && (obj.name || obj.full_name) && obj.owner && typeof obj.stargazers_count !== 'undefined') {
    return (
      <RepoCard 
        repo={obj} 
        onSelect={onSelect} 
        isSelected={isSelected} 
      />
    );
  }

  // Detect PR objects - add debug logging
  const userObj = obj.user as Record<string, unknown> | undefined;
  const baseObj = obj.base as Record<string, unknown> | undefined;
  const repoObj = baseObj?.repo as Record<string, unknown> | undefined;
  const ownerObj = repoObj?.owner as Record<string, unknown> | undefined;
  
  const isPR = obj.id && obj.title && obj.number && obj.state && obj.html_url && userObj?.login && obj.head && ownerObj?.login;
  console.log('[ObjectRenderer] PR Detection:', {
    hasId: !!obj.id,
    hasTitle: !!obj.title,
    hasNumber: !!obj.number,
    hasState: !!obj.state,
    hasHtmlUrl: !!obj.html_url,
    hasUserLogin: !!userObj?.login,
    hasHead: !!obj.head,
    hasBaseRepoOwner: !!ownerObj?.login,
    isPR,
    keys: Object.keys(obj).slice(0, 10) // First 10 keys for debugging
  });
  
  if (isPR) {
    return (
      <PRCard
        pr={obj}
        onSelect={onSelect}
        isSelected={isSelected}
      />
    );
  }

  // Detect issue objects (but not PRs)
  if (obj.id && obj.title && obj.number && !obj.head && !obj.base) {
    return (
      <IssueCard 
        issue={obj} 
        onSelect={onSelect} 
        isSelected={isSelected} 
      />
    );
  }

  // Fallback for unknown objects
  const heading = toText(obj.name || obj.title || obj.label || "");
  const description = toText(obj.description || obj.summary || obj.text || "");
  const hasHeading = heading.trim().length > 0;

  return (
    <div className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📄</span>
        <span className="text-xs text-muted-foreground font-medium">Object</span>
      </div>
      {hasHeading && (
        <h4 className="font-medium break-words mb-1">{heading}</h4>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-2 break-words line-clamp-2">
          {description}
        </p>
      )}
      {!hasHeading && !description && (
        <div className="text-xs text-muted-foreground">
          {Object.keys(data).slice(0, 3).join(", ")}...
        </div>
      )}
    </div>
  );
}