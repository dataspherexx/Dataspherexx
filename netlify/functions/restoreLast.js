export async function handler() {
  try {
    let stored = globalThis.dataSphereLinks || [];
    if (stored.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No links to restore' })
      };
    }

    const restored = stored.pop();
    globalThis.dataSphereLinks = stored;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Last link removed',
        removed: restored,
        remaining: stored
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error', error: err.message })
    };
  }
}
