import { FAQSection } from "./FAQSection";
import { CheckCircle2, Users, HelpCircle, Info } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface ToolExtraContentProps {
    whatDoesItDo: {
        title: string;
        content: string;
    };
    whoIsItFor: {
        title: string;
        content: string;
    };
    howToUse: {
        title: string;
        steps: string[];
    };
    benefits: {
        title: string;
        items: string[];
    };
    faqs: FAQItem[];
}

export function ToolExtraContent({
    whatDoesItDo,
    whoIsItFor,
    howToUse,
    benefits,
    faqs,
}: ToolExtraContentProps) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-16 mt-16 pb-20">
            <section className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Info className="w-8 h-8 text-primary" /> {whatDoesItDo.title}
                </h2>
                <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    {whatDoesItDo.content}
                </div>
            </section>

            <section className="space-y-4 shadow-sm p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" /> {whoIsItFor.title}
                </h2>
                <div className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                    {whoIsItFor.content}
                </div>
            </section>

            <section className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-3">
                        <HelpCircle className="w-8 h-8 text-primary" /> {howToUse.title}
                    </h2>
                    <p className="text-slate-500">Follow these simple steps to get the best results.</p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {howToUse.steps.map((step, i) => (
                        <li key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                                {i + 1}
                            </span>
                            <span className="text-slate-700 font-medium">{step}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-primary" /> {benefits.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.items.map((benefit, i) => (
                        <div key={i} className="flex gap-3 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                            <span className="text-lg text-slate-700">{benefit}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="border-t border-slate-100 pt-10">
                <FAQSection items={faqs} />
            </div>
        </div>
    );
}
