import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Mail, Lock, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = '/auth/admin/login';
            const { data } = await api.post(endpoint, { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', 'admin');
            localStorage.setItem('name', data.name);

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-900 flex flex-col items-center">
            {/* Background Glows for Admin */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-900/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-cyan/20 rounded-full blur-[120px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white tracking-tight">Admin Portal</h2>
                    <p className="text-slate-400 mt-3 font-medium">Secure access for Centennial Talent Solutions administrators</p>
                </div>

                <div className="bg-slate-800 shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden border border-slate-700">
                    {/* Subtle Gradient Accent */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-blue"></div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 flex items-center space-x-3 text-red-400 bg-red-900/30 p-4 rounded-2xl border border-red-900/50"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-bold">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Admin Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-primary-400 text-slate-500">
                                    <Mail className="w-5 h-5 " />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary-500 text-white transition-all duration-300 font-medium"
                                    placeholder="admin@centennial.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 text-left">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-primary-400 text-slate-500">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-primary-500 text-white transition-all duration-300 font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-400 transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium btn-premium-primary py-4 group mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <span className="flex items-center space-x-2">
                                    <span>Access Dashboard</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
