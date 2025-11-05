import { getStore } from '@netlify/blobs';

export async function handler() {
  try {
    const store = getStore('datasphere-links');
    let links = await store.get('links', { type: 'json' }) || [];
    let log = await store.get('link-log', { type: 'json' }) || [];

    const lastDeleted = [...log].reverse().find(entry => entry.action && entry.action.startsWith('Deleted link: '));
    if (!lastDeleted) {
      return { statusCode: 404, body: JSON.stringify({ message: 'No deleted link found to restore.' }) };
    }

    const restored = {
      text: lastDeleted.action.replace('Deleted link: ', ''),
      href: lastDeleted.href
    };

    if (!links.find(l => l.text === restored.text)) {
      links.push(restored);
      await store.set('links', JSON.stringify(links));

      log.push({
        timestamp: new Date().toISOString(),
        action: `Restored link: ${restored.text}`,
        href: restored.href,
        totalLinks: links.length
      });
      await store.set('link-log', JSON.stringify(log));
    }

    return { statusCode: 200, body: JSON.stringify({ message: '🔁 Last deleted link restored.', restored }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error restoring link', error: err.message }) };
  }
}
