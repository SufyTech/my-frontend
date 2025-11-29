import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-3">Pricing & Plans</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="glass-card p-8 rounded-2xl flex flex-col hover:border-slate-600 transition-colors">
            <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
            <div className="text-3xl font-bold text-white mb-6">Free</div>
            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>Unlimited public repos</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>Basic security scanning</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>1 user</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 rounded-2xl flex flex-col relative border-violet-500/50 bg-violet-500/5 shadow-2xl shadow-violet-500/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              MOST POPULAR
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Pro</h4>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white">$29</span>
                <span className="text-slate-400 text-sm">/user/month</span>
            </div>
            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Unlimited private repos</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Real-time analysis</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Advanced custom rules</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Team analytics dashboard</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/25">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card p-8 rounded-2xl flex flex-col hover:border-slate-600 transition-colors">
            <h4 className="text-xl font-bold text-white mb-2">Enterprise</h4>
            <div className="text-3xl font-bold text-white mb-6">Custom</div>
            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>SSO & Advanced Security</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>Custom hosting options</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Check className="w-4 h-4 text-violet-400" />
                <span>Dedicated success manager</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;