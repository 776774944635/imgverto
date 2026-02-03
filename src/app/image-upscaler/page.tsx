import { Metadata } from 'next';
import { ImageUpscalerClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "High-Resolution Image Upscaler Online | Increase Resolution Free | Imgverto",
    description: "Enlarge your images by 2x or 4x online for free with Imgverto Advanced Image Upscaler. Increase resolution and enhance quality without losing sharpness or clarity.",
    alternates: {
        canonical: "/image-upscaler",
    },
    openGraph: {
        title: "High-Resolution Image Upscaler Online | Increase Resolution Free | Imgverto",
        description: "Increase image resolution by 2x or 4x instantly using high-precision resampling. Enhance quality without blur.",
        url: `${siteConfig.url}/image-upscaler`,
    },
};

export default function ImageUpscalerPage() {
    return <ImageUpscalerClient />;
}
