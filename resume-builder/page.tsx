import { Metadata } from 'next';
import { ResumeBuilderClient } from './client';
import { siteConfig } from '@/lib/site-config';

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
    return <ResumeBuilderClient />;
}
