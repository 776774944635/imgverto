import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function PrivacyPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto">
            <ToolHeader
                title="Privacy Policy"
                description="Last Updated: January 14, 2026"
            />

            <h3>1. Data Processing & Security</h3>
            <p>
                At Imgverto, your privacy is paramount. Unlike other services,
                <strong>we do not engage in permanent cloud storage of your user-uploaded files</strong> for our processing tools.
            </p>
            <ul>
                <li>Files are processed in temporary memory or secure temporary storage.</li>
                <li>Files are automatically deleted immediately after processing or within 1 hour max.</li>
                <li>We do not mine, sell, or view your content.</li>
            </ul>

            <h3>2. Local Processing</h3>
            <p>
                Some of our tools (where technically feasible) run entirely in your browser using WebAssembly.
                In these cases, your files never leave your device.
            </p>

            <h3>3. Cookies & Analytics</h3>
            <p>
                We use Google Analytics and Google AdSense to improve our service and provide free access.
                These third-party vendors may use cookies to serve ads based on your prior visits to our website.
            </p>
            <p>
                You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>.
            </p>

            <h3>4. Contact</h3>
            <p>
                If you have questions about this policy, please contact us via our Contact page.
            </p>
        </Section>
    );
}
