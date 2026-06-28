import { useState, useEffect } from 'react';
import { supabase, type InstagramPost } from '../../lib/supabase';
import { Plus, Trash2, Save, X, Loader2, Link2 } from 'lucide-react';

const emptyPost: Omit<InstagramPost, 'id' | 'created_at'> = {
  image_url: '',
  post_url: 'https://www.instagram.com/happybeck.ch',
  caption: '',
};

export default function AdminInstagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyPost);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('instagram_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const save = async () => {
    if (!form.image_url || !form.post_url) return;
    setSaving(true);
    await supabase.from('instagram_posts').insert([form]);
    setSaving(false);
    setIsNew(false);
    setForm(emptyPost);
    fetchPosts();
  };

  const remove = async (id: string) => {
    if (!confirm('Diesen Instagram-Beitrag wirklich löschen?')) return;
    await supabase.from('instagram_posts').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Instagram Posts</h1>
          <p className="text-white/40 font-sans text-sm mt-1">
            Verwalten Sie die Beiträge, die auf der Homepage angezeigt werden
          </p>
        </div>
        <button onClick={() => setIsNew(true)} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Beitrag hinzufügen
        </button>
      </div>

      {isNew && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider mb-4">Instagram-Beitrag hinzufügen</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Bild-URL (z.B. Unsplash oder Cloudinary Link) *</label>
              <input className="input-premium" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://images.unsplash.com/..." />
            </div>
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Instagram Post Link *</label>
              <input className="input-premium" value={form.post_url} onChange={(e) => setForm({ ...form, post_url: e.target.value })} placeholder="https://www.instagram.com/p/..." />
            </div>
            <div>
              <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung / Hashtags</label>
              <textarea className="input-premium min-h-[60px]" value={form.caption || ''} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="z.B. Hausgemachte Gipfeli! 🥐 #happybeck" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={save} disabled={saving || !form.image_url || !form.post_url} className="btn-gold flex items-center gap-2 text-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
              </button>
              <button onClick={() => setIsNew(false)} className="btn-gold-outline flex items-center gap-2 text-sm"><X className="w-4 h-4" /> Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-white/30 font-sans">Noch keine Instagram-Beiträge verlinkt.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.id} className="glass-card overflow-hidden group flex flex-col justify-between">
              <div className="relative aspect-square overflow-hidden bg-dark-500">
                {p.image_url && (
                  (p.image_url.match(/\.(mp4|webm|ogg|mov)$/i) || p.image_url.includes('/video/upload') || p.image_url.includes('video')) ? (
                    <video src={p.image_url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={p.image_url} alt="Insta preview" className="w-full h-full object-cover" />
                  )
                )}
                <button
                  onClick={() => remove(p.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-dark-900/80 border border-white/10 text-white/40 hover:text-red-400 transition-colors"
                  title="Beitrag löschen"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="p-4 bg-dark-900/30 flex-1 flex flex-col justify-between">
                <div>
                  {p.caption && (
                    <p className="text-xs text-white/60 font-sans line-clamp-2 mb-2 leading-relaxed">
                      {p.caption}
                    </p>
                  )}
                </div>
                <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center">
                  <a href={p.post_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gold-400 hover:underline flex items-center gap-1">
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
