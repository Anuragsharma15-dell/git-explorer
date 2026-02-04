"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import {
    Bell, Check, Inbox, GitPullRequest, AlertCircle,
    MessageSquare, Eye, Archive, Star, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationSubject {
    title: string;
    url: string;
    latest_comment_url: string;
    type: string; // Issue, PullRequest, CheckSuite, etc.
}

interface NotificationRepository {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Notification {
    id: string;
    repository: NotificationRepository;
    subject: NotificationSubject;
    reason: string; // mention, subscribed, etc.
    unread: boolean;
    updated_at: string;
    last_read_at: string | null;
    url: string;
}

interface NotificationCenterProps {
    notifications: Notification[];
}

export function NotificationCenter({ notifications: initialNotifications }: NotificationCenterProps) {
    const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);
    const [filter, setFilter] = React.useState<"all" | "unread" | "participating">("all");
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

    // Mock functionality to "mark as read" locally for the demo
    const markAsRead = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === "unread") return n.unread;
        if (filter === "participating") return n.reason === "mention" || n.reason === "messaged";
        return true;
    });

    const getIcon = (type: string, reason: string) => {
        if (type === "PullRequest") return <GitPullRequest className="w-4 h-4 text-purple-500" />;
        if (type === "Issue") return <AlertCircle className="w-4 h-4 text-green-500" />;
        if (reason === "mention") return <MessageSquare className="w-4 h-4 text-blue-500" />;
        return <Bell className="w-4 h-4 text-gray-400" />;
    };

    const getReasonLabel = (reason: string) => {
        const map: Record<string, string> = {
            assign: "Assigned",
            author: "Authored",
            comment: "Commented",
            invitation: "Invited",
            manual: "Subscribed",
            mention: "Mentioned",
            review_requested: "Review Requested",
            security_alert: "Security Alert",
            state_change: "State Changed",
            subscribed: "Watching",
            team_mention: "Team Mention"
        };
        return map[reason] || reason;
    };

    return (
        <div className="flex bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 h-[600px] max-h-[80vh]">
            {/* Sidebar / Filters (Left) */}
            <div className="w-64 bg-gray-50 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded">
                        <Inbox size={18} />
                    </div>
                    <span className="font-bold text-gray-800">Inbox</span>
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {notifications.filter(n => n.unread).length}
                    </span>
                </div>

                <div className="p-2 space-y-1">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn("w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between", filter === "all" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-100")}
                    >
                        <span>All Notifications</span>
                        <div className="h-2 w-2 rounded-full bg-gray-300" />
                    </button>
                    <button
                        onClick={() => setFilter("unread")}
                        className={cn("w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between", filter === "unread" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-100")}
                    >
                        <span>Unread</span>
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                    </button>
                    <button
                        onClick={() => setFilter("participating")}
                        className={cn("w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between", filter === "participating" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:bg-gray-100")}
                    >
                        <span>Participating</span>
                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                    </button>
                </div>
            </div>

            {/* Notification List (Middle/Main) */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4 bg-white">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Filter size={14} />
                        <span>Sort by: Date</span>
                    </div>
                    <button onClick={markAllRead} className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Check size={14} /> Mark all as read
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredNotifications.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                <Inbox size={32} className="opacity-50" />
                            </div>
                            <p className="text-sm font-medium">All caught up!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {filteredNotifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    onClick={() => setSelectedId(notif.id)}
                                    className={cn(
                                        "p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative",
                                        notif.unread ? "bg-white" : "bg-gray-50/30",
                                        selectedId === notif.id ? "bg-blue-50/50" : ""
                                    )}
                                >
                                    {notif.unread && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                    )}

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            {getIcon(notif.subject.type, notif.reason)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                    <img
                                                        src={notif.repository.owner.avatar_url}
                                                        className="w-3.5 h-3.5 rounded-full"
                                                        alt=""
                                                    />
                                                    {notif.repository.full_name}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                                    {getReasonLabel(notif.reason)}
                                                </span>
                                                <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
                                                    {formatDistanceToNow(new Date(notif.updated_at), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <h4 className={cn("text-sm mb-1 leading-snug", notif.unread ? "font-semibold text-gray-900" : "font-medium text-gray-600")}>
                                                {notif.subject.title}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        {notif.unread && (
                                            <button
                                                onClick={(e) => markAsRead(notif.id, e)}
                                                className="p-1.5 bg-white border border-gray-200 rounded text-gray-400 hover:text-blue-500 shadow-sm"
                                                title="Mark as read"
                                            >
                                                <Check size={14} />
                                            </button>
                                        )}
                                        <button className="p-1.5 bg-white border border-gray-200 rounded text-gray-400 hover:text-amber-500 shadow-sm">
                                            <Star size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
