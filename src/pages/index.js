import React from 'react';
import TableOfContents from '../components/TableOfContents';

const IndexPage = ({ data }) => (
  <div>
    <h1>Table of Contents</h1>

    <TableOfContents edges={data.allMarkdownRemark.edges} />
  </div>
);

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            step
          }
        }
      }
    }
  }
`;

export default IndexPage;
