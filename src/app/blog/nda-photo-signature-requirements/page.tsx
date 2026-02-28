import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, PenTool, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'NDA 2025 Photo & Signature Requirements | Format & Dimensions',
    description: 'Avoid NDA application rejection! Learn the exact UPSC NDA photo dimensions (350x350px - 1000x1000px), 20-300KB size limits, and date stamp rules.',
    alternates: {
        canonical: '/blog/nda-photo-signature-requirements',
    },
    openGraph: {
        title: 'NDA Photo & Signature Requirements (2025)',
        description: 'Complete guide to National Defence Academy photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/nda-photo-signature-requirements`,
        type: 'article',
    },
};

export default function NdaRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="NDA 2025 Photo & Signature Requirements | Format & Dimensions"
                description="Avoid NDA application rejection! Learn the exact UPSC NDA photo dimensions (350x350px - 1000x1000px), 20-300KB size limits, and date stamp rules."
                url="/blog/nda-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        NDA 2025 Photo & Signature Guidelines
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Because the National Defence Academy exam is conducted by the UPSC, the strict document upload rules apply here as well. Learn the required pixel resolutions to ensure your application passes.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        The National Defence Academy (NDA) examination is the gateway for young candidates to join the Indian Army, Navy, and Air Force. Because the exam is administered by the Union Public Service Commission (UPSC), the document upload portal shares the exact same rigorous screening process as the Civil Services Exam.
                    </p>
                    <p>
                        If your passport photo is blurry, has an incorrect aspect ratio, or lacks the mandatory date-stamp, your admit card will be withheld. Here are the exact requirements for the current admission cycle.
                    </p>

                    <h2>1. The Photograph Specifications (Crucial!)</h2>
                    <p>
                        The UPSC recently updated their rules to require explicit text printed upon the photograph. The photo must not be more than 10 days old from the date you submit your online application.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Photo Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB to 300 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> Strictly JPG or JPEG format.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution:</strong> Minimum 350x350 pixels, Maximum 1000x1000 pixels.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Mandatory Stamp:</strong> The candidate’s name and the date on which the photograph was taken must be clearly inscribed at the bottom.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Content Rules:</strong> 3/4th of the photograph must be covered by your face. No sunglasses or caps allowed.</li>
                        </ul>
                    </div>

                    <h2>2. The Signature Requirements</h2>
                    <p>
                        Your signature verifies your identity during the physical exams. Ensure you sign firmly with stark contrast so it translates well into a compressed digital image.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <PenTool className="text-emerald-600" /> Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB to 300 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPG or JPEG.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution:</strong> Exactly the same as the photo! Minimum 350x350 pixels, Maximum 1000x1000 pixels.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Ink:</strong> Must be signed on unlined white paper in running handwriting (No block letters).</li>
                        </ul>
                    </div>

                    <h2>3. Scanned PDF Identity Card</h2>
                    <p>
                        You must provide scanned proof of a Photo ID (Aadhar Card, Voter Card, PAN Card, Passport, Driving Licence, or a School/College Photo ID).
                    </p>
                    <ul>
                        <li><strong>Format:</strong> PDF Only (this cannot be a JPG).</li>
                        <li><strong>File Size:</strong> 20 KB to 300 KB.</li>
                    </ul>

                    <h2>The Challenge of 350x350 Pixels</h2>
                    <p>
                        The most common reason NDA candidates fail their document upload is because their photo is rectangular, but the UPSC portal demands a perfectly square pixel ratio (e.g., 350w by 350h, or 500w by 500h). If you upload a standard vertical passport photo into their system, it will drastically stretch your face horizontally to force it into their square box.
                    </p>
                    <p>
                        To fix this, you must crop your photo securely into a 1:1 aspect ratio *before* compressing it under the 300KB limit.
                    </p>

                    <h2>How to Quickly Resize Documents Free</h2>
                    <p>
                        At Imgverto, we built tools specifically to bypass these stressful technical hurdles. All of our cropping and compression algorithms run securely on your local device—so your private IDs are never sent to a background server.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Resize Image without Losing Quality</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Crop to Perfect Square
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress under 300KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
