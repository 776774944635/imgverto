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
                        Every social media algorithm loves visuals, but they all have a low tolerance for inconsistent sizing.
                        If you upload a horizontal photo to an Instagram Story, it gets squeezed with ugly black bars.
                        If you upload a square image to a YouTube thumbnail, the crucial details on the sides get cut off.
                        In the fast-paced world of social media, where you have less than a second to capture a user's attention, visual glitches like these can be the difference between a new follower and a quick scroll-past.
                    </p>
                    <p>
                        The solution is **precision resizing**. By tailoring your dimensions to the specific requirements of each platform, you ensure your content looks intentional, professional, and optimized for engagement.
                    </p>

                    <h2>The Science of Aspect Ratios</h2>
                    <p>
                        To master social media resizing, you must first understand the concept of **Aspect Ratio**. An aspect ratio describes the proportional relationship between an image's width and its height. For example, a square image has a 1:1 ratio. A standard widescreen video has a 16:9 ratio.
                    </p>
                    <p>
                        Social media platforms use these ratios to define their "feed real estate." If your image doesn't match the expected ratio, the platform will either "letterbox" (add bars) or "crop" (cut off) your image to make it fit. This is why 1080x1080 pixels (1:1) is the standard for Instagram squares, while 1080x1920 pixels (9:16) is the standard for vertical content like Reels and TikToks.
                    </p>

                    <div className="grid gap-8 my-12 not-prose">
                        <div className="flex items-start gap-6 p-8 bg-pink-50 rounded-[2.5rem] border-2 border-pink-100 shadow-sm transition-transform hover:scale-[1.02]">
                            <Instagram className="w-12 h-12 text-pink-600 shrink-0" />
                            <div>
                                <h3 className="font-black text-2xl text-slate-900 mb-2">Instagram Masterclass</h3>
                                <p className="text-slate-600 mb-4">Instagram is the most visually demanding platform. Use these specs for maximum impact:</p>
                                <ul className="text-slate-700 space-y-2">
                                    <li><strong>Square Feed:</strong> 1080 x 1080 px (1:1)</li>
                                    <li><strong>Portrait Feed:</strong> 1080 x 1350 px (4:5) - *Highly recommended for more screen real estate.*</li>
                                    <li><strong>Landscape Feed:</strong> 1080 x 608 px (1.91:1)</li>
                                    <li><strong>Stories & Reels:</strong> 1080 x 1920 px (9:16)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 shadow-sm transition-transform hover:scale-[1.02]">
                            <Facebook className="w-12 h-12 text-blue-600 shrink-0" />
                            <div>
                                <h3 className="font-black text-2xl text-slate-900 mb-2">Facebook Business Standards</h3>
                                <p className="text-slate-600 mb-4">Facebook compresses images aggressively. Starting with the correct size is vital:</p>
                                <ul className="text-slate-700 space-y-2">
                                    <li><strong>Feed Posts:</strong> 1200 x 630 px (1.91:1)</li>
                                    <li><strong>Cover Photo:</strong> 820 x 312 px (Desktop) / 640 x 360 px (Mobile)</li>
                                    <li><strong>Event Covers:</strong> 1200 x 628 px</li>
                                    <li><strong>Ads:</strong> 1080 x 1080 px</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-8 bg-sky-50 rounded-[2.5rem] border-2 border-sky-100 shadow-sm transition-transform hover:scale-[1.02]">
                            <Linkedin className="w-12 h-12 text-sky-700 shrink-0" />
                            <div>
                                <h3 className="font-black text-2xl text-slate-900 mb-2">LinkedIn Professional Specs</h3>
                                <p className="text-slate-600 mb-4">For B2B marketing and personal branding, clarity is key:</p>
                                <ul className="text-slate-700 space-y-2">
                                    <li><strong>Personal Feed:</strong> 1200 x 1200 px (Square) or 1200 x 627 px (Landscape)</li>
                                    <li><strong>Company Page Cover:</strong> 1128 x 191 px</li>
                                    <li><strong>Article Hero:</strong> 1200 x 644 px</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2>Why You Should Always Resize Before Export</h2>
                    <p>
                        It might be tempting to let the platform do the work for you. However, social media platforms use "one-size-fits-all" compression algorithms. If you upload a massive 40MB file, the platform's automatic downscaler might introduce blurriness, artifacts, or color shifts.
                    </p>
                    <p>
                        By using <Link href="/resize-image">Imgverto's Image Resizer</Link>, you retain control. You can ensure that the sharpening is maintained and the file size is optimized *before* the platform's algorithms touch it. This results in a much cleaner, sharper final post that looks high-end on every device.
                    </p>

                    <h2>Pixels vs. DPI on Social Media</h2>
                    <p>
                        One common point of confusion is **DPI (Dots Per Inch)**. You may have heard that "72 DPI is for web." In reality, DPI is a print instruction and is completely ignored by web browsers and digital screens.
                    </p>
                    <p>
                        When resizing for social media, focus exclusively on the **pixel dimensions**. A 1080x1080 image at 72 DPI and a 1080x1080 image at 300 DPI will look exactly the same on an iPhone or a MacBook Pro. Save your mental energy for the width and height!
                    </p>

                    <h2>The Imgverto Resizing Workflow</h2>
                    <p>
                        Our tool is built for speed and precision. Here is how to prep your social media assets in seconds:
                    </p>
                    <ol>
                        <li><strong>Upload:</strong> Drag your high-res original into the <Link href="/resize-image">Resizer tool</Link>.</li>
                        <li><strong>Input Specs:</strong> Reference our cheat sheet above and enter the target Width and Height.</li>
                        <li><strong>Maintain Ratio:</strong> Keep "Maintain Aspect Ratio" checked to avoid stretching. If your original and target ratios don't match, you may need to crop the image afterwards.</li>
                        <li>**Download:** Save your perfectly sized result.</li>
                    </ol>

                    <h2>Pro Tip: The Power of PNG for Graphics</h2>
                    <p>
                        If your social media post contains a lot of text, logos, or flat colors (like an infographic), consider converting it to PNG before uploading. While JPG is great for photos, PNG preserves sharp lines and text much better during the platform's compression phase. Use our <Link href="/jpg-to-png">JPG to PNG converter</Link> if your original design was saved incorrectly.
                    </p>

                    <h2>Conclusion: Consistency Builds Trust</h2>
                    <p>
                        Whether you're a brand manager for a Fortune 500 company or an independent creator, consistent visual standards build trust. Pixelated, poorly cropped images signal a lack of attention to detail.
                    </p>
                    <p>
                        By using the precision tools at <Link href="/">Imgverto</Link>, you ensure that your visual communication is always sharp, correctly framed, and professional. Don't let your hard work be ruined by a bad crop—resize with confidence today.
                    </p>
                </div>

                <div className="mt-16 p-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
                    <ImageIcon className="w-16 h-16 mx-auto mb-6 text-teal-200 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black mb-4">Go Viral with Perfect Pixels</h3>
                    <p className="text-teal-50 mb-10 text-lg max-w-lg mx-auto">
                        Resize your photos for every platform in one place. Fast, free, and always at the highest quality.
                    </p>
                    <Link
                        href="/resize-image"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-teal-700 font-black text-xl rounded-full hover:bg-teal-50 transition-all shadow-xl active:scale-95"
                    >
                        Start My Sizing Guide <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </article>
        </Section>
    );
}
