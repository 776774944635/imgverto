import { FAQSection } from "./FAQSection";
import {
    CheckCircle2,
    ListOrdered,
    Sparkles,
    Target,
    Zap,
    ShieldCheck,
    Heart,
    Image as ImageIcon,
    Crop,
    Cloud,
    Maximize,
    Zap as SpeedIcon,
    Search,
    Database,
    Share2,
    Lock
} from "lucide-react";

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

const getBenefitIcon = (title: string) => {
    const t = title.toLowerCase();
    const iconClass = "w-6 h-6 text-slate-700";
    if (t.includes('privacy') || t.includes('secure') || t.includes('safety')) return <ShieldCheck className={iconClass} />;
    if (t.includes('free') || t.includes('no cost')) return <Heart className={iconClass} />;
    if (t.includes('crop') || t.includes('size') || t.includes('dimension')) return <Crop className={iconClass} />;
    if (t.includes('image') || t.includes('photo')) return <ImageIcon className={iconClass} />;
    if (t.includes('speed') || t.includes('fast') || t.includes('quick')) return <SpeedIcon className={iconClass} />;
    if (t.includes('seo') || t.includes('search')) return <Search className={iconClass} />;
    if (t.includes('storage') || t.includes('space') || t.includes('save')) return <Database className={iconClass} />;
    if (t.includes('online') || t.includes('cloud') || t.includes('web')) return <Cloud className={iconClass} />;
    if (t.includes('aspect') || t.includes('ratio') || t.includes('fit')) return <Maximize className={iconClass} />;
    if (t.includes('transfer') || t.includes('share') || t.includes('send')) return <Share2 className={iconClass} />;
    if (t.includes('limit') || t.includes('no limit')) return <CheckCircle2 className={iconClass} />;
    return <Zap className={iconClass} />;
};

export function ToolExtraContent({
    whatDoesItDo,
    whoIsItFor,
    howToUse,
    benefits,
    faqs,
}: ToolExtraContentProps) {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 mt-12 pb-16">
            {/* Benefits Grid - Redesigned to match screenshot */}
            <section className="space-y-8">
                <div className="text-center space-y-1">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {benefits.title}
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm font-medium max-w-xl mx-auto">
                        Why millions of users trust Imgverto for their image needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {benefits.items.map((benefit, i) => {
                        const title = benefit.split(':')[0];
                        const description = benefit.split(':')[1] || benefit;
                        return (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="mb-3 transform group-hover:scale-110 transition-all duration-300">
                                    {getBenefitIcon(title)}
                                </div>
                                <h3 className="text-sm md:text-base font-bold text-slate-900 mb-1 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[280px]">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="space-y-8 bg-slate-50/50 rounded-[2.5rem] p-6 md:p-8 border border-slate-100">
                <div className="max-w-3xl mx-auto text-center space-y-2">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                        <ListOrdered className="w-5 h-5 text-blue-600" /> {howToUse.title}
                    </h2>
                    <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed font-outfit">
                        Follow these simple steps in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {howToUse.steps.slice(0, 3).map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center space-y-2">
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-50 flex items-center justify-center text-base font-extrabold text-blue-600 shadow-sm z-10 transition-transform hover:scale-110">
                                {i + 1}
                            </div>
                            <p className="text-slate-700 text-xs md:text-sm font-bold leading-snug px-4">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Information Grid (Who & What) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                            {whatDoesItDo.title}
                        </h2>
                    </div>
                    <div className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify md:text-left space-y-3">
                        {whatDoesItDo.content.split('\n\n').map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-50 rounded-lg">
                            <Target className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                            {whoIsItFor.title}
                        </h2>
                    </div>
                    <div className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify md:text-left space-y-3">
                        {whoIsItFor.content.split('\n\n').map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                </section>
            </div>

            <div className="border-t border-slate-100 pt-12">
                <FAQSection items={faqs} />
            </div>
        </div>
    );
}
