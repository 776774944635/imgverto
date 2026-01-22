import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import { FileText, ArrowRight, FileType, Image as ImageIcon, Check, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'JPG vs PNG: Which Image Format is Better? (2025 Comparison) | Imgverto',
    description: 'Understand the key differences between JPG and PNG. Learn which format to use for websites, photography, and logos to optimize quality and speed.',
    alternates: {
        canonical: '/blog/jpg-vs-png-which-is-better',
    },
    openGraph: {
        title: 'JPG vs PNG: Which Image Format is Better? | Imgverto',
        description: 'Understand the key differences between JPG and PNG.',
        url: `${siteConfig.url}/blog/jpg-vs-png-which-is-better`,
        type: 'article',
    },
};

export default function BlogPost() {
    return (
        <Section className="min-h-screen py-20">
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <FileText className="w-4 h-4" /> Imgverto Guides
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        JPG vs PNG: Which is Better?
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        The ultimate showdown between the internet's two most popular image formats. Find out which one you should be using.
                    </p>
                </header>

                <div className="prose prose-lg prose-slate md:prose-xl mx-auto">
                    <p>
                        "Send me the JPG." "Can you save that as a PNG?"
                    </p>
                    <p>
                        We hear these terms every day, but do you actually know the difference?
                        Choosing the wrong image format can lead to blurry websites, massive file sizes that slow down your app, or backgrounds that aren't transparent when they should be.
                    </p>
                    <p>
                        In this guide, we break down the technical and practical differences between <strong>JPG (JPEG)</strong> and <strong>PNG</strong>
                        so you never have to guess again.
                    </p>

                    <h2>JPG (Joint Photographic Experts Group)</h2>
                    <p>
                        JPG is the standard for digital photography. It was designed to compress photo-realistic images efficiently.
                    </p>
                    <div className="my-6 p-6 bg-orange-50 rounded-2xl border border-orange-100 not-prose">
                        <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                            <ImageIcon className="w-6 h-6" /> The Pros & Cons of JPG
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 mb-2">✅ Advantages</h4>
                                <ul className="text-sm space-y-1 text-slate-700">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Small file sizes</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Universal compatibility</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Adjustable compression</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 mb-2">❌ Disadvantages</h4>
                                <ul className="text-sm space-y-1 text-slate-700">
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Lossy compression (quality loss)</li>
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> No transparency support</li>
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Bad for sharp text/graphics</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2>PNG (Portable Network Graphics)</h2>
                    <p>
                        PNG was created as an improved, non-patented replacement for GIF. It is designed for lossless transfer of images on the web.
                    </p>
                    <div className="my-6 p-6 bg-blue-50 rounded-2xl border border-blue-100 not-prose">
                        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <FileType className="w-6 h-6" /> The Pros & Cons of PNG
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 mb-2">✅ Advantages</h4>
                                <ul className="text-sm space-y-1 text-slate-700">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Lossless (Perfect quality)</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Supports Transparency</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Crisp text and lines</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 mb-2">❌ Disadvantages</h4>
                                <ul className="text-sm space-y-1 text-slate-700">
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Larger file sizes</li>
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Not optimized for photos</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2>Head-to-Head: When to use which?</h2>

                    <h3>Scenario A: You are saving a photo for a website.</h3>
                    <p>
                        <strong>Winner: JPG.</strong><br />
                        A photograph of a landscape contains millions of colors and gradients.
                        Saving this as a PNG might result in a 5MB file, whereas a JPG at 80% quality might look identical but only be 500KB.
                        Speed is crucial for SEO, so use our <Link href="/png-to-jpg">PNG to JPG converter</Link> to optimize your load times.
                    </p>

                    <h3>Scenario B: You are saving a company logo.</h3>
                    <p>
                        <strong>Winner: PNG.</strong><br />
                        Logos often have sharp edges and solid colors. JPG compression creates "artifacts" (weird fuzziness) around text.
                        Plus, you usually need a transparent background so the logo can sit on top of other elements.
                        Use our <Link href="/jpg-to-png">JPG to PNG converter</Link> for logos.
                    </p>

                    <h3>Scenario C: You are saving a screenshot of an app.</h3>
                    <p>
                        <strong>Winner: PNG.</strong><br />
                        Screenshots contain text and user interface elements that need to be pixel-perfect.
                        PNG preserves this readability perfectly.
                    </p>

                    <h2>Summary Table</h2>
                    <div className="not-prose overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b-2 border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4">Feature</th>
                                    <th className="px-6 py-4">JPG</th>
                                    <th className="px-6 py-4">PNG</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="bg-white">
                                    <td className="px-6 py-4 font-bold">Compression</td>
                                    <td className="px-6 py-4 text-red-600">Lossy</td>
                                    <td className="px-6 py-4 text-green-600">Lossless</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-6 py-4 font-bold">Transparency</td>
                                    <td className="px-6 py-4 text-red-600">No</td>
                                    <td className="px-6 py-4 text-green-600">Yes</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 py-4 font-bold">File Size</td>
                                    <td className="px-6 py-4 text-green-600">Small</td>
                                    <td className="px-6 py-4 text-red-600">Large</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-6 py-4 font-bold">Best For</td>
                                    <td className="px-6 py-4">Photos</td>
                                    <td className="px-6 py-4">Graphics, Logos, Text</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Conclusion</h2>
                    <p>
                        There is no "better" format universally—only the right tool for the job.
                        As a rule of thumb: <strong>If it's a photo, JPG. If it's anything else, PNG.</strong>
                    </p>
                    <p>
                        Need to switch between them? Imgverto has you covered with free, instant conversion tools.
                    </p>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center p-8 bg-slate-900 rounded-3xl">
                    <Link
                        href="/jpg-to-png"
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <FileType className="w-5 h-5" /> Convert JPG to PNG
                    </Link>
                    <Link
                        href="/png-to-jpg"
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
                    >
                        <ImageIcon className="w-5 h-5" /> Convert PNG to JPG
                    </Link>
                </div>
            </article>
        </Section>
    );
}
