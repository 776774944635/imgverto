import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'RRB NTPC & Group D 2025 Photo & Signature Requirements | Complete Guide',
    description: 'Avoid RRB application rejection! Get the exact photo dimensions (35mm x 45mm), 30KB-70KB size limits, and signature rules for Railway Recruitment Board exams.',
    alternates: {
        canonical: '/blog/rrb-ntpc-group-d-photo-signature-requirements',
    },
    openGraph: {
        title: 'RRB NTPC & Group D Photo & Signature Requirements (2025)',
        description: 'Complete guide to Railway Recruitment Board (RRB) photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/rrb-ntpc-group-d-photo-signature-requirements`,
        type: 'article',
    },
};

export default function RrbRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="RRB NTPC & Group D 2025 Photo & Signature Requirements | Complete Guide"
                description="Avoid RRB application rejection! Get the exact photo dimensions (35mm x 45mm), 30KB-70KB size limits, and signature rules for Railway Recruitment Board exams."
                url="/blog/rrb-ntpc-group-d-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        RRB NTPC & Group D 2025 Photo & Signature Guidelines
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Applying for the Indian Railways? The RRB has uniquely high minimum size limits (30KB) that often catch candidates off guard. Learn how to format your files correctly.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        The Railway Recruitment Board (RRB) manages some of the largest recruitment drives in the world. Whether you are applying for Non-Technical Popular Categories (NTPC), Group D, or ALP, the document upload portal is the first hurdle you must clear.
                    </p>
                    <p>
                        Unlike many other Indian exams that allow files as small as 10KB, the RRB often demands a <strong>minimum of 20KB to 30KB</strong> for both photographs and signatures. If your file is too small or too compressed, the system will reject it.
                    </p>

                    <h2>1. The Photograph Specifications</h2>
                    <p>
                        Your photograph must be a recent, high-quality color passport photo taken against a plain white background.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Photo Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 20 KB (Min) to 70 KB (Max)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPEG/JPG only.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 3.5 cm (width) x 4.5 cm (height)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Important:</strong> The name of the candidate and the date on which the photograph was taken must be printed clearly on the photo.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Features:</strong> No spectacles, caps, or headwear (except religious headgear with visible face).</li>
                        </ul>
                    </div>

                    <h2>2. The Signature Requirements</h2>
                    <p>
                        The signature must be done on white paper within a specified box. Using disjointed letters or all capital letters for the signature will lead to rejection.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="text-emerald-600" /> Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 10 KB to 30 KB (Note: Check latest bulletin as some RRB regions require up to 70KB).</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 50mm x 20mm (preferred resolution).</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Ink:</strong> Must be signed in running handwriting on white paper.</li>
                        </ul>
                    </div>

                    <h2>3. SC/ST Certificate (If applicable)</h2>
                    <p>
                        If you are applying for a free travel pass, you must upload your community certificate.
                    </p>
                    <ul>
                        <li><strong>Format:</strong> JPEG/JPG only (Warning: RRB often does not use PDF for certificates in the initial phase).</li>
                        <li><strong>File Size:</strong> 50 KB to 100 KB.</li>
                    </ul>

                    <h2>How to Handle the 30KB Minimum Size</h2>
                    <p>
                        Most compression tools try to make the file as small as possible. If your signature scan is 15KB, the RRB system might reject it for being "Too Low Quality."
                    </p>
                    <p>
                        At Imgverto, our <Link href="/compress-image">Image Compressor</Link> allows you to target a <em>specific</em> range. You can adjust the quality slider to ensure your file stays safely between 30KB and 70KB, maintaining maximum clarity for the RRB verification officers.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Prepare RRB Documents Professionally</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Resize to 3.5x4.5cm
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress to 30KB-70KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
