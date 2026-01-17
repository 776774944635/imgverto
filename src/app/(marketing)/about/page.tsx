import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function AboutPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto text-center">
            <ToolHeader
                title="About Imgverto"
                description="We make file conversion simple, secure, and free."
            />

            <p className="lead text-xl">
                Imgverto was born from a simple frustration: why are most online PDF and image tools so cluttered, limited, or expensive?
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left mt-12 not-prose">
                <div className="p-6 border rounded-xl bg-card">
                    <h3 className="text-lg font-bold mb-2">Free Forever</h3>
                    <p className="text-muted-foreground">We believe basic file manipulation should be a public utility. No hidden paywalls for standard tasks.</p>
                </div>
                <div className="p-6 border rounded-xl bg-card">
                    <h3 className="text-lg font-bold mb-2">Privacy First</h3>
                    <p className="text-muted-foreground">We don&apos;t hoarding your data. Files are auto-deleted. Secure TLS encryption everywhere.</p>
                </div>
                <div className="p-6 border rounded-xl bg-card">
                    <h3 className="text-lg font-bold mb-2">Blazing Fast</h3>
                    <p className="text-muted-foreground">Powered by modern edge technologies like WebAssembly and Vercel Edge Functions.</p>
                </div>
            </div>
        </Section>
    );
}
