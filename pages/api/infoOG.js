import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const message = "There are 20 random sports questions.\n\nCan you get all 20 right?";

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a202c',
          color: '#fff',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          alignItems: 'center', // Center horizontally
          fontFamily: '"Arial", sans-serif',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            lineHeight: '1.4',
            maxWidth: '80%',
            whiteSpace: 'pre-line', // Allows line breaks
          }}
        >
          {message}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
