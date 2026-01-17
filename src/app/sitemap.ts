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
