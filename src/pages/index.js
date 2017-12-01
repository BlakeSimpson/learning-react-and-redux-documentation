import React from 'react';
import TableOfContents from '../components/TableOfContents';

const IndexPage = ({ data }) => (
  <div>
    <TableOfContents edges={data.allMarkdownRemark.edges} />

    <h1>Welcome</h1>

    <p>
      This is the documentation website for the{' '}
      <a href="https://github.com/BlakeSimpson/learning-react-and-redux-tutorial">
        Learning React and Redux tutorial
      </a>.
    </p>

    <p>
      You can find the table of contents for the tutorial on the right of each
      page.
      <br />
      Visit the <a href="tutorial/getting-started/">Getting Started</a> page if
      you are new to the tutorial and would like instructions on where to start.
    </p>
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
