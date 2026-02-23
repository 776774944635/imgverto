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

            <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="flex flex-col items-center justify-center p-12 border rounded-[2.5rem] bg-muted/30 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                    <div className="p-4 bg-background rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Email Support</h2>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-xs">
                        For technical issues, bug reports, or enterprise inquiries. We typically respond within 24 hours.
                    </p>
                    <a
                        href="mailto:imgverto.contact@gmail.com"
                        className="inline-flex items-center justify-center rounded-xl text-sm font-black uppercase tracking-widest ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10"
                    >
                        imgverto.contact@gmail.com
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center p-12 border rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-[240px]">
                        {[
                            { name: "Twitter", href: "https://twitter.com/imgverto" },
                            { name: "LinkedIn", href: "https://linkedin.com/company/imgverto" },
                            { name: "Instagram", href: "https://instagram.com/imgverto" },
                            { name: "Support", href: "mailto:imgverto.contact@gmail.com" }
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl border bg-white hover:border-primary/30 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                            Follow our engineering updates and community guides on social media.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 p-8 border border-dashed rounded-[2rem] text-slate-500 text-sm italic">
                <p>Note: Imgverto is a global utility platform. While our engineering team is distributed, our primary support language is English. For urgent data deletion inquiries, please mention "PRIVACY" in your subject line.</p>
            </div>
        </Section>
    );
}
