"use client";

import * as React from "react";
import { FileCode, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchResultItem {
    name: string;
    path: string;
    sha: string;
    url: string;
    html_url: string;
    repository: {
        full_name: string;
    };
}

interface CodeSearchResultsProps {
    items: SearchResultItem[];
    total_count?: number;
}

export function CodeSearchResults({ items, total_count }: CodeSearchResultsProps) {
    if (!items || items.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                No code found matching your query.
            </div>
        );
    }

    return (
        <div className="w-full max-w-full space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Code Matches {total_count && `(${total_count})`}
                </h3>
            </div>

            <div className="grid gap-3">
                {items.map((item) => (
                    <a
                        key={item.sha}
                        href={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:premium-shadow transition-all"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FileCode className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                    {item.path}
                                </span>
                                <span className="text-xs text-muted-foreground truncate">
                                    {item.repository.full_name}
                                </span>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </a>
                ))}
            </div>
        </div>
    );
}
