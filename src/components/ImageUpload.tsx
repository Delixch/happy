import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/cloudinary';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Datei darf max. 5 MB gross sein.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Upload fehlgeschlagen');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10">
          <img src={value} alt="Vorschau" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-dark-700/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 transition-colors"
            >
              Ändern
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-white/10 hover:border-gold-400/30 rounded-xl flex flex-col items-center justify-center gap-2 text-white/30 hover:text-gold-400/60 transition-all"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-sans">Hochladen...</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6" />
              <span className="text-xs font-sans">Bild hochladen</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-400 font-sans mt-2">{error}</p>}
    </div>
  );
}
