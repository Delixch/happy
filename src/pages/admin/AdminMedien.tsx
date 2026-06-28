import { useState, useEffect } from 'react';
import { supabase, type MediaItem } from '../../lib/supabase';
import { Plus, Pencil, Trash2, Save, X, Loader2, Play } from 'lucide-react';

type MediaType = 'tv' | 'presse' | 'online';
const TYPES: { id: MediaType; label: string }[] = [
  { id: 'tv', label: 'TV Berichte' },
  { id: 'presse', label: 'Presse' },
  { id: 'online', label: 'Online News' },
];

const emptyItem: Omit<MediaItem, 'id' | 'created_at'> = {
  type: 'tv', title: '', url: '', description: '', sort_order: 0,
};

export default function AdminMedien() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<MediaType>('tv');

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('media_items').select('*').order('sort_order');
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const startNew = () => { setForm({ ...emptyItem, type: activeTab, sort_order: filtered.length + 1 }); setIsNew(true); setEditing(null); };
  const startEdit = (item: MediaItem) => { setForm({ type: item.type, title: item.title, url: item.url, description: item.description, sort_order: item.sort_order }); setEditing(item.id); setIsNew(false); };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    if (isNew) await supabase.from('media_items').insert([form]);
    else if (editing) await supabase.from('media_items').update(form).eq('id', editing);
    setSaving(false); cancel(); fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Diesen Medienbeitrag wirklich löschen?')) return;
    await supabase.from('media_items').delete().eq('id', id);
    fetchItems();
  };

  const filtered = items.filter((i) => i.type === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Medien verwalten</h1>
          <p className="text-white/40 font-sans text-sm mt-1">{items.length} Beiträge</p>
        </div>
        <button onClick={startNew} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neuer Beitrag
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); cancel(); }}
            className={`px-4 py-2 rounded-lg text-sm font-sans transition-all ${
              activeTab === t.id ? 'bg-gold-400 text-dark-700 font-semibold' : 'bg-dark-400 text-white/50 border border-white/10 hover:text-white/80'
            }`}
          >
            {t.label} ({items.filter((i) => i.type === t.id).length})
          </button>
        ))}
      </div>

      {isNew && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider mb-4">Neuer Beitrag</h3>
          <MediaForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-gold-400 animate-spin" /></div>
      ) : filtered.length === 0 && !isNew ? (
        <div className="glass-card p-12 text-center"><p className="text-white/30 font-sans">Keine Beiträge in dieser Kategorie.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="glass-card overflow-hidden">
              {editing === item.id ? (
                <div className="p-6"><MediaForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} /></div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {item.type === 'tv' && item.url && (
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-dark-500">
                      <img src={`https://i.ytimg.com/vi/${item.url}/default.jpg`} alt="" className="w-full h-full object-cover opacity-70" />
                      <Play className="absolute inset-0 m-auto w-4 h-4 text-gold-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-sans font-medium text-sm">{item.title}</p>
                    {item.url && <p className="text-white/30 font-sans text-xs truncate">{item.url}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(item)} className="p-2 text-white/30 hover:text-gold-400 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(item.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MediaForm({ form, setForm, saving, onSave, onCancel }: {
  form: Omit<MediaItem, 'id' | 'created_at'>; setForm: (f: Omit<MediaItem, 'id' | 'created_at'>) => void;
  saving: boolean; onSave: () => void; onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Titel *</label>
          <input className="input-premium" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Beitragsname" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Typ</label>
          <select className="input-premium" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as MediaType })}>
            {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">
            {form.type === 'tv' ? 'YouTube Video ID' : 'URL'}
          </label>
          <input className="input-premium" value={form.url || ''} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder={form.type === 'tv' ? 'z.B. SEpS4LEEjzE' : 'https://...'} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung</label>
          <input className="input-premium" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Reihenfolge</label>
          <input className="input-premium" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={onSave} disabled={saving || !form.title} className="btn-gold flex items-center gap-2 text-sm disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
        </button>
        <button onClick={onCancel} className="btn-gold-outline flex items-center gap-2 text-sm"><X className="w-4 h-4" /> Abbrechen</button>
      </div>
    </div>
  );
}
