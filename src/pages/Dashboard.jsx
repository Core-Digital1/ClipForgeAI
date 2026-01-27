import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Scissors, Download, Settings, LogOut, Zap, Plus, Video, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('upload');
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const sidebarItems = [
        { id: 'upload', icon: <Upload className="w-5 h-5" />, label: 'Upload' },
        { id: 'editor', icon: <Scissors className="w-5 h-5" />, label: 'Editor' },
        { id: 'export', icon: <Download className="w-5 h-5" />, label: 'Export' },
        { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    ];

    const recentProjects = [
        { id: 1, name: 'Marketing Video', clips: 5, date: '2 hours ago' },
        { id: 2, name: 'Podcast Episode 12', clips: 8, date: 'Yesterday' },
        { id: 3, name: 'Product Demo', clips: 3, date: '3 days ago' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800/50 border-r border-gray-700 flex flex-col">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 p-6 border-b border-gray-700">
                    <Zap className="w-8 h-8 text-purple-500" />
                    <span className="text-xl font-bold">ClipForge AI</span>
                </Link>

                {/* User info */}
                {user && (
                    <div className="p-4 border-b border-gray-700">
                        <p className="text-sm text-gray-400">Logged in as:</p>
                        <p className="text-white font-medium truncate">{user.email}</p>
                        {user.user_metadata?.full_name && (
                            <p className="text-purple-400 text-sm">{user.user_metadata.full_name}</p>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === item.id
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeTab === 'upload' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Upload Video</h1>

                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center hover:border-purple-500 transition cursor-pointer mb-8">
                            <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-300 mb-2">Drag and drop your video here</p>
                            <p className="text-gray-500 mb-4">or click to browse files</p>
                            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
                                Select Video
                            </button>
                        </div>

                        {/* Recent Projects */}
                        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500/50 transition cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                            <Video className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{project.name}</h3>
                                            <p className="text-sm text-gray-400">{project.clips} clips generated</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {project.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'editor' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Video Editor</h1>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-12 text-center">
                            <Scissors className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-300 mb-2">No video selected</p>
                            <p className="text-gray-500">Upload a video first to start editing</p>
                        </div>
                    </div>
                )}

                {activeTab === 'export' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Export Clips</h1>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-12 text-center">
                            <Download className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-300 mb-2">No clips to export</p>
                            <p className="text-gray-500">Generate clips in the editor first</p>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-8">Settings</h1>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 max-w-2xl">
                            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.user_metadata?.full_name || ''}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2">Subscription</label>
                                    <div className="flex items-center gap-4">
                                        <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">Free Plan</span>
                                        <button className="text-purple-400 hover:text-purple-300">Upgrade</button>
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
