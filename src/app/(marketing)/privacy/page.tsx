import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function PrivacyPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto pb-20">
            <ToolHeader
                title="Privacy Policy"
                description="Last Updated: February 3, 2026"
            />

            <section>
                <p className="lead">
                    At **Imgverto**, we take your digital privacy seriously. This policy explains how we handle your data when you use our image and document processing tools. Our core philosophy is simple: your data belongs to you, and we have no interest in keeping it.
                </p>
            </section>

            <h3>1. Data Processing Philosophy</h3>
            <p>
                Unlike traditional "cloud" services, Imgverto is designed to be a processing station, not a storage facility.
                <strong>We do not engage in permanent storage of user-uploaded files</strong> for any of our conversion or editing tools.
            </p>
            <ul>
                <li>**Temporary Handling:** Files are processed in secure, temporary memory environments.</li>
                <li>**Automatic Deletion:** All processed files and their source materials are purged immediately after the session or within a maximum of 60 minutes for server-side tasks.</li>
                <li>**No Mining:** We do not read, analyze, or mine your content for any purpose.</li>
            </ul>

            <h3>2. Local Browser-Based Processing</h3>
            <p>
                A significant portion of our tools utilize **client-side technology** (such as WebAssembly and JavaScript). This means the processing happens directly on your computer's CPU and RAM. In these specific cases, your files never leave your device and are never even transmitted to our infrastructure.
            </p>

            <h3>3. Cookies and Advertising</h3>
            <p>
                To keep Imgverto 100% free and accessible to everyone, we partner with third-party service providers:
            </p>
            <ul>
                <li>**Google AdSense:** We use Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads based on your visit to this site and other sites on the Internet.</li>
                <li>**Google Analytics:** We use anonymous analytics to understand how users interact with our site, which helps us improve our tools and performance.</li>
            </ul>
            <p>
                Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a> page.
            </p>

            <h3>4. Third-Party Links</h3>
            <p>
                Our website may contain links to other websites. Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.
            </p>

            <h3>5. User Rights (GDPR & CCPA)</h3>
            <p>
                Because we do not collect personal identifiers (email, name, or phone) or store your documents, we do not maintain a database of personal information that could be "deleted" upon request. You remain anonymous throughout your entire session on Imgverto. If you believe any anonymous data has been captured erroneously, please contact us.
            </p>

            <h3>6. Contact Information</h3>
            <p>
                Should you have any questions or concerns regarding this Privacy Policy or our data handling practices, please reach out to us via our <a href="/contact">Contact Page</a> or directly at **imgverto.contact@gmail.com**.
            </p>
        </Section>
    );
}
