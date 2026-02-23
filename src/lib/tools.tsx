import {
    Minimize2,
    ImageIcon,
    Eraser,
    FileType,
    Sparkles,
    Combine,
    Zap
} from "lucide-react";
import React from 'react';

export const categories = ["All", "Optimize", "Create", "Edit", "Convert", "Security"];

export interface Tool {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    category: string;
    color: string;
    lightColor: string;
    isNew?: boolean;
}

export const tools: Tool[] = [
    {
        title: "Compress IMAGE",
        description: "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
        href: "/compress-image",
        icon: <Minimize2 className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Optimize",
        color: "text-blue-500",
        lightColor: "bg-blue-50"
    },
    {
        title: "Resize IMAGE",
        description: "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
        href: "/resize-image",
        icon: <ImageIcon className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Edit",
        color: "text-teal-500",
        lightColor: "bg-teal-50"
    },
    {
        title: "Crop IMAGE",
        description: "Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor.",
        href: "/crop-image",
        icon: <Eraser className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Edit",
        color: "text-emerald-500",
        lightColor: "bg-emerald-50"
    },
    {
        title: "Convert to JPG",
        description: "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
        href: "/png-to-jpg",
        icon: <FileType className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Convert",
        color: "text-orange-500",
        lightColor: "bg-orange-50"
    },
    {
        title: "Convert from JPG",
        description: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
        href: "/jpg-to-png",
        icon: <ImageIcon className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Convert",
        color: "text-amber-500",
        lightColor: "bg-amber-50"
    },
    {
        title: "Upscale Image",
        description: "Enlarge your images with high resolution. Easily increase resolution while maintaining visual quality.",
        href: "/image-upscaler",
        icon: <Sparkles className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Edit",
        isNew: true,
        color: "text-violet-500",
        lightColor: "bg-violet-50"
    },
    {
        title: "Remove background",
        description: "Quickly remove image backgrounds with high accuracy. Instantly detect objects and cut out backgrounds.",
        href: "/background-remover",
        icon: <Eraser className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Create",
        isNew: true,
        color: "text-pink-500",
        lightColor: "bg-pink-50"
    },
    {
        title: "Merge PDF",
        description: "Combine multiple PDF files into one single PDF document easily.",
        href: "/merge-pdf",
        icon: <Combine className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Edit",
        color: "text-indigo-500",
        lightColor: "bg-indigo-50"
    },
    {
        title: "Compress PDF",
        description: "Reduce PDF file size for easy sharing and storage without losing quality.",
        href: "/pdf-compressor",
        icon: <Zap className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8" />,
        category: "Optimize",
        color: "text-blue-600",
        lightColor: "bg-blue-50"
    }
];
