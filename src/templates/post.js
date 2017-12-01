import React from 'react';

import TableOfContents from '../components/TableOfContents';
import { NextStep } from '../components/NextStep';

export default ({ data }) => {
  const post = data.markdownRemark;
  const { title, step } = post.frontmatter;

  return (
    <div>
      <TableOfContents edges={data.allMarkdownRemark.edges} />

      {step && <h3 className="current-step">Step {step}</h3>}
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      {step && (
        <NextStep step={step + 1} edges={data.allMarkdownRemark.edges} />
      )}
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
