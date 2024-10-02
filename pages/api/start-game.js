export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-vercel-app-url.vercel.app';
  
  try {
    console.log('Start game endpoint hit');
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/infoScreen" />
        <meta property="fc:frame:button:1" content="Start Game" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/og" />
      </head>
      <body></body>
    </html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    console.log('Start game HTML sent successfully');
  } catch (error) {
    console.error('Error starting game:', error);
    
    const errorHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/og?message=${encodeURIComponent('An error occurred. Please try again.')}" />
        <meta property="fc:frame:button:1" content="Try Again" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/start-game" />
      </head>
      <body></body>
    </html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(errorHtml);
    console.log('Error occurred in start game:', error);
  }
}
