"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Clock, AlertCircle, PlayCircle, GitBranch, GitCommit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface WorkflowRun {
    id: number;
    name: string;
    head_branch: string;
    head_sha: string;
    status: string; // queued, in_progress, completed
    conclusion: string | null; // success, failure, neutral, cancelled, skipped, timed_out, action_required
    created_at: string;
    html_url: string;
    actor: {
        login: string;
        avatar_url: string;
    };
}

interface WorkflowRunsProps {
    workflow_runs: WorkflowRun[];
}

export function WorkflowRuns({ workflow_runs }: WorkflowRunsProps) {
    if (!workflow_runs || workflow_runs.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                No workflow runs found.
            </div>
        );
    }

    const getStatusIcon = (status: string, conclusion: string | null) => {
        if (status === "queued") return <Clock className="w-5 h-5 text-yellow-500" />;
        if (status === "in_progress") return <PlayCircle className="w-5 h-5 text-blue-500 animate-pulse" />;

        switch (conclusion) {
            case "success": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case "failure": return <XCircle className="w-5 h-5 text-red-500" />;
            case "cancelled": return <AlertCircle className="w-5 h-5 text-gray-400" />;
            case "timed_out": return <Clock className="w-5 h-5 text-orange-500" />;
            default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="w-full max-w-full space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Recent CI/CD Runs
                </h3>
            </div>

            <div className="space-y-3">
                {workflow_runs.map((run) => (
                    <a
                        key={run.id}
                        href={run.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl border border-border bg-card hover:premium-shadow transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {getStatusIcon(run.status, run.conclusion)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                        {run.name}
                                        <span className="ml-2 font-normal text-xs text-muted-foreground">#{run.id}</span>
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <GitBranch className="w-3 h-3" />
                                            <span>{run.head_branch}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitCommit className="w-3 h-3" />
                                            <span className="font-mono">{run.head_sha.substring(0, 7)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Image src={run.actor.avatar_url} alt={run.actor.login} width={16} height={16} className="w-4 h-4 rounded-full" />
                                            <span>{run.actor.login}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(new Date(run.created_at), { addSuffix: true })}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
