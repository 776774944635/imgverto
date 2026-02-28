import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Board Exams 2025: CBSE, ICSE, NIOS Photo & Signature Requirements',
    description: 'Guidelines for CBSE, ICSE, and NIOS board exam registrations. Learn the exact photo sizes (10KB-50KB) and signature rules for Class 10th and 12th students.',
    alternates: {
        canonical: '/blog/board-exams-photo-signature-requirements',
    },
    openGraph: {
        title: 'Board Exam Registration: Photo & Signature Requirements (2025)',
        description: 'Complete guide to CBSE, ICSE, and NIOS registration document rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/board-exams-photo-signature-requirements`,
        type: 'article',
    },
};

export default function BoardExamsRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="Board Exams 2025: CBSE, ICSE, NIOS Photo & Signature Requirements"
                description="Guidelines for CBSE, ICSE, and NIOS board exam registrations. Learn the exact photo sizes (10KB-50KB) and signature rules for Class 10th and 12th students."
                url="/blog/board-exams-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <GraduationCap className="w-4 h-4" /> Board Exams
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Board Exam Photo & Signature Guidelines (2025)
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Class 10th and 12th students! Don&apos;t let a technical error in your registration form delay your hall ticket. Learn the exact rules for CBSE, ICSE, and NIOS.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        The board exam registration process is a crucial milestone for every student. Whether you are in <strong>CBSE, ICSE, NIOS, or a State Board</strong>, the digital photograph you upload today will appear on your marksheet and hall ticket for years to come.
                    </p>
                    <p>
                        Board servers are often overloaded during the registration window, and an oversized image is the number one reason for <strong>&quot;Server Timeout&quot;</strong> errors. Here is how to format your files correctly.
                    </p>

                    <h2>1. CBSE Class 10 & 12 Requirements</h2>
                    <p>
                        The Central Board of Secondary Education (CBSE) requires a color photograph taken against a light-colored background.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> CBSE Photo Specs
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimension:</strong> 3.5 cm x 4.5 cm.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 10 KB to 40 KB.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Feature:</strong> Face should cover at least 70% of the photo. No caps or sunglasses.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Recommendation:</strong> Use a recent photo showing your natural school appearance.</li>
                        </ul>
                    </div>

                    <h2>2. NIOS (Open Schooling) Requirements</h2>
                    <p>
                        The National Institute of Open Schooling is famous for its online-only portal. Since there is no physical paper involved, the digital signature must be very clear.
                    </p>
                    <ul>
                        <li><strong>Photo size:</strong> 20 KB to 50 KB.</li>
                        <li><strong>Signature size:</strong> 10 KB to 20 KB.</li>
                        <li><strong>Identity Proof:</strong> Must be uploaded as a PDF or JPG under 200 KB.</li>
                    </ul>

                    <h2>3. ICSE/ISC Requirements</h2>
                    <p>
                        The CISCE board typically requires the school to handle uploads, but students must provide high-quality scans.
                    </p>
                    <ul>
                        <li><strong>Photo Background:</strong> Plain white or light blue.</li>
                        <li><strong>File Format:</strong> Strictly JPG/JPEG.</li>
                        <li><strong>Resolution:</strong> 300 DPI is recommended for printing on hall tickets.</li>
                    </ul>

                    <h2>The &quot;Small File&quot; Challenge</h2>
                    <p>
                        Many students find that when they compress a photo down to 40KB, their face becomes blurry.
                    </p>
                    <p>
                        Imgverto&apos;s <Link href="/compress-image">Image Compressor</Link> uses advanced algorithms that prioritize facial details even at low file sizes. This ensures your CBSE or NIOS photo meets the size limit while staying sharp enough for your official marksheet.
                    </p>

                    <h2>How to Resize for Boards on Your Phone</h2>
                    <p>
                        You can take a photo with your phone camera, use Imgverto&apos;s <Link href="/resize-image">Resize Image tool</Link> to crop it to 3.5cm x 4.5cm, and then use the <Link href="/compress-image">Compress tool</Link> to bring it under 40KB. All of this is free and happens right on your device for total privacy.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Resize Photos for Board Exams</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/resize-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Crop to 3.5x4.5cm
                        </Link>
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Compress under 40KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
