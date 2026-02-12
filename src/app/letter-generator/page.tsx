import { Metadata } from 'next';
import { LetterGeneratorClient } from './client';
import { siteConfig } from '@/lib/site-config';
import { SchemaMarkup } from '@/components/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

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
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="Free Letter Generator Online"
                description="Build formal and informal letters effortlessly with our online generator and templates."
                applicationCategory="BusinessApplication"
                operatingSystem="Universal"
            />
            <LetterGeneratorClient />
        </div>
    );
}
