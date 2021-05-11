import React from 'react';
import Helmet from 'react-helmet';

function MetaTags({ title, description, keywords, image }) {
  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel='canonical' href={window.location} />
      <meta name='keywords' content={`${title} | ${keywords}`} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://speedwagoan.web.app/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://speedwagoan.web.app/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}

export default MetaTags;
