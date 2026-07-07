import { Link } from "react-router-dom";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 glass-strong border-b border-slate-100/80 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2 group">
                    <img src="/logo.svg" alt="logo" className="size-7 transition-transform group-hover:scale-110" />
                    <span className="text-xl lg:text-2xl font-medium font-serif text-slate-800">Scheduler</span>
                </Link>
                
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
                    <a href="#features" className="hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-red-400 after:transition-all hover:after:w-full">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-slate-900 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-red-400 after:transition-all hover:after:w-full">
                        How it works
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="group flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-sm hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                        >
                            Go to Dashboard <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900 hidden sm:block transition-colors">
                                Sign In
                            </Link>
                            <Link
                                to="/login"
                                className="group flex items-center gap-1.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-sm hover:shadow-lg hover:shadow-red-200 transition-all duration-300"
                            >
                                Get Started <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </>
                    )}

                    {/* Mobile menu toggle */}
                    <button className="md:hidden p-2 -mr-2 text-slate-500 hover:text-slate-900" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl animate-fade-in">
                    <div className="flex flex-col px-6 py-4 gap-3 text-sm text-slate-600">
                        <a href="#features" onClick={() => setMobileOpen(false)} className="py-2 hover:text-slate-900">Features</a>
                        <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="py-2 hover:text-slate-900">How it works</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
