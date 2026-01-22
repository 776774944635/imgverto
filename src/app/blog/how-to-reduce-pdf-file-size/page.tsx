import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { Zap, ArrowRight, Mail, HardDrive, FileText } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Reduce PDF File Size Online (Compress PDF) | Imgverto',
    description: 'Shrink your large PDF documents to make them easier to email and store. Free online PDF compressor that maintains text clarity.',
    alternates: {
        canonical: '/blog/how-to-reduce-pdf-file-size',
    },
    openGraph: {
        title: 'How to Reduce PDF File Size Online | Imgverto',
        description: 'Shrink your large PDF documents to make them easier to email and store.',
        url: `${siteConfig.url}/blog/how-to-reduce-pdf-file-size`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4" /> File Optimization
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Reduce PDF File Size
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Hit email attachment limits? Learn how to compress your PDFs significantly without making them unreadable.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        We have all seen the error message: "File too large to send."
                        PDFs can become surprisingly huge, especially if they contain high-resolution scans or unoptimized images.
                        Sending a 25MB file is often impossible via standard email providers like Gmail.
                    </p>

                    <h2>How Does PDF Compression Work?</h2>
                    <p>
                        PDF compression works similarly to image compression but on a document scale.
                        Our <Link href="/pdf-compressor">PDF Compressor</Link> analyzes the document structure and performs several optimizations:
                    </p>
                    <ul>
                        <li><strong>Resampling Images:</strong> It lowers the DPI of images inside the PDF (e.g., from 300 DPI print-quality to 144 DPI screen-quality).</li>
                        <li><strong>Removing Unused Assets:</strong> It strips out embedded fonts or metadata that aren't actually being used.</li>
                        <li><strong>Stream Compression:</strong> It efficiently encodes the text content.</li>
                    </ul>

                    <h2>The Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                                <Mail className="w-5 h-5 text-indigo-500" /> Easy Sharing
                            </h4>
                            <p className="text-slate-600 text-sm">
                                Get your files under the 25MB limit for Gmail, Outlook, and other email clients. Send faster, fail less.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                                <HardDrive className="w-5 h-5 text-indigo-500" /> Save Storage
                            </h4>
                            <p className="text-slate-600 text-sm">
                                If you archive thousands of documents, compressing them can save gigabytes of cloud or local storage space.
                            </p>
                        </div>
                    </div>

                    <h2>Tutorial: Compress PDF with Imgverto</h2>
                    <ol>
                        <li>Upload your large PDF to the <Link href="/pdf-compressor">PDF Compressor tool</Link>.</li>
                        <li>Wait for the automated scanning and compression algorithm to run (usually takes seconds).</li>
                        <li>You will see how much space you saved (e.g., "-45%").</li>
                        <li>Download your lighter, sharing-ready file.</li>
                    </ol>

                    <h2>Will text become blurry?</h2>
                    <p>
                        Generally, no. Since text in PDFs is vector-based (mathematical lines), it remains perfectly sharp at any size.
                        Only the images inside the PDF might lose a tiny bit of quality, but usually not enough to notice on a screen.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Don't let bloated files slow down your communication.
                        Shrink your PDFs with <Link href="/pdf-compressor">Imgverto</Link> and keep your inbox moving.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-indigo-600 rounded-3xl text-center text-white">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <h3 className="text-2xl font-black mb-4">Shrink Your PDF</h3>
                    <Link
                        href="/pdf-compressor"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-indigo-50 transition-colors"
                    >
                        Compress PDF Free <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
