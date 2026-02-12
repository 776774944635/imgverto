import { Metadata } from 'next';
import { PngToJpgClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "Convert PNG to JPG Online - Change Image Format for Exam Forms",
    description: "Convert PNG to JPG online for free. Essential for NEET, JEE, and government job forms that require JPG format. Fast, secure, and preserves high quality.",
    alternates: {
        canonical: '/png-to-jpg',
    },
    keywords: ["convert png to jpg", "png to jpg converter free", "change image format online", "neet photo format", "jee main photo jpg", "government job image format", "imgverto"]
};

export default function PngToJpgPage() {
    return <PngToJpgClient />;
}
