import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'State PSC Exams: Photo & Signature Requirements (UPPSC, BPSC, MPSC, KPSC) 2025',
    description: 'Guidelines for State Public Service Commission exams: UPPSC, BPSC, MPSC, KPSC, RAS. Exact photo dimensions (3.5x4.5cm), size limits (20-50KB), and background rules.',
    alternates: {
        canonical: '/blog/state-psc-photo-signature-requirements',
    },
    openGraph: {
        title: 'State PSC Exam Photo & Signature Requirements (2025)',
        description: 'Complete guide to State PSC (UPPSC, BPSC, MPSC, KPSC) photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/state-psc-photo-signature-requirements`,
        type: 'article',
    },
};

export default function StatePscRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="State PSC Exams: Photo & Signature Requirements (UPPSC, BPSC, MPSC, KPSC) 2025"
                description="Guidelines for State Public Service Commission exams: UPPSC, BPSC, MPSC, KPSC, RAS. Exact photo dimensions (3.5x4.5cm), size limits (20-50KB), and background rules."
                url="/blog/state-psc-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
                        <MapPin className="w-4 h-4" /> State Exams
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        State PSC Photo & Signature Rules (2025)
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Applying for UPPSC, BPSC, MPSC, or KPSC? Every state has slightly different upload rules. Learn the standard dimensions to avoid rejection.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        State Public Service Commissions (PSCs) conduct the most competitive exams at the state level. Whether you are aiming for PCS in Uttar Pradesh (UPPSC), Bihar (BPSC), Maharashtra (MPSC), Karnataka (KPSC), or Rajasthan (RAS), the technical requirements for the application form are often the silent reason many candidates fail to get an admit card.
                    </p>
                    <p>
                        Some states require <strong>square</strong> photos, while others demand specific <strong>centimeter</strong> heights with very small file sizes (under 50KB). Here is the consolidated guide.
                    </p>

                    <h2>1. Common Dimensions for State PSC Photos</h2>
                    <p>
                        While each commission has its own portal, most follow these standardized parameters:
                    </p>

                    <div className="my-8 p-6 bg-orange-50 border border-orange-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-orange-600" /> Standard Photo Specs
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimension:</strong> 3.5 cm x 4.5 cm (Standard) or 350x350 pixels (Square).</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 20 KB to 50 KB (Most common limit).</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Background:</strong> Light background, usually plain white.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>UPPSC Note:</strong> Requires the candidate&apos;s name and date of the photo to be printed clearly at the bottom.</li>
                        </ul>
                    </div>

                    <h2>2. Signature Guidelines</h2>
                    <p>
                        State portals are very particular about the ink and clarity of your signature image.
                    </p>
                    <ul>
                        <li><strong>Ink Required:</strong> Black Ink is preferred by 90% of state commissions.</li>
                        <li><strong>Signature Box:</strong> Scanned signature must fit within a 3.5cm x 1.5cm or 4cm x 2cm area.</li>
                        <li><strong>File Size:</strong> Strictly 10 KB to 20 KB.</li>
                    </ul>

                    <h2>3. Regional Variations to Watch Out For</h2>
                    <p>
                        <strong>MPSC (Maharashtra):</strong> Often requires documents to be compressed to exactly under 50KB with a very specific horizontal resolution.
                    </p>
                    <p>
                        <strong>BPSC (Bihar):</strong> Bihar exams sometimes require a live photo capture or very high-resolution scans for identity proofs.
                    </p>
                    <p>
                        <strong>KPSC (Karnataka):</strong> Famous for demanding high-quality thumb impressions (Left Thumb) alongside the standard photo and signature.
                    </p>

                    <h2>The Challenge of 20KB Signatures</h2>
                    <p>
                        Getting a signature scan to be under 20KB without it looking like a blurry smudge is difficult. If you use a normal &quot;shrink&quot; tool, it often removes so much detail that the commission will reject it as &quot;Unreadable.&quot;
                    </p>
                    <p>
                        Imgverto&apos;s <Link href="/compress-image">Image Compressor</Link> allows you to visually optimize your signature. You can see the result while you slide the quality bar, ensuring your signature remains sharp and black while hitting that 20KB target perfectly.
                    </p>

                    <h2>How to Use Imgverto for State PSC</h2>
                    <p>
                        Don&apos;t waste money at a cyber cafe. You can crop your photo to the exact 3.5cm x 4.5cm dimensions and compress it for UPPSC or any other state exam right from your smartphone.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Start State Exam Preparation</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Crop to 3.5x4.5cm
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress under 50KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
