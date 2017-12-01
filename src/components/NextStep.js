import React from 'react';
import Link from 'gatsby-link';

export const NextStep = ({ edges, step }) => {
  const nextStepData = edges.filter(edge => {
    return edge.node.frontmatter.step === step;
  });

  if (!nextStepData || !nextStepData.length) {
    return null;
  }

  let stepLink = nextStepData[0].node.fields.slug;
  const stepTitle = nextStepData[0].node.frontmatter.title;
  const linkText = `Continue to Step ${step}: ${stepTitle} &raquo;`;

  //stepLink = stepLink.replace('/tutorial/', '../../../tutorial/');

  return (
    <p className="next-step-link-wrapper">
      <Link
        to={stepLink}
        className="next-step-link"
        dangerouslySetInnerHTML={{ __html: linkText }}
      />
    </p>
  );
};
