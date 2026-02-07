"use client";

import * as React from "react";
import { Copy, FileCode } from "lucide-react";

interface FileViewerProps {
    path: string;
    content: string;
    language?: string;
}

export function FileViewer({ path, content }: FileViewerProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden my-4 shadow-sm w-full max-w-full">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileCode className="w-4 h-4 text-primary" />
                    <span className="truncate">{path}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-background rounded-md transition-colors"
                    title="Copy code"
                >
                    {copied ? (
                        <span className="text-xs text-green-500 font-medium px-1">Copied!</span>
                    ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto bg-[#1e1e1e]">
                <pre className="text-sm font-mono text-[#d4d4d4] leading-relaxed">
                    <code>{content}</code>
                </pre>
            </div>
        </div>
    );
}
