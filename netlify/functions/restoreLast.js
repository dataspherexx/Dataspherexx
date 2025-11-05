import { kv } from '@netlify/kv'

export async function handler() {
  try {
    const backup = (await kv.get('deleted-links')) || []
    if (!backup.length) {
      return { statusCode: 200, body: JSON.stringify({ message: 'No links to restore' }) }
    }

    const last = backup.pop()
    let links = (await kv.get('datasphere-links')) || []
    links.push(last)

    await kv.set('datasphere-links', links)
    await kv.set('deleted-links', backup)

    return { statusCode: 200, body: JSON.stringify({ message: 'Restored last link', links }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error', error: err.message }) }
  }
}
