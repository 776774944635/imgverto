import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/shared/Section';
import {
    FileText,
    GraduationCap,
    Building2,
    Building,
    MapPin,
    ArrowRight,
    ChevronRight,
    Search,
    BookOpen,
    Image as ImageIcon,
    FileSpreadsheet
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Imgverto Blog: Guides for Exams, Govt Schemes & Image Tools',
    description: 'Expert guides on photo requirements for Indian exams (NEET, JEE, UPSC), government schemes (PM Kisan, PAN Card), and professional image processing tips.',
    alternates: {
        canonical: '/blog',
    },
};

const blogPosts = [
    {
        title: "NEET UG 2025: Photo & Signature Requirements",
        description: "Official NTA guidelines for passport, postcard photos, and signatures.",
        url: "/blog/neet-ug-photo-signature-requirements",
        category: "Exams",
        icon: GraduationCap,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "JEE Main 2025: NTA Image Size Guide",
        description: "Master the 10KB-200KB compression for JEE Main application forms.",
        url: "/blog/how-to-compress-image-for-jee-main-form",
        category: "Exams",
        icon: GraduationCap,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "UPSC CSE 2025: Photo & Signature Guidelines",
        description: "Strict pixel dimensions (350x350) and name/date stamp rules.",
        url: "/blog/upsc-cse-photo-signature-requirements",
        category: "Exams",
        icon: Building2,
        color: "bg-purple-50 text-purple-600"
    },
    {
        title: "SSC CGL 2025: Exact Format & Dimensions",
        description: "Avoid rejection! Learn the no-spectacles and size limit rules.",
        url: "/blog/ssc-cgl-photo-signature-requirements",
        category: "Exams",
        icon: Building,
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        title: "IBPS & SBI Banking Document Specs",
        description: "LTI, handwritten declaration, and photo size limits for banking.",
        url: "/blog/ibps-sbi-banking-photo-signature-requirements",
        category: "Exams",
        icon: Building,
        color: "bg-cyan-50 text-cyan-600"
    },
    {
        title: "NDA 2025: UPSC Photo & Signature Rules",
        description: "Get the 350x350px square crop right for your NDA application.",
        url: "/blog/nda-photo-signature-requirements",
        category: "Exams",
        icon: Building2,
        color: "bg-slate-50 text-slate-600"
    },
    {
        title: "RRB NTPC & Group D: Complete Guide",
        description: "Handling the unique 30KB-70KB size limits for Railway exams.",
        url: "/blog/rrb-ntpc-group-d-photo-signature-requirements",
        category: "Exams",
        icon: Building2,
        color: "bg-orange-50 text-orange-600"
    },
    {
        title: "State PSC: Photo & Signature Requirements",
        description: "Guidelines for UPPSC, BPSC, MPSC, and KPSC exam portals.",
        url: "/blog/state-psc-photo-signature-requirements",
        category: "Exams",
        icon: MapPin,
        color: "bg-amber-50 text-amber-600"
    },
    {
        title: "Board Exams: CBSE, ICSE, NIOS Guide",
        description: "Class 10th & 12th registration photo and signature specifications.",
        url: "/blog/board-exams-photo-signature-requirements",
        category: "Exams",
        icon: GraduationCap,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "PM Kisan: Document & Photo Requirements",
        description: "Compress land records and passbooks for under 200KB.",
        url: "/blog/pm-kisan-photo-document-requirements",
        category: "Govt Schemes",
        icon: FileSpreadsheet,
        color: "bg-emerald-50 text-emerald-600"
    },
    {
        title: "Indian Govt Schemes: Ayushman & PAN Rules",
        description: "Document specs for Ayushman Bharat and PAN Card applications.",
        url: "/blog/indian-govt-schemes-photo-requirements",
        category: "Govt Schemes",
        icon: FileText,
        color: "bg-teal-50 text-teal-600"
    },
    {
        title: "JPG vs PNG: Which is Better for Documents?",
        description: "Understanding compression, transparency, and clarity for web forms.",
        url: "/blog/jpg-vs-png-which-is-better",
        category: "Guides",
        icon: ImageIcon,
        color: "bg-slate-50 text-slate-600"
    },
    {
        title: "How to Convert JPG to PDF for Free",
        description: "Fastest way to merge your ID scans into a single PDF container.",
        url: "/blog/how-to-convert-jpg-to-pdf-free",
        category: "Guides",
        icon: FileText,
        color: "bg-red-50 text-red-600"
    },
    {
        title: "Merge PDF Files Online Securely",
        description: "Combine multiple document scans while preserving text legibility.",
        url: "/blog/how-to-merge-pdf-files-online",
        category: "Guides",
        icon: FileText,
        color: "bg-rose-50 text-rose-600"
    },
    {
        title: "Reduce PDF File Size for Applications",
        description: "Compress your bank passbooks and certificates to under 300KB.",
        url: "/blog/how-to-reduce-pdf-file-size",
        category: "Guides",
        icon: FileText,
        color: "bg-pink-50 text-pink-600"
    },
    {
        title: "Resize Images for Social Media & Forms",
        description: "Advanced techniques for cropping images without quality loss.",
        url: "/blog/how-to-resize-images-for-social-media",
        category: "Guides",
        icon: ImageIcon,
        color: "bg-sky-50 text-sky-600"
    }
];

export default function BlogIndex() {
    return (
        <Section className="min-h-screen pt-12 pb-20">
            <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        <BookOpen className="w-4 h-4" /> Insight Base
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Imgverto Blog & <span className="text-primary">Guides</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Expert technical resources for Indian competitive exams, government schemes, and professional image optimization.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={post.url}
                            className="group flex flex-col bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-3 rounded-2xl ${post.color}`}>
                                    <post.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {post.category}
                                </span>
                            </div>
                            <h2 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h2>
                            <p className="text-slate-600 mb-8 flex-grow line-clamp-3">
                                {post.description}
                            </p>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-extrabold mb-6">Need a Specific Guide?</h3>
                        <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
                            We regularly update our database with the latest UPSC, SSC, and Banking notification guidelines. Contact us if you want us to cover a specific exam.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-extrabold text-lg rounded-2xl hover:bg-slate-100 transition-all shadow-lg active:scale-95"
                        >
                            Request a Guide <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                </div>
            </div>
        </Section>
    );
}
