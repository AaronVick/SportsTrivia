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
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Arial", sans-serif',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            lineHeight: '1.2',
            margin: '0',
            padding: '0',
            whiteSpace: 'pre-wrap',
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