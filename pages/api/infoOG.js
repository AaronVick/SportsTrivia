import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  // Message for the introductory screen
  const message = "There are 20 random sports questions. Can you get all 20 right?";

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a202c',
          color: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
        }}
      >
        <h1>{message}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
