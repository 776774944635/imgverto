import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"
import { Github, Twitter, Globe, X } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t py-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/logo.jpg"
                                    alt="Imgverto Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-outfit text-xl font-black italic tracking-tighter text-foreground uppercase">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                            Premium, browser-side tools for all your image and PDF needs. Built for speed, privacy, and simplicity.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href={siteConfig.links.github} className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-outfit font-black text-foreground uppercase tracking-widest text-[11px] mb-6">Tools</h4>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link href="/compress-image" className="hover:text-primary transition-colors">Compress Image</Link></li>
                            <li><Link href="/resize-image" className="hover:text-primary transition-colors">Resize Image</Link></li>
                            <li><Link href="/image-to-pdf" className="hover:text-primary transition-colors">Image to PDF</Link></li>
                            <li><Link href="/image-upscaler" className="hover:text-primary transition-colors">Image Upscaler</Link></li>
                            <li><Link href="/background-remover" className="hover:text-primary transition-colors">Background Remover</Link></li>
                            <li><Link href="/jpg-to-png" className="hover:text-primary transition-colors">JPG to PNG</Link></li>
                            <li><Link href="/png-to-jpg" className="hover:text-primary transition-colors">PNG to JPG</Link></li>
                            <li><Link href="/pdf-compressor" className="hover:text-primary transition-colors">Compress PDF</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-outfit font-black text-foreground uppercase tracking-widest text-[11px] mb-6">Guides</h4>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link href="/blog/how-to-compress-images-for-web" className="hover:text-primary transition-colors">Compress Images</Link></li>
                            <li><Link href="/blog/how-to-merge-pdf-files-online" className="hover:text-primary transition-colors">Merge PDFs</Link></li>
                            <li><Link href="/blog/how-to-upscale-images-without-losing-quality" className="hover:text-primary transition-colors">Upscale Images</Link></li>
                            <li><Link href="/blog/how-to-remove-background-from-images-online" className="hover:text-primary transition-colors">Remove Backgrounds</Link></li>
                            <li><Link href="/blog/jpg-vs-png-which-is-better" className="hover:text-primary transition-colors">JPG vs PNG</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-outfit font-black text-foreground uppercase tracking-widest text-[11px] mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-primary transition-colors uppercase tracking-widest">Status</Link>
                        <Link href="#" className="hover:text-primary transition-colors uppercase tracking-widest">Help Center</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
