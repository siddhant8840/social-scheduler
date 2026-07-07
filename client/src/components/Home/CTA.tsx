import { Link } from "react-router-dom";
import { ArrowRightIcon, RocketIcon } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div className="relative rounded-3xl overflow-hidden p-14 sm:p-20 text-center bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 border border-red-100/50">
                    {/* Animated glow blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] animate-pulse-soft" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(236,72,153,0.05)_0%,transparent_70%)]" />

                    <div className="relative">
                        <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                            <RocketIcon className="size-3" />
                            Ready to grow?
                        </div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium text-gray-900">
                            Automate your social
                            <br />
                            <span className="gradient-text italic">media today</span>
                        </h2>
                        <p className="mt-6 text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
                            Join thousands of creators and marketers who trust Scheduler to grow their audience on autopilot.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/login"
                                className="group bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:shadow-[0_12px_32px_rgba(239,68,68,0.4)] inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center transition-all duration-300"
                            >
                                Get Started Free
                                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        <p className="mt-6 text-xs text-gray-400">
                            No credit card required · Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
