import { Metadata } from 'next';
import { ImageUpscalerClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "AI Image Upscaler Online - Increase Resolution for Exam Photos",
    description: "Enhance and upscale images online for free. Increase resolution of blurry photos for NEET, JEE, and government job forms. 2x or 4x high-quality resolution boost.",
    alternates: {
        canonical: "/image-upscaler",
    },
    keywords: ["image upscaler online", "increase image resolution", "fix blurry photo for exam", "upscale neet photo", "jee main image enhancer", "restore old document photo", "imgverto"]
};

export default function ImageUpscalerPage() {
    return <ImageUpscalerClient />;
}
