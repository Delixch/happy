import { type InstagramPost } from '../../lib/supabase';
import ErrorBanner from '../../components/admin/ErrorBanner';
import ImageUpload from '../../components/ImageUpload';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Plus, Trash2, Save, X, Loader2, Link2 } from 'lucide-react';

type PostForm = Omit<InstagramPost, 'id' | 'created_at'>;

const emptyPost: PostForm = {
  image_url: '',
  post_url: 'https://www.instagram.com/happybeck.ch',
  caption: '',
};

export default function AdminInstagram() {
  const {
    items: posts, loading, form, setForm, isNew, saving, error, setError,
    startNew: startNewPost, cancel, save, remove,
  } = useAdminCrud<InstagramPost, PostForm>({
    table: 'instagram_posts',
    orderBy: { column: 'created_at', ascending: false },
    emptyForm: emptyPost,
    toForm: (p) => ({ image_url: p.image_url, post_url: p.post_url, caption: p.caption }),
    isValid: (f) => !!f.image_url && !!f.post_url,
    confirmDeleteMessage: 'Diesen Instagram-Beitrag wirklich löschen?',
  });

  const startNew = () => startNewPost();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Instagram Posts</h1>
          <p className="text-white/40 font-sans text-sm mt-1">
            Verwalten Sie die Beiträge, die auf der Homepage angezeigt werden
          </p>
        </div>
        <button onClick={startNew} className="admin-btn flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Beitrag hinzufügen
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {isNew && (
        <div className="admin-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-[#FFFFCC] uppercase tracking-wider mb-4">Instagram-Beitrag hinzufügen</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Vorschaubild *</label>
              <p className="text-[11px] text-white/30 font-sans mb-2">
                Screenshot oder Cover des Reels/Posts hochladen — der Instagram-Link selbst zeigt hier kein Bild an, Instagram erlaubt kein direktes Einbinden.
              </p>
              <ImageUpload value={form.image_url || null} onChange={(url) => setForm({ ...form, image_url: url || '' })} />
            </div>
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Instagram Post Link *</label>
              <input className="admin-input" value={form.post_url} onChange={(e) => setForm({ ...form, post_url: e.target.value })} placeholder="https://www.instagram.com/reel/..." />
              <p className="text-[11px] text-white/30 font-sans mt-1">
                Dahin geht's, wenn jemand auf den Beitrag tippt.
              </p>
            </div>
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung / Hashtags</label>
              <textarea className="admin-input min-h-[60px]" value={form.caption || ''} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="z.B. Hausgemachte Gipfeli! 🥐 #happybeck" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={save} disabled={saving || !form.image_url || !form.post_url} className="admin-btn flex items-center gap-2 text-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
              </button>
              <button onClick={cancel} className="admin-btn-outline flex items-center gap-2 text-sm"><X className="w-4 h-4" /> Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#FFFFCC] animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="admin-card p-12 text-center">
          <p className="text-white/30 font-sans">Noch keine Instagram-Beiträge verlinkt.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.id} className="admin-card overflow-hidden group flex flex-col justify-between">
              <div className="relative aspect-square overflow-hidden bg-[#232300]">
                {p.image_url && (
                  (p.image_url.match(/\.(mp4|webm|ogg|mov)$/i) || p.image_url.includes('/video/upload') || p.image_url.includes('video')) ? (
                    <video src={p.image_url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={p.image_url} alt="Insta preview" className="w-full h-full object-cover" />
                  )
                )}
                <button
                  onClick={() => remove(p.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-[#0D0D00]/80 border border-white/10 text-white/40 hover:text-red-400 transition-colors"
                  title="Beitrag löschen"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="p-4 bg-[#0D0D00]/30 flex-1 flex flex-col justify-between">
                <div>
                  {p.caption && (
                    <p className="text-xs text-white/60 font-sans line-clamp-2 mb-2 leading-relaxed">
                      {p.caption}
                    </p>
                  )}
                </div>
                <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center">
                  <a href={p.post_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#FFFFCC] hover:underline flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> Beitrag öffnen
                  </a>
                  <span className="text-[9px] text-white/20 font-mono">ID: {p.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
