import { Metadata } from 'next';
import { ResumeBuilderClient } from './client';
import { siteConfig } from '@/lib/site-config';
import { SchemaMarkup } from '@/components/shared/SchemaMarkup';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Free Professional Resume Builder Online | Imgverto',
    description: 'Build a professional resume online for free with Imgverto. Create ATS-friendly resumes and download instantly.',
    alternates: {
        canonical: '/resume-builder',
    },
    openGraph: {
        title: 'Free Professional Resume Builder Online | Imgverto',
        description: 'Build a professional resume online for free with Imgverto. Create ATS-friendly resumes and download instantly.',
        url: `${siteConfig.url}/resume-builder`,
    },
};

export default function ResumeBuilderPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="Professional Resume Builder Online"
                description="Create ATS-friendly professional resumes instantly with our free online builder."
                applicationCategory="BusinessApplication"
                operatingSystem="Universal"
            />
            <ResumeBuilderClient />
        </div>
    );
}
