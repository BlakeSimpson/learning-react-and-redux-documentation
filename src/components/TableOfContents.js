import React, { Component } from 'react';
import Link from 'gatsby-link';

const ToCEntry = ({ slug, step, title }) => (
  <li>
    <Link to={slug}>
      {step && `Step ${step}: `}
      {title}
    </Link>
  </li>
);

class TableOfContents extends Component {
  renderDynamicPages() {
    return this.props.edges
      .map(edge => {
        const data = edge.node;

        if (data.frontmatter.step) {
          return (
            <ToCEntry
              slug={data.fields.slug}
              step={data.frontmatter.step}
              title={data.frontmatter.title}
            />
          );
        }
      })
      .filter(post => typeof post !== 'undefined');
  }

  render() {
    return (
      <aside>
        <ul>
          {this.renderDynamicPages()}
          <ToCEntry slug="/tutorial/links" title="Links" />
        </ul>
      </aside>
    );
  }
}

export default TableOfContents;
