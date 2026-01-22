import { Metadata } from 'next';
import { BackgroundRemoverClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Remove Image Background Online Free | Imgverto',
    description: 'Remove background from images online for free. Get transparent background instantly using Imgverto. No signup required.',
    alternates: {
        canonical: '/background-remover',
    },
    openGraph: {
        title: 'Remove Image Background Online Free | Imgverto',
        description: 'Remove background from images online for free. Get transparent background instantly using Imgverto.',
        url: `${siteConfig.url}/background-remover`,
    },
};

export default function BackgroundRemoverPage() {
    return <BackgroundRemoverClient />;
}
