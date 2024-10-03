import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get('message');
  
  try {
    return new ImageResponse(
      (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#1a202c', 
          width: '100%', 
          height: '100%', 
          padding: '40px 20px',
          textAlign: 'center',
          color: 'white',
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            maxWidth: '80%',
            wordWrap: 'break-word',
          }}>{message}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);

    return new ImageResponse(
      (
        <div style={{ display: 'flex', backgroundColor: '#FF0000', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Error Generating Image</h1>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}