module.exports = {
  siteMetadata: {
    title: `Tutorial`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`
  ]
};
