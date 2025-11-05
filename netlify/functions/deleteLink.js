let cache = [
  { text: 'Mascot Gallery', href: '#mascots' },
  { text: 'The Data Sphere Project', href: '#datasphere' },
  { text: 'Holographic Series', href: '#stickers' },
  { text: 'Check-ins & Local Eats', href: '#checkins' },
  { text: 'Contact', href: '#contact' }
];

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body || '{}');

    if (!text) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Missing link text to delete' })
      };
    }

    const index = cache.findIndex(l => l.text === text);
    if (index === -1) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Link not found' })
      };
    }

    const removed = cache.splice(index, 1)[0];
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Deleted link: ${removed.text}`,
        remaining: cache
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Error', error: err.message })
    };
  }
}
