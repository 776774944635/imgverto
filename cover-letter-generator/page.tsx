import { Metadata } from 'next';
import { CoverLetterClient } from './client';
import { siteConfig } from '@/lib/site-config';

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
    return <CoverLetterClient />;
}
