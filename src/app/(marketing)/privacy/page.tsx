import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function PrivacyPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto pb-20">
            <ToolHeader
                title="Privacy Policy"
                description="Last Updated: February 3, 2026"
            />

            <section className="space-y-6">
                <p className="lead text-xl">
                    At **Imgverto**, your digital sovereignty is our highest priority. This policy details our rigorous standards for data handling, security, and privacy when utilizing our suite of document and image tools.
                </p>
                <p>
                    Our core technical philosophy is built around **privacy-by-design**. We believe that utility should never come at the cost of personal information. This site is engineered to process data without personal identification.
                </p>
            </section>

            <h3>1. Data Processing Infrastructure</h3>
            <p>
                Imgverto operates as a transit processing hub. Unlike traditional cloud-storage platforms, we do not provide or maintain any form of long-term data persistence for user content.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 not-prose my-8">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-2">Zero Persistence</h4>
                    <p className="text-sm text-slate-600">Files processed on our servers are kept in RAM-only environments and are purged immediately after the conversion loop is completed.</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-2">Edge Termination</h4>
                    <p className="text-sm text-slate-600">Our serverless infrastructure terminates after task completion, destroying any temporary working directories created during the process.</p>
                </div>
            </div>

            <h3>2. Information We Collect</h3>
            <p>
                To maintain the integrity and performance of Imgverto, we collect minimal, non-identifying data:
            </p>
            <ul>
                <li>**Technical Metadata:** We analyze file headers (type, size, resolution) purely to determine processing requirements. We do not inspect the content within the pixels or text fields.</li>
                <li>**Traffic Metrics:** We use anonymized analytics to understand general usage patterns (e.g., which tools are most popular) to allocate server resources effectively.</li>
                <li>**Browser Logs:** Temporary logs related to IP addresses are kept for a maximum of 24 hours to prevent DDoS attacks and automated abuse, after which they are permanently deleted.</li>
            </ul>

            <h3>3. Cookies and Advertising Standards</h3>
            <p>
                To keep our high-performance tools free for students and professionals worldwide, we utilize industry-standard advertising:
            </p>
            <ul>
                <li>**Google AdSense:** Imgverto uses Google AdSense to serve advertisements. Google utilizes cookies (such as the DART cookie) to serve ads based on your visit to this site and other websites across the Internet.</li>
                <li>**Data Control:** You can manage or opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>.</li>
            </ul>

            <h3>4. International Privacy Rights (GDPR, CCPA, LGPD)</h3>
            <p>
                Although Imgverto does not collect "Personal Data" as defined by many jurisdictions (we don't ask for names, emails, or phone numbers), we respect the spirit of global privacy laws:
            </p>
            <ul>
                <li>**Right to Access/Delete:** Since we do not store your files or create user profiles, there is no personal record for us to provide or delete upon request. Your data effectively "deletes itself" by being purged from memory after use.</li>
                <li>**No Sale of Data:** Imgverto has never, and will never, sell user data or file content to third parties, data brokers, or AI-training datasets.</li>
            </ul>

            <h3>5. Security & Encryption</h3>
            <p>
                Every byte transmitted to and from Imgverto is protected by **End-to-End SSL/TLS encryption**. This ensures that even during the short duration a file is in transit to our server, it is shielded from interception by unauthorized parties.
            </p>

            <h3>6. Updates to This Policy</h3>
            <p>
                We may periodically update this policy to reflect changes in our technology or legal requirements. We encourage users to check this page frequently to stay informed about how we are protecting their information.
            </p>

            <div className="mt-12 p-8 border-t-2 border-primary/10 bg-slate-50 rounded-[2rem] text-center">
                <p className="font-bold text-slate-900 mb-2">Have specific privacy concerns?</p>
                <p className="text-slate-600 text-sm mb-4">Our engineering team is available to discuss our data handling architecture.</p>
                <a href="/contact" className="text-primary font-bold hover:underline">Contact the Privacy Team →</a>
            </div>
        </Section>
    );
}
