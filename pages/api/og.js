import { ImageResponse } from '@vercel/og';
import axios from 'axios';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get('message');
  
  try {
    console.log('Fetching trivia question...');
    
    const { data } = await axios.get('https://opentdb.com/api.php?amount=1&category=21&type=multiple');
    const questionData = data.results[0];

    const question = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const wrongAnswers = questionData.incorrect_answers;

    // Shuffle answers
    const answers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    console.log('Trivia question fetched successfully:', question);

    return new ImageResponse(
      (
        <div style={{ display: 'flex', backgroundColor: '#4CAF50', width: '100%', height: '100%', flexDirection: 'column', padding: '20px' }}>
          <h1 style={{ fontSize: '40px' }}>{question}</h1>
          <button style={{ margin: '10px' }}>{answers[0]}</button>
          <button style={{ margin: '10px' }}>{answers[1]}</button>
          <button style={{ margin: '10px' }}>{answers[2]}</button>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error('Error fetching trivia question:', error);

    return new ImageResponse(
      (
        <div style={{ display: 'flex', backgroundColor: '#FF0000', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Error Generating Question</h1>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
