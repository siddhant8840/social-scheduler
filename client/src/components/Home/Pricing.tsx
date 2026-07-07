import { CheckIcon, CircleCheckBigIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for creators just getting started with social media automation.",
        features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic dashboard"],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "Everything you need to grow and automate your social presence.",
        features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"],
        cta: "Start 14-day Free Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/month",
        description: "For teams and agencies managing multiple brands at scale.",
        features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-28 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(239,68,68,0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/15 text-red-500 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <CircleCheckBigIcon className="size-3" />
                        Simple pricing
                    </div>
                    <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-gray-900">
                        Plans for every stage
                        <br />
                        <span className="gradient-text italic">of growth</span>
                    </h2>
                    <p className="mt-5 text-gray-500 max-w-md mx-auto text-lg">
                        Start free, upgrade when you're ready. Cancel anytime — no hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`card-hover rounded-2xl border p-8 flex flex-col gap-6 relative overflow-hidden ${
                                plan.highlight
                                    ? "bg-gradient-to-br from-red-500 via-red-500 to-rose-600 text-white border-red-400 shadow-2xl shadow-red-200/40 scale-[1.03]"
                                    : "bg-white text-slate-900 border-slate-200"
                            }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                    <SparklesIcon className="size-3" />
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <div className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-red-100" : "text-red-500"}`}>
                                    {plan.name}
                                </div>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className={`text-sm mb-1.5 ${plan.highlight ? "text-red-200" : "text-slate-400"}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <p className={`text-sm mt-3 leading-relaxed ${plan.highlight ? "text-red-100" : "text-slate-500"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm">
                                        <div
                                            className={`size-5 rounded-full flex items-center justify-center shrink-0 ${
                                                plan.highlight ? "bg-white/20" : "bg-red-50"
                                            }`}
                                        >
                                            <CheckIcon className={`size-3 ${plan.highlight ? "text-white" : "text-red-500"}`} />
                                        </div>
                                        <span className={plan.highlight ? "text-red-50" : "text-slate-600"}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/login"
                                className={`mt-auto text-center font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300 ${
                                    plan.highlight
                                        ? "bg-white text-red-500 hover:bg-red-50 hover:shadow-lg"
                                        : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200"
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
