/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://eventjacket.com', // Replace with your site's URL
  generateRobotsTxt: true, // (Optional) Generates `robots.txt` file
  sitemapSize: 5000 // Limit for each sitemap file
}

module.exports = config
