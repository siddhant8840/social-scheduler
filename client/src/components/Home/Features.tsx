import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon } from "lucide-react";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
        gradient: "from-blue-500 to-indigo-500",
        bg: "bg-blue-50",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description: "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
        gradient: "from-violet-500 to-purple-500",
        bg: "bg-violet-50",
    },
    {
        icon: BarChart3Icon,
        title: "Activity Dashboard",
        description: "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-50",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform",
        description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
        gradient: "from-red-500 to-rose-500",
        bg: "bg-red-50",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description: "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-50",
    },
    {
        icon: HashIcon,
        title: "Hashtag Suggestions",
        description: "Get AI-powered hashtag suggestions to reach a wider audience and boost your engagement.",
        gradient: "from-pink-500 to-rose-500",
        bg: "bg-pink-50",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-28 bg-slate-50/80 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,68,68,0.04)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <ZapIcon className="size-3" />
                        Everything you need
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-gray-900">
                        Automate your entire
                        <br />
                        <span className="gradient-text italic">social media workflow</span>
                    </h2>
                    <p className="mt-5 text-gray-500 max-w-xl mx-auto leading-relaxed text-lg">
                        From content creation to scheduling — Scheduler handles it all so you can focus on what matters most.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="card-hover bg-white rounded-2xl border border-slate-100 p-7 group cursor-default"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className={`size-11 rounded-xl flex items-center justify-center mb-5 ${f.bg} group-hover:bg-gradient-to-br group-hover:${f.gradient} transition-all duration-300`}>
                                <f.icon className={`size-5 text-slate-600 group-hover:text-white transition-colors duration-300`} />
                            </div>
                            <h3 className="text-slate-900 font-medium mb-2 text-[15px]">{f.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
