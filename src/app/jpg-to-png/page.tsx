import { Metadata } from 'next';
import { JpgToPngClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: "Convert JPG to PNG Online - Change Format for Medical & College Forms",
    description: "Convert JPG to PNG online for free. Lossless conversion for medical entrance exams, DU admissions, and official documents. Fast, secure, and no signup needed.",
    alternates: {
        canonical: '/jpg-to-png',
    },
    keywords: ["convert jpg to png", "jpg to png converter", "change image format online", "medical portal photo upload", "college admission image format", "imgverto"]
};

export default function JpgToPngPage() {
    return <JpgToPngClient />;
}
