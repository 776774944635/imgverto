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
        // New Tools
        '/image-upscaler',
        '/background-remover',
        '/jpg-to-png',
        '/png-to-jpg',
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
