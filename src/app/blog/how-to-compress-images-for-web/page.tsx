import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, Minimize2, Check, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Compress Images for Web Without Losing Quality | Imgverto',
    description: 'Learn how to reduce image file sizes by up to 80% to speed up your website and improve SEO. Free online compression guide.',
    alternates: {
        canonical: '/blog/how-to-compress-images-for-web',
    },
    openGraph: {
        title: 'How to Compress Images for Web Without Losing Quality | Imgverto',
        description: 'Reduce image file sizes by up to 80% to speed up your website and improve SEO.',
        url: `${siteConfig.url}/blog/how-to-compress-images-for-web`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Web Optimization
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Compress Images for the Web
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        A slow website kills conversions. Learn how to optimize your visuals for lightning-fast load times.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Did you know that 53% of mobile site visitors leave a page that takes longer than three seconds to load?
                        The number one culprit for slow websites is almost always <strong>unoptimized images</strong>.
                    </p>
                    <p>
                        Uploading raw photos from your camera directly to your website is a recipe for disaster.
                        A single uncompressed 5MB image can take seconds to download on a 4G connection.
                        To fix this, you need <strong>image compression</strong>.
                    </p>

                    <h2>What is Image Compression?</h2>
                    <p>
                        Image compression is the process of minimizing the size in bytes of a graphics file without degrading the quality of the image to an unacceptable level.
                        There are two main types:
                    </p>
                    <ul>
                        <li><strong>Lossless:</strong> Reduces file size without removing any image data. (Good for text/logos).</li>
                        <li><strong>Lossy:</strong> Removes some data that the human eye can't see to significantly reduce file size. (Best for photos).</li>
                    </ul>

                    <h2>The Imgverto Solution</h2>
                    <p>
                        Our <Link href="/compress-image">Image Compressor</Link> uses smart lossy compression techniques.
                        It selectively decreases the number of colors in the image, requiring fewer bytes to store the data.
                        The effect is nearly invisible, but it makes a very large difference in file size!
                    </p>

                    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">Why use Imgverto Compressor?</h3>
                        <ul className="space-y-2">
                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-500" /> Reduce size by up to 90%</li>
                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-500" /> Supports JPG, PNG, WebP</li>
                            <li className="flex gap-2"><Check className="w-5 h-5 text-green-500" /> Batch processing supported</li>
                        </ul>
                    </div>

                    <h2>Step-by-Step Guide</h2>
                    <ol>
                        <li>Navigate to the <Link href="/compress-image">Compress Image Tool</Link>.</li>
                        <li>Upload your images. You can select multiple files at once.</li>
                        <li>Select your compression level (Extreme, Recommended, or Lossless).</li>
                        <li>Click "Compress Images" and download your optimized files.</li>
                    </ol>

                    <h2>Core Web Vitals & SEO</h2>
                    <p>
                        Google uses "Core Web Vitals" as a ranking factor. One of the metrics is LCP (Largest Contentful Paint), which measures how long the main content takes to load.
                        By compressing your hero images, you directly improve your LCP score, potentially boosting your ranking on Google Search.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Never upload a raw image again. Make it a habit to run every visual asset through <Link href="/compress-image">Imgverto</Link> before publishing.
                        Your users (and your server bandwidth bills) will thank you.
                    </p>
                </div>
                <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-center text-white">
                    <Minimize2 className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="text-2xl font-black mb-4">Optimize Your Website Now</h3>
                    <Link
                        href="/compress-image"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Compress Images Free <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
