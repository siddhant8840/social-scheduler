import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon, SparklesIcon } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Animated grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[56px_56px] pointer-events-none" />

            {/* Primary glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none animate-pulse-soft" />
            
            {/* Secondary accent glow */}
            <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-60 -left-20 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(236,72,153,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-12 text-center">
                {/* Badge */}
                <div className="animate-fade-in-up inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-1.5 rounded-full mb-8 shadow-sm shadow-red-100/50">
                    <SparklesIcon className="size-3.5" />
                    AI-Powered Social Media Automation
                </div>

                {/* Headline */}
                <h1 className="animate-fade-in-up delay-100 font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-900 leading-[1.05]">
                    Schedule smarter.
                    <br />
                    <span className="gradient-text italic">Grow faster.</span>
                </h1>

                {/* Subheadline */}
                <p className="animate-fade-in-up delay-200 mt-7 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    Scheduler lets you create, schedule, and auto-engage across all your social platforms — powered by AI that writes your captions and replies for you.
                </p>

                {/* CTAs */}
                <div className="animate-fade-in-up delay-300 mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/login"
                        className="group bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:shadow-[0_12px_32px_rgba(239,68,68,0.4)] inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all duration-300"
                    >
                        Start for free
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                        href="#how-it-works"
                        className="bg-white/80 backdrop-blur text-[#333] border-[1.5px] border-black/8 rounded-full font-medium hover:bg-white hover:border-black/15 hover:shadow-lg inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all duration-300"
                    >
                        See how it works
                    </a>
                </div>

                <p className="animate-fade-in-up delay-400 mt-6 text-xs text-gray-400">
                    No credit card required · Free forever plan available
                </p>
            </div>

            {/* Dashboard mockup */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0 animate-fade-in-up delay-500">
                <div className="rounded-t-2xl overflow-hidden border border-gray-200/80 border-b-0 shadow-2xl shadow-slate-200/60">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-slate-50 to-slate-100/80 border-b border-slate-200/60">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <div className="flex-1 mx-4 rounded-md h-5 max-w-xs bg-white/80 border border-slate-200/50" />
                    </div>

                    {/* Mock content */}
                    <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                        {/* Stat row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {[
                                { val: "12", label: "Scheduled", color: "text-blue-600" },
                                { val: "48", label: "Published", color: "text-emerald-600" },
                                { val: "4", label: "Accounts", color: "text-violet-600" },
                                { val: "3", label: "AI Rules", color: "text-amber-600" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl p-4 bg-white border border-slate-100 hover:border-slate-200 transition-all"
                                >
                                    <div className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.val}</div>
                                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Activity list */}
                        <div className="rounded-xl p-4 space-y-3 bg-white border border-slate-100">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                Recent Activity
                            </div>
                            {[
                                { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
                                { text: "AI replied to 3 comments", time: "15m ago" },
                                { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-3">
                                    <DotIcon className="size-5 text-emerald-400" />
                                    <span className="text-sm text-gray-600 flex-1">{item.text}</span>
                                    <span className="text-xs text-gray-300 shrink-0">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
