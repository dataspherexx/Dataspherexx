import { kv } from '@netlify/kv'

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) }
    }

    const { text, href } = JSON.parse(event.body || '{}')
    if (!text || !href) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing text or href' }) }
    }

    // Load existing list (or start fresh)
    let links = (await kv.get('datasphere-links')) || []
    links.push({ text, href })

    await kv.set('datasphere-links', links)
    return { statusCode: 200, body: JSON.stringify({ message: 'Link added', links }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error', error: err.message }) }
  }
}
