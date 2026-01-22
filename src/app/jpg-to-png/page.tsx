import { Metadata } from 'next';
import { JpgToPngClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'JPG to PNG Converter Online Free | Imgverto',
    description: 'Convert JPG images to PNG format online for free with high quality using Imgverto. Fast, secure, and lossless conversion.',
    alternates: {
        canonical: '/jpg-to-png',
    },
    openGraph: {
        title: 'JPG to PNG Converter Online Free | Imgverto',
        description: 'Convert JPG images to PNG format online for free with high quality using Imgverto.',
        url: `${siteConfig.url}/jpg-to-png`,
    },
};

export default function JpgToPngPage() {
    return <JpgToPngClient />;
}
