import { Metadata } from 'next';
import { CoverLetterClient } from './client';
import { siteConfig } from '@/lib/site-config';
import { SchemaMarkup } from '@/components/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Free Cover Letter Generator Online | Imgverto',
    description: 'Generate professional cover letters instantly using Imgverto. Perfect for jobs, internships, and freshers. Custom templates and easy download.',
    alternates: {
        canonical: '/cover-letter-generator',
    },
    openGraph: {
        title: 'Free Cover Letter Generator Online | Imgverto',
        description: 'Generate professional cover letters instantly using Imgverto. Perfect for jobs, internships, and freshers.',
        url: `${siteConfig.url}/cover-letter-generator`,
    },
};

export default function CoverLetterPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="Free Cover Letter Generator Online"
                description="Generate customized professional cover letters for job applications instantly."
                applicationCategory="BusinessApplication"
                operatingSystem="Universal"
            />
            <CoverLetterClient />
        </div>
    );
}
