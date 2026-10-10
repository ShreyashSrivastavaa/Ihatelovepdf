import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const revalidate = false;

export const alt = 'I Hate Love PDF: Private and Free PDF Tools in Your Browser';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #151d30 50%, #0d121f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '9999px',
            padding: '10px 24px',
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f87171' }}>
            100% Client-Side Processing • Zero Server Uploads
          </span>
        </div>
        <div
          style={{
            fontSize: '68px',
            fontWeight: 900,
            marginBottom: '20px',
            textAlign: 'center',
            letterSpacing: '-2px',
          }}
        >
          I Hate Love PDF
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            margin: 0,
            maxWidth: '850px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Free, private PDF tools to merge, compress, split, redact, edit, and convert PDFs directly inside your browser.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginTop: '40px',
            fontSize: '18px',
            color: '#64748b',
          }}
        >
          <span>Free Forever</span>
          <span>•</span>
          <span>No Watermarks</span>
          <span>•</span>
          <span>No Cloud Uploads</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
