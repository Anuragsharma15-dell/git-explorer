"use client";

import { ChatInterface } from "@/components/chat-interface";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TamboLogo } from "@/components/tambo/logo";

export default function ChatPage() {
    return (
        <div className="min-h-screen w-full relative text-gray-900 font-sans selection:bg-[#FFB3D9]/50 overflow-hidden bg-white">
            {/*  Diagonal Cross Center Fade Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
            linear-gradient(45deg, transparent 49%, #9ca3af 49%, #9ca3af 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #9ca3af 49%, #9ca3af 51%, transparent 51%)
          `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
                    maskImage:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
                }}
            />

            {/* Simple Header */}
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

            {/* Main Container */}
            <main className="relative pt-20 pb-4 h-screen flex flex-col items-center justify-center px-4 md:px-8">
                <div className="w-full max-w-6xl h-full glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white/30 backdrop-blur-xl">
                    <ChatInterface />
                </div>
            </main>
        </div>
    );
}
