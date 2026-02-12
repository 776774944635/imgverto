import { Metadata } from 'next';
import { BackgroundRemoverClient } from './client';
import { SchemaMarkup } from '@/components/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: "Remove Background for Passport Size Photo Online Free - Imgverto",
    description: "Remove background from your photo for NEET, JEE, and passport applications for free. Create high-quality transparent PNGs or white background photos instantly.",
    alternates: {
        canonical: "/background-remover",
    },
    keywords: ["remove background for passport photo", "transparent background for exam photo", "neet photo background remover", "jee main photo background change", "white background for photo online", "imgverto"]
};

export default function BackgroundRemoverPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="Background Remover Online"
                description="Remove background from photos instantly with AI precision."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <BackgroundRemoverClient />
        </div>
    );
}
