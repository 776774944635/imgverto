import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileType, ArrowRight, Image as ImageIcon, Lock, MonitorPlay } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Convert PDF to Image (JPG/PNG) | Imgverto',
    description: 'Extract pages from a PDF document and save them as high-quality images. Perfect for sharing on social media or inserting into presentations.',
    alternates: {
        canonical: '/blog/how-to-convert-pdf-to-image',
    },
    openGraph: {
        title: 'How to Convert PDF to Image | Imgverto',
        description: 'Extract pages from a PDF document and save them as high-quality images.',
        url: `${siteConfig.url}/blog/how-to-convert-pdf-to-image`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
                        <FileType className="w-4 h-4" /> Format Conversion
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Convert PDF to Image (JPG)
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Need to share a PDF page on Instagram? Or insert a slide into PowerPoint? Converting to JPG is the answer.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        PDFs are great for documents, but terrible for visual sharing.
                        You can't upload a PDF to Instagram, Facebook, or Pinterest.
                        You can't easily edit a PDF page in photo editing software.
                        Sometimes, you just need an <strong>Image</strong>.
                    </p>

                    <h2>PDF vs Image: Why Convert?</h2>
                    <div className="my-8 flex flex-col gap-4 not-prose">
                        <div className="flex bg-slate-50 p-4 rounded-xl items-center gap-4">
                            <div className="bg-amber-100 p-3 rounded-lg"><MonitorPlay className="text-amber-600" /></div>
                            <div>
                                <h4 className="font-bold">Presentations</h4>
                                <p className="text-sm text-slate-600">PowerPoint and Keynote prefer images. Converting PDF slides to JPG makes them easy to drop into your deck.</p>
                            </div>
                        </div>
                        <div className="flex bg-slate-50 p-4 rounded-xl items-center gap-4">
                            <div className="bg-amber-100 p-3 rounded-lg"><ImageIcon className="text-amber-600" /></div>
                            <div>
                                <h4 className="font-bold">Social Media</h4>
                                <p className="text-sm text-slate-600">Social platforms rely on standard image formats. You must convert PDF flyers to JPG to post them.</p>
                            </div>
                        </div>
                    </div>

                    <h2>How to extract images from PDF</h2>
                    <p>
                        With <Link href="/pdf-to-jpg">Imgverto</Link>, you can turn every page of a PDF document into a separate, high-quality JPG image.
                    </p>
                    <ol>
                        <li>Go to the <Link href="/pdf-to-jpg">PDF to JPG Tool</Link>.</li>
                        <li>Upload your PDF file.</li>
                        <li>Choose <strong>"Convert Entire Pages"</strong>.</li>
                        <li>Click Convert.</li>
                        <li>Download a ZIP file containing all your pages as separate images.</li>
                    </ol>

                    <h2>Quality Considerations</h2>
                    <p>
                        By default, Imgverto produces high-resolution JPGs that are clear enough to read text but small enough to share online.
                        If the original PDF had very small text, checking the image zoom after conversion is a good idea.
                    </p>

                    <h2>Is it locked?</h2>
                    <p>
                        <Lock className="inline w-4 h-4 mb-1" /> Note: If your PDF is password protected, you will need to remove the password before converting it.
                        Our tool respects document security settings.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Unlocking the content inside your PDFs makes it reusable and shareable.
                        Try the <Link href="/pdf-to-jpg">PDF to JPG converter</Link> today.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-amber-500 rounded-3xl text-center text-white">
                    <FileType className="w-12 h-12 mx-auto mb-4 text-white" />
                    <h3 className="text-2xl font-black mb-4">Turn PDF into JPG</h3>
                    <Link
                        href="/pdf-to-jpg"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-amber-50 transition-colors"
                    >
                        Convert PDF to JPG <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
