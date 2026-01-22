import { Metadata } from 'next';
import { ImageUpscalerClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Image Upscaler Online – Increase Image Resolution Free',
    description: 'Upscale images online for free using Imgverto. Increase image resolution by 2x or 4x without losing quality instantly.',
    alternates: {
        canonical: '/image-upscaler',
    },
    openGraph: {
        title: 'Image Upscaler Online – Increase Image Resolution Free | Imgverto',
        description: 'Upscale images online for free using Imgverto. Increase image resolution by 2x or 4x without losing quality instantly.',
        url: `${siteConfig.url}/image-upscaler`,
    },
};

export default function ImageUpscalerPage() {
    return <ImageUpscalerClient />;
}
