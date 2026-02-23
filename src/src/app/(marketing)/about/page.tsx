import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";
import { Sparkles, Target, ShieldCheck, Zap, Zap as SpeedIcon } from "lucide-react";
import { Zap as ZapIcon } from "lucide-react";

export default function AboutPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto text-center pb-20">
            <ToolHeader
                title="About Imgverto"
                description="Redefining file management through transparency, speed, and absolute privacy."
            />

            <div className="text-left space-y-16">
                <section className="relative px-8 py-12 bg-primary/5 rounded-[3rem] border border-primary/10 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles className="w-24 h-24 text-primary" />
                    </div>
                    <p className="lead text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed text-center max-w-3xl mx-auto">
                        Imgverto was born from a simple frustration: why are most online document tools so cluttered, limited, or expensive? We set out to build a platform that puts the user back in control—no ads popping over your content, no forced subscriptions, and no hidden data harvesting.
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-8 not-prose">
                    <div className="p-10 border-2 border-primary/10 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-slate-900">Mission Driven</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Our mission is to democratize high-level image and document processing. We believe advanced tools should be accessible to everyone—from students applying for exams to professionals building their portfolios—without technical or financial barriers.
                        </p>
                    </div>
                    <div className="p-10 border-2 border-emerald-500/10 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-slate-900">Privacy Infrastructure</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            We don't believe in "the cloud" for sensitive data. Our platform is built on modern security principles where processing happens in isolated environments, ensuring your personal documents never leave your control through unwanted persistence.
                        </p>
                    </div>
                    <div className="p-10 border-2 border-amber-500/10 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                            <ZapIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-slate-900">Zero Friction</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Eliminating the "Login to Download" barrier. We provide high-performance tools with zero account requirements, zero email signups, and zero hidden costs. It's high-speed utility, available 24/7 on any device.
                        </p>
                    </div>
                </div>

                <section className="bg-slate-900 text-white p-12 md:p-16 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />

                    <h2 className="text-3xl font-extrabold mb-8 text-white flex items-center gap-3">
                        <SpeedIcon className="w-8 h-8 text-primary" /> Our Engineering Commitment
                    </h2>

                    <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                        <p>
                            Behind Imgverto is a team of software engineers dedicated to the science of digital preservation and transformation. We don't just "wrap" existing open-source libraries; we build and optimize our own conversion engines using modern technologies like **WebAssembly (Wasm)** and **Rust**.
                        </p>
                        <p>
                            By compiling high-performance low-level code for the browser, we offer server-grade performance directly inside your tab. This technical choice isn't just about speed—it's about privacy. It allows us to process massive 4K images and complex multi-page PDFs without transmitting a single byte of content to an external server in most cases.
                        </p>
                        <p>
                            Whether you are compressing a massive PDF for an SSC job application or upscaling a blurry photo for your creative portfolio, we guarantee that the visual integrity of your work remains our top priority. We are constantly updating our algorithms to support the latest image formats and document standards, keeping you ready for whatever requirements come your way.
                        </p>
                    </div>
                </section>

                <section className="text-center space-y-8 py-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Built for the Modern Web</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Thousands of users trust Imgverto every day for their personal and business documents. We are proud to be a small part of your creative and professional workflow, helping you save time and secure your data.
                    </p>
                    <div className="pt-6 relative inline-block">
                        <div className="italic text-primary font-black text-3xl tracking-tight">
                            — The Imgverto Engineering Team
                        </div>
                        <div className="h-1 w-24 bg-primary/20 absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full" />
                    </div>
                </section>
            </div>
        </Section>
    );
}
