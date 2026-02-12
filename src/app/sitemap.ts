import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url
    const lastModified = new Date()

    const routes = [
        '',
        '/compress-image',
        '/resize-image',
        '/image-to-pdf',
        '/jpg-to-pdf',
        '/merge-pdf',
        '/pdf-compressor',
        '/pdf-to-jpg',
        '/image-upscaler',
        '/background-remover',
        '/jpg-to-png',
        '/png-to-jpg',
        '/resume-builder',
        '/cover-letter-generator',
        // Blogs
        '/blog/how-to-compress-images-for-web',
        '/blog/how-to-resize-images-for-social-media',
        '/blog/how-to-convert-jpg-to-pdf-free',
        '/blog/how-to-merge-pdf-files-online',
        '/blog/how-to-reduce-pdf-file-size',
        '/blog/how-to-convert-pdf-to-image',
        '/blog/how-to-upscale-images-without-losing-quality',
        '/blog/how-to-remove-background-from-images-online',
        '/blog/jpg-vs-png-which-is-better',
        '/blog/how-to-create-a-professional-resume-online',
        '/blog/how-to-write-a-cover-letter-for-any-job',
        '/blog/how-to-compress-image-for-jee-main-form',
        '/blog/how-to-resize-photo-for-neet-application-form',
        '/blog/ssc-photo-and-signature-size-requirements-guide',
        '/blog/how-to-reduce-pdf-size-for-government-job-forms',
        '/blog/how-to-merge-pdf-files-for-college-admission',
        '/blog/how-to-upscale-low-resolution-images-for-documents',
        '/blog/remove-background-for-passport-size-photo-online',
        '/blog/best-free-online-tools-for-exam-form-image-upload',
        '/blog/formal-vs-informal-letter-differences',
        // Pages
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))
}
