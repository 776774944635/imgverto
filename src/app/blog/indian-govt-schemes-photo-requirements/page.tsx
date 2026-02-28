import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Indian Govt Schemes: Ayushman/PAN Card Photo & Document Requirements',
    description: 'Learn the exact photo sizes (20-50KB) and PDF document specs (up to 300KB) required for successful Ayushman Bharat, PAN Card, and PM KISAN applications.',
    alternates: {
        canonical: '/blog/indian-govt-schemes-photo-requirements',
    },
    openGraph: {
        title: 'Indian Govt Schemes: Document Upload Requirements',
        description: 'Guide to photo and PDF dimensions for Ayushman Bharat, PAN, and other major Indian government scheme applications.',
        url: `${siteConfig.url}/blog/indian-govt-schemes-photo-requirements`,
        type: 'article',
    },
};

export default function GovtSchemesRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="Indian Govt Schemes: Ayushman/PAN Card Photo & Document Requirements"
                description="Learn the exact photo sizes (20-50KB) and PDF document specs (up to 300KB) required for successful Ayushman Bharat, PAN Card, and PM KISAN applications."
                url="/blog/indian-govt-schemes-photo-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Government Applications
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Govt. Schemes Photo & Document Rules (2025)
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Applying online for essential services like a PAN Card or Ayushman Bharat health card? Don't let a "File Too Large" error stop you.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        The Digital India initiative has made it easier than ever to apply for critical government services from your smartphone. However, the government portals (like NSDL for PAN Cards or the NHA portal for Ayushman Bharat) run on legacy architecture that requires highly compressed, precisely sized digital files.
                    </p>
                    <p>
                        If you try to upload a modern 5MB smartphone photo, the system will instantly crash or reject your application. Here is how to format your documents for instant approval.
                    </p>

                    <h2>1. PAN Card Application (NSDL/UTIITL)</h2>
                    <p>
                        Applying for a new PAN card or updating an existing one requires three distinct files: a photograph, your signature, and your proof of identity/address.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon className="text-blue-600" /> PAN Card Specifications
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Photo File Size:</strong> Maximum 50 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Photo Dimensions:</strong> 3.5 cm x 2.5 cm (213 x 213 pixels exactly)</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Signature Size:</strong> Maximum 50 KB</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Supporting Docs (Aadhar):</strong> Maximum 300 KB (Must be a PDF file)</li>
                        </ul>
                    </div>

                    <h2>2. Ayushman Bharat (PMJAY)</h2>
                    <p>
                        The Pradhan Mantri Jan Arogya Yojana portal requires clear identification to issue your 5-lakh health coverage card.
                    </p>
                    <ul>
                        <li><strong>Photograph Size:</strong> Usually under 50 KB.</li>
                        <li><strong>Photograph Format:</strong> JPG/JPEG only.</li>
                        <li><strong>Background:</strong> Light color, preferably white. Ensure face is clearly visible without any extreme shadows.</li>
                        <li><strong>Identity Proof (Aadhar/Ration Card):</strong> Usually requires PDF format under 200 KB to 300 KB depending on the state portal.</li>
                    </ul>

                    <h2>3. PM KISAN Samman Nidhi Yojana</h2>
                    <p>
                        Farmers registering for the 6,000 INR annual support must provide clear scans of their land records and bank passbooks. Blurry scans will delay the verification process indefinitely.
                    </p>
                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="text-emerald-600" /> PM KISAN Doc Specs
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Land Record Document:</strong> Scanned PDF format.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>File Size Limit:</strong> Usually capped at 100 KB - 150 KB.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Warning:</strong> The Khasra/Khatauni numbers MUST be legible after compression. Do not overcompress!</li>
                        </ul>
                    </div>

                    <h2>The "Document Legibility" Problem</h2>
                    <p>
                        When dealing with Indian Government portals, the biggest hurdle is compressing an Aadhar card or Land Record down to 100KB *without turning the text into a blurry mess*.
                    </p>
                    <p>
                        If the verifying officer cannot read your Aadhar number or name clearly, your application will be rejected, and you will have to wait weeks to re-apply.
                    </p>
                    <p>
                        Imgverto's <Link href="/compress-image">Compress Image tool</Link> allows you to visually dial in the exact Kilobyte size you need while giving you a live preview of the quality. This guarantees your documents hit the size limits while remaining perfectly readable. Furthermore, our <Link href="/image-to-pdf">Image to PDF converter</Link> helps you quickly turn those smartphone snaps into the rigid PDF containers these legacy portals demand—all done locally on your device for total privacy.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Compress Documents Securely</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Compress Photo to 50KB
                        </Link>
                        <Link
                            href="/image-to-pdf"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <FileText className="w-5 h-5" /> JPG to PDF Converter
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
