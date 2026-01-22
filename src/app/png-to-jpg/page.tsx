import { Metadata } from 'next';
import { PngToJpgClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'PNG to JPG Converter Online Free | Imgverto',
    description: 'Convert PNG images to JPG format online for free using Imgverto. Fast, secure, and adjustable compression.',
    alternates: {
        canonical: '/png-to-jpg',
    },
    openGraph: {
        title: 'PNG to JPG Converter Online Free | Imgverto',
        description: 'Convert PNG images to JPG format online for free using Imgverto.',
        url: `${siteConfig.url}/png-to-jpg`,
    },
};

export default function PngToJpgPage() {
    return <PngToJpgClient />;
}
