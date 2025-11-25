/**
 * Homepage.dev Chrome Extension
 * Service Worker for handling extension icon clicks
 */

// Auto-detect dev mode: unpacked extensions don't have update_url in manifest
const DEV_MODE = !chrome.runtime.getManifest().update_url;
const HOMEPAGE_BASE_URL = DEV_MODE ? 'http://localhost:3017' : 'https://homepage.dev';
const ADD_BOOKMARK_PATH = '/add';
const DASHBOARD_PATH = '/a/me';

/**
 * Popup window configuration (matching bookmarklet behavior)
 */
const POPUP_CONFIG = {
  width: 600,
  height: 775,
  type: 'popup'
};

/**
 * Build the add bookmark URL with page metadata
 */
function buildAddBookmarkUrl(metadata) {
  const params = new URLSearchParams({
    title: metadata.title || '',
    url: metadata.url || '',
    description: metadata.description || '',
    image: metadata.image || '',
    favicon: metadata.favicon || '',
    source: 'extension',
    v: '0.3.2',
    timestamp: Date.now().toString()
  });

  return `${HOMEPAGE_BASE_URL}${ADD_BOOKMARK_PATH}?${params}`;
}

/**
 * Open the add bookmark page in a popup window
 */
async function openAddBookmarkPopup(metadata) {
  const url = buildAddBookmarkUrl(metadata);

  try {
    // Let Chrome handle positioning - centered by default
    await chrome.windows.create({
      url: url,
      type: POPUP_CONFIG.type,
      width: POPUP_CONFIG.width,
      height: POPUP_CONFIG.height
    });
  } catch (error) {
    console.error('Failed to open popup window:', error);
    // Fallback to opening in a new tab
    chrome.tabs.create({ url: url });
  }
}

/**
 * Extract metadata from the current tab using content script
 */
async function extractPageMetadata(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });

    if (results && results[0] && results[0].result) {
      return results[0].result;
    }
  } catch (error) {
    console.error('Failed to extract metadata:', error);
  }

  return null;
}

/**
 * Check if a URL is a restricted page where we can't inject scripts
 */
function isRestrictedUrl(url) {
  if (!url) return true;

  return url.startsWith('chrome://') ||
         url.startsWith('chrome-extension://') ||
         url.startsWith('about:') ||
         url.startsWith('edge://') ||
         url.startsWith('brave://') ||
         url.startsWith('devtools://');
}

/**
 * Handle extension icon click
 */
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Check if we're on a restricted page
    if (isRestrictedUrl(tab.url)) {
      // Can't extract metadata from restricted pages - open dashboard instead
      chrome.tabs.create({ url: `${HOMEPAGE_BASE_URL}${DASHBOARD_PATH}` });
      return;
    }

    // Extract metadata from the current page
    const metadata = await extractPageMetadata(tab.id);

    if (metadata) {
      // Open add bookmark popup with extracted metadata
      await openAddBookmarkPopup(metadata);
    } else {
      // Fallback: use basic tab info
      await openAddBookmarkPopup({
        title: tab.title || 'Untitled',
        url: tab.url || '',
        description: '',
        image: '',
        favicon: tab.favIconUrl || ''
      });
    }
  } catch (error) {
    console.error('Homepage.dev extension error:', error);
    // Ultimate fallback: just open the dashboard
    chrome.tabs.create({ url: `${HOMEPAGE_BASE_URL}${DASHBOARD_PATH}` });
  }
});
