import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'SSC CGL 2025 Photo & Signature Requirements | Format & Dimensions',
    description: 'Avoid SSC CGL application form rejection. Learn the exact 3.5cm x 4.5cm photo dimensions, 20-50KB file size limits, and signature guidelines.',
    alternates: {
        canonical: '/blog/ssc-cgl-photo-signature-requirements',
    },
    openGraph: {
        title: 'SSC CGL Photo & Signature Requirements (2025)',
        description: 'Complete guide to Staff Selection Commission photo rules, sizes, and formats.',
        url: `${siteConfig.url}/blog/ssc-cgl-photo-signature-requirements`,
        type: 'article',
    },
};

export default function SscCglRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="SSC CGL 2025 Photo & Signature Requirements | Format & Dimensions"
                description="Avoid SSC CGL application form rejection. Learn the exact 3.5cm x 4.5cm photo dimensions, 20-50KB file size limits, and signature guidelines."
                url="/blog/ssc-cgl-photo-signature-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Exam Preparation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        SSC CGL 2025 Photo & Signature Requirements
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        The Staff Selection Commission is notorious for rejecting applications due to blurry photos or spectacles. Learn the exact dimensions and rules to secure your application.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Every year, thousands of candidates studying for the Staff Selection Commission - Combined Graduate Level (SSC CGL) exam have their applications rejected simply because they uploaded a selfie or wore glasses in their passport photo.
                    </p>
                    <p>
                        The SSC guidelines are incredibly strict regarding facial visibility, file size (under 50KB), and image dimensions. Here is the definitive guide to getting your documents accepted on the first try.
                    </p>

                    <h2>1. The Strict SSC Photograph Rules</h2>
                    <p>
                        Your photograph must be a recent, professional-grade passport color photo. It must be taken against a plain, light-colored (preferably white) background.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> Photo Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 20 KB to 50 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPEG or JPG only.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 3.5 cm (width) x 4.5 cm (height)</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Crucial Rule 1:</strong> NO Spectacles or Sunglasses. Even if you wear prescription glasses daily, you must remove them for the photo.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Crucial Rule 2:</strong> NO Caps, Hats, or dark backgrounds. Both ears must be clearly visible.</li>
                        </ul>
                    </div>
                    <p>
                        <strong>Note on "Date Printed":</strong> While some exams require the date of the photo to be printed on the image, the SSC recently removed this strict requirement for CGL. However, the photo MUST not be older than 3 months from the application date.
                    </p>

                    <h2>2. The Signature Requirements</h2>
                    <p>
                        Your signature is used for biometric verification at the exam center. If it is blurry, or if the background of the signature image is dark, your admit card will not be issued.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="text-emerald-600" /> Signature Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size:</strong> 10 KB to 20 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Format:</strong> JPEG or JPG.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Dimensions:</strong> 4.0 cm (width) x 2.0 cm (height)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Ink:</strong> Must be signed on white paper with a Black or Blue ink pen.</li>
                        </ul>
                    </div>
                    <p>
                        <strong>Pro Tip:</strong> Do not just take a photo of your signature from far away and upload it. You must crop the image tightly around the signature itself so that it fills the 4.0cm x 2.0cm aspect ratio.
                    </p>

                    <h2>How to Resize Your Photos for SSC CGL</h2>
                    <p>
                        Compressing an image down to exactly 50KB while ensuring the dimensions are perfectly 3.5cm wide and 4.5cm high is incredibly difficult with basic phone tools. Using random compression websites might ruin the quality of your face, leading to rejection.
                    </p>
                    <p>
                        Imgverto offers a secure, zero-upload tool suite specifically designed to handle these exact Government Exam parameters. Since processing happens entirely in your browser, your personal identification photos remain completely private.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Resize Image without Losing Quality</h3>
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
                            <ArrowRight className="w-5 h-5" /> Compress to 50KB
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
