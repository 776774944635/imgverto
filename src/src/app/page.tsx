import { Metadata } from 'next'
import { HomeClient } from './HomeClient'
import { SchemaMarkup } from '@/components/shared/SchemaMarkup'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Imgverto - Free Online Image and PDF Processing Tools',
  description: 'Imgverto is your all-in-one toolkit for image and PDF processing. Compress, resize, convert, and edit your files for free. Fast, secure, and privacy-focused.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <SchemaMarkup
        type="SoftwareApplication"
        name="Imgverto"
        description="Comprehensive online toolkit for image processing, PDF management, and content creation."
        applicationCategory="MultimediaApplication"
        operatingSystem="Universal"
      />
      <HomeClient />
    </>
  )
}
