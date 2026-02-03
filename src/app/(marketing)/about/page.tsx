import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function AboutPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto text-center pb-20">
            <ToolHeader
                title="About Imgverto"
                description="Redefining file management through transparency, speed, and absolute privacy."
            />

            <div className="text-left space-y-12">
                <section>
                    <p className="lead text-xl text-center">
                        Imgverto was born from a simple frustration: why are most online PDF and image tools so cluttered, limited, or expensive? We set out to build a platform that puts the user back in control—no ads popping over your content, no forced subscriptions, and no hidden data harvesting.
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-8 not-prose">
                    <div className="p-8 border-2 border-primary/10 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Mission Driven</h3>
                        <p className="text-slate-600 leading-relaxed">Our mission is to democratize high-level image and document processing for students, professionals, and creators worldwide.</p>
                    </div>
                    <div className="p-8 border-2 border-primary/10 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Privacy First</h3>
                        <p className="text-slate-600 leading-relaxed">We don't believe in "the cloud" for sensitive docs. Our logic runs in your browser memory, ensuring your data never stays with us.</p>
                    </div>
                    <div className="p-8 border-2 border-primary/10 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Zero Friction</h3>
                        <p className="text-slate-600 leading-relaxed">No accounts, no email signups, and no credits. Just 100% free, high-performance tools available 24/7 on any device.</p>
                    </div>
                </div>

                <section className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                    <h2 className="text-3xl font-black mb-6">Our Commitment to Quality</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Behind Imgverto is a team of software engineers dedicated to the science of image processing. We don't just "wrap" existing tools; we build and optimize our own conversion engines using modern technologies like **WebAssembly (Wasm)**. This allows us to offer server-grade performance directly inside your browser.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
                        Whether you are compressing a massive PDF for a job application or upscaling a blurry photo for your portfolio, we guarantee that the visual integrity of your work remains our top priority. We are constantly updating our algorithms to support the latest image formats and document standards.
                    </p>
                </section>

                <section className="text-center space-y-6">
                    <h2 className="text-3xl font-black">Join the Community</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Thousands of users trust Imgverto every day for their personal and business documents. We are proud to be a small part of your creative and professional workflow.
                    </p>
                    <div className="pt-4 italic text-primary font-bold text-2xl">
                        — The Imgverto Team
                    </div>
                </section>
            </div>
        </Section>
    );
}
