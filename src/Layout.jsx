import React from 'react';
import PropTypes from 'prop-types';
import SEOHead from '@/components/shared/SEOHead';

export default function Layout({ children, currentPageName }) {
    // Define SEO data per page
    const seoConfig = {
        Home: {
            title: 'ClipForge AI - Turn Long Videos Into Viral Shorts',
            description: 'AI-powered tool that automatically detects viral moments, generates short clips, adds dynamic subtitles, and prepares your content for TikTok, Instagram Reels, and YouTube Shorts.'
        },
        Landing: {
            title: 'ClipForge AI - Turn Long Videos Into Viral Shorts',
            description: 'AI-powered tool that automatically detects viral moments, generates short clips, adds dynamic subtitles, and prepares your content for TikTok, Instagram Reels, and YouTube Shorts.'
        },
        Dashboard: {
            title: 'Dashboard - ClipForge AI',
            description: 'Manage your videos and AI-generated clips in one place.'
        },
        Upload: {
            title: 'Upload Video - ClipForge AI',
            description: 'Upload your long-form videos and let AI generate viral short clips.'
        },
        Editor: {
            title: 'Clip Editor - ClipForge AI',
            description: 'Edit and customize your AI-generated clips with subtitles and effects.'
        },
        Export: {
            title: 'Export & Schedule - ClipForge AI',
            description: 'Export your clips and schedule them for TikTok, Instagram Reels, and YouTube Shorts.'
        },
        Pricing: {
            title: 'Pricing - ClipForge AI',
            description: 'Simple, transparent pricing. Start free and scale as you grow.'
        }
    };

    const seo = seoConfig[currentPageName] || seoConfig.Home;

    return (
        <>
            <SEOHead title={seo.title} description={seo.description} />
            {children}
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    currentPageName: PropTypes.string.isRequired,
};
