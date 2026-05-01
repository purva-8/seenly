/**
 * Cloudflare Worker for seenly.studio
 *
 * Handles two agent-readiness concerns:
 * 1. Injects Link response headers (RFC 8288) on every response
 * 2. Content-negotiates text/markdown — returns index.md when agents request it
 */

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '<https://seenly.studio/>; rel="service-doc"',
].join(', ');

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';

    // Markdown negotiation: serve index.md for text/markdown requests to /
    if (
      (url.pathname === '/' || url.pathname === '/index.html') &&
      accept.includes('text/markdown')
    ) {
      const mdUrl = new URL('/index.md', url.origin);
      const mdResponse = await fetch(mdUrl.toString());
      const body = await mdResponse.text();
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Link': LINK_HEADERS,
          'Vary': 'Accept',
        },
      });
    }

    // Pass through to the static asset, then inject Link headers
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Link', LINK_HEADERS);
    newHeaders.set('Vary', 'Accept');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
