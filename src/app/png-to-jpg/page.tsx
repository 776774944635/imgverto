import { Metadata } from 'next';
import { PngToJpgClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'PNG to JPG Converter | Convert PNG to JPG Online Free | Imgverto',
    description: 'Convert PNG to JPG online for free with Imgverto. Reduce file size and ensure 100% compatibility with our fast, browser-based converter. Privacy guaranteed.',
    alternates: {
        canonical: '/png-to-jpg',
    },
    openGraph: {
        title: 'PNG to JPG Converter | Convert PNG to JPG Online Free | Imgverto',
        description: 'Convert PNG to JPG format online. Adjustable compression for smaller file sizes.',
        url: `${siteConfig.url}/png-to-jpg`,
    },
};

export default function PngToJpgPage() {
    return <PngToJpgClient />;
}
