import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

require('prismjs/themes/prism.css');
import './index.css';

const Header = ({ title }) => (
  <div id="header-wrapper-outer">
    <div
      id="header-wrapper"
      style={{
        margin: '0 auto',
        padding: '1.45rem 1.0875rem'
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.9em',
            lineHeight: '1.5em'
          }}
        >
          {title}
        </Link>
      </h1>
    </div>
  </div>
);

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: 'A tutorial for learning React and Redux'
        },
        { name: 'keywords', content: 'react, redux, tutorial' }
      ]}
    />
    <Header title={data.site.siteMetadata.title} />
    <div
      id="content-wrapper"
      style={{
        margin: '0 auto',
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default TemplateWrapper;
