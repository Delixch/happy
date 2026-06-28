const CLOUD_NAME = ((import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || 'dsdsb4lqw') as string;
const UPLOAD_PRESET = ((import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || 'happy_beck') as string;

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'happy-beck');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Upload fehlgeschlagen');
  }

  const data = await response.json();
  return data.secure_url;
}

export function getCloudinaryUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }) {
  const transforms = [];
  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  if (options?.crop) transforms.push(`c_${options.crop}`);
  transforms.push('q_auto', 'f_auto');
  
  const transformStr = transforms.length > 0 ? transforms.join(',') + '/' : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}${publicId}`;
}
