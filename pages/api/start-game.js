export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-vercel-app-url.vercel.app';
  
  try {
    console.log('Start game endpoint hit');
    
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    
    const { untrustedData } = req.body;
    const { totalAnswered = 0, correctCount = 0 } = JSON.parse(decodeURIComponent(untrustedData?.state || '{}'));

    if (totalAnswered >= 20) {
      // Game over, show final score
      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/og?message=${encodeURIComponent(`Game Over! You got ${correctCount} out of 20 correct!`)}" />
          <meta property="fc:frame:button:1" content="Play Again" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/infoScreen" />
        </head>
        <body></body>
      </html>`;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    // Fetch new question
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=21&type=multiple');
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No question data received from API');
    }

    const questionData = data.results[0];
    const { question, correct_answer, incorrect_answers } = questionData;

    if (!question || !correct_answer || !incorrect_answers || incorrect_answers.length === 0) {
      throw new Error('Invalid question data received from API');
    }

    // Select only one wrong answer
    const wrongAnswer = incorrect_answers[Math.floor(Math.random() * incorrect_answers.length)];

    // Randomly order the correct and wrong answer
    const answers = [correct_answer, wrongAnswer].sort(() => Math.random() - 0.5);
    const correctIndex = answers.indexOf(correct_answer) + 1; // +1 because button indices start at 1

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/api/og?message=${encodeURIComponent(question)}" />
        <meta property="fc:frame:button:1" content="${answers[0]}" />
        <meta property="fc:frame:button:2" content="${answers[1]}" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/answerOG" />
        <meta property="fc:frame:state" content="${encodeURIComponent(JSON.stringify({ 
          totalAnswered, 
          correctCount, 
          correctTitle: correct_answer,
          correctIndex
        }))}" />
      </head>
      <body></body>
    </html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    console.log('Question sent successfully');
  } catch (error) {
    console.error('Error in start game:', error);
    
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
  }
}