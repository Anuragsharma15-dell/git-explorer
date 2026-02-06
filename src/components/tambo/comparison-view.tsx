"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Eye, AlertCircle, Award } from "lucide-react";
import { GitHubRepo } from "@/lib/types";

interface RepoComparisonProps {
    repo1: GitHubRepo;
    repo2: GitHubRepo;
    analysis1?: Record<string, unknown>;
    analysis2?: Record<string, unknown>;
}

const StatRow = ({ label, val1, val2, icon: Icon, highlight = "high" }: { label: string, val1: number, val2: number, icon: React.ElementType, highlight?: "high" | "low" }) => {
    const is1Better = highlight === "high" ? val1 > val2 : val1 < val2;
    const is2Better = highlight === "high" ? val2 > val1 : val2 < val1;
    const isEqual = val1 === val2;

    const showWinCheck = !isEqual;

    return (
        <div className="grid grid-cols-7 items-center py-4 border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors px-4">
            <div className={`col-span-2 text-right font-mono font-bold text-sm ${is1Better ? 'text-primary' : 'text-muted-foreground'}`}>
                {val1?.toLocaleString() || '-'}
                {showWinCheck && is1Better && <span className="ml-2 inline-block text-[10px] text-primary">★</span>}
            </div>

            <div className="col-span-3 flex flex-col items-center justify-center text-center gap-1">
                <div className="p-1.5 rounded-full bg-muted/50">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{label}</span>
            </div>

            <div className={`col-span-2 text-left font-mono font-bold text-sm ${is2Better ? 'text-primary' : 'text-muted-foreground'}`}>
                {showWinCheck && is2Better && <span className="mr-2 inline-block text-[10px] text-primary">★</span>}
                {val2?.toLocaleString() || '-'}
            </div>
        </div>
    );
};

export function RepoComparison({ repo1, repo2, analysis1, analysis2 }: RepoComparisonProps) {
    // Simple "Winner" logic
    let score1 = 0;
    let score2 = 0;

    const metrics = [
        { v1: repo1.stargazers_count, v2: repo2.stargazers_count },
        { v1: repo1.forks_count, v2: repo2.forks_count },
        { v1: repo1.open_issues_count, v2: repo2.open_issues_count, invert: true }, // Less is usually better for maintenance, but debatable
        { v1: new Date(repo1.updated_at).getTime(), v2: new Date(repo2.updated_at).getTime() },
    ];

    metrics.forEach(m => {
        if (m.v1 === m.v2) return;

        const v1Wins = m.invert ? m.v1 < m.v2 : m.v1 > m.v2;
        if (v1Wins) score1++; else score2++;
    });

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 relative">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`flex-1 glass p-6 rounded-3xl border ${score1 > score2 ? 'border-primary/50 premium-shadow' : 'border-border/50'}`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={repo1.owner?.avatar_url}
                            className="w-10 h-10 rounded-xl border border-border"
                            alt={repo1.owner?.login}
                        />
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground">{repo1.owner?.login}</div>
                            <h3 className="font-bold text-lg truncate">{repo1.name}</h3>
                        </div>
                        {score1 > score2 && <Award className="ml-auto w-6 h-6 text-yellow-500 fill-yellow-500/20" />}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 h-10">{repo1.description}</p>
                </motion.div>

                <div className="mx-4 z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-background border-4 border-muted flex items-center justify-center font-black text-xs text-muted-foreground relative top-4 shadow-xl">
                        VS
                    </div>
                </div>

                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`flex-1 glass p-6 rounded-3xl border ${score2 > score1 ? 'border-primary/50 premium-shadow' : 'border-border/50'}`}
                >
                    <div className="flex items-center gap-3 mb-2 flex-row-reverse text-right">
                        <img
                            src={repo2.owner?.avatar_url}
                            className="w-10 h-10 rounded-xl border border-border"
                            alt={repo2.owner?.login}
                        />
                        <div className="min-w-0">
                            <div className="text-xs text-muted-foreground">{repo2.owner?.login}</div>
                            <h3 className="font-bold text-lg truncate">{repo2.name}</h3>
                        </div>
                        {score2 > score1 && <Award className="mr-auto w-6 h-6 text-yellow-500 fill-yellow-500/20" />}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 text-right h-10">{repo2.description}</p>
                </motion.div>
            </div>

            <div className="glass rounded-3xl overflow-hidden border border-border/50 bg-card/50">
                <StatRow
                    label="Stars"
                    val1={repo1.stargazers_count}
                    val2={repo2.stargazers_count}
                    icon={Star}
                />
                <StatRow
                    label="Forks"
                    val1={repo1.forks_count}
                    val2={repo2.forks_count}
                    icon={GitFork}
                />
                <StatRow
                    label="Open Issues"
                    val1={repo1.open_issues_count}
                    val2={repo2.open_issues_count}
                    icon={AlertCircle}
                    highlight="low" // Lower is conceptually cleaner, though debatable for popularity
                />
                <StatRow
                    label="Watchers"
                    val1={repo1.watchers_count}
                    val2={repo2.watchers_count}
                    icon={Eye}
                />
                <div className="grid grid-cols-7 items-center py-4 px-4 bg-muted/10">
                    <div className="col-span-2 text-right text-xs font-mono text-muted-foreground">
                        {new Date(repo1.updated_at).toLocaleDateString()}
                    </div>
                    <div className="col-span-3 text-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Last Updated</span>
                    </div>
                    <div className="col-span-2 text-left text-xs font-mono text-muted-foreground">
                        {new Date(repo2.updated_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
