import React from 'react';
import { Gamepad2, Shield, Sparkles, Terminal } from 'lucide-react';

interface Props {
  onOpenWorkbench: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenWorkbench }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Clay Badge */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-clay-cyan flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[14px] bg-[#0C121F] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-white tracking-wider font-heading">
                GAME<span className="text-cyan-400">OS</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                PROTOTYPE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block -mt-1">
              AI PM Consultancy
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <a href="#crisis" className="hover:text-cyan-400 transition-colors">The Crisis</a>
          <a href="#rack" className="hover:text-cyan-400 transition-colors">RACK Framework</a>
          <a href="#case-study" className="hover:text-cyan-400 transition-colors">Helldivers II</a>
          <a href="#market" className="hover:text-cyan-400 transition-colors">Market TAM</a>
          <a href="#partnerships" className="hover:text-cyan-400 transition-colors">Partnerships</a>
          <a href="#roadmap" className="hover:text-cyan-400 transition-colors">Roadmap & Financials</a>
        </div>

        {/* Launch Prototype CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWorkbench}
            className="clay-btn clay-cyan-btn px-4 sm:px-5 py-2 text-xs font-extrabold cursor-pointer flex items-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch RACK Console</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

