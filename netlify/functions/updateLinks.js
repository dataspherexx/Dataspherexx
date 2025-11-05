export async function handler(event) {
  try {
    const { text, href } = JSON.parse(event.body || '{}');

    if (!text || !href) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing text or href' })
      };
    }

    // Retrieve current links from local storage file (mock)
    let stored = globalThis.dataSphereLinks || [
      { text: 'Mascot Gallery', href: '#mascots' },
      { text: 'The Data Sphere Project', href: '#datasphere' },
      { text: 'Holographic Series', href: '#stickers' },
      { text: 'Check-ins & Local Eats', href: '#checkins' },
      { text: 'Contact', href: '#contact' }
    ];

    stored.push({ text, href });
    globalThis.dataSphereLinks = stored;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Link added', links: stored })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error', error: err.message })
    };
  }
}
