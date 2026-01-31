import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";
import { Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <Section className="max-w-4xl mx-auto text-center">
            <ToolHeader
                title="Contact Us"
                description="Have a question or suggestion? We'd love to hear from you."
            />

            <div className="mt-12 flex flex-col items-center justify-center p-12 border rounded-2xl bg-muted/30">
                <div className="p-4 bg-background rounded-full shadow-sm mb-6">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    For support inquiries, bug reports, or partnership opportunities, please email us directly.
                </p>

                <a
                    href="mailto:imgverto.contact@gmail.com"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                    imgverto.contact@gmail.com
                </a>
            </div>
        </Section>
    );
}
