"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
}

export default function DashboardCard({ title, value, icon: Icon, description }: DashboardCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass p-6 rounded-2xl border border-white/5 anti-gravity-card"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{description}</span>
            </div>
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
                <p className="text-3xl font-bold glow-text tracking-tight">{value}</p>
            </div>
        </motion.div>
    );
}
