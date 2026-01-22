import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { Combine, ArrowRight, FileText, Copy, Layers } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Merge PDF Files Online (Free Utility) | Imgverto',
    description: 'Combine multiple PDF documents into one single file. Easy, secure, and fast PDF merger tool for organizing your digital paperwork.',
    alternates: {
        canonical: '/blog/how-to-merge-pdf-files-online',
    },
    openGraph: {
        title: 'How to Merge PDF Files Online | Imgverto',
        description: 'Combine multiple PDF documents into one single file easily.',
        url: `${siteConfig.url}/blog/how-to-merge-pdf-files-online`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                        <Combine className="w-4 h-4" /> PDF Tools
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Merge Multiple PDF Files
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Declutter your digital life by combining scattered PDF pages into unified, organized documents.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Have you ever had to send an email with 5 different attachments?
                        "Resume.pdf", "Cover_Letter.pdf", "Portfolio_Part1.pdf"... it's messy.
                        Merging PDFs is the process of joining separate PDF files into a single document.
                    </p>

                    <h2>The Imgverto Merger</h2>
                    <p>
                        Our <Link href="/merge-pdf">Merge PDF tool</Link> is built to handle complex documents with ease.
                        You don't need expensive software like Adobe Acrobat Pro. We offer this utility for free directly in your browser.
                    </p>

                    <div className="my-8 p-6 bg-slate-100 rounded-2xl flex flex-col md:flex-row gap-6 items-center border border-slate-200">
                        <div className="flex -space-x-4">
                            <div className="w-16 h-20 bg-white border shadow-sm rounded-lg flex items-center justify-center"><FileText className="text-slate-300" /></div>
                            <div className="w-16 h-20 bg-white border shadow-sm rounded-lg flex items-center justify-center z-10"><FileText className="text-slate-300" /></div>
                            <div className="w-16 h-20 bg-white border shadow-sm rounded-lg flex items-center justify-center z-20"><FileText className="text-slate-300" /></div>
                        </div>
                        <ArrowRight className="text-slate-400 hidden md:block" />
                        <div className="w-20 h-24 bg-white border shadow-md rounded-lg flex items-center justify-center relative">
                            <Layers className="text-emerald-500 w-8 h-8" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-slate-900">Seamless Integration</h4>
                            <p className="text-sm text-slate-600">Our engine handles fonts, layouts, and images flawlessly while merging.</p>
                        </div>
                    </div>

                    <h2>How to Merge in 3 Steps</h2>
                    <ol>
                        <li>
                            <strong>Upload PDFs:</strong> Go to <Link href="/merge-pdf">/merge-pdf</Link> and select all the files you want to combine.
                        </li>
                        <li>
                            <strong>Reorder:</strong> This is the crucial part. Drag the file thumbnails to arrange them in the exact order you want them to appear in the final document.
                        </li>
                        <li>
                            <strong>Merge & Download:</strong> Click "Merge PDFs" and download your unified file immediately.
                        </li>
                    </ol>

                    <h2>Use Cases</h2>
                    <ul>
                        <li><strong>Students:</strong> Combine all your lecture notes and assignment pages into one study guide.</li>
                        <li><strong>Real Estate:</strong> Merge contracts, floor plans, and property photos into a single client packet.</li>
                        <li><strong>Legal:</strong> Combine various evidentiary documents and forms for submission.</li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>
                        Organization is key to productivity. Stop wasting time opening multiple files.
                        Merge them today with <Link href="/merge-pdf">Imgverto</Link> and keep your digital workspace tidy.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-emerald-600 rounded-3xl text-center text-white">
                    <Combine className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
                    <h3 className="text-2xl font-black mb-4">Merge Your Documents</h3>
                    <Link
                        href="/merge-pdf"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-colors"
                    >
                        Start Merging PDFs <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
