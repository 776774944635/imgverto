import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";
import { Sparkles, Target, ShieldCheck, Zap, Zap as SpeedIcon } from "lucide-react";
import { Zap as ZapIcon } from "lucide-react";

export default function AboutPage() {
    return (
        <Section className="max-w-4xl mx-auto text-center pb-8 pt-4">
            <ToolHeader
                title="About Imgverto"
                description="Redefining file management through transparency, speed, and absolute privacy."
            />

            <div className="text-left space-y-8 mt-6">
                <section className="relative px-6 py-8 bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Sparkles className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed text-center max-w-3xl mx-auto">
                        Imgverto was born from a simple goal: to create professional document tools that are fast, free, and absolutely private. We've eliminated the clutter, forced subscriptions, and hidden data harvesting that plague modern utilities.
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-6 not-prose">
                    <div className="p-6 border border-primary/10 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-slate-900">Mission Driven</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Our mission is to democratize high-level image and document processing. We believe advanced tools should be accessible to everyone—from students applying for exams to professionals building portfolios.
                        </p>
                    </div>
                    <div className="p-6 border border-emerald-500/10 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-slate-900">Privacy Infrastructure</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            We don't believe in "the cloud" for sensitive data. Our platform is built on modern security principles where processing happens in isolated environments, ensuring your personal documents never leave your control.
                        </p>
                    </div>
                    <div className="p-6 border border-amber-500/10 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                            <ZapIcon className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-slate-900">Zero Friction</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Eliminating the "Login to Download" barrier. We provide high-performance tools with zero account requirements, zero email signups, and zero hidden costs. It's high-speed utility, available 24/7 on any device.
                        </p>
                    </div>
                </div>

                <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl border border-slate-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

                    <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-white flex items-center gap-3">
                        <SpeedIcon className="w-6 h-6 text-primary" /> Our Engineering Commitment
                    </h2>

                    <div className="space-y-4 text-base text-slate-300 leading-relaxed">
                        <p>
                            Behind Imgverto is a team of software engineers dedicated to the science of digital preservation and transformation. We build and optimize our own conversion engines using modern technologies like WebAssembly (Wasm) and Rust.
                        </p>
                        <p>
                            By compiling high-performance code for the browser, we offer server-grade performance directly inside your tab. Processing massive 4K images and complex multi-page PDFs happens fast, and without transmitting a single byte to an external server in most cases.
                        </p>
                    </div>
                </section>

                <section className="text-center space-y-4 py-8">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Built for the Modern Web</h2>
                    <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Thousands of users trust Imgverto every day for their personal and business documents. We are proud to be a part of your workflow.
                    </p>
                    <div className="pt-4 relative inline-block">
                        <div className="italic text-primary font-bold text-xl tracking-tight">
                            — The Imgverto Engineering Team
                        </div>
                    </div>
                </section>
            </div>
        </Section>
    );
}
