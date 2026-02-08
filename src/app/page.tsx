"use client";

import * as React from "react";
import { animate, delay, motion } from "framer-motion";

import {
  Database,
  Users,
  BarChart3,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";
import { TamboLogo } from "@/components/tambo/logo";
import { LoginBtn } from "@/components/login-btn";

// Components
const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl glass border border-border/30 bg-card premium-shadow group"
  >
    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-[#A1FCD1]/30 transition-colors">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="w-14 h-14 rounded-full bg-[#A1FCD1] flex items-center justify-center text-xl font-black mb-6 shadow-inner border border-white/40">
      {number}
    </div>
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <p className="text-muted-foreground text-sm max-w-xs">{description}</p>
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-border/10 px-6 sm:px-12 flex items-center justify-between">
    <div className="flex items-center gap-2 transform scale-75 origin-left">
      <TamboLogo />
    </div>

    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
      <a href="#features" className="hover:text-foreground transition-colors">Features</a>
      <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
      <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
      <LoginBtn />
      <a href="/chat" className="px-5 py-2 rounded-full bg-black text-primary-foreground hover:premium-shadow transition-all">Try Explorer</a>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative text-gray-900 font-sans selection:bg-[#FFB3D9]/50 overflow-x-hidden">
      {/* Magenta & Purple Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />

      <Navbar />

      <main className="relative flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 sm:px-12 flex flex-col items-center text-center w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-[11px] font-black uppercase tracking-widest text-pink-600 mb-8 shadow-sm"
            >
              <Zap className="w-3 h-3 fill-pink-600" />
              GitHub Explorer Powered by AI
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-gray-900 drop-shadow-sm">
              Talk to GitHub <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">like a senior engineer.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Explore repositories, manage issues, review PRs, and analyze code through natural language. Get smart UI that adapts to your needs. No more endless clicking.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/chat"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
              >
                Launch Explorer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
                href="#demo"
                className="px-8 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-900 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                View Demo
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20 px-6 sm:px-12 w-full max-w-7xl flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full max-w-5xl"
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-white/60 text-sm font-mono">Tambo GitHub Explorer</span>
              </div>

              <div className="bg-black/40 rounded-2xl p-6 font-mono text-sm space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-400">You:</span>
                  <span className="text-white">Show critical issues in facebook/react</span>
                </div>
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-purple-400 mt-1" />
                  <div className="flex-1 space-y-2">
                    <p className="text-purple-300">Analyzing repository issues...</p>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/30">
                      <p className="text-yellow-300 mb-2">🔍 Found 12 Critical Issues</p>
                      <div className="space-y-1 text-gray-300 text-xs">
                        <p>• #28000: Memory leak in useEffect</p>
                        <p>• #27985: Server Components crash</p>
                        <p>• #27970: Hydration mismatch in production</p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs">View Kanban</button>
                        <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 text-xs">Filter More</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 max-w-md mx-auto"
            >
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Enterprise-Grade Security</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">All actions go through typed, auditable tools. AI never touches data directly.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 sm:px-12 w-full max-w-7xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">Powerful GitHub Features</h2>
            <p className="text-gray-600 text-lg font-medium">Everything you need to explore and manage GitHub repositories intelligently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Database}
              title="Repository Discovery"
              description="Search and explore repositories across GitHub. Find trending projects and hidden gems."
              delay={0.1}
            />
            <FeatureCard
              icon={Users}
              title="Smart Issue Triage"
              description="Organize issues with AI-generated Kanban boards. Categorize bugs, features, and enhancements."
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Repository Analytics"
              description="Visualize commit activity, contributor stats, and code frequency with interactive charts."
              delay={0.3}
            />
            <FeatureCard
              icon={FileText}
              title="Code Review Assistant"
              description="Review pull requests with AI-powered diff viewers. Get intelligent code analysis."
              delay={0.4}
            />
          </div>

          {/* Advanced Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
            >
              <Shield className="w-8 h-8 text-purple-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">Generative UI</h4>
              <p className="text-sm text-gray-600">The interface adapts based on your query. Ask for issues, get a Kanban. Ask for PRs, get a diff viewer.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200"
            >
              <AlertTriangle className="w-8 h-8 text-yellow-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">GitHub MCP Integration</h4>
              <p className="text-sm text-gray-600">Powered by Model Context Protocol for secure, real-time GitHub API access.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="font-bold text-lg mb-2">CI/CD Debugging</h4>
              <p className="text-sm text-gray-600">View workflow runs, analyze failures, and debug pipelines with AI assistance.</p>
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-32 px-6 sm:px-12 w-full relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-lg -z-10 skew-y-3 transform origin-top-left scale-110" />
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">How It Works</h2>
              <p className="text-gray-600 text-lg font-medium">Four steps to intelligent GitHub exploration.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent hidden lg:block" />
              <Step number="01" title="Connect GitHub" description="Authenticate with your GitHub account and grant repository access." />
              <Step number="02" title="Ask in Natural Language" description="Type what you want: 'Show issues in react' or 'What's trending in AI?'" />
              <Step number="03" title="AI Generates UI" description="Get exactly the view you need: Kanban boards, diff viewers, charts, graphs." />
              <Step number="04" title="Explore & Analyze" description="Interact with generated components. Drill down, filter, and discover insights." />
            </div>
          </div>
        </section>

        {/* Example Conversations */}
        <section className="py-32 px-6 sm:px-12 w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">See It In Action</h2>
            <p className="text-gray-600 text-lg font-medium">Real queries that make GitHub exploration effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-lg"
            >
              <div className="space-y-3 font-mono text-sm">
                <p className="text-gray-700"><span className="font-bold text-pink-600">You:</span> Show me popular Next.js repos</p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="font-bold text-purple-700">🔥 Trending Next.js Repositories</p>
                  <p className="text-xs text-gray-700">Found 847 repositories</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>• vercel/next.js - 118k ⭐</li>
                    <li>• shadcn/ui - 89k ⭐</li>
                    <li>• t3-oss/create-t3-app - 24k ⭐</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-lg"
            >
              <div className="space-y-3 font-mono text-sm">
                <p className="text-gray-700"><span className="font-bold text-pink-600">You:</span> Show PR #1234 in vercel/next.js</p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-green-600 text-xs">✅ Pull Request #1234</p>
                  <p className="text-xs text-gray-600">Changes summary:</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>• +247 -89 lines</li>
                    <li>• 12 files changed</li>
                    <li>• Approved by 3 reviewers</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Big prominent CTA */}
        <section className="py-24 px-6 sm:px-12 flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl w-full bg-white/60 backdrop-blur-xl p-16 rounded-[3rem] border border-white/60 shadow-2xl"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">Ready to Explore GitHub Differently?</h2>
            <p className="text-gray-600 mb-10 text-xl font-medium">Stop endless clicking. Start natural conversations with your repositories.</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/chat"
              className="inline-flex items-center gap-2 px-12 py-6 rounded-2xl bg-gray-900 text-white font-black text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Launch Explorer
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 sm:px-12 relative w-full flex flex-col items-center border-t border-white/20 bg-white/30 backdrop-blur-lg">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Tambo GitHub Explorer</span>
          </div>

          <div className="flex gap-12 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Docs</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
        <p className="mt-12 text-xs text-gray-500 tracking-widest uppercase font-bold">
          © 2026 Built for Tambo Hackathon • Powered by AI
        </p>
      </footer>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="/chat"
          className="w-16 h-16 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center animate-bounce"
        >
          <Terminal className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
