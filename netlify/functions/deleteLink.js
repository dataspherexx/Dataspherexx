import { getStore } from '@netlify/blobs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const store = getStore('datasphere-links');
    const body = JSON.parse(event.body || '{}');
    const text = body.text;

    if (!text) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing link text' }) };
    }

    let links = await store.get('links', { type: 'json' }) || [];
    const idx = links.findIndex(l => l.text === text);
    if (idx === -1) {
      return { statusCode: 404, body: JSON.stringify({ message: 'Link not found' }) };
    }

    const [removed] = links.splice(idx, 1);
    await store.set('links', JSON.stringify(links));

    let log = await store.get('link-log', { type: 'json' }) || [];
    log.push({
      timestamp: new Date().toISOString(),
      action: `Deleted link: ${removed.text}`,
      href: removed.href,
      totalLinks: links.length
    });
    await store.set('link-log', JSON.stringify(log));

    return { statusCode: 200, body: JSON.stringify({ message: '🗑️ Link deleted successfully.', removed }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error deleting link', error: err.message }) };
  }
}
