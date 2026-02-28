import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, PenTool, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'NEET UG 2025 Photo & Signature Requirements | Complete Guide | Imgverto',
    description: 'Avoid NEET application rejection! Get the exact dimensions, size limits (10KB-200KB), and format rules for NEET UG passport photos, postcards, and signatures.',
    alternates: {
        canonical: '/blog/neet-ug-photo-signature-requirements',
    },
    openGraph: {
        title: 'NEET UG 2025 Photo & Signature Requirements',
        description: 'Complete guide to NTA NEET photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/neet-ug-photo-signature-requirements`,
        type: 'article',
    },
};

export default function NeetRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="NEET UG 2025 Photo & Signature Requirements | Complete Guide"
                description="Avoid NEET application rejection! Get the exact dimensions, size limits (10KB-200KB), and format rules for NEET UG passport photos, postcards, and signatures."
                url="/blog/neet-ug-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        NEET UG 2025 Photo & Signature Requirements
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        A single mistake in your uploaded documents can result in NTA rejecting your application. Discover the exact official guidelines for photos, signatures, and thumb impressions.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Applying for the National Eligibility cum Entrance Test (NEET UG) is stressful enough without having to worry about your photo getting rejected by the NTA system. Every year, thousands of students scramble to fix "Invalid Image Size" or "Incorrect Aspect Ratio" errors at the last minute.
                    </p>
                    <p>
                        In this comprehensive guide, we break down the definitive, official NTA requirements for your NEET UG 2025 application documents.
                    </p>

                    <h2>1. The Passport Size Photograph</h2>
                    <p>
                        Your primary photograph is the most heavily scrutinized document. It must be a recent color photograph with a stark white background. Avoid selfies, Polaroid shots, or blurry web-cam pictures.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Official Photo Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Size:</strong> 10 KB to 200 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPG or JPEG only</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 3.5 cm (width) x 4.5 cm (height)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Coverage:</strong> 80% face coverage with visible ears.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Critical Note:</strong> The candidate's name and the date taking the photograph must be printed at the bottom.</li>
                        </ul>
                    </div>

                    <h2>2. The Postcard Size Photograph</h2>
                    <p>
                        In addition to the standard passport photo, NTA specifically requires a larger "Postcard Size" photograph to be used during the counselling and examination center verification process.
                    </p>
                    <ul>
                        <li><strong>Required Dimensions:</strong> 4 inches x 6 inches (Postcard)</li>
                        <li><strong>File Size Limit:</strong> 10 KB to 200 KB</li>
                        <li><strong>Background:</strong> White</li>
                    </ul>

                    <h2>3. Signature Specifications</h2>
                    <p>
                        Your signature acts as your biometric verification. A blurry, unreadable, or improperly cropped signature will lead to outright rejection of your admit card.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <PenTool className="text-emerald-600" /> Official Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Size:</strong> 4 KB to 30 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPG or JPEG</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Ink:</strong> Must be signed with a Black Ink pen on white paper.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Critical Note:</strong> Signatures in FULL CAPITAL LETTERS will not be accepted. It must be in running handwriting.</li>
                        </ul>
                    </div>

                    <h2>4. Left and Right Hand Fingers and Thumb Impressions</h2>
                    <p>
                        NTA requires clear impressions of all your fingers and thumbs on a single sheet of white paper.
                    </p>
                    <ul>
                        <li><strong>File Size Limit:</strong> 10 KB to 200 KB</li>
                        <li><strong>Ink Required:</strong> Blue Ink</li>
                    </ul>

                    <h2>Need to Resize Your Photos Now?</h2>
                    <p>
                        Manually cropping your photo to 3.5x4.5cm and artificially compressing it under 200KB while maintaining quality can be a nightmare in standard tools like Paint.
                    </p>
                    <p>
                        At Imgverto, we built automated tools that handle the heavy lifting for you directly in your browser without sacrificing your privacy. You don't need to sign up or pay to ensure your photos meet NTA standards!
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Prepare Your Documents with Imgverto</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Resize Photo Now
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress to 200KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
