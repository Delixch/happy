import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.CLOUDINARY_PRODUCT_FOLDER;

type CloudinaryResource = {
  secure_url: string;
  public_id: string;
  resource_type: string;
  width: number;
  height: number;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET || !FOLDER) {
    console.error('Cloudinary product image env vars missing');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/by_asset_folder?asset_folder=${encodeURIComponent(FOLDER)}&max_results=100`;

  try {
    const cloudRes = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!cloudRes.ok) {
      console.error('Cloudinary list error:', await cloudRes.text());
      return res.status(502).json({ error: 'Could not load images' });
    }

    const data = (await cloudRes.json()) as { resources: CloudinaryResource[] };
    const images = data.resources
      .filter((r) => r.resource_type === 'image')
      .map((r) => ({
        url: r.secure_url,
        width: r.width,
        height: r.height,
      }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ images });
  } catch (err) {
    console.error('Cloudinary fetch failed:', err);
    return res.status(500).json({ error: 'Could not load images' });
  }
}
