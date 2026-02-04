"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HealthGauge } from "@/components/ui/HealthGauge";
import { CheckCircle2, AlertTriangle, Users, BookOpen, Activity, GitPullRequest, AlertCircle } from "lucide-react";
import { Graph } from "@/components/tambo/graph";

interface RepositoryAnalysisProps {
    contributors?: any[];
    languages?: Record<string, number>;
    activity_summary?: any[];
    recent_issues?: any[];
    recent_prs?: any[];
    analysis?: {
        health_score: number;
        highlights: string[];
        recommendations: string[];
    };
}

export function RepositoryAnalysis({
    contributors,
    languages,
    activity_summary,
    recent_issues,
    recent_prs,
    analysis
}: RepositoryAnalysisProps) {
    if (!analysis) return null;

    const topLanguage = languages ? Object.keys(languages)[0] : "Unknown";
    const contributorCount = contributors?.length || 0;

    // Calculate a simplified "color" for the health score
    const scoreColor = analysis.health_score >= 80 ? "green" : analysis.health_score >= 50 ? "yellow" : "red";

    const activityLabels = (activity_summary || []).map((w: any) =>
        w ? new Date((w.week || 0) * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""
    );
    const activityData = (activity_summary || []).map((w: any) => w?.total || 0);

    const langLabels = Object.keys(languages || {});
    // Take top 5 languages for cleaner pie chart
    const topLangLabels = langLabels.slice(0, 5);
    const topLangData = topLangLabels.map(l => languages![l]);

    return (
        <div className="w-full space-y-8">
            {/* Header Section with Score and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-1 flex flex-col"
                >
                    <HealthGauge
                        title="Repository Health"
                        value={analysis.health_score}
                        max={100}
                        color={scoreColor}
                        size="lg"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    <div className="glass p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                        <Users className="w-5 h-5 text-blue-500 mb-2" />
                        <span className="text-xl font-bold">{contributorCount > 0 ? contributorCount : "-"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Contributors</span>
                    </div>
                    <div className="glass p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                        <BookOpen className="w-5 h-5 text-purple-500 mb-2" />
                        <span className="text-xl font-bold truncate max-w-full px-1">{topLanguage}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Language</span>
                    </div>
                    <div className="glass p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                        <AlertCircle className="w-5 h-5 text-orange-500 mb-2" />
                        <span className="text-xl font-bold">{recent_issues?.length || 0}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Issues</span>
                    </div>
                    <div className="glass p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                        <GitPullRequest className="w-5 h-5 text-green-500 mb-2" />
                        <span className="text-xl font-bold">{recent_prs?.length || 0}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Open PRs</span>
                    </div>

                    {/* Highlights & Recommendations stacked under stats */}
                    <div className="col-span-2 sm:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="rounded-xl p-4 border border-green-500/20 bg-green-500/5 items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <h3 className="font-bold text-sm">Highlights</h3>
                            </div>
                            <ul className="space-y-1">
                                {(analysis.highlights || []).slice(0, 3).map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                        • {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-xl p-4 border border-amber-500/20 bg-amber-500/5 items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <h3 className="font-bold text-sm">Advice</h3>
                            </div>
                            <ul className="space-y-1">
                                {(analysis.recommendations || []).slice(0, 3).map((rec, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                        • {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Visual Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activity Chart */}
                {activity_summary && activity_summary.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="border border-border/50 rounded-2xl p-1 bg-white/50 dark:bg-black/20"
                    >
                        <Graph
                            title="Commit Activity (Last 12 Weeks)"
                            data={{
                                type: "bar",
                                labels: activityLabels,
                                datasets: [{
                                    label: "Commits",
                                    data: activityData,
                                    color: "hsl(var(--primary))"
                                }]
                            }}
                            size="sm"
                            variant="default" // Clean look
                            className="bg-transparent"
                        />
                    </motion.div>
                )}

                {/* Language Distribution */}
                {Object.keys(languages || {}).length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border border-border/50 rounded-2xl p-1 bg-white/50 dark:bg-black/20"
                    >
                        <Graph
                            title="Language Distribution"
                            data={{
                                type: "pie",
                                labels: topLangLabels,
                                datasets: [{
                                    label: "Bytes",
                                    data: topLangData,
                                }]
                            }}
                            size="sm"
                            variant="default"
                            className="bg-transparent"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
