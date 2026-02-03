"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlertCircle, CheckCircle2, Circle, Clock, MoreHorizontal, Plus } from "lucide-react";
import { GitHubIssue } from "@/lib/types";

// --- Types ---

interface BoardProps {
    issues: GitHubIssue[];
    title?: string;
}

type ColumnType = "todo" | "in-progress" | "done";

interface Column {
    id: ColumnType;
    title: string;
    icon: React.ReactNode;
    color: string;
}

// --- Sortable Item Component ---

const SortableItem = ({ issue, id }: { issue: GitHubIssue; id: number }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 mb-3 bg-card glass border border-border/40 rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-muted-foreground">#{issue.number}</span>
                <div className={`w-2 h-2 rounded-full ${issue.state === 'open' ? 'bg-green-500' : 'bg-purple-500'}`} />
            </div>
            <h4 className="text-sm font-semibold mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {issue.title}
            </h4>

            <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1 overflow-hidden">
                    {issue.labels.slice(0, 2).map((label) => (
                        <span
                            key={label.id}
                            className="px-1.5 py-0.5 text-[9px] rounded-md font-medium border"
                            style={{
                                backgroundColor: `#${label.color}15`,
                                borderColor: `#${label.color}30`,
                                color: `#${label.color}`
                            }}
                        >
                            {label.name}
                        </span>
                    ))}
                </div>
                {issue.assignees && issue.assignees.length > 0 && (
                    <div className="flex -space-x-2">
                        {issue.assignees.map(user => (
                            <img key={user.id} src={user.avatar_url} alt={user.login} className="w-5 h-5 rounded-full border border-background" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Board Component ---

export function KanbanBoard({ issues: initialIssues, title = "Project Board" }: BoardProps) {
    // Group issues purely for display initially - in a real app we'd manage state better
    // For this demo, we'll arbitrarily split them or use logic if possible
    // Logic: 
    // - Done: state='closed'
    // - In Progress: state='open' AND has assignees
    // - To Do: state='open' AND no assignees

    const [items, setItems] = useState<GitHubIssue[]>(initialIssues || []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const getColumns = () => {
        const todo = items.filter(i => i.state === 'open' && (!i.assignees || i.assignees.length === 0));
        const inProgress = items.filter(i => i.state === 'open' && i.assignees && i.assignees.length > 0);
        const done = items.filter(i => i.state === 'closed');

        return { todo, inProgress, done };
    }

    const columns: Column[] = [
        { id: "todo", title: "To Do", icon: <Circle className="w-4 h-4" />, color: "bg-slate-500" },
        { id: "in-progress", title: "In Progress", icon: <Clock className="w-4 h-4" />, color: "bg-blue-500" },
        { id: "done", title: "Done", icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-green-500" },
    ];

    const grouped = getColumns();

    // Drag end handler (visual only for this lightweight version)
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            // Logic to move items would go here
            // For generative UI demo, we preserve visual state 
        }
    };

    return (
        <div className="w-full h-[600px] flex flex-col glass rounded-3xl border border-border/50 overflow-hidden">
            <div className="p-6 border-b border-border/40 flex justify-between items-center bg-muted/20">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <MoreHorizontal className="w-5 h-5" />
                        </div>
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 ml-1">
                        {items.length} issues tracked across {columns.length} columns
                    </p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    New Issue
                </button>
            </div>

            <div className="flex-1 overflow-x-auto p-6">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 h-full min-w-[800px]">
                        {columns.map(col => {
                            const colItems = col.id === 'todo' ? grouped.todo : col.id === 'in-progress' ? grouped.inProgress : grouped.done;

                            return (
                                <div key={col.id} className="flex-1 min-w-[280px] flex flex-col h-full rounded-2xl bg-muted/30 border border-border/30">
                                    <div className="p-4 flex items-center justify-between border-b border-border/20">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                            <span className="font-bold text-sm">{col.title}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-background/50 text-[10px] font-mono text-muted-foreground border border-border/20">
                                                {colItems.length}
                                            </span>
                                        </div>
                                        <button className="text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
                                        <SortableContext
                                            items={colItems.map(i => i.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {colItems.map((issue) => (
                                                <SortableItem key={issue.id} id={issue.id} issue={issue} />
                                            ))}
                                        </SortableContext>
                                        {colItems.length === 0 && (
                                            <div className="h-24 flex items-center justify-center border-2 border-dashed border-border/30 rounded-xl m-2 opacity-50">
                                                <span className="text-xs text-muted-foreground font-medium">No items</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DndContext>
            </div>
        </div>
    );
}
