import { ToolHeader } from "@/components/tools/ToolHeader";
import { Section } from "@/components/shared/Section";

export default function TermsPage() {
    return (
        <Section className="prose dark:prose-invert max-w-4xl mx-auto">
            <ToolHeader
                title="Terms of Service"
                description="Please read these terms carefully before using Imgverto."
            />

            <h3>1. Acceptance and Scope</h3>
            <p>
                By accessing Imgverto, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h3>2. Grant of License</h3>
            <p>
                Imgverto grants you a personal, non-exclusive, non-transferable, limited license to use our web-based tools for processing files. This is the grant of a license, not a transfer of title, and under this license, you may not:
            </p>
            <ul>
                <li>Attempt to decompile or reverse engineer any software contained on Imgverto.</li>
                <li>Use the tools for any illegal purpose or to process copyrighted material without authorization.</li>
                <li>Use any automated system (bots, crawlers) to access the site in a manner that sends more request messages to our servers than a human can reasonably produce in the same period.</li>
            </ul>

            <h3>3. Disclaimer of Warranty</h3>
            <p>
                The materials and tools on Imgverto are provided on an &apos;as is&apos; basis. Imgverto makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p>
                In no event shall Imgverto or its developers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on Imgverto, even if an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h3>5. Accuracy of Materials</h3>
            <p>
                The materials appearing on Imgverto could include technical, typographical, or photographic errors. Imgverto does not warrant that any of the materials on its website are accurate, complete or current. Imgverto may make changes to the materials contained on its website at any time without notice.
            </p>

            <h3>6. Governing Law</h3>
            <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
        </Section>
    );
}
