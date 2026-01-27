import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Video, Subtitles, Share2, Zap, Check, Play } from 'lucide-react';

export default function LandingPage() {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    // Check for password recovery state
    useEffect(() => {
        if (location.state?.showNewPassword) {
            setAuthMode('newPassword');
            setShowAuth(true);
            // Clear the state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const openLogin = () => {
        setAuthMode('login');
        setShowAuth(true);
    };

    const openSignup = () => {
        setAuthMode('signup');
        setShowAuth(true);
    };

    const goToDashboard = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            openSignup();
        }
    };

    const features = [
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: 'AI Viral Detection',
            description: 'Our AI automatically identifies the most engaging moments in your videos.'
        },
        {
            icon: <Video className="w-8 h-8 text-blue-400" />,
            title: 'Smart Clip Generation',
            description: 'Generate multiple short clips optimized for maximum engagement.'
        },
        {
            icon: <Subtitles className="w-8 h-8 text-green-400" />,
            title: 'Dynamic Subtitles',
            description: 'Auto-generate eye-catching subtitles with custom styles and animations.'
        },
        {
            icon: <Share2 className="w-8 h-8 text-pink-400" />,
            title: 'Multi-Platform Export',
            description: 'Export directly to TikTok, Instagram Reels, and YouTube Shorts.'
        }
    ];

    const pricingPlans = [
        {
            name: 'Free',
            price: '$0',
            period: '/month',
            features: ['5 videos/month', 'Basic AI detection', 'Standard subtitles', 'Watermark included'],
            cta: 'Start Free',
            highlighted: false,
            action: goToDashboard
        },
        {
            name: 'Pro',
            price: '$19',
            period: '/month',
            features: ['50 videos/month', 'Advanced AI detection', 'Custom subtitles', 'No watermark', 'Priority support'],
            cta: 'Go Pro',
            highlighted: true,
            action: openSignup
        },
        {
            name: 'Business',
            price: '$49',
            period: '/month',
            features: ['Unlimited videos', 'Premium AI features', 'Brand customization', 'API access', 'Dedicated support'],
            cta: 'Contact Us',
            highlighted: false,
            action: () => window.location.href = 'mailto:contact@coredigital.com'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar onLoginClick={openLogin} />
            <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} initialMode={authMode} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm">AI-Powered Video Editing</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                        Turn Long Videos Into<br />
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Viral Shorts</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        AI-powered tool that automatically detects viral moments, generates short clips,
                        adds dynamic subtitles, and prepares your content for TikTok, Instagram Reels, and YouTube Shorts.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={goToDashboard}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-purple-500/25"
                        >
                            Start Creating Free
                        </button>
                        <button
                            onClick={() => alert('Demo video coming soon!')}
                            className="border border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                            <Play className="w-5 h-5" />
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-gray-400 text-lg">Everything you need to create viral short-form content</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
                        <p className="text-gray-400 text-lg">Start free and scale as you grow</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl p-8 ${plan.highlighted
                                        ? 'bg-gradient-to-b from-purple-600/20 to-blue-600/20 border-2 border-purple-500'
                                        : 'bg-gray-800/50 border border-gray-700'
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="text-center mb-4">
                                        <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full">Most Popular</span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-green-400" />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={plan.action}
                                    className={`w-full py-3 rounded-full font-semibold transition ${plan.highlighted
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                                            : 'border border-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Zap className="w-6 h-6 text-purple-500" />
                            <span className="text-lg font-bold">ClipForge AI</span>
                        </Link>
                        <div className="flex gap-6 text-gray-400">
                            <a href="#" className="hover:text-white transition">Privacy</a>
                            <a href="#" className="hover:text-white transition">Terms</a>
                            <a href="mailto:contact@coredigital.com" className="hover:text-white transition">Contact</a>
                        </div>
                        <p className="text-gray-500">© 2026 Core Digital. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
