/**
 * Content script to extract page metadata
 * Injected by background.js when extension icon is clicked
 */

(function() {
  'use strict';

  /**
   * Get content from meta tag by name or property
   */
  function getMetaContent(nameOrProperty) {
    const meta = document.querySelector(
      `meta[name="${nameOrProperty}"], meta[property="${nameOrProperty}"]`
    );
    return meta?.content || '';
  }

  /**
   * Get the page favicon URL
   */
  function getFavicon() {
    // Try various favicon link types in order of preference
    const selectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="apple-touch-icon-precomposed"]'
    ];

    for (const selector of selectors) {
      const link = document.querySelector(selector);
      if (link?.href) {
        return link.href;
      }
    }

    // Fallback to default favicon location
    return new URL('/favicon.ico', window.location.origin).href;
  }

  /**
   * Get the best available image for the page
   */
  function getImage() {
    return getMetaContent('og:image') ||
           getMetaContent('twitter:image') ||
           getMetaContent('twitter:image:src') ||
           '';
  }

  /**
   * Get the page description
   */
  function getDescription() {
    return getMetaContent('description') ||
           getMetaContent('og:description') ||
           getMetaContent('twitter:description') ||
           '';
  }

  /**
   * Extract all page metadata
   */
  function extractMetadata() {
    return {
      title: document.title || 'Untitled',
      url: window.location.href,
      description: getDescription(),
      image: getImage(),
      favicon: getFavicon()
    };
  }

  // Return the extracted metadata
  return extractMetadata();
})();
