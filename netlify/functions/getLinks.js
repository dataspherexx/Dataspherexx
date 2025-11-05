export async function handler() {
  try {
    // Static default links (until persistence is added)
    const links = [
      { text: 'Mascot Gallery', href: '#mascots' },
      { text: 'The Data Sphere Project', href: '#datasphere' },
      { text: 'Holographic Series', href: '#stickers' },
      { text: 'Check-ins & Local Eats', href: '#checkins' },
      { text: 'Contact', href: '#contact' }
    ];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error', error: err.message })
    };
  }
}
