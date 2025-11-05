export async function handler() {
  // Temporary: no Blobs, just a working JSON response
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
}
