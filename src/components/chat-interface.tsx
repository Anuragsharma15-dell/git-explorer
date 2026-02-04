"use client";

import * as React from "react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { TamboProvider } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import { ChatInputProvider } from "@/contexts/chat-input-context";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";

import { useSession } from "next-auth/react";
import { githubAPI } from "@/services/github-api";

export function ChatInterface() {
    const mcpServers = useMcpServers();
    const { data: session } = useSession();

    React.useEffect(() => {
        // @ts-ignore
        if (session?.accessToken) {
            // @ts-ignore
            githubAPI.setToken(session.accessToken);
        }
    }, [session]);

    return (
        <TamboProvider
            apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
            components={components}
            tools={tools}
        >
            <TamboMcpProvider mcpServers={mcpServers}>
                <ChatInputProvider>
                    <div className="h-full w-full flex flex-col" id="chat">
                        <MessageThreadFull
                            className="h-full w-full"
                            contextKey="github-explorer-v2"
                        />
                    </div>
                </ChatInputProvider>
            </TamboMcpProvider>
        </TamboProvider>
    );
}
