'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse animate-delay-2s"></div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold">OM</span>
          </div>
          <span className="text-xl font-bold">OmniMind</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition">Docs</button>
          <button className="text-gray-300 hover:text-white transition">API</button>
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition">
              Launch App
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Your AI Research <br /> Intelligence Platform
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          OmniMind combines intelligent search, AI analysis, and encrypted personal vaults to revolutionize how you research, learn, and predict trends.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '🔍',
              title: 'AI-Enhanced Search',
              desc: 'Search across academic papers, news, and verified sources with intelligent citation tracking'
            },
            {
              icon: '🔐',
              title: 'End-to-End Encryption',
              desc: 'Store sensitive research in your personal vault with military-grade encryption'
            },
            {
              icon: '✨',
              title: 'AI Synthesis',
              desc: 'Get coherent summaries, gap analysis, and next research directions automatically'
            },
            {
              icon: '📊',
              title: 'Predictive Analytics',
              desc: 'Identify emerging trends and forecast research directions before they go mainstream'
            },
            {
              icon: '📰',
              title: 'News Intelligence',
              desc: 'Personalized news aggregation with geographic filtering and perspective analysis'
            },
            {
              icon: '🧠',
              title: 'AI Assistant',
              desc: 'Context-aware assistant that learns your research patterns and suggests insights'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 hover:border-cyan-400/50 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg font-bold text-lg transition transform hover:scale-105">
              Launch Dashboard
            </button>
          </Link>
          <button className="px-8 py-4 border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 rounded-lg font-bold text-lg transition">
            Watch Demo
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-8 max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition">
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-blue-500/20">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Developers</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition">API Docs</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-500/20 pt-8 flex items-center justify-between text-sm text-gray-400">
          <p>&copy; 2026 OmniMind. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-400 transition">Twitter</a>
            <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition">Discord</a>
          </div>
        </div>
      </footer>
    </main>
  );
}