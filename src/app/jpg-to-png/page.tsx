import { Metadata } from 'next';
import { JpgToPngClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'JPG to PNG Converter | Convert JPG to PNG Online Free | Imgverto',
    description: 'Instantly convert JPG images to high-quality PNG format for free with Imgverto. Our converter preserves every pixel for a lossless, professional result. No signup required.',
    alternates: {
        canonical: '/jpg-to-png',
    },
    openGraph: {
        title: 'JPG to PNG Converter | Convert JPG to PNG Online Free | Imgverto',
        description: 'Convert JPG to high-quality PNG format instantly without losing quality.',
        url: `${siteConfig.url}/jpg-to-png`,
    },
};

export default function JpgToPngPage() {
    return <JpgToPngClient />;
}
