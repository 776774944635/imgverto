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
                        In the age of instant gratification, speed isn't just a luxury—it's a fundamental requirement for any successful online presence.
                        The number one culprit for slow websites is almost always <strong>unoptimized images</strong>.
                    </p>
                    <p>
                        Uploading raw photos from your camera or high-resolution design exports directly to your website is a recipe for disaster.
                        A single uncompressed 5MB image can take seconds to download on a standard 4G connection, leading to high bounce rates and frustrated users.
                        To fix this, you need a deep understanding of <strong>image compression</strong> and how to apply it correctly.
                    </p>

                    <h2>The Technical Science of Image Compression</h2>
                    <p>
                        At its core, image compression is the process of reducing the file size of a graphics file in bytes without degrading its visual quality to an unacceptable level.
                        This is achieved through complex mathematical algorithms that identify and remove redundant data. There are two primary schools of thought in the world of compression:
                    </p>
                    <ul>
                        <li><strong>Lossless Compression:</strong> This method reduces file size by identifying and eliminating statistical redundancy. No data is lost during this process, and the image can be reconstructed bit-for-bit from the compressed version. This is ideal for images containing text, sharp edges, and logos where every pixel matters.</li>
                        <li><strong>Lossy Compression:</strong> This technique discards 'non-essential' information that the human eye is less likely to perceive. For example, in a photo of a blue sky, the algorithm might simplify the subtle gradients of blue into a smaller set of color values. This allows for massive reductions in file size (often up to 90%) with very little perceptible change in quality.</li>
                    </ul>

                    <h2>Why SEO and Site Speed are Inseparable</h2>
                    <p>
                        In 2021, Google introduced **Core Web Vitals** as an official part of their search ranking algorithm. These metrics focus on user experience, and one of the most critical is **Largest Contentful Paint (LCP)**. LCP measures how quickly the largest visible element on your screen (usually a hero image or headline) finishes loading.
                    </p>
                    <p>
                        If your hero image is an uncompressed 2MB file, your LCP score will suffer, telling Google that your page is 'slow' and 'unfriendly.' By using a tool like Imgverto's <Link href="/compress-image">Image Compressor</Link>, you can often drop that file size to under 200KB. This leads to a near-instant LCP, a better user experience, and a higher potential rank on the Search Engine Results Pages (SERPs).
                    </p>

                    <div className="my-10 p-8 bg-slate-50 border-2 border-slate-200 rounded-[2.5rem] shadow-sm">
                        <h3 className="text-2xl font-black mb-6 text-slate-900">Imgverto's Optimization Edge</h3>
                        <p className="text-slate-600 mb-6">Our platform isn't just another basic conversion tool. We use a multi-stage optimization pipeline:</p>
                        <ul className="space-y-4 not-prose">
                            <li className="flex gap-4 items-start">
                                <div className="p-1 bg-green-500 rounded-full mt-1"><Check className="w-4 h-4 text-white" /></div>
                                <div><strong className="text-slate-900">Chroma Subsampling:</strong> We optimize color data based on human visual perception.</div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="p-1 bg-green-500 rounded-full mt-1"><Check className="w-4 h-4 text-white" /></div>
                                <div><strong className="text-slate-900">Metadata Stripping:</strong> We remove invisible EXIF data (location, camera settings) that bloat files.</div>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="p-1 bg-green-500 rounded-full mt-1"><Check className="w-4 h-4 text-white" /></div>
                                <div><strong className="text-slate-900">Quantization Optimization:</strong> Fine-tuning the balance between bit-depth and file weight.</div>
                            </li>
                        </ul>
                    </div>

                    <h2>JPG vs. PNG vs. WebP: Which Should You Use?</h2>
                    <p>
                        Choosing the right format is half the battle in image optimization. Here's a quick breakdown of when to use each:
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Format</th>
                                <th>Best For</th>
                                <th>Compression Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>**JPG**</td>
                                <td>Photographs and complex scenes</td>
                                <td>Lossy</td>
                            </tr>
                            <tr>
                                <td>**PNG**</td>
                                <td>Logos, icons, and transparency</td>
                                <td>Lossless</td>
                            </tr>
                            <tr>
                                <td>**WebP**</td>
                                <td>Modern web (replaces both)</td>
                                <td>Both (Superior)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>The Optimal Web Workflow</h2>
                    <p>
                        Simply compressing isn't enough; you must integrate it into your workflow. We recommend the 'Three-S' approach:
                    </p>
                    <ol>
                        <li>**Scale:** First, use the <Link href="/resize-image">Image Resizer</Link> to ensure the image isn't wider than it needs to be (e.g., don't upload a 4000px wide image if it displays at 800px).</li>
                        <li>**Strip:** Use the <Link href="/png-to-jpg">Format Converter</Link> if you have a photo saved as a PNG. Converting it to JPG can save 80% before you even compress.</li>
                        <li>**Squeeze:** Finally, run it through the <Link href="/compress-image">Compress Image Tool</Link> to reach its minimum viable weight.</li>
                    </ol>

                    <h2>Advanced Tips for Professional Designers</h2>
                    <p>
                        If you are a UI/UX designer using tools like Figma or Photoshop, always export at 2x resolution for Retina displays, but compensate by using a higher compression level. A compressed 2x image often looks better and weighs less than an uncompressed 1x image.
                    </p>
                    <p>
                        Additionally, consider the "Lazy Loading" attribute in your HTML. When combined with Imgverto-optimized images, your site will feel incredibly snappy because lower-priority images won't block the initial rendering of your page.
                    </p>

                    <h2>Conclusion: Your Performance Strategy</h2>
                    <p>
                        In the competitive landscape of the modern web, every kilobyte counts. Image optimization is no longer an optional "extra"—it is the foundation of high-performance SEO and user engagement. By committing to a workflow that prioritizes speed and efficiency, you respect your users' time and data plans.
                    </p>
                    <p>
                        Start your optimization journey today with <Link href="/">Imgverto's suite of free tools</Link>. Experience the difference that professional-grade compression can make for your traffic and your brand.
                    </p>
                </div>
                <div className="mt-16 p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <Minimize2 className="w-16 h-16 mx-auto mb-6 text-blue-200 animate-pulse" />
                    <h3 className="text-3xl font-black mb-6">Ready to Boost Your SEO?</h3>
                    <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">
                        Don't let heavy images hold your website back. Compress your first batch for free in just seconds.
                    </p>
                    <Link
                        href="/compress-image"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 font-black text-xl rounded-full hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-xl"
                    >
                        Optimize My Images <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
