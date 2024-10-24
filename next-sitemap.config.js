/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.chatdiagram.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  alternateRefs: [
  ],
  // Add any additional configuration options here
}
