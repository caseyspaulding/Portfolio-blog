import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/app/actions/blogActions';

export default async function sitemap (): Promise<MetadataRoute.Sitemap>
{
    const blogResult = await getAllBlogPosts();

    if ( !blogResult.success || !blogResult.data )
    {
        return []; // Return an empty sitemap if there's an issue
    }

    const blogPosts = blogResult.data;
    const baseUrl = `${ process.env.NEXT_PUBLIC_SITE_URL }`;

    // Generate sitemap URLs for dynamic blog posts
    const blogSitemapUrls = blogPosts.map( ( post ) => ( {
        url: `${ baseUrl }/blog/${ post.slug }`,
        lastModified: new Date( post.updatedAt ).toISOString(),
    } ) );

    // Manually add static pages
    const staticUrls = [
        {
            url: `${ baseUrl }/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/about`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/crm`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/pricing`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/faqs`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/ticketing`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/marketing`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/analytics`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/qrcode`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/blog`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/privacy`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/terms`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/contact`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${ baseUrl }/authors/casey-spaulding`,
            lastModified: new Date().toISOString(),
        },
        // Add more static pages here as needed...
    ];

    // Combine both dynamic and static URLs
    return [ ...blogSitemapUrls, ...staticUrls ];
}
