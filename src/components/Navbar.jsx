import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar({ onLoginClick }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Zap className="w-8 h-8 text-purple-500" />
                        <span className="text-xl font-bold text-white">ClipForge AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/#features" className="text-gray-300 hover:text-white transition">Features</a>
                        <a href="/#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                        <button
                            onClick={onLoginClick}
                            className="text-gray-300 hover:text-white transition"
                        >
                            Login
                        </button>
                        <Link
                            to="/dashboard"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800">
                        <div className="flex flex-col gap-4">
                            <a href="/#features" className="text-gray-300 hover:text-white transition">Features</a>
                            <a href="/#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                            <button
                                onClick={onLoginClick}
                                className="text-gray-300 hover:text-white transition text-left"
                            >
                                Login
                            </button>
                            <Link
                                to="/dashboard"
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold text-center"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
