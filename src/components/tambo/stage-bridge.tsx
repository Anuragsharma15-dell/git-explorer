"use client";

import * as React from "react";
import { useWorkspace } from "@/contexts/workspace-context";
import { ExternalLink, ArrowRight } from "lucide-react";

// Generic HOC or wrapper to promote content to stage
function makeBridge(
    type: "analysis" | "kanban" | "comparison" | "release" | "diff",
    title: string
) {
    return function BridgeComponent(props: any) {
        const { setStageView } = useWorkspace();
        const hasMounted = React.useRef(false);

        React.useEffect(() => {
            if (!hasMounted.current) {
                setStageView({ type, props });
                hasMounted.current = true;
            }
        }, [props, setStageView]);

        const handleOpen = () => {
            setStageView({ type, props });
        };


        return (
            <div className="p-3 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group" onClick={handleOpen}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-500 group-hover:scale-105 transition-transform">
                            <ExternalLink size={16} />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm text-zinc-200">{title}</h4>
                            <p className="text-[10px] text-zinc-500">Active on Stage</p>
                        </div>
                    </div>
                    <ArrowRight size={14} className="text-zinc-500 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        );

    };
}

export const AnalysisBridge = makeBridge("analysis", "Repository Analysis");
export const KanbanBridge = makeBridge("kanban", "Kanban Board");
export const ComparisonBridge = makeBridge("comparison", "Repository Comparison");
export const ReleaseBridge = makeBridge("release", "Release Notes Draft");
export const DiffBridge = makeBridge("diff", "Refactor Proposal");
