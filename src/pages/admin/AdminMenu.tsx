import { useState, useEffect } from 'react';
import { supabase, type MenuItem, type MenuCategory } from '../../lib/supabase';
import ImageUpload from '../../components/ImageUpload';
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

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from('menu_items').select('*').order('sort_order');
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
    if (isNew) {
      await supabase.from('menu_items').insert([form]);
    } else if (editing) {
      await supabase.from('menu_items').update(form).eq('id', editing);
    }
    setSaving(false);
    cancel();
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Diesen Artikel wirklich löschen?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
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

      {/* Items List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
        </div>
      ) : filtered.length === 0 && !isNew ? (
        <div className="glass-card p-12 text-center">
          <p className="text-white/30 font-sans">Keine Artikel in dieser Kategorie.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="glass-card overflow-hidden">
              {editing === item.id ? (
                <div className="p-6">
                  <ItemForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-sans font-medium text-sm">{item.name}</p>
                    {item.description && <p className="text-white/30 font-sans text-xs truncate">{item.description}</p>}
                  </div>
                  <span className="text-gold-400 font-serif font-bold text-sm whitespace-nowrap">{item.price}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(item)} className="p-2 text-white/30 hover:text-gold-400 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
