"use client";

import React, { useState } from "react";
import { Copy, Plus, ClipboardCheck, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ReleaseBuilderProps {
    owner: string;
    repo: string;
    suggestedBody: string;
    includedPRs: { number: number; title: string; html_url: string; user: { login: string; avatar_url: string } }[];
}

export function ReleaseBuilder({ owner, repo, suggestedBody, includedPRs }: ReleaseBuilderProps) {
    const [body, setBody] = useState(suggestedBody);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

    const handlePublish = () => {
        setIsPublishing(true);
        // Simulate API call for now since actual GitHub Release API requires a complex 'create release' flow
        // In a real app, this would call a tool or a server action.
        setTimeout(() => {
            setIsPublishing(false);
            setPublishedUrl(`https://github.com/${owner}/${repo}/releases/tag/v${new Date().toISOString().slice(0, 10).replace(/-/g, '.')}`);
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                        <ClipboardCheck className="w-5 h-5" />
                    </div>
                    Draft Release Note
                </h3>
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">{owner}/{repo}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Editor */}
                <div className="md:col-span-2 space-y-3">
                    <div className="relative group">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full h-[400px] bg-card border border-border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner leading-relaxed"
                            placeholder="# Release Title..."
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => { navigator.clipboard.writeText(body); }}
                                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                                title="Copy markdown"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                            Preview
                        </button>
                        {!publishedUrl ? (
                            <button
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
                            >
                                {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Publish Release
                            </button>
                        ) : (
                            <a
                                href={publishedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-green-500/20"
                            >
                                View Release <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Sidebar: Included PRs */}
                <div className="md:col-span-1 space-y-3">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Included Changes</div>
                    <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                        {includedPRs?.map((pr) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={pr.number}
                                className="p-3 bg-muted/30 border border-border/50 rounded-lg text-xs hover:bg-muted/50 transition-colors group cursor-pointer"
                                onClick={() => {
                                    // Helper to append to cursor would be nice, but for now just appending to end
                                    if (!body.includes(`#${pr.number}`)) {
                                        setBody(prev => prev + `\n- ${pr.title} (@${pr.user.login})`);
                                    }
                                }}
                            >
                                <div className="font-bold line-clamp-2 mb-1 group-hover:text-primary transition-colors">{pr.title}</div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="font-mono">#{pr.number}</span>
                                    <div className="flex items-center gap-1">
                                        <img src={pr.user.avatar_url} className="w-4 h-4 rounded-full" alt={pr.user.login} />
                                        <span className="truncate max-w-[60px]">{pr.user.login}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
