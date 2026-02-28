import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, PenTool, Check, AlertCircle, Fingerprint } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'IBPS & SBI Banking Exam Photo, Signature, and Left Thumb Requirements 2025',
    description: 'Master the IBPS and SBI document uploads: 4.5cm x 3.5cm photo (20-50KB), Left Thumb Impression (20-50KB), and handwritten declaration rules.',
    alternates: {
        canonical: '/blog/ibps-sbi-banking-photo-signature-requirements',
    },
    openGraph: {
        title: 'IBPS & SBI Banking Exam Document Requirements (2025)',
        description: 'Complete guide to Banking Exam photo rules, thumb impressions, and handwritten declarations.',
        url: `${siteConfig.url}/blog/ibps-sbi-banking-photo-signature-requirements`,
        type: 'article',
    },
};

export default function BankingRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="IBPS & SBI Banking Exam Photo, Signature, and Left Thumb Requirements 2025"
                description="Master the IBPS and SBI document uploads: 4.5cm x 3.5cm photo (20-50KB), Left Thumb Impression (20-50KB), and handwritten declaration rules."
                url="/blog/ibps-sbi-banking-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        IBPS & SBI Document Requirements 2025
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Banking exams in India have some of the most uniquely demanding document upload processes, requiring four distinct files including a handwritten declaration. Learn exactly how to format them.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Applying for jobs in the Indian Banking sector (via IBPS PO, IBPS Clerk, SBI PO, or SBI Clerk) requires much more than just a passport photo.
                    </p>
                    <p>
                        The Institute of Banking Personnel Selection (IBPS) portal specifically demands a Photograph, a Signature, a Left Thumb Impression (LTI), and a highly specific Handwritten Declaration. Each has its own strict dimension and file size limits. A mistake in any of the four will halt your application.
                    </p>

                    <h2>1. The Photograph Specifications</h2>
                    <p>
                        Your photograph must be a recent passport-style color picture taken against a light-colored, preferably white, background.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Photo Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB to 50 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPEG or JPG only.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 4.5 cm (height) x 3.5 cm (width)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixels:</strong> 200 x 230 pixels (preferred)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Lighting:</strong> Make sure there is no "red-eye" flash reflection if you wear glasses. No dark glasses allowed.</li>
                        </ul>
                    </div>

                    <h2>2. The Signature Requirements</h2>
                    <p>
                        Your signature will be closely verified against your actual handwriting at the test center and interview stages.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <PenTool className="text-emerald-600" /> Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 10 KB to 20 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPEG or JPG.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixels:</strong> 140 x 60 pixels (preferred)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Crucial Rule:</strong> The signature MUST be with Black Ink on white paper. Signatures in capital letters will NOT be accepted.</li>
                        </ul>
                    </div>

                    <h2>3. Left Thumb Impression (LTI)</h2>
                    <p>
                        The Left Thumb Impression proves your biometric identity. If a candidate does not have a left thumb, they may use their right thumb.
                    </p>
                    <div className="my-8 p-6 bg-amber-50 border border-amber-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Fingerprint className="text-amber-600" /> Left Thumb Impression Specs
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> 20 KB to 50 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Pixels:</strong> 240 x 240 pixels in 200 DPI (3 cm x 3 cm square)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Ink color:</strong> Can be Black or Blue ink on white paper. Ensure the ridges of the fingerprint are clear, not smudged into a solid blob.</li>
                        </ul>
                    </div>

                    <h2>4. The Handwritten Declaration</h2>
                    <p>
                        This is the most time-consuming piece. You must write the exact paragraph provided in the official notification on a clean white piece of paper.
                    </p>
                    <ul>
                        <li><strong>File Size Limit:</strong> 50 KB to 100 KB (Note: this is larger than the signature).</li>
                        <li><strong>Pixels:</strong> 800 x 400 pixels in 200 DPI (10 cm x 5 cm).</li>
                        <li><strong>Ink:</strong> ONLY Black ink is allowed.</li>
                        <li><strong>Rule:</strong> It MUST NOT be written in all block capital letters.</li>
                    </ul>

                    <h2>Need help resizing four different files?</h2>
                    <p>
                        Managing four different file constraints (20KB max for signature, 50KB max for photo/thumb, 100KB max for declaration) using generic tools is chaotic and slow.
                    </p>
                    <p>
                        Imgverto allows you to instantly crop your scans to the exact prescribed pixel dimensions (like 240x240 for the thumb impression) and visually compress them down to the exact Kilobyte limit required by IBPS servers, all in one sitting right from your browser.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Format IBPS/SBI Documents Now</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Crop to Exact Pixels
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress to 20KB or 50KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
