import { StarIcon, QuoteIcon } from "lucide-react";

const testimonials = [
    {
        name: "Chidanand Das",
        role: "Engineering Student",
        avatar: "C",
        avatarBg: "from-red-400 to-pink-400",
        text: "Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.",
        stars: 5,
    },
    {
        name: "Harsh Singh",
        role: "Social Media Influencer",
        avatar: "H",
        avatarBg: "from-violet-400 to-purple-500",
        text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
        stars: 5,
    },
    {
        name: "Nakul Deshmukh",
        role: "Web Developer",
        avatar: "N",
        avatarBg: "from-sky-400 to-blue-500",
        text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
        stars: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-28 bg-slate-50/80 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.04)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                <div className="text-center mb-14">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <StarIcon className="size-3" />
                        Testimonials
                    </div>
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-gray-900">
                        Loved by <span className="gradient-text">creators & teams</span>
                    </h2>
                    <p className="mt-5 text-gray-500 max-w-md mx-auto text-lg">
                        Join thousands of people who automate their social media with Scheduler.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="card-hover bg-white rounded-2xl border border-slate-100 p-7 flex flex-col gap-5 relative overflow-hidden group">
                            {/* Quote decoration */}
                            <QuoteIcon className="absolute top-5 right-5 size-8 text-slate-50 group-hover:text-red-50 transition-colors" />
                            
                            {/* Stars */}
                            <div className="flex gap-0.5">
                                {Array.from({ length: t.stars }).map((_, idx) => (
                                    <StarIcon key={idx} className="size-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            
                            <p className="text-slate-600 text-sm leading-relaxed flex-1 relative z-10">"{t.text}"</p>
                            
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <div className={`size-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-900">{t.name}</div>
                                    <div className="text-xs text-slate-400">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
