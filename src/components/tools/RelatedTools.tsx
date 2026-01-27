import Link from "next/link";
import {
    FileText,
    Combine,
    Files,
    Minimize2,
    ArrowRight,
    Sparkles,
    Eraser,
    FileType,
    Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const allTools = [
    {
        title: "Compress Image",
        path: "/compress-image",
        icon: Minimize2,
        description: "Lossless reduction",
        gradient: "from-blue-600 to-cyan-500",
    },
    {
        title: "Resize Image",
        path: "/resize-image",
        icon: ImageIcon,
        description: "Change dimensions",
        gradient: "from-purple-600 to-pink-500",
    },
    {
        title: "Remove BG",
        path: "/background-remover",
        icon: Eraser,
        description: "Transparent BG",
        gradient: "from-pink-600 to-rose-500",
    },
    {
        title: "JPG to PNG",
        path: "/jpg-to-png",
        icon: FileType,
        description: "Convert to PNG",
        gradient: "from-blue-600 to-cyan-500",
    },
    {
        title: "PNG to JPG",
        path: "/png-to-jpg",
        icon: ImageIcon,
        description: "Convert to JPG",
        gradient: "from-orange-600 to-amber-500",
    },
    {
        title: "Image to PDF",
        path: "/image-to-pdf",
        icon: FileText,
        description: "Convert to PDF",
        gradient: "from-orange-600 to-red-500",
    },
    {
        title: "PDF Compressor",
        path: "/pdf-compressor",
        icon: Minimize2,
        description: "Shrink PDF size",
        gradient: "from-indigo-600 to-violet-500",
    },
    {
        title: "Merge PDF",
        path: "/merge-pdf",
        icon: Combine,
        description: "Combine multiple",
        gradient: "from-emerald-600 to-teal-500",
    },
    {
        title: "PDF to JPG",
        path: "/pdf-to-jpg",
        icon: Files,
        description: "Extract images",
        gradient: "from-amber-600 to-yellow-500",
    },
    {
        title: "Image Upscaler",
        path: "/image-upscaler",
        icon: Sparkles,
        description: "Increase resolution",
        gradient: "from-violet-600 to-fuchsia-500",
    },
    {
        title: "JPG to PNG",
        path: "/jpg-to-png",
        icon: ImageIcon,
        description: "Convert to PNG",
        gradient: "from-blue-600 to-indigo-500",
    },
    {
        title: "PNG to JPG",
        path: "/png-to-jpg",
        icon: ImageIcon,
        description: "Convert to JPG",
        gradient: "from-cyan-600 to-teal-500",
    },
    {
        title: "Resume Builder",
        path: "/resume-builder",
        icon: FileText,
        description: "Create Resume",
        gradient: "from-slate-700 to-slate-500",
    },
    {
        title: "Cover Letter",
        path: "/cover-letter-generator",
        icon: FileText,
        description: "Write Cover Letter",
        gradient: "from-indigo-600 to-blue-500",
    },
    {
        title: "Letter Gen",
        path: "/letter-generator",
        icon: FileText,
        description: "Personal Letters",
        gradient: "from-amber-600 to-orange-500",
    }
];

interface RelatedToolsProps {
    currentPath: string;
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
    const related = allTools.filter(t => t.path !== currentPath).slice(0, 3);

    return (
        <div className="w-full max-w-5xl mt-24 pt-24 border-t">
            <h2 className="font-outfit text-3xl font-black text-foreground tracking-tight mb-12 text-center">
                Explore More Tools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((tool) => (
                    <Link
                        key={tool.path}
                        href={tool.path}
                        className="group relative p-8 rounded-[2rem] premium-card bg-white transition-all hover:-translate-y-2"
                    >
                        <div className="relative z-10 space-y-4">
                            <div className={cn("inline-flex p-3 rounded-xl bg-gradient-to-br shadow-lg", tool.gradient)}>
                                <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-outfit text-xl font-black text-foreground">{tool.title}</h4>
                                <p className="text-muted-foreground text-sm font-medium">{tool.description}</p>
                            </div>
                            <div className="flex items-center text-[11px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                                Open Tool <ArrowRight className="w-3 h-3 ml-2" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
