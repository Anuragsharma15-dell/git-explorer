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
import { ChatInterface } from "@/components/chat-interface";
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
      <a href="#chat" className="px-5 py-2 rounded-full bg-primary text-primary-foreground hover:premium-shadow transition-all">Start Chatting</a>
    </div>
  </nav>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 scroll-smooth overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Animated Shapes Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden -z-10 opacity-30 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-gradient-to-tr from-[#A1FCD1]/20 to-primary/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-[#A1FCD1]/10 rounded-full blur-[100px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A1FCD1]/20 border border-[#A1FCD1]/40 text-[10px] font-black uppercase tracking-widest text-primary mb-8">
            <Zap className="w-3 h-3 fill-primary" />
            AI-Powered GitHub Intelligence
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-[1.05]">
            Master your repositories <br />
            <span className="text-primary italic">conversatially.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Analyze repositories, manage issues, and track pull requests with AI assistance. It's like having a senior engineer who knows your entire codebase by heart.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#chat"
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:premium-shadow active:scale-95 transition-all flex items-center gap-2 group"
            >
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-muted transition-all"
            >
              View Demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* Demo Section (with Screenshot) */}
      <section id="demo" className="py-20 px-6 sm:px-12 bg-white/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative rounded-[2.5rem] overflow-hidden premium-shadow border-[10px] border-white glass">
            <Image
              src="/app-screenshot.png"
              alt="App Screenshot"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-6 md:-left-12 p-6 glass rounded-2xl premium-shadow border border-border/50 max-w-xs hidden sm:block">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm">Secure Integration</span>
            </div>
            <p className="text-xs text-muted-foreground">Uses fine-grained GitHub PATs to ensure your data stays private and safe.</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to navigate even the largest projects.</p>
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
      <section id="how-it-works" className="py-32 px-6 sm:px-12 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to superhuman GitHub productivity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
            <Step number="01" title="Connect PAT" description="Provide your GitHub token securely via the MCP settings." />
            <Step number="02" title="Select Repo" description="Type the name of any repository or organization you want to explore." />
            <Step number="03" title="Use AI Tools" description="Call on specialized AI tools to fetch contributors, issues, or activity." />
            <Step number="04" title="Get Insights" description="Receive natural language reports and visualizations of your data." />
          </div>
        </div>
      </section>

      {/* MCP Configuration Section */}
      <section id="mcp" className="py-32 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">MCP Configuration</h2>
            <p className="text-muted-foreground">Easily configure your GitHub MCP server with these screenshots.</p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 hover:scale-0.5" initial={{
            scale: 0

          }} animate={{
            scale: 0.5
          }}>

            <div className="space-y-4"  >
              <div className="relative aspect-video rounded-2xl overflow-hidden premium-shadow border border-border" >
                <Image src="/Screenshot 2026-01-28 113020.png" alt="MCP Setup 1" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <h4 className="font-bold text-center">Setup Overview</h4>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden premium-shadow border border-border">
                <Image src="/Screenshot 2026-01-28 113059.png" alt="MCP Setup 2" fill sizes="(max-width: 768px) 200vw, 33vw" className="object-cover" />
              </div>
              <h4 className="font-bold text-center">Server Connection</h4>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden premium-shadow border border-border">
                <Image src="/Screenshot 2026-01-28 113553.png" alt="MCP Setup 3" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <h4 className="font-bold text-center">Live Management</h4>
            </div>
          </motion.div>


          <div className="mt-16 p-8 rounded-[2rem] bg-[#1e1e1e] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-white/40 ml-2 font-mono">mcp-config.json</span>
            </div>
            <pre className="text-primary font-mono text-sm leading-relaxed overflow-x-auto">
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
        </div>
      </section>

      {/* Main App Section (Chat) */}
      <section id="chat" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase mb-4">
            Terminal Ready
          </div>
          <h2 className="text-4xl font-black mb-6">Ready to Explore?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Try the assistant below. Ask for repositories from any organization to start.</p>
        </motion.div>

        <ChatInterface />
      </section>

      {/* Big prominent CTA */}
      <section className="py-24 px-6 sm:px-12 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl glass p-16 rounded-[3rem] border border-primary/20 premium-shadow"
        >
          <h2 className="text-4xl font-black mb-6">Experience the Future of Dev Workflow</h2>
          <p className="text-muted-foreground mb-10 text-lg">Stop digging through issues. Start getting insights.</p>
          <a
            href="#chat"
            className="inline-flex items-center gap-2 px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Go to Chat
            <ArrowRight className="w-6 h-6" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 sm:px-12 bg-white flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl border-t border-border/50 pt-12 gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Github className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">GitHub Explorer</span>
          </div>

          <div className="flex gap-12 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" className="p-3 rounded-xl glass hover:bg-muted transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" className="p-3 rounded-xl glass hover:bg-muted transition-all">
              <Twitter className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted-foreground/50 tracking-widest uppercase font-bold">
          © 2026 Powered by Tambo AI
        </p>
      </footer>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="#chat"
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground premium-shadow flex items-center justify-center animate-bounce shadow-2xl"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
