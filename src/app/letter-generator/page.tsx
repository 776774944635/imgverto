import { Metadata } from 'next';
import { LetterGeneratorClient } from './client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Free Letter Generator Online – Formal & Informal | Imgverto',
    description: 'Generate formal and informal letters online for free. Create professional letters instantly with Imgverto. Templates for business, application, and more.',
    alternates: {
        canonical: '/letter-generator',
    },
    openGraph: {
        title: 'Free Letter Generator Online – Formal & Informal | Imgverto',
        description: 'Generate formal and informal letters online for free. Create professional letters instantly with Imgverto.',
        url: `${siteConfig.url}/letter-generator`,
    },
};

export default function LetterGeneratorPage() {
    return <LetterGeneratorClient />;
}
