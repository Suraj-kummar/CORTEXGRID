"use client";

import { Cpu, Globe, Scale, Zap, ShieldCheck } from "lucide-react";
import GlobalGrid from "@/components/GlobalGrid";
import DashboardCard from "@/components/DashboardCard";
import WalletConnect from "@/components/WalletConnect";
import { motion } from "framer-motion";

const GPU_NODES = [
  { name: "Node-Alpha-4090", provider: "0x742d...441a", vram: "24GB", price: "$0.45/hr", status: "Available" },
  { name: "Node-Beta-A100", provider: "0x123f...99eb", vram: "80GB", price: "$2.10/hr", status: "In-Use" },
  { name: "Node-Gamma-3080", provider: "0x987a...1234", vram: "10GB", price: "$0.25/hr", status: "Available" },
];

export default function Dashboard() {
  return (
    <main className="relative min-h-screen p-8 md:p-12 overflow-hidden">
      <GlobalGrid />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tighter mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            CORTEX GRID
          </h1>
          <p className="text-muted-foreground max-w-md font-medium">
            Decentralized GPU Infrastructure. High-performance compute at 1/10th the cost.
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <WalletConnect />
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative z-10">
        <DashboardCard title="Active Nodes" value="1,248" icon={Globe} description="Global" />
        <DashboardCard title="Network VRAM" value="32.4 TB" icon={Cpu} description="Total Capacity" />
        <DashboardCard title="Jobs Processed" value="45.2K" icon={Zap} description="Lifetime" />
        <DashboardCard title="Staked Value" value="$2.4M" icon={ShieldCheck} description="Arbitrum" />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Marketplace Table */}
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Scale className="text-primary" /> Active Marketplace
            </h2>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full uppercase">
              Live Updates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase text-muted-foreground font-bold tracking-widest border-b border-white/5 bg-white/2">
                <tr>
                  <th className="px-6 py-4">Node Identity</th>
                  <th className="px-6 py-4">Hardware</th>
                  <th className="px-6 py-4">Pricing</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {GPU_NODES.map((node, i) => (
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="hover:bg-white/2 transition-all group"
                  >
                    <td className="px-6 py-6 font-medium">
                      <div className="flex flex-col">
                        <span>{node.name}</span>
                        <span className="text-xs text-muted-foreground">{node.provider}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm font-semibold">{node.vram} NVIDIA</td>
                    <td className="px-6 py-6 text-primary font-bold">{node.price}</td>
                    <td className="px-6 py-6">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${node.status === 'Available' ? 'text-blue-400 bg-blue-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
                        {node.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <button className="text-xs font-bold bg-white text-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                        Rent Now
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info / Ads Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-10 group-hover:bg-primary/30 transition-all border border-white/5"></div>
            <h3 className="text-lg font-bold mb-4">Slash Watchtower</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Our automated watchtower monitors every 60 seconds. Providers go offline for more than 2 minutes lose their 10% stake instantly.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span>Network Integrity</span>
                <span className="text-blue-400 font-bold">99.98%</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[99.98%]"></div>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl flex flex-col items-center text-center justify-center border border-white/5 bg-gradient-to-b from-transparent to-primary/5">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-float border border-primary/30">
              <ShieldCheck className="text-primary" size={32} />
            </div>
            <h4 className="font-bold mb-2">Verified Compute</h4>
            <p className="text-xs text-muted-foreground">Every model execution is signed and verified on Arbitrum.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
