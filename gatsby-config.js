module.exports = {
  siteMetadata: {
    title: `DevpediaCode`,
    description: `IT/IOT/AIの技術メモや最新情報を共有`,
    author: `@Devpedia`,
    siteUrl: `https://devpediacode.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "G-7RYQZ5JFJR",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        optimizeId: "OPT-TW58LC5",
        // Enables Google Optimize Experiment ID
        experimentId: "KWRJbTsOSdi9368QGbmOug",
        // Set Variation ID. 0 for original 1,2,3....
        variationId: "0",
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "devpediacode.com",
        // defaults to false
        enableWebVitalsTracking: true,
      },
   },
 
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-microcms`,
      options: {
        apiKey: `L2GKnKmbGtTDocZYElrh8PnbfWKSxQyTYbsC`,
        serviceId: `o274x29w9j`,
        apis: [
          {
            endpoint: `information`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-basic-bootstrap`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.ico`, // This path is relative to the root of the site.
        icon: "src/images/favicon300.png",
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [require("path").resolve(__dirname, "node_modules")],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  pathPrefix: "gatsby-starter-basic-bootstrap",
};
