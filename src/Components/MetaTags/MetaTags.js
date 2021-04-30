import React from 'react';
import Helmet from 'react-helmet';

function MetaTags({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel='canonical' href={window.location} />
      <meta name='description' content={description} />
      <meta name='keywords' content={`${title} | ${keywords}`} />
    </Helmet>
  )
}

export default MetaTags;
