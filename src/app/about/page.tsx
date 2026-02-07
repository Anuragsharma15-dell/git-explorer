"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TamboLogo } from "@/components/tambo/logo";

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full relative text-gray-900 font-sans selection:bg-[#FFB3D9]/50 overflow-hidden bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-border/10 px-6 z-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="transform scale-75 origin-left">
                        <TamboLogo />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative pt-32 pb-12 px-6 max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    About Tambo GitHub Explorer
                </h1>

                <div className="prose prose-lg text-gray-600 space-y-6">
                    <p>
                        Tambo GitHub Explorer is an AI-powered tool designed to help developers navigate, analyze, and understand GitHub repositories with unprecedented depth and ease.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8">Features</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>AI-driven repository analysis and health scoring</li>
                        <li>Intelligent code search and navigation</li>
                        <li>Automated release note drafting</li>
                        <li>Visual insights into commit activity and contributors</li>
                        <li>Seamless integration with GitHub APIs</li>
                    </ul>

                    <p className="mt-8">
                        Built with Next.js, Tailwind CSS, and advanced AI models, Tambo transforms the way you interact with open source code.
                    </p>
                </div>
            </main>
        </div>
    );
}