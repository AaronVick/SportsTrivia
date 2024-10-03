export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-vercel-app-url.vercel.app';
  const { untrustedData } = req.body;
  const buttonIndex = untrustedData?.buttonIndex;
  const { correctTitle, correctIndex, totalAnswered = 0, correctCount = 0 } = JSON.parse(decodeURIComponent(untrustedData?.state || '{}'));

  const isCorrect = buttonIndex === correctIndex;
  const newCorrectCount = correctCount + (isCorrect ? 1 : 0);
  const newTotalAnswered = totalAnswered + 1;
  const message = isCorrect 
    ? `Correct! The answer was ${correctTitle}.`
    : `Wrong. The correct answer was ${correctTitle}.`;

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/og?message=${encodeURIComponent(message)}" />
      <meta property="fc:frame:button:1" content="${newTotalAnswered < 20 ? 'Next Question' : 'See Final Score'}" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/start-game" />
      <meta property="fc:frame:state" content="${encodeURIComponent(JSON.stringify({ 
        totalAnswered: newTotalAnswered, 
        correctCount: newCorrectCount 
      }))}" />
    </head>
    <body></body>
  </html>`;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}