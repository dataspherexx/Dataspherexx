import { getStore } from '@netlify/blobs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const store = getStore('datasphere-links');
    const body = JSON.parse(event.body || '{}');
    if (!body.text || !body.href) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing text or href' }) };
    }

    let links = await store.get('links', { type: 'json' }) || [];
    if (links.find(l => l.text === body.text)) {
      return { statusCode: 409, body: JSON.stringify({ message: 'Link already exists' }) };
    }

    const newLink = { text: body.text, href: body.href };
    links.push(newLink);
    await store.set('links', JSON.stringify(links));

    let log = await store.get('link-log', { type: 'json' }) || [];
    log.push({
      timestamp: new Date().toISOString(),
      action: `Added link: ${newLink.text}`,
      href: newLink.href,
      totalLinks: links.length
    });
    await store.set('link-log', JSON.stringify(log));

    return { statusCode: 200, body: JSON.stringify({ message: '✅ Link added successfully.', newLink }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error updating links', error: err.message }) };
  }
}
