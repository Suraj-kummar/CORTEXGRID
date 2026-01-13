"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, LogOut, Mail, Github, Chrome } from "lucide-react";

export default function WalletConnect() {
    const [isConnected, setIsConnected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userAddress, setUserAddress] = useState("");

    const connectWallet = (type: string) => {
        // Simulate social login / AA wallet creation
        setUserAddress("0x4B6...8E2");
        setIsConnected(true);
        setShowModal(false);
    };

    const disconnect = () => {
        setIsConnected(false);
        setUserAddress("");
    };

    return (
        <div className="relative z-50">
            {!isConnected ? (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <Wallet size={18} /> Connect Wallet
                </button>
            ) : (
                <div className="flex gap-2">
                    <button className="glass px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all border border-blue-500/20 text-sm">
                        Node: {userAddress}
                    </button>
                    <button
                        onClick={disconnect}
                        className="glass p-3 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all border border-red-500/10"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative glass w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-2 text-center">Welcome to Cortex</h2>
                            <p className="text-muted-foreground text-center mb-8 text-sm">
                                Connect your account to start renting GPU power.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => connectWallet("google")}
                                    className="w-full glass p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold"
                                >
                                    <Chrome size={20} className="text-blue-400" /> Continue with Google
                                </button>
                                <button
                                    onClick={() => connectWallet("github")}
                                    className="w-full glass p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold"
                                >
                                    <Github size={20} /> Continue with GitHub
                                </button>
                                <button
                                    onClick={() => connectWallet("email")}
                                    className="w-full glass p-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-sm font-bold"
                                >
                                    <Mail size={20} className="text-primary" /> Sign in with Email
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4">
                                <p className="text-[10px] text-muted-foreground text-center italic">
                                    Powered by Cortex Account Abstraction (AA) Smart Accounts.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
