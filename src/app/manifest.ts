import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ihatelovepdf — Private & Free PDF Tools',
    short_name: 'ihatelovepdf',
    description:
      'Fast, 100% private browser PDF toolkit to compress, merge, split, crop, rotate, and convert PDFs without server uploads.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/images/stickers/ihatelove.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/stickers/ihatelove.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
