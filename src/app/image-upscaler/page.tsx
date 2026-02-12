import { Metadata } from 'next';
import { ImageUpscalerClient } from './client';
import { SchemaMarkup } from '@/components/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: "AI Image Upscaler Online - Increase Resolution for Exam Photos",
    description: "Enhance and upscale images online for free. Increase resolution of blurry photos for NEET, JEE, and government job forms. 2x or 4x high-quality resolution boost.",
    alternates: {
        canonical: "/image-upscaler",
    },
    keywords: ["image upscaler online", "increase image resolution", "fix blurry photo for exam", "upscale neet photo", "jee main image enhancer", "restore old document photo", "imgverto"]
};

export default function ImageUpscalerPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="AI Image Upscaler Online"
                description="Increase image resolution and quality using AI reconstruction."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <ImageUpscalerClient />
        </div>
    );
}
