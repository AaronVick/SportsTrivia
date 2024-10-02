export default async function handler(req, res) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-app-url.vercel.app';
  
    const html = `
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/og?message=There are 20 random sports questions. Can you get all 20 right?" />
          <meta property="fc:frame:button:1" content="First Question" />
          <meta property="fc:frame:button:2" content="Share" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="${baseUrl}" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/og" />
        </head>
        <body></body>
      </html>
    `;
  
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  }
  