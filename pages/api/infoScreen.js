export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-app-url.vercel.app';
  
  const shareText = encodeURIComponent(`Test your sports trivia knowledge!\nFrame by @aaronv.eth`);
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(baseUrl)}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/infoOG" />
        <meta property="fc:frame:button:1" content="Start Game" />
        <meta property="fc:frame:button:2" content="Share" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content="${shareLink}" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/start-game" />
      </head>
      <body></body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}