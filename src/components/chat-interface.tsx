"use client";

import * as React from "react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import { ChatInputProvider } from "@/contexts/chat-input-context";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { tools } from "@/lib/tambo-fixed";

// Import only tool-specific components
import { z } from "zod";
import { KanbanBoard } from "@/components/tambo/kanban-board";
import { RepositoryAnalysis } from "@/components/tambo/repository-analysis";
import { CIDebugger } from "@/components/tambo/ci-debugger";
import { DiffViewer } from "@/components/tambo/diff-viewer";
import { NotificationCenter } from "@/components/tambo/notification-center";
import { KnowledgeGraph } from "@/components/tambo/knowledge-graph";
import { RepoComparison } from "@/components/tambo/comparison-view";
import { ReleaseBuilder } from "@/components/tambo/release-builder";
import { CodeSearchResults } from "@/components/ui/CodeSearchResults";
import { WorkflowRuns } from "@/components/ui/WorkflowRuns";

import { useSession } from "next-auth/react";
import { githubAPI } from "@/services/github-api";

// Only tool-specific components (not generic UI components)
const toolComponents: any[] = [
    {
        name: "KanbanBoard",
        description: "Kanban board for issues",
        component: KanbanBoard,
        propsSchema: z.any(),
    },
    {
        name: "RepositoryAnalysis",
        description: "Repository analysis",
        component: RepositoryAnalysis,
        propsSchema: z.any(),
    },
    {
        name: "CIDebugger",
        description: "CI debugger",
        component: CIDebugger,
        propsSchema: z.any(),
    },
    {
        name: "DiffViewer",
        description: "Code diff viewer",
        component: DiffViewer,
        propsSchema: z.any(),
    },
    {
        name: "NotificationCenter",
        description: "Notification center",
        component: NotificationCenter,
        propsSchema: z.any(),
    },
    {
        name: "KnowledgeGraph",
        description: "Knowledge graph",
        component: KnowledgeGraph,
        propsSchema: z.any(),
    },
    {
        name: "RepoComparison",
        description: "Repository comparison",
        component: RepoComparison,
        propsSchema: z.any(),
    },
    {
        name: "ReleaseBuilder",
        description: "Release builder",
        component: ReleaseBuilder,
        propsSchema: z.any(),
    },
    {
        name: "CodeSearchResults",
        description: "Code search results",
        component: CodeSearchResults,
        propsSchema: z.any(),
    },
    {
        name: "WorkflowRuns",
        description: "Workflow runs",
        component: WorkflowRuns,
        propsSchema: z.any(),
    },
];

export function ChatInterface() {
    const mcpServers = useMcpServers();
    const { data: session } = useSession();
    // @ts-expect-error - accessToken is added to session via next-auth override
    const accessToken = session?.accessToken;

    React.useEffect(() => {
        if (accessToken) {
            githubAPI.setToken(accessToken);
        }
    }, [accessToken]);

    const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
    const tamboUrl = process.env.NEXT_PUBLIC_TAMBO_URL;

    if (!apiKey) {
        return (
            <div className="flex items-center justify-center h-full p-8 text-center text-red-500">
                <div>
                    <h3 className="text-lg font-bold mb-2">Configuration Error</h3>
                    <p>Missing NEXT_PUBLIC_TAMBO_API_KEY in environment variables.</p>
                </div>
            </div>
        );
    }

    console.log("[ChatInterface] ✅ ALL TOOLS + TOOL COMPONENTS ENABLED");
    console.log("[ChatInterface] Tools:", tools?.length);
    console.log("[ChatInterface] Tool Components:", toolComponents?.length);

    return (
        <TamboProvider
            apiKey={apiKey}
            tamboUrl={tamboUrl}
            tools={tools}
            components={toolComponents}
        >
            <TamboMcpProvider mcpServers={mcpServers}>
                <ChatInputProvider>
                    <div className="h-full w-full flex flex-col" id="chat">
                        <MessageThreadFull
                            className="h-full w-full"
                            contextKey="github-explorer-with-tool-components-v1"
                        />
                    </div>
                </ChatInputProvider>
            </TamboMcpProvider>
        </TamboProvider>
    );
}
