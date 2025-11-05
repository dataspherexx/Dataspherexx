import { kv } from '@netlify/kv'

export async function handler() {
  try {
    let links = (await kv.get('datasphere-links')) || []
    if (!Array.isArray(links) || !links.length) {
      links = [
        { text: 'Mascot Gallery', href: '#mascots' },
        { text: 'The Data Sphere Project', href: '#datasphere' },
        { text: 'Holographic Series', href: '#stickers' },
        { text: 'Check-ins & Local Eats', href: '#checkins' },
        { text: 'Contact', href: '#contact' }
      ]
      await kv.set('datasphere-links', links)
    }
    return { statusCode: 200, body: JSON.stringify({ links }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: 'Error', error: err.message }) }
  }
}
