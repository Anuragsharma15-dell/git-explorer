"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import {
  Github,
  Twitter,
  Search,
  MessageSquare,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import { TamboLogo } from "@/components/tambo/logo";
import { LoginBtn } from "@/components/login-btn";

// Components
const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
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

const Step = ({ number, title, description }: any) => (
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
      <a href="#mcp" className="hover:text-foreground transition-colors">MCP Config</a>
      <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
      <LoginBtn />
      <a href="/chat" className="px-5 py-2 rounded-full bg-primary text-primary-foreground hover:premium-shadow transition-all">Start Chatting</a>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative text-gray-900 font-sans selection:bg-[#FFB3D9]/50 overflow-x-hidden">
      {/* Dashed Center Fade Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
           repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          WebkitMaskImage: `
     repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
              radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
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
              AI-Powered Flux Intelligence
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] text-gray-900 drop-shadow-sm">
              Master your repos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">conversationaly.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Analyze repositories, manage issues, and track pull requests with AI assistance. It's like having a senior engineer who knows your entire codebase by heart.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/chat"
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-gray-900/20 flex items-center gap-2 group hover:bg-gray-800 transition-all"
              >
                Start Chatting
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
            className="w-full max-w-6xl relative group perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <motion.div
              whileHover={{ rotateX: 2, rotateY: 2, scale: 1.01 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white/60 bg-white/20 backdrop-blur-sm"
            >
              <Image
                src="/app-screenshot.png"
                alt="App Screenshot"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 md:-left-12 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 max-w-xs hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">Secure Integration</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Uses fine-grained GitHub PATs to ensure your data stays private and safe.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 sm:px-12 w-full max-w-7xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">Powerful Features</h2>
            <p className="text-gray-600 text-lg font-medium">Everything you need to navigate even the largest projects.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Search}
              title="Deep Analysis"
              description="Perform deep analysis of repository stats, contributors, and activity trends instantly."
              delay={0.1}
            />
            <FeatureCard
              icon={Activity}
              title="Issue Triage"
              description="Manage issues automatically with AI-suggested labels, assignees, and summaries."
              delay={0.2}
            />
            <FeatureCard
              icon={Layers}
              title="PR Tracking"
              description="Keep track of complex pull requests and detect risks like merge conflicts early."
              delay={0.3}
            />
            <FeatureCard
              icon={MessageSquare}
              title="AI Chat"
              description="Chat with your codebase in natural language. Ask questions, get explanations."
              delay={0.4}
            />
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-32 px-6 sm:px-12 w-full relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-lg -z-10 skew-y-3 transform origin-top-left scale-110" />
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">How It Works</h2>
              <p className="text-gray-600 text-lg font-medium">Four simple steps to superhuman GitHub productivity.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent hidden lg:block" />
              <Step number="01" title="Connect PAT" description="Provide your GitHub token securely via the MCP settings." />
              <Step number="02" title="Select Repo" description="Type the name of any repository or organization you want to explore." />
              <Step number="03" title="Use AI Tools" description="Call on specialized AI tools to fetch contributors, issues, or activity." />
              <Step number="04" title="Get Insights" description="Receive natural language reports and visualizations of your data." />
            </div>
          </div>
        </section>

        {/* MCP Configuration Section */}
        <section id="mcp" className="py-32 px-6 sm:px-12 w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">MCP Configuration</h2>
            <p className="text-gray-600 text-lg font-medium">Easily configure your GitHub MCP server with these screenshots.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-[4px] border-white bg-white">
                <Image src="/Screenshot 2026-01-28 113020.png" alt="MCP Setup 1" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-center text-gray-800">Setup Overview</h4>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-[4px] border-white bg-white">
                <Image src="/Screenshot 2026-01-28 113059.png" alt="MCP Setup 2" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-center text-gray-800">Server Connection</h4>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-[4px] border-white bg-white">
                <Image src="/Screenshot 2026-01-28 113553.png" alt="MCP Setup 3" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="font-bold text-center text-gray-800">Live Management</h4>
            </motion.div>
          </motion.div>

          <div className="mt-16 p-8 rounded-[2rem] bg-[#1e1e1e] border-4 border-white/20 shadow-2xl relative overflow-hidden group mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-white/40 ml-2 font-mono">mcp-config.json</span>
            </div>
            <pre className="text-green-400 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-white/20">
              {`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}`}
            </pre>
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
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900">Experience the Future</h2>
            <p className="text-gray-600 mb-10 text-xl font-medium">Stop digging through issues. Start getting insights.</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/chat"
              className="inline-flex items-center gap-2 px-12 py-6 rounded-2xl bg-gray-900 text-white font-black text-xl shadow-xl hover:shadow-2xl transition-all"
            >
              Go to Chat
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
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Flux</span>
          </div>

          <div className="flex gap-12 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" className="p-3 rounded-xl bg-white/50 hover:bg-white transition-all shadow-md text-gray-900">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" className="p-3 rounded-xl bg-white/50 hover:bg-white transition-all shadow-md text-gray-900">
              <Twitter className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
        <p className="mt-12 text-xs text-gray-500 tracking-widest uppercase font-bold">
          © 2026 Powered by Flux AI
        </p>
      </footer>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="/chat"
          className="w-16 h-16 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center animate-bounce"
        >
          <MessageSquare className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
