import { Metadata } from 'next';
import { BackgroundRemoverClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "Remove Background for Passport Size Photo Online Free - Imgverto",
    description: "Remove background from your photo for NEET, JEE, and passport applications for free. Create high-quality transparent PNGs or white background photos instantly.",
    alternates: {
        canonical: "/background-remover",
    },
    keywords: ["remove background for passport photo", "transparent background for exam photo", "neet photo background remover", "jee main photo background change", "white background for photo online", "imgverto"]
};

export default function BackgroundRemoverPage() {
    return <BackgroundRemoverClient />;
}
