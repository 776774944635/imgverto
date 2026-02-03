import { Metadata } from 'next';
import { BackgroundRemoverClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "Free Advanced Background Remover | Remove Image Background Online | Imgverto",
    description: "Instantly remove image backgrounds for free with Imgverto. Our high-precision segmentation tool creates high-quality transparent PNGs in seconds. No signup, 100% secure, and private.",
    alternates: {
        canonical: "/background-remover",
    },
    openGraph: {
        title: "Free Advanced Background Remover | Remove Image Background Online | Imgverto",
        description: "Instantly remove backgrounds from images online for free. Get transparent background instantly using Imgverto's algorithmic matting. No signup required.",
        url: `${siteConfig.url}/background-remover`,
    },
};

export default function BackgroundRemoverPage() {
    return <BackgroundRemoverClient />;
}
