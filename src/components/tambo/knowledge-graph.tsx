"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Folder, Database, Layers, ZoomIn, ZoomOut, Maximize, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Node {
    id: string;
    type: "file" | "directory" | "collection";
    name: string;
    path: string;
    size?: number;
    color?: string;
    x?: number;
    y?: number;
    connections: string[]; // IDs of connected nodes
}

interface KnowledgeGraphProps {
    data: {
        nodes: Node[];
        edges: { source: string; target: string }[];
    };
    title?: string;
}

export function KnowledgeGraph({ data, title = "Codebase Knowledge Graph" }: KnowledgeGraphProps) {
    const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
    const [zoom, setZoom] = React.useState(1);

    // Simple force layout simulation (static for now for demo, but normally would use d3-force)
    // We'll arrange them in circles for the demo visual
    const nodes = React.useMemo(() => {
        if (!data || !data.nodes) return [];
        const center = { x: 400, y: 300 };

        // Filter valid nodes first
        const validNodes = data.nodes.filter(n => n && typeof n === 'object');

        return validNodes.map((node, i) => {
            const angle = (i / validNodes.length) * 2 * Math.PI;
            // Safe type access
            const type = node.type || 'file';
            const radius = type === "collection" ? 0 : (type === "directory" ? 100 : 250);
            return {
                ...node,
                type,
                x: center.x + Math.cos(angle) * (radius + Math.random() * 50),
                y: center.y + Math.sin(angle) * (radius + Math.random() * 50)
            };
        });
    }, [data]);

    const getIcon = (type: string) => {
        if (type === "collection") return <Database className="w-5 h-5 text-purple-200" />;
        if (type === "directory") return <Folder className="w-4 h-4 text-blue-200" />;
        return <FileCode className="w-4 h-4 text-emerald-100" />;
    };

    const getNodeColor = (type: string) => {
        if (type === "collection") return "bg-purple-600 border-purple-400";
        if (type === "directory") return "bg-blue-500 border-blue-400";
        return "bg-emerald-500 border-emerald-400";
    };

    return (
        <div className="w-full h-[600px] bg-[#0F172A] rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative flex flex-col">
            {(!data || !data.nodes || data.nodes.length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 z-50 pointer-events-none">
                    <p>No graph data available to visualize.</p>
                </div>
            )}
            {/* Header */}
            <div className="h-14 border-b border-slate-700 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-sm z-10">
                <div className="flex items-center gap-2 text-slate-100">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <span className="font-bold tracking-wide">{title}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ZoomOut size={16} />
                    </button>
                    <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ZoomIn size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Maximize size={16} />
                    </button>
                </div>
            </div>

            {/* Graph Area */}
            <div className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />

                <motion.div
                    className="w-full h-full"
                    style={{ scale: zoom, originX: 0.5, originY: 0.5 }}
                >
                    <svg className="w-full h-full pointer-events-none">
                        {/* Edges */}
                        {data && data.edges && data.edges.map((edge, i) => {
                            const source = nodes.find(n => n.id === edge.source);
                            const target = nodes.find(n => n.id === edge.target);
                            if (!source || !target) return null;
                            return (
                                <motion.line
                                    key={i}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.2 }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                    x1={source.x} y1={source.y}
                                    x2={target.x} y2={target.y}
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes (rendered as HTML overlays for interactivity) */}
                    {nodes.map((node, i) => (
                        <motion.button
                            key={node.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                            onClick={() => setSelectedNode(node)}
                            className={cn(
                                "absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors",
                                getNodeColor(node.type),
                                selectedNode?.id === node.id ? "ring-4 ring-white/30" : ""
                            )}
                            style={{ left: node.x, top: node.y }}
                        >
                            {getIcon(node.type)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Information Sidebar / Panel */}
                <AnimatePresence>
                    {selectedNode && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="absolute right-4 top-4 bottom-4 w-72 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-5 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("p-2 rounded-lg", getNodeColor(selectedNode.type).split(' ')[0])}>
                                    {getIcon(selectedNode.type)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-100 text-sm break-all">{selectedNode.name}</h3>
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{selectedNode.type}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                    <div className="text-xs text-slate-400 mb-1">Path</div>
                                    <div className="font-mono text-xs text-slate-200 break-all">{selectedNode.path}</div>
                                </div>

                                {selectedNode.type === "file" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <div className="text-xs text-slate-500">Size</div>
                                                <div className="text-sm font-medium text-slate-300">24 KB</div>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <div className="text-xs text-slate-500">Lines</div>
                                                <div className="text-sm font-medium text-slate-300">142</div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/50 rounded-lg p-3">
                                            <div className="text-xs text-slate-400 mb-2">Dependencies</div>
                                            <div className="flex flex-wrap gap-1">
                                                <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px]">react</span>
                                                <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px]">lucide-react</span>
                                                <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px]">zod</span>
                                            </div>
                                        </div>

                                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
                                            <FileText size={14} />
                                            View Source
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


