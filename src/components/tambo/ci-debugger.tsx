"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Clock, AlertCircle, PlayCircle, GitBranch, GitCommit, ChevronRight, Terminal, Search, RefreshCw, Layers } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Step {
    name: string;
    status: "completed" | "in_progress" | "queued" | "failure";
    conclusion: string | null;
    number: number;
    started_at?: string;
    completed_at?: string;
}

interface Job {
    id: number;
    name: string;
    steps: Step[];
    status: "completed" | "in_progress" | "queued";
    conclusion: string | null;
}

interface WorkflowRunData {
    id: number;
    name: string;
    head_branch: string;
    head_sha: string;
    status: string;
    conclusion: string | null;
    created_at: string;
    jobs?: Job[];
}

interface CIDebuggerProps {
    run: WorkflowRunData;
    onAnalyzeFailure?: (runId: number, failureLogs: string) => void;
}

export function CIDebugger({ run, onAnalyzeFailure }: CIDebuggerProps) {
    const [selectedJob, setSelectedJob] = React.useState<number | null>(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    // Mock data if jobs aren't provided (for demo purposes)
    const jobs = run.jobs || [
        {
            id: 1,
            name: "build-and-test",
            status: "completed",
            conclusion: "failure",
            steps: [
                { name: "Set up job", status: "completed", conclusion: "success", number: 1 },
                { name: "Run actions/checkout@v3", status: "completed", conclusion: "success", number: 2 },
                { name: "Set up Node.js", status: "completed", conclusion: "success", number: 3 },
                { name: "Install dependencies", status: "completed", conclusion: "success", number: 4 },
                { name: "Run tests", status: "completed", conclusion: "failure", number: 5 },
                { name: "Build project", status: "queued", conclusion: null, number: 6 },
            ]
        }
    ];

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            if (onAnalyzeFailure) {
                onAnalyzeFailure(run.id, "Mock failure logs: Test failed at src/components/App.test.tsx:42");
            }
        }, 1500);
    };

    const getStatusIcon = (status: string, conclusion: string | null, size = 5) => {
        const iconSize = `w-${size} h-${size}`;
        if (status === "queued") return <Clock className={`${iconSize} text-yellow-500`} />;
        if (status === "in_progress") return <PlayCircle className={`${iconSize} text-blue-500 animate-pulse`} />;
        if (conclusion === "success") return <CheckCircle2 className={`${iconSize} text-emerald-500`} />;
        if (conclusion === "failure") return <XCircle className={`${iconSize} text-red-500`} />;
        return <AlertCircle className={`${iconSize} text-gray-400`} />;
    };

    return (
        <div className="w-full h-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                        {getStatusIcon(run.status, run.conclusion, 6)}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{run.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="font-mono">#{run.id}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <GitBranch size={12} />
                                <span>{run.head_branch}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {run.conclusion === "failure" && (
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors border border-red-200"
                    >
                        {isAnalyzing ? (
                            <>
                                <RefreshCw size={14} className="animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Search size={14} />
                                <span>Analyze Failure</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Visual Pipeline (Left Side) */}
                <div className="w-1/3 min-w-[250px] border-r border-gray-100 bg-gray-50/30 flex flex-col overflow-y-auto">
                    <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Layers size={14} />
                        Jobs
                    </div>
                    <div className="px-2 space-y-2 pb-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="space-y-2">
                                <button
                                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                                        selectedJob === job.id
                                            ? "bg-white border-blue-200 ring-1 ring-blue-100 shadow-sm"
                                            : "bg-white border-gray-200 hover:border-gray-300"
                                    )}
                                    type="button"
                                >
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(job.status || "completed", job.conclusion, 5)}
                                        <span className="font-medium text-sm text-gray-700">{job.name}</span>
                                    </div>
                                    <ChevronRight
                                        size={14}
                                        className={cn("text-gray-400 transition-transform", selectedJob === job.id ? "rotate-90" : "")}
                                    />
                                </button>

                                {/* Expanded Steps */}
                                {selectedJob === job.id && (
                                    <div className="pl-4 space-y-1 relative before:absolute before:left-[21px] before:top-0 before:bottom-2 before:w-[2px] before:bg-gray-200">
                                        {job.steps.map((step) => (
                                            <div key={step.number} className="relative flex items-center gap-3 p-2 rounded-md hover:bg-gray-100/50 transition-colors group cursor-default">
                                                {/* Connector Line */}
                                                <div className="absolute -left-[18px] top-1/2 w-4 h-[2px] bg-gray-200" />

                                                {getStatusIcon(step.status, step.conclusion, 4)}
                                                <span className={cn(
                                                    "text-sm",
                                                    step.conclusion === "failure" ? "text-red-600 font-medium" : "text-gray-600"
                                                )}>
                                                    {step.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Log / Terminal View (Right Side) */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] text-gray-300 font-mono text-sm overflow-hidden">
                    <div className="h-10 border-b border-white/10 flex items-center px-4 bg-white/5 justify-between">
                        <div className="flex items-center gap-2 text-xs">
                            <Terminal size={14} />
                            <span>Build Logs</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-auto custom-scrollbar">
                        {selectedJob ? (
                            <div className="space-y-1">
                                <div className="text-gray-500 opacity-50 select-none">$ initializing runner...</div>
                                <div className="text-emerald-500">✔ Job setup complete</div>
                                <div className="text-white">Run npm install</div>
                                <div className="text-gray-400 pl-4">added 1450 packages in 35s</div>
                                <div className="text-white mt-2">Run npm test</div>
                                <div className="text-gray-400 pl-4">&gt; app@0.1.0 test</div>
                                <div className="text-gray-400 pl-4">&gt; jest</div>
                                <div className="text-green-400 pl-4 mt-2">PASS src/utils/helpers.test.ts</div>
                                <div className="text-red-400 pl-4 font-bold mt-2">FAIL src/components/App.test.tsx</div>
                                <div className="text-red-300 pl-6">● App renders correctly</div>
                                <div className="text-red-300 pl-8 mt-1">Expected: &quot;Learn React&quot;</div>
                                <div className="text-red-300 pl-8">Received: &quot;Learn Angular&quot;</div>
                                <div className="mt-4 border-t border-white/10 pt-2 text-red-500">
                                    Process exited with code 1
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3">
                                <Terminal size={32} className="opacity-20" />
                                <p>Select a job to view logs</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
