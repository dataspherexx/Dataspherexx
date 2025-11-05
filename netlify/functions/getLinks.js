import { BlobStore } from '@netlify/blobs'

export async function handler() {
  try {
    const store = new BlobStore({ name: 'datasphere-links' })

    let links = await store.get('links', { type: 'json' })
    if (!Array.isArray(links)) {
      links = [
        { text: 'Mascot Gallery', href: '#mascots' },
        { text: 'The Data Sphere Project', href: '#datasphere' },
        { text: 'Holographic Series', href: '#stickers' },
        { text: 'Check-ins & Local Eats', href: '#checkins' },
        { text: 'Contact', href: '#contact' }
      ]
    }

    await store.set('links', JSON.stringify(links))
    await store.set('link-log', JSON.stringify({
      timestamp: new Date().toISOString(),
      action: 'Initial seed',
      totalLinks: links.length
    }))

    return {
      statusCode: 200,
      body: JSON.stringify({ links })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error', error: err.message })
    }
  }
}
