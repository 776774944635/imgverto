import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Image as ImageIcon, Briefcase, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Convert JPG to PDF Free Online | Imgverto',
    description: 'Convert your photos and scans into a single professional PDF document. Perfect for receipts, ID cards, and assignments.',
    alternates: {
        canonical: '/blog/how-to-convert-jpg-to-pdf-free',
    },
    openGraph: {
        title: 'How to Convert JPG to PDF Free Online | Imgverto',
        description: 'Convert photos to PDF instantly for easier sharing and printing.',
        url: `${siteConfig.url}/blog/how-to-convert-jpg-to-pdf-free`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Productivity Hacks
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Convert JPG Images to PDF
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Turn a cluttered folder of images into a single, clean document for easy emailing and archiving.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Sending 10 separate JPG attachments in an email is unprofessional and annoying for the receiver.
                        Whether you are submitting homework, sending receipts to your accountant, or creating a portfolio,
                        <strong>PDF (Portable Document Format)</strong> is the standard for sharing documents.
                    </p>

                    <h2>Why Convert Images to PDF?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                                <Briefcase className="w-5 h-5 text-orange-500" /> Professionalism
                            </h4>
                            <p className="text-slate-600 text-sm">
                                A single PDF file looks much cleaner than a ZIP file full of blurry phone photos. It ensures the recipient sees the pages in the correct order.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                                <GraduationCap className="w-5 h-5 text-blue-500" /> Compatibility
                            </h4>
                            <p className="text-slate-600 text-sm">
                                PDF display consistently on every device, from iPhones to Windows desktops. No "missing missing format" errors.
                            </p>
                        </div>
                    </div>

                    <h2>How to Use Imgverto's Converter</h2>
                    <p>
                        Our <Link href="/image-to-pdf">Image to PDF tool</Link> is designed for speed and simplicity.
                    </p>
                    <ol>
                        <li>
                            <strong>Select Images:</strong> Upload one or multiple JPG, PNG, or WebP files.
                        </li>
                        <li>
                            <strong>Arrange:</strong> If you uploaded multiple files, drag and drop them to set the page order.
                        </li>
                        <li>
                            <strong>Convert:</strong> Click the button, and we will stitch them together into one PDF document instantly.
                        </li>
                        <li>
                            <strong>Download:</strong> Save the file to your device.
                        </li>
                    </ol>

                    <h2>Common Scenarios</h2>
                    <ul>
                        <li><strong>Receipts:</strong> Take photos of your travel receipts and combine them into one expense report.</li>
                        <li><strong>ID Documents:</strong> Combine front and back photos of your ID card onto a single page PDF.</li>
                        <li><strong>Design Portfolios:</strong> Showcase your best work in a format that recruiters can easily scroll through.</li>
                    </ul>

                    <h2>Is it Secure?</h2>
                    <p>
                        Yes. At Imgverto, security is our priority. Your files are processed securely and are deleted from our servers shortly after conversion.
                        We do not look at your documents.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Don't let file compatibility slow you down.
                        Use <Link href="/image-to-pdf">Imgverto</Link> to professionalize your documents in seconds.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-orange-600 rounded-3xl text-center text-white">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-orange-200" />
                    <h3 className="text-2xl font-black mb-4">Create Your PDF Now</h3>
                    <Link
                        href="/image-to-pdf"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-700 font-bold rounded-full hover:bg-orange-50 transition-colors"
                    >
                        Convert Images to PDF <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
