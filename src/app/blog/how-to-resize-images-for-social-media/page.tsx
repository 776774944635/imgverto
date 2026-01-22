import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, ImageIcon, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'How to Resize Images for Social Media (2025 Cheat Sheet) | Imgverto',
    description: 'The ultimate guide to social media image sizes. Resize photos for Instagram, Facebook, LinkedIn, and Twitter instantly with Imgverto.',
    alternates: {
        canonical: '/blog/how-to-resize-images-for-social-media',
    },
    openGraph: {
        title: 'How to Resize Images for Social Media | Imgverto',
        description: 'The ultimate guide to social media image sizes for 2025.',
        url: `${siteConfig.url}/blog/how-to-resize-images-for-social-media`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Social Media Tips
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        How to Resize Images for Social Media
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Stop your photos from getting cropped awkwardly. A complete guide to pixel-perfect sizing for every platform.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        Every social media algorithm loves visuals, but they all hate inconsistent sizing.
                        If you upload a horizontal photo to an Instagram Story, it gets ugly black bars.
                        If you upload a square image to a YouTube thumbnail, the important parts get cut off.
                    </p>
                    <p>
                        The solution? <strong>Resizing your images</strong> before you hit post.
                    </p>

                    <h2>2025 Social Media Size Cheat Sheet</h2>

                    <div className="grid gap-6 my-8 not-prose">
                        <div className="flex items-start gap-4 p-6 bg-pink-50 rounded-2xl border border-pink-100">
                            <Instagram className="w-8 h-8 text-pink-600 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">Instagram</h3>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li><strong>Square Post:</strong> 1080 x 1080 px</li>
                                    <li><strong>Portrait Post:</strong> 1080 x 1350 px (Best for engagement)</li>
                                    <li><strong>Stories / Reels:</strong> 1080 x 1920 px</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                            <Facebook className="w-8 h-8 text-blue-600 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">Facebook</h3>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li><strong>Feed Post:</strong> 1200 x 630 px</li>
                                    <li><strong>Cover Photo:</strong> 820 x 312 px</li>
                                    <li><strong>Stories:</strong> 1080 x 1920 px</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-sky-50 rounded-2xl border border-sky-100">
                            <Linkedin className="w-8 h-8 text-sky-700 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">LinkedIn</h3>
                                <ul className="text-sm text-slate-600 mt-2 space-y-1">
                                    <li><strong>Shared Image:</strong> 1200 x 627 px</li>
                                    <li><strong>Cover Photo:</strong> 1128 x 191 px</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2>How to Resize Quickly with Imgverto</h2>
                    <p>
                        You don't need to memorize these numbers.
                        Use our <Link href="/resize-image">Image Resizer Tool</Link> to adjust your dimensions in seconds.
                    </p>
                    <ol>
                        <li>Upload your photo to <Link href="/resize-image">/resize-image</Link>.</li>
                        <li>Enter the exact <strong>Width</strong> and <strong>Height</strong> in pixels.</li>
                        <li>Uncheck "Maintain Aspect Ratio" if you need to stretch it, or keep it checked and crop later.</li>
                        <li>Click <strong>Resize</strong> and download effortlessly.</li>
                    </ol>

                    <h2>DPI vs Pixels</h2>
                    <p>
                        For screens, <strong>pixels (px)</strong> are the only unit that matters.
                        Don't worry about DPI (Dots Per Inch) unless you are printing your social media posts on paper (which you probably aren't!).
                        72 DPI is the standard for web, but the pixel count is what determines sharpness.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        Professional social media presence requires professional consistency.
                        Keep this cheat sheet handy and use <Link href="/resize-image">Imgverto</Link> to ensure every post looks exactly how you intended.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-teal-600 rounded-3xl text-center text-white">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-teal-200" />
                    <h3 className="text-2xl font-black mb-4">Resize Your Photos</h3>
                    <Link
                        href="/resize-image"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-full hover:bg-teal-50 transition-colors"
                    >
                        Start Resizing <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
