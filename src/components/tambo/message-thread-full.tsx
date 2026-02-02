"use client";

import type { messageVariants } from "@/components/tambo/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputMcpConfigButton,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
  MessageSuggestionsStatus,
} from "@/components/tambo/message-suggestions";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import {
  ThreadContainer,
  useThreadContainerContext,
} from "@/components/tambo/thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import { useMergedRef } from "@/lib/thread-hooks";
import type { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional context key for the thread */
  contextKey?: string;
  /**
   * Controls the visual styling of messages in the thread.
   * Possible values include: "default", "compact", etc.
   * These values are defined in messageVariants from "@/components/tambo/message".
   * @example variant="compact"
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, contextKey, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergedRef<HTMLDivElement | null>(ref, containerRef);

  const threadHistorySidebar = <></>;

const defaultSuggestions: Suggestion[] = [
  {
    id: "suggestion-1",
    title: "List 5 repos from tambo-ai",
    detailedSuggestion: "Fetch the top 5 repositories from the tambo-ai org",
    messageId: "list-tambo-repos",
  },
  {
    id: "suggestion-2",
    title: "Unassigned issues",
    detailedSuggestion: "List 6 open issues without an assignee across tambo-ai repos",
    messageId: "list-unassigned-issues",
  },
  {
    id: "suggestion-3",
    title: "Recent PRs",
    detailedSuggestion: "Show me the 5 most recent pull requests in tambo-ai/tambo",
    messageId: "recent-prs",
  },

  {
    id: "suggestion-5",
    title: "Star counts",
    detailedSuggestion: "Show star and fork counts for 5 repositories in tambo-ai",
    messageId: "repo-stats",
  },
  {
    id: "suggestion-6",
    title: "Open vs closed issues",
    detailedSuggestion: "Compare open and closed issue counts in tambo-ai/tambo",
    messageId: "issue-stats",
  },

];


  return (
    <>
      {/* Thread History Sidebar - rendered first if history is on the left */}
      {historyPosition === "left" && threadHistorySidebar}

      <ThreadContainer ref={mergedRef} className={className} {...props}>
        <div className="flex-1 flex flex-col min-h-0 max-h-full overflow-hidden">
          <ScrollableMessageContainer className="flex-1 p-4 min-h-0">
            <ThreadContent variant={variant}>
              <ThreadContentMessages />
            </ThreadContent>
          </ScrollableMessageContainer>

          {/* Message suggestions status */}
          <div className="flex-shrink-0">
            <MessageSuggestions>
              <MessageSuggestionsStatus />
            </MessageSuggestions>
          </div>

          {/* Message input */}
          <div className="flex-shrink-0 p-4">
            <MessageInput contextKey={contextKey}>
              <MessageInputTextarea />
              <MessageInputToolbar>
                <MessageInputMcpConfigButton />
                <MessageInputSubmitButton />
              </MessageInputToolbar>
              <MessageInputError />
            </MessageInput>
          </div>

          {/* Message suggestions */}
          <div className="flex-shrink-0">
            <MessageSuggestions initialSuggestions={defaultSuggestions} maxSuggestions={5}>
              <MessageSuggestionsList />
            </MessageSuggestions>
          </div>
        </div>
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
