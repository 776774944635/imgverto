export const metadata = {
    title: "SSC Photo and Signature Size Requirements 2024: Official Upload Guide",
    description: "Master the SSC photo and signature resize guidelines for CGL, CHSL, and MTS. Get the exact KB limits and resolution for SSC portals.",
    keywords: ["ssc photo size resize", "ssc chsl signature size", "ssc cgl photo requirements 2024", "ssc mts photo upload", "resize image for ssc"]
};

import { Section } from "@/components/shared/Section";

export default function SscPhotoGuide() {
    return (
        <Section className="py-20 max-w-4xl mx-auto prose prose-slate lg:prose-lg prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-ul:text-slate-600">
            <h1>SSC Photo and Signature Size Requirements 2024: The Ultimate Upload Guide</h1>

            <p>
                The Staff Selection Commission (SSC) conducts various exams like CGL, CHSL, MTS, and GD Constables. Thousands of candidates every year face rejection not because of their marks, but because of incorrect <strong>SSC photo and signature uploads</strong>.
            </p>

            <p>
                SSC has strict rules about the dimensions, clarity, and &quot;liveness&quot; of portraits. In this guide, we will break down the latest requirements and show you how to use Imgverto to prepare your files perfectly.
            </p>

            <h2>SSC Latest Photo Guidelines for 2024-25</h2>
            <p>
                The SSC has recently introduced a &quot;Live Photo&quot; requirement for some applications, but for others, you still need to upload a scanned copy. Here are the specs:
            </p>

            <h3>1. Passport Photograph Requirements</h3>
            <ul>
                <li><strong>Dimensions:</strong> 3.5 cm (width) x 4.5 cm (height)</li>
                <li><strong>File Size:</strong> 20 KB to 50 KB</li>
                <li><strong>Format:</strong> JPEG/JPG</li>
                <li><strong>Background:</strong> Light background, preferably white.</li>
                <li><strong>Recency:</strong> Not more than 3 months old from the date of advertisement.</li>
            </ul>

            <h3>2. Signature Requirements</h3>
            <ul>
                <li><strong>Dimensions:</strong> 4.0 cm (width) x 2.0 cm (height)</li>
                <li><strong>File Size:</strong> 10 KB to 20 KB</li>
                <li><strong>Format:</strong> JPEG/JPG</li>
                <li><strong>Ink:</strong> Blue or Black ink on white paper.</li>
            </ul>

            <h2>How to Prepare Your SSC Files on Imgverto</h2>

            <h3>Step 1: Resize to Exact CM Dimensions</h3>
            <p>
                SSC portals are sensitive to aspect ratio. Go to our <a href="/resize-image">Image Resizer</a> and enter the dimensions in centimeters. For the signature, ensure you don&apos;t crop it too tightly—leave a small white margin around the name.
            </p>

            <h3>Step 2: Compress to the Narrow KB Range</h3>
            <p>
                The 20KB-50KB range for photos is quite narrow. Use our <a href="/compress-image">Image Compressor</a> to target exactly 35KB. For the signature, target 15KB. This ensures the file is accepted by the SSC portal instantly.
            </p>

            <h3>Step 3: Enhance Clarity with Upscaling</h3>
            <p>
                If your signature looks blurry after resizing, use our <a href="/image-upscaler">Image Upscaler</a> to sharpen the pencil or ink lines before compressing. A sharp signature is rarely rejected.
            </p>

            <h2>Major Reasons for SSC Application Rejection</h2>
            <ul>
                <li><strong>Caps and Spectacles:</strong> Photos with hats, caps, or dark glasses will be rejected immediately.</li>
                <li><strong>Frontal View:</strong> Ensure both ears are visible and you are looking directly at the camera.</li>
                <li><strong>Blurry Signatures:</strong> If the signature is not legible, the SSC might cancel your candidature even after the exam.</li>
            </ul>

            <h2>Why candidates use Imgverto</h2>
            <p>
                Imgverto is designed for the Indian user. We understand the specific limits of government portals like SSC and UPSC. Our tools are optimized for mobile browsers, so you can do all your resizing while sitting at an internet cafe or from your own smartphone.
            </p>

            <h2>SSC Upload FAQs</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8">
                <div className="mb-6">
                    <strong>1. Can I use a signature in capital letters?</strong>
                    <p className="mt-2">No. SSC strictly prohibits signatures in CAPITAL LETTERS. Use your normal flowing handwriting.</p>
                </div>
                <div className="mb-6">
                    <strong>2. My photo is 60KB, can I still upload it?</strong>
                    <p className="mt-2">No, the portal has a hard limit of 50KB. Use Imgverto to bring it down to 45KB.</p>
                </div>
                <div>
                    <strong>3. Do I need to upload a date on the photo?</strong>
                    <p className="mt-2">As per the latest SSC guidelines, the date of taking the photograph is usually not required *on* the photo, but the photo must be recent.</p>
                </div>
            </div>
        </Section>
    );
}
