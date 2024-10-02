import Head from 'next/head';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-app-url.vercel.app';
  const shareText = encodeURIComponent(`Test your sports trivia knowledge!\nFrame by @aaronv.eth`);
  const shareLink = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(baseUrl)}`;

  return (
    <div>
      <Head>
        <title>Sports Trivia Game</title>
        <meta name="description" content="Can you ace all 20 sports questions?" />
        <meta property="og:title" content="Sports Trivia Game" />
        <meta property="og:image" content={`${baseUrl}/sportsGame.png`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${baseUrl}/sportsGame.png`} />
        <meta property="fc:frame:button:1" content="Play Game" />
        <meta property="fc:frame:button:2" content="Share" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content={shareLink} />
        <meta property="fc:frame:post_url" content={`${baseUrl}/api/infoScreen`} />
      </Head>
      <h1>Sports Trivia Game</h1>
      <img
        src="/sportsGame.png"
        alt="Sports Trivia"
        width="600"
        height="300"
      />
    </div>
  );
}
