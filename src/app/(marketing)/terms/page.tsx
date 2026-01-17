import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function TermsPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto">
            <ToolHeader
                title="Terms of Service"
                description="Please read these terms carefully before using Imgverto."
            />

            <h3>1. Acceptance of Terms</h3>
            <p>
                By accessing and using Imgverto, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3>2. Use License</h3>
            <p>
                Permission is granted to temporarily use the materials (software) on Imgverto&apos;s website for personal, non-commercial transitory viewing and file processing.
            </p>

            <h3>3. Disclaimer</h3>
            <p>
                The materials on Imgverto&apos;s website are provided &quot;as is&quot;. Imgverto makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
            <p>
                We are not liable for any data loss or corruption that may occur during the processing of your files, though we strive for 100% reliability.
            </p>

            <h3>4. Limitations</h3>
            <p>
                In no event shall Imgverto or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the tools on Imgverto&apos;s Internet site.
            </p>
        </Section>
    );
}
