import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

const steps = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.", color: "from-blue-500 to-indigo-500" },
    { step: "02", title: "Create or Generate Content", description: "Write your own post or let our AI craft a caption and image based on your prompt.", color: "from-violet-500 to-purple-500" },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.", color: "from-red-500 to-rose-500" },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-28 bg-white relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <CheckCircleIcon className="size-3" />
                        Simple setup
                    </div>
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-gray-900">
                        Up and running in <span className="gradient-text italic">minutes</span>
                    </h2>
                    <p className="mt-5 text-gray-500 max-w-lg mx-auto leading-relaxed text-lg">
                        No complicated onboarding, no steep learning curve. Just connect, create, and grow.
                    </p>
                </div>

                <div className="space-y-0 relative">
                    {/* Connecting line */}
                    <div className="absolute left-6 top-12 bottom-12 w-[2px] bg-gradient-to-b from-blue-200 via-violet-200 to-red-200 hidden sm:block" />
                    
                    {steps.map((s, i) => (
                        <div key={s.step} className="flex gap-8 items-start relative py-6 group">
                            <div className={`shrink-0 size-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg shadow-slate-200/50 z-10 group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-sm font-bold text-white">{s.step}</span>
                            </div>
                            <div className="pt-1 flex-1">
                                <h3 className="text-slate-900 font-medium mb-1.5 text-[15px]">{s.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="hidden sm:block ml-auto shrink-0 self-center">
                                    <ArrowRightIcon className="size-4 text-slate-200" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
