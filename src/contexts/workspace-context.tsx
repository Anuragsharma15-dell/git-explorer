"use client";

import * as React from "react";

export type StageView =
    | { type: "empty" }
    | { type: "analysis"; props: Record<string, unknown> }
    | { type: "kanban"; props: Record<string, unknown> }
    | { type: "comparison"; props: Record<string, unknown> }
    | { type: "release"; props: Record<string, unknown> }
    | { type: "diff"; props: Record<string, unknown> }
    | { type: "custom"; component: React.ReactNode };

interface WorkspaceContextValue {
    stageView: StageView;
    setStageView: (view: StageView) => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [stageView, setStageView] = React.useState<StageView>({ type: "empty" });

    return (
        <WorkspaceContext.Provider value={{ stageView, setStageView }}>
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspace() {
    const context = React.useContext(WorkspaceContext);
    if (!context) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }
    return context;
}
