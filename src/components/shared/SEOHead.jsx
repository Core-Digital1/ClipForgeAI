import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEOHead({ title, description }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Add Open Graph, Twitter cards, etc. here as needed */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}

SEOHead.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
