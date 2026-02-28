import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'UPSC CSE 2025 Photo & Signature Requirements | Official Guidelines',
    description: 'Ensure your UPSC Civil Services application is accepted. Learn the strict photo dimensions (350x350 to 1000x1000 pixels), size limits, and date stamp rules.',
    alternates: {
        canonical: '/blog/upsc-cse-photo-signature-requirements',
    },
    openGraph: {
        title: 'UPSC CSE 2025 Photo & Signature Requirements',
        description: 'Complete guide to UPSC Civil Services photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/upsc-cse-photo-signature-requirements`,
        type: 'article',
    },
};

export default function UpscRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="UPSC CSE 2025 Photo & Signature Requirements | Official Guidelines"
                description="Ensure your UPSC Civil Services application is accepted. Learn the strict photo dimensions (350x350 to 1000x1000 pixels), size limits, and date stamp rules."
                url="/blog/upsc-cse-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        UPSC CSE 2025 Photo & Signature Guidelines
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        The Union Public Service Commission has some of the strictest document upload rules in India. Learn the exact pixel dimensions and metadata required to prevent application rejection.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Applying for the UPSC Civil Services Examination (CSE) is the first step toward India's most prestigious career path. However, every year, strong candidates face unnecessary anxiety when the One Time Registration (OTR) portal rejects their carefully scanned documents.
                    </p>
                    <p>
                        Unlike many standard exams that accept any passport photo under a certain file size, UPSC has very specific <em>pixel dimension</em> requirements and recent rules regarding embedded date stamps.
                    </p>

                    <h2>1. The Official UPSC Photograph Rules</h2>
                    <p>
                        Your photograph must be recent (not more than 10 days old from the start of the online application process). It must be a clear, color photograph taken against a plain white background.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Photo Specifications (Pixel Perfect)
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB (Minimum) to 300 KB (Maximum)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPG or JPEG strictly.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution (Min):</strong> 350 pixels (Width) x 350 pixels (Height)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution (Max):</strong> 1000 pixels (Width) x 1000 pixels (Height)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>New Crucial Rule:</strong> The name of the candidate and the date on which the photograph was taken MUST be printed clearly at the bottom of the photo.</li>
                        </ul>
                    </div>
                    <p>
                        <strong>Aspect Ratio Note:</strong> Because the minimum and maximum dimensions are perfectly square (e.g., 350x350 or 1000x1000), you must ensure your photo is cropped to a 1:1 square aspect ratio before uploading, otherwise it will distort violently.
                    </p>

                    <h2>2. The Signature Upload Requirements</h2>
                    <p>
                        Your signature must be done on clean white paper with a Black Ink pen. Much like the photograph, the OTR portal expects a specific pixel range for the signature image.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="text-emerald-600" /> Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB (Minimum) to 300 KB (Maximum)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPG or JPEG.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution (Min):</strong> 350 pixels (Width) x 350 pixels (Height)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixel Resolution (Max):</strong> 1000 pixels (Width) x 1000 pixels (Height)</li>
                        </ul>
                    </div>

                    <h2>3. Photo ID Proof (Aadhar, PAN, etc.)</h2>
                    <p>
                        UPSC is one of the few exams that requires you to upload a scanned copy of your Photo ID proof (like an Aadhar Card, Voter ID, PAN Card, or Passport) in <strong>PDF format</strong> instead of an image format.
                    </p>
                    <ul>
                        <li><strong>Format:</strong> PDF Only (Cannot be JPG/PNG)</li>
                        <li><strong>File Size Limit:</strong> 20 KB to 300 KB</li>
                        <li><strong>Content:</strong> Should be a merged PDF containing both sides of the ID card if applicable (like Voter ID or Aadhar).</li>
                    </ul>

                    <h2>How to Easily Prepare UPSC Documents</h2>
                    <p>
                        Getting a photo to be exactly 350x350 pixels while somehow also staying under 300KB can be incredibly frustrating if you aren't familiar with Photoshop. If you use a simple resize tool, it might stretch your face.
                    </p>
                    <p>
                        Imgverto provides a suite of completely free, client-side tools designed for exact pixel manipulation. Your data never leaves your browser, ensuring your ID proofs remain 100% private.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Convert & Resize in Seconds</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Crop to perfect 1:1 Square
                        </Link>
                        <Link
                            href="/image-to-pdf"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <FileText className="w-5 h-5" /> Convert ID to PDF
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
