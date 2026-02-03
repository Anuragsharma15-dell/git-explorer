"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, FileCode2, GitPullRequest } from "lucide-react";

interface DiffViewerProps {
    originalCode: string;
    newCode: string;
    filePath: string;
    explanation?: string;
}

export function DiffViewer({ originalCode, newCode, filePath, explanation }: DiffViewerProps) {
    // Simple diff visualization by splitting lines
    // In a real production app, use 'diff' package to compute chunks
    const originalLines = originalCode.split('\n');
    const newLines = newCode.split('\n');
    const maxLines = Math.max(originalLines.length, newLines.length);

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-xs rounded-xl overflow-hidden border border-border shadow-xl bg-card">
            <div className="bg-muted/50 p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <FileCode2 className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{filePath}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold border border-blue-500/20">Refactor Proposal</span>
                </div>
                <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2 text-xs font-bold shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 duration-200">
                    <GitPullRequest className="w-3.5 h-3.5" />
                    Create PR
                </button>
            </div>

            {explanation && (
                <div className="p-4 bg-primary/5 border-b border-primary/10 text-sm font-sans text-muted-foreground leading-relaxed">
                    <span className="font-bold text-primary mr-2">Why?</span>
                    {explanation}
                </div>
            )}

            <div className="flex bg-background min-h-[400px] max-h-[600px] overflow-auto">
                {/* Original Side */}
                <div className="flex-1 border-r border-border/50 min-w-0">
                    <div className="sticky top-0 bg-muted/80 backdrop-blur-sm p-2 text-center text-[10px] font-bold text-muted-foreground border-b border-border/50 z-10">
                        ORIGINAL
                    </div>
                    <div className="p-0">
                        {Array.from({ length: maxLines }).map((_, i) => {
                            const line = originalLines[i];
                            const isDiff = line !== newLines[i]; // Naive diff check
                            // Naive coloring: if line exists in orig but not new = removed (red). This logic is flawed without proper diff algo, so we just show side-by-side cleanly.
                            // Better: Just show contents.
                            const content = line !== undefined ? line : '';

                            return (
                                <div key={i} className="flex group hover:bg-muted/30">
                                    <div className="w-8 select-none text-right text-muted-foreground/30 pr-3 border-r border-border/20 bg-muted/10 group-hover:text-muted-foreground/50">{i + 1}</div>
                                    <div className="pl-3 py-0.5 whitespace-pre overflow-x-hidden text-muted-foreground">{content}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* New Side */}
                <div className="flex-1 min-w-0 bg-green-500/5">
                    <div className="sticky top-0 bg-green-500/10 backdrop-blur-sm p-2 text-center text-[10px] font-bold text-green-600 border-b border-green-500/20 z-10">
                        PROPOSED
                    </div>
                    <div className="p-0">
                        {Array.from({ length: maxLines }).map((_, i) => {
                            const line = newLines[i];
                            const content = line !== undefined ? line : '';
                            const isDiff = line !== originalLines[i];

                            return (
                                <div key={i} className={`flex group ${isDiff ? 'bg-green-500/10' : 'hover:bg-muted/30'}`}>
                                    <div className="w-8 select-none text-right text-green-600/30 pr-3 border-r border-green-500/10 bg-green-500/5 group-hover:text-green-600/50">{i + 1}</div>
                                    <div className={`pl-3 py-0.5 whitespace-pre overflow-x-hidden ${content ? 'text-foreground' : ''}`}>{content}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
