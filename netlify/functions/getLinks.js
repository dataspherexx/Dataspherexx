export async function handler() {
  try {
    const links = [
      { text: 'Mascot Gallery', href: '#mascots' },
      { text: 'The Data Sphere Project', href: '#datasphere' },
      { text: 'Holographic Series', href: '#stickers' },
      { text: 'Check-ins & Local Eats', href: '#checkins' },
      { text: 'Contact', href: '#contact' }
    ];

    console.log('✅ getLinks.js executed, returning', links.length, 'links');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ links })
    };
  } catch (err) {
    console.error('❌ getLinks.js error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Server error', error: err.message })
    };
  }
}
