import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Check, AlertCircle, FileDigit } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BlogSchema } from '@/components/shared/BlogSchema';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'PM Kisan Samman Nidhi: Document Upload & Photo Requirements 2025',
    description: 'Applying for PM Kisan? Learn the exact file size limits (under 200KB) for land records (Khatauni), Aadhar cards, and bank passbooks to ensure installment approval.',
    alternates: {
        canonical: '/blog/pm-kisan-photo-document-requirements',
    },
    openGraph: {
        title: 'PM Kisan Samman Nidhi: Document Upload Requirements',
        description: 'Complete guide to PM Kisan land record scans, bank passbook sizes, and photo rules.',
        url: `${siteConfig.url}/blog/pm-kisan-photo-document-requirements`,
        type: 'article',
    },
};

export default function PmKisanRequirementsBlog() {
    return (
        <Section className="min-h-screen py-20">
            <BlogSchema
                title="PM Kisan Samman Nidhi: Document Upload & Photo Requirements 2025"
                description="Applying for PM Kisan? Learn the exact file size limits (under 200KB) for land records (Khatauni), Aadhar cards, and bank passbooks to ensure installment approval."
                url="/blog/pm-kisan-photo-document-requirements"
            />
            <Breadcrumbs />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Government Schemes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        PM Kisan Registration: Document Upload Guide
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Don&apos;t let your 6,000 INR annual support be blocked due to a blurry document. Learn how to compress your land records and passbooks for the PM-KISAN portal.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme that provides financial assistance to all landholding farmer families in India. While the registration process is simple, many farmers and CSC operators struggle with the <strong>&quot;Document Upload&quot;</strong> section.
                    </p>
                    <p>
                        The PM-KISAN portal has very strict security filters that reject files if they are too large or if the text isn&apos;t sharp enough for automated verification.
                    </p>

                    <h2>1. Required Documents for PM Kisan</h2>
                    <p>
                        To successfully register or update your e-KYC, you need the following three documents in digital format.
                    </p>

                    <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl not-prose">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileDigit className="text-emerald-600" /> Official Upload Specs
                        </h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Land Record (Khatauni):</strong> JPG or PDF format, size under 200 KB.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Aadhar Card:</strong> JPG or PDF, size under 100 KB - 200 KB.</li>
                            <li className="flex items-start gap-2"><Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <strong>Bank Passbook:</strong> JPG or PDF, size under 100 KB.</li>
                            <li className="flex items-start gap-2"><AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> <strong>Critical Rule:</strong> The name on the Land Record, Aadhar Card, and Bank Passbook must match exactly.</li>
                        </ul>
                    </div>

                    <h2>2. Handling Land Record (Khatauni) Scans</h2>
                    <p>
                        Land records are often large, multi-page papers. When you take a photo of them with a mobile phone, the file size is usually 3MB-5MB. The PM Kisan portal will <strong>fail</strong> if you upload this.
                    </p>
                    <p>
                        You must compress the record to under 200KB. However, if you compress it too much, the &quot;Khasra Number&quot; becomes unreadable, and the Tehsildar will reject your verification.
                    </p>

                    <h2>3. Bank Passbook and Aadhar Requirements</h2>
                    <p>
                        The front page of your bank passbook must show your Name, Account Number, and IFSC Code clearly.
                    </p>
                    <ul>
                        <li><strong>Format:</strong> Use JPG for individual pages.</li>
                        <li><strong>Compression:</strong> Keep it between 50KB and 100KB for maximum clarity.</li>
                    </ul>

                    <h2>Common Error: &quot;Incorrect File Format&quot;</h2>
                    <p>
                        Many farmers try to upload images saved in HEIC (iPhone) or webp formats. The government server only recognizes <strong>JPG</strong> and <strong>PDF</strong>. If your phone saves photos in the wrong format, you must convert them before trying to upload.
                    </p>

                    <h2>How to Prepare PM Kisan Docs on Your Phone</h2>
                    <p>
                        You don&apos;t need to go to an internet cafe to fix your documents. Imgverto allows you to securely resize and compress your sensitive land records directly in your phone&apos;s browser.
                    </p>
                    <p>
                        Since Imgverto processes everything on your device, your private land and bank details are <strong>never</strong> sent to our servers, keeping your data 100% private.
                    </p>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl font-extrabold mb-6">Compress Documents for PM Kisan</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/compress-image"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                        >
                            <ImageIcon className="w-5 h-5" /> Compress to 200KB
                        </Link>
                        <Link
                            href="/image-to-pdf"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg active:scale-95"
                        >
                            <ArrowRight className="w-5 h-5" /> Convert Scan to PDF
                        </Link>
                    </div>
                </div>
            </article>
        </Section>
    );
}
