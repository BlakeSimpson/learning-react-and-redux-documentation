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
      .sort(
        (a, b) => (a.node.frontmatter.step > b.node.frontmatter.step ? 1 : -1)
      )
      .map(edge => {
        const data = edge.node;

        if (data.frontmatter.step) {
          return (
            <ToCEntry
              key={data.frontmatter.step}
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
      <aside id="toc">
        <ul>
          <h5>Intro</h5>
          <ToCEntry slug="/tutorial/getting-started" title="Getting Started" />

          <h5>Step by Step Guide</h5>
          {this.renderDynamicPages()}

          <h5>Bonus Steps</h5>
          <ToCEntry
            slug="/tutorial/bonus/react-router"
            title="Navigation with React Router"
          />

          <h5>Information</h5>
          <ToCEntry slug="/tutorial/links" title="Links" />
        </ul>
      </aside>
    );
  }
}

export default TableOfContents;
