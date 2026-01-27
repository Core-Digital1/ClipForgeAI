import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const { signUp, signIn, resetPassword, updatePassword } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setMode(initialMode);
        setMessage({ text: '', type: '' });
    }, [initialMode, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            if (mode === 'signup') {
                const { data, error } = await signUp(email, password, name);
                if (error) throw error;

                if (data.user) {
                    if (data.user.identities && data.user.identities.length === 0) {
                        setMessage({ text: 'Account already exists with this email. Please log in instead.', type: 'error' });
                    } else if (data.user.confirmed_at) {
                        setMessage({ text: 'Account created and email verified! You can now log in.', type: 'success' });
                    } else {
                        setMessage({ text: '🎉 Account created! Please check your email (including spam folder) for verification link.', type: 'success' });
                    }
                    setEmail('');
                    setPassword('');
                    setName('');
                }
            } else if (mode === 'login') {
                const { data, error } = await signIn(email, password);
                if (error) throw error;

                if (data.user) {
                    setMessage({ text: '✅ Login successful! Redirecting to dashboard...', type: 'success' });
                    setTimeout(() => {
                        onClose();
                        navigate('/dashboard');
                    }, 1500);
                }
            } else if (mode === 'forgot') {
                const { error } = await resetPassword(email);
                if (error) throw error;

                setMessage({ text: '✅ Password reset link sent! Check your email (including spam folder).', type: 'success' });
                setEmail('');
            } else if (mode === 'newPassword') {
                if (password !== confirmPassword) {
                    setMessage({ text: 'Passwords do not match', type: 'error' });
                    setLoading(false);
                    return;
                }

                const { error } = await updatePassword(password);
                if (error) throw error;

                setMessage({ text: '✅ Password updated successfully! You can now log in with your new password.', type: 'success' });
                setPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    setMode('login');
                }, 2000);
            }
        } catch (error) {
            let errorMessage = '';

            if (error.message.includes('already registered')) {
                errorMessage = 'Email already exists. Please log in.';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Invalid email address.';
            } else if (error.message.includes('Password')) {
                errorMessage = 'Password should be at least 6 characters.';
            } else if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Invalid email or password.';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Please verify your email address first.';
            } else {
                errorMessage = error.message;
            }

            setMessage({ text: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'signup': return 'Create Your Account';
            case 'login': return 'Log In to Your Account';
            case 'forgot': return 'Reset Your Password';
            case 'newPassword': return 'Set New Password';
            default: return 'Welcome';
        }
    };

    const getButtonText = () => {
        if (loading) {
            switch (mode) {
                case 'signup': return 'Creating Account...';
                case 'login': return 'Logging in...';
                case 'forgot': return 'Sending...';
                case 'newPassword': return 'Updating...';
                default: return 'Loading...';
            }
        }
        switch (mode) {
            case 'signup': return 'CREATE ACCOUNT';
            case 'login': return 'LOG IN';
            case 'forgot': return 'SEND RESET LINK';
            case 'newPassword': return 'UPDATE PASSWORD';
            default: return 'Submit';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">{getTitle()}</h2>

                {/* Message */}
                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg ${message.type === 'error'
                            ? 'bg-red-500/20 border border-red-500 text-red-300'
                            : 'bg-green-500/20 border border-green-500 text-green-300'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    )}

                    {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    )}

                    {(mode === 'login' || mode === 'signup' || mode === 'newPassword') && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={mode === 'newPassword' ? 'New Password' : 'Password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    )}

                    {mode === 'newPassword' && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {getButtonText()}
                    </button>
                </form>

                {/* Footer links */}
                <div className="text-center text-gray-400 mt-6 space-y-2">
                    {mode === 'login' && (
                        <>
                            <p>
                                <button
                                    onClick={() => setMode('forgot')}
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    Forgot password?
                                </button>
                            </p>
                            <p>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => setMode('signup')}
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </>
                    )}

                    {mode === 'signup' && (
                        <p>
                            Already have an account?{' '}
                            <button
                                onClick={() => setMode('login')}
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Log in
                            </button>
                        </p>
                    )}

                    {mode === 'forgot' && (
                        <p>
                            Remember your password?{' '}
                            <button
                                onClick={() => setMode('login')}
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Log in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
