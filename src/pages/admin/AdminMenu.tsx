import { useState, useEffect } from 'react';
import { supabase, type MenuItem, type MenuCategory } from '../../lib/supabase';
import ImageUpload from '../../components/ImageUpload';
import ErrorBanner from '../../components/admin/ErrorBanner';
import { Plus, Pencil, Trash2, Save, X, Loader2 } from 'lucide-react';

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'fruehstueck', label: 'Frühstück' },
  { id: 'salziges', label: 'Salziges' },
  { id: 'sandwich', label: 'Sandwiches' },
  { id: 'suess', label: 'Süsses' },
  { id: 'getraenke', label: 'Getränke' },
];

const emptyItem: Omit<MenuItem, 'id' | 'created_at'> = {
  category: 'fruehstueck',
  name: '',
  description: '',
  price: '',
  image_url: null,
  sort_order: 0,
};

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuCategory>('fruehstueck');
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('menu_items').select('*').order('sort_order');
    if (error) setError('Artikel konnten nicht geladen werden: ' + error.message);
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const startNew = () => {
    setForm({ ...emptyItem, category: activeTab, sort_order: filtered.length + 1 });
    setIsNew(true);
    setEditing(null);
  };

  const startEdit = (item: MenuItem) => {
    setForm({ category: item.category, name: item.name, description: item.description, price: item.price, image_url: item.image_url, sort_order: item.sort_order });
    setEditing(item.id);
    setIsNew(false);
  };

  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    const { error } = isNew
      ? await supabase.from('menu_items').insert([form])
      : await supabase.from('menu_items').update(form).eq('id', editing!);
    setSaving(false);
    if (error) {
      setError('Speichern fehlgeschlagen: ' + error.message);
      return;
    }
    setError(null);
    cancel();
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Diesen Artikel wirklich löschen?')) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      setError('Löschen fehlgeschlagen: ' + error.message);
      return;
    }
    fetchItems();
  };

  const filtered = items.filter((i) => i.category === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Menü verwalten</h1>
          <p className="text-white/40 font-sans text-sm mt-1">{items.length} Artikel insgesamt</p>
        </div>
        <button onClick={startNew} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neuer Artikel
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveTab(cat.id); cancel(); }}
            className={`px-4 py-2 rounded-lg text-sm font-sans transition-all ${
              activeTab === cat.id
                ? 'bg-gold-400 text-dark-700 font-semibold'
                : 'bg-dark-400 text-white/50 border border-white/10 hover:text-white/80'
            }`}
          >
            {cat.label} ({items.filter((i) => i.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* New Item Form */}
      {isNew && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider mb-4">Neuer Artikel</h3>
          <ItemForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {/* Items List - 3 Column Live Gradient Preview Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
        </div>
      ) : filtered.length === 0 && !isNew ? (
        <div className="glass-card p-12 text-center">
          <p className="text-white/40 font-sans">Keine Artikel in dieser Kategorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, idx) => {
            const cardThemes = [
              { bg: 'bg-gradient-to-br from-[#FFE4D6] via-[#FFD8C0] to-[#FCA5A5]/30 border-[#FFAA80]', badgeBg: 'bg-[#D82A6C]', titleColor: 'text-[#9E1B4C]' },
              { bg: 'bg-gradient-to-br from-[#FFF0D6] via-[#FFE2B3] to-[#FCD34D]/30 border-[#FBBF24]', badgeBg: 'bg-[#E5931A]', titleColor: 'text-[#9C5A08]' },
              { bg: 'bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#38BDF8]/20 border-[#7DD3FC]', badgeBg: 'bg-[#2563EB]', titleColor: 'text-[#1D4ED8]' },
              { bg: 'bg-gradient-to-br from-[#FFE4E6] via-[#FECDD3] to-[#FB7185]/30 border-[#FDA4AF]', badgeBg: 'bg-[#E11D48]', titleColor: 'text-[#BE123C]' },
              { bg: 'bg-gradient-to-br from-[#F3E8FF] via-[#E9D5FF] to-[#C084FC]/30 border-[#DDD6FE]', badgeBg: 'bg-[#7C3AED]', titleColor: 'text-[#6D28D9]' },
              { bg: 'bg-gradient-to-br from-[#FFEDD5] via-[#FED7AA] to-[#FB923C]/30 border-[#FDBA74]', badgeBg: 'bg-[#EA580C]', titleColor: 'text-[#C2410C]' },
            ];

            const theme = cardThemes[idx % cardThemes.length];

            return (
              <div key={item.id} className="relative group">
                {editing === item.id ? (
                  <div className="glass-card p-6 col-span-full">
                    <ItemForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
                  </div>
                ) : (
                  <div className={`relative ${theme.bg} rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] shadow-md flex justify-between gap-3 overflow-hidden min-h-[180px]`}>
                    <div className="flex-1 flex flex-col justify-between z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-7 h-7 rounded-full ${theme.badgeBg} text-white font-sans font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            {idx + 1}
                          </span>
                          <h3 className={`text-base font-bold font-sans ${theme.titleColor} leading-tight line-clamp-1`}>
                            {item.name}
                          </h3>
                        </div>
                        {item.description && (
                          <p className="text-xs text-[#52443C] font-sans leading-relaxed line-clamp-2 pr-1">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#52443C]/10">
                        <span className="bg-[#251A14] text-white font-sans font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                          {item.price}
                        </span>

                        <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                          <button onClick={() => startEdit(item)} className="p-1 text-[#251A14] hover:text-[#E5931A] transition-colors" title="Bearbeiten">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => remove(item.id)} className="p-1 text-[#251A14] hover:text-red-600 transition-colors" title="Löschen">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {item.image_url && (
                      <div className="w-[85px] h-full flex-shrink-0 relative overflow-hidden rounded-xl">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover object-center rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ItemForm({
  form, setForm, saving, onSave, onCancel,
}: {
  form: Omit<MenuItem, 'id' | 'created_at'>;
  setForm: (f: Omit<MenuItem, 'id' | 'created_at'>) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Name *</label>
          <input className="input-premium" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Artikelname" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Preis *</label>
          <input className="input-premium" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="z.B. 4.90 CHF" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung</label>
          <input className="input-premium" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Kurzbeschreibung" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Kategorie</label>
          <select className="input-premium" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as MenuCategory })}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Reihenfolge</label>
          <input className="input-premium" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Bild</label>
        <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={onSave} disabled={saving || !form.name || !form.price} className="btn-gold flex items-center gap-2 text-sm disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Speichern
        </button>
        <button onClick={onCancel} className="btn-gold-outline flex items-center gap-2 text-sm">
          <X className="w-4 h-4" /> Abbrechen
        </button>
      </div>
    </div>
  );
}
