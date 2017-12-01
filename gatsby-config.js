module.exports = {
  siteMetadata: {
    title: `Learning React and Redux`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 800
            }
          },
          {
            resolve: `gatsby-remark-prismjs`
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`
  ]
};
