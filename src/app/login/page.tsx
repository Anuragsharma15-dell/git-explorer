"use client";

import { signIn,signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, LayoutDashboard, ShieldCheck, Zap } from "lucide-react";
import { TamboLogo } from "@/components/tambo/logo";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-[#A1FCD1]/20 to-primary/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-500/10 to-[#A1FCD1]/10 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[440px] glass p-8 sm:p-12 rounded-[2.5rem] border border-border/50 premium-shadow relative z-10"
            >
                <div className="flex flex-col items-center text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 transform scale-110"
                    >
                        <TamboLogo />
                    </motion.div>

                    <h1 className="text-3xl font-black tracking-tight mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Sign in to your GitHub Explorer account to continue.
                    </p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-foreground text-background font-bold text-lg hover:premium-shadow transition-all group"
                    >
                        <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        Continue with GitHub
                    </motion.button>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <Zap className="w-5 h-5 text-primary mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Powered</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                        <ShieldCheck className="w-5 h-5 text-indigo-500 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secure Auth</span>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 flex items-center justify-center gap-6">
                    <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-black">
                        Powered by Tambo AI
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
