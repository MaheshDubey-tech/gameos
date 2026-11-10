import React from 'react';
import { Gamepad2, Shield, Heart, Terminal } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

interface Props {
  onOpenWorkbench: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenWorkbench }) => {
  return (
    <footer className="bg-[#05080F] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white font-heading">
                GAME<span className="text-cyan-400">OS</span>
              </span>
            </div>
            <p className="text-slate-300 max-w-md text-xs leading-relaxed">
              Full Stack AI-Enabled Product Management Consultancy for Gaming. We help game studios turn multi-source player noise into validated roadmaps, preventing multi-million dollar live-service collapses.
            </p>
            <div className="text-[11px] font-mono text-cyan-300">
              "Prevent Failure. Create Foresight. Build What Players Love."
            </div>
          </div>

          {/* Members / Team Credits (Page 1) */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-3">
              Core Founding Team
            </div>
            <ul className="space-y-2 text-slate-300">
              {TEAM_MEMBERS.map((m, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{m.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{m.role.split(' ')[0]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-3">
              Prototype Rig
            </div>
            <button
              onClick={onOpenWorkbench}
              className="clay-btn clay-cyan-btn w-full py-2.5 px-4 text-xs font-bold cursor-pointer"
            >
              Launch Interactive Workbench
            </button>
            <div className="p-3 rounded-xl bg-[#090D17] border border-white/5 text-[11px] text-slate-400">
              Validated against Arrowhead Game Studios Helldivers II live impact telemetry.
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} GameOS Technologies. Engineered for AAA & Live-Service Game Studios.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with claymorphism & gaming foresight</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

