import React from 'react';

import TableOfContents from '../components/TableOfContents';

export default ({ data }) => {
  const post = data.markdownRemark;
  const { title, step } = post.frontmatter;

  console.log(data);

  return (
    <div>
      <TableOfContents edges={data.allMarkdownRemark.edges} />

      <h1>{title}</h1>
      {step && <h3>Step {step}</h3>}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        step
      }
    }
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
