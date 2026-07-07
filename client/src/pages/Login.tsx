import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon, SparklesIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login, user} = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
       try {
            const { data } = await api.post(`/api/auth/${loginState ? "login" : "register"}`, { name, email, password })

            login(data, data.token)
            navigate("/dashboard")
       } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message)
       }finally{
        setLoading(false)
       }
    };

    useEffect(()=>{
        if(user) navigate('/dashboard')
    },[user])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.04)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(249,115,22,0.03)_0%,transparent_70%)] pointer-events-none animate-pulse-soft" />

            <div className="relative w-full max-w-md animate-fade-in-up">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100/80">
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src="/logo.svg" alt="Logo" className="size-7 transition-transform group-hover:scale-110" />
                            <h1 className="text-2xl font-serif font-medium text-slate-800">Scheduler</h1>
                        </Link>
                        <p className="text-slate-500 text-sm mt-2">
                            {loginState ? "Sign in to your Dashboard" : "Create your free account"}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                        {!loginState && (
                            <div className="animate-fade-in">
                                <label className="block mb-1.5 text-slate-700 font-medium">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" required placeholder="Enter your name" className="w-full pl-10 pr-4 py-3 bg-slate-50/80 outline-none border border-slate-200 rounded-xl focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block mb-1.5 text-slate-700 font-medium">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" required placeholder="you@company.com" className="w-full pl-10 pr-4 py-3 bg-slate-50/80 outline-none border border-slate-200 rounded-xl focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1.5 text-slate-700 font-medium">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="password" required placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50/80 outline-none border border-slate-200 rounded-xl focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="group w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-200 active:scale-[0.98]">
                            {loading ? (
                                <>
                                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {loginState ? "Signing in..." : "Creating account..."}
                                </>
                            ) : (
                                <>
                                    {loginState ? "Sign In" : "Create Account"}
                                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        {loginState ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={() => setLoginState(false)} className="text-red-500 hover:text-red-600 font-medium transition-colors">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setLoginState(true)} className="text-red-500 hover:text-red-600 font-medium transition-colors">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Trust badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <SparklesIcon className="size-3" />
                    Trusted by 5,000+ creators worldwide
                </div>
            </div>
        </div>
    );
}
