import { Link } from "react-router-dom";
import { HeartIcon } from "lucide-react";

const footerLinks = {
    Product: ["Features", "How it works", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" onClick={() => scrollTo(0, 0)} className="inline-flex items-center gap-2 mb-5 group">
                            <img src="/logo.svg" alt="logo" className="size-6 transition-transform group-hover:scale-110" />
                            <span className="font-medium font-serif text-xl text-gray-800">Scheduler</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            The AI-powered social media scheduler that helps creators and teams grow faster with less effort.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div className="text-xs font-semibold uppercase tracking-widest mb-5 text-gray-600">{category}</div>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        © {new Date().getFullYear()} Scheduler. Made with <HeartIcon className="size-3 text-red-400 fill-red-400" /> by Siddhant Srivastava. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                            Terms of Service
                        </a>
                        <Link to="/login" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
