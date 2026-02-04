"use client";

import * as React from "react";
import { useWorkspace } from "@/contexts/workspace-context";
import { RepositoryAnalysis } from "@/components/tambo/repository-analysis";
import { KanbanBoard } from "@/components/tambo/kanban-board";
import { RepoComparison } from "@/components/tambo/comparison-view";
import { ReleaseBuilder } from "@/components/tambo/release-builder";
import { DiffViewer } from "@/components/tambo/diff-viewer";
import { Zap } from "lucide-react";

export function Stage() {
    const { stageView } = useWorkspace();

    if (stageView.type === "empty") {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-zinc-500 p-8 text-center bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
                <div className="bg-zinc-800/50 p-6 rounded-full mb-6">
                    <Zap className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-zinc-300">Ready to Build</h3>
                <p className="max-w-sm text-sm">
                    Select a tool or ask a question to populate this stage.
                </p>
            </div>
        );
    }

    const renderContent = () => {
        switch (stageView.type) {
            case "analysis":
                return <RepositoryAnalysis {...stageView.props} />;
            case "kanban":
                return <KanbanBoard {...stageView.props} />;
            case "comparison":
                return <RepoComparison {...stageView.props} />;
            case "release":
                return <ReleaseBuilder {...stageView.props} />;
            case "diff":
                return <DiffViewer {...stageView.props} />;
            case "custom":
                return stageView.component;
            default:
                return <div>Unknown view type</div>;
        }
    };

    return (
        <div className="h-full w-full overflow-hidden bg-[#0F0F12] border border-white/5 rounded-xl animate-in fade-in duration-300">
            <div className="h-full overflow-auto p-0 custom-scrollbar">
                {renderContent()}
            </div>
        </div>
    );
}
