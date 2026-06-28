import { useState, useEffect } from 'react';
import { supabase, type Deal, type DealItem } from '../../lib/supabase';
import { Plus, Pencil, Trash2, Save, X, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const THEME_PRESETS = [
  { label: 'Amber (Morgen)', gradient: 'from-amber-500/20 to-orange-600/20', accent: 'text-amber-400' },
  { label: 'Emerald (Mittag)', gradient: 'from-emerald-500/20 to-green-600/20', accent: 'text-emerald-400' },
  { label: 'Rose (Abend)', gradient: 'from-rose-500/20 to-red-600/20', accent: 'text-rose-400' },
  { label: 'Gold (Spezial)', gradient: 'from-gold-400/20 to-amber-500/20', accent: 'text-gold-400' },
];

const emptyDeal: Omit<Deal, 'id' | 'created_at'> = {
  title: '',
  subtitle: '',
  description: '',
  gradient: THEME_PRESETS[0].gradient,
  accent_color: THEME_PRESETS[0].accent,
  is_new: false,
  is_special: false,
  items: [],
  sort_order: 0,
};

export default function AdminDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyDeal);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchDeals = async () => {
    setLoading(true);
    const { data } = await supabase.from('deals').select('*').order('sort_order', { ascending: true });
    if (data) setDeals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const startNew = () => {
    const nextSort = deals.length > 0 ? Math.max(...deals.map(d => d.sort_order)) + 1 : 0;
    setForm({ ...emptyDeal, sort_order: nextSort });
    setIsNew(true);
    setEditing(null);
  };

  const startEdit = (d: Deal) => {
    setForm({
      title: d.title,
      subtitle: d.subtitle || '',
      description: d.description || '',
      gradient: d.gradient,
      accent_color: d.accent_color,
      is_new: d.is_new,
      is_special: d.is_special,
      items: d.items || [],
      sort_order: d.sort_order,
    });
    setEditing(d.id);
    setIsNew(false);
  };

  const cancel = () => {
    setEditing(null);
    setIsNew(false);
  };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    if (isNew) {
      await supabase.from('deals').insert([form]);
    } else if (editing) {
      await supabase.from('deals').update(form).eq('id', editing);
    }
    setSaving(false);
    cancel();
    fetchDeals();
  };

  const remove = async (id: string) => {
    if (!confirm('Diesen Deal wirklich löschen?')) return;
    await supabase.from('deals').delete().eq('id', id);
    fetchDeals();
  };

  const move = async (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= deals.length) return;

    const current = deals[index];
    const swap = deals[nextIndex];

    const currentOrder = current.sort_order;
    current.sort_order = swap.sort_order;
    swap.sort_order = currentOrder;

    setLoading(true);
    await Promise.all([
      supabase.from('deals').update({ sort_order: current.sort_order }).eq('id', current.id),
      supabase.from('deals').update({ sort_order: swap.sort_order }).eq('id', swap.id),
    ]);
    fetchDeals();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Jubiläums-Deals</h1>
          <p className="text-white/40 font-sans text-sm mt-1">
            Verwalten Sie die exklusiven Aktions-Angebote auf der Jubiläumsseite
          </p>
        </div>
        <button onClick={startNew} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neuer Deal
        </button>
      </div>

      {isNew && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider mb-4">Neuer Deal</h3>
          <DealForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
        </div>
      ) : deals.length === 0 && !isNew ? (
        <div className="glass-card p-12 text-center">
          <p className="text-white/30 font-sans">Noch keine Deals angelegt.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deals.map((d, index) => (
            <div key={d.id} className="glass-card overflow-hidden">
              {editing === d.id ? (
                <div className="p-6">
                  <DealForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  <div className={`w-3 h-12 rounded bg-gradient-to-b ${d.gradient}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-white font-sans font-semibold text-sm">{d.title}</p>
                      {d.subtitle && <span className="text-white/40 font-sans text-xs">({d.subtitle})</span>}
                      <div className="flex gap-1.5">
                        {d.is_new && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">NEU</span>
                        )}
                        {d.is_special && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider bg-gold-400/10 text-gold-400 border border-gold-400/20">SPECIAL</span>
                        )}
                      </div>
                    </div>
                    {d.description && (
                      <p className="text-white/30 font-sans text-xs truncate mt-1">{d.description}</p>
                    )}
                    <p className="text-gold-400 font-sans text-xs mt-1">
                      {d.items?.length || 0} Menüs/Produkte hinterlegt
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-white/30 hover:text-gold-400 disabled:opacity-20 disabled:hover:text-white/30 transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(index, 'down')}
                      disabled={index === deals.length - 1}
                      className="p-2 text-white/30 hover:text-gold-400 disabled:opacity-20 disabled:hover:text-white/30 transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => startEdit(d)} className="p-2 text-white/30 hover:text-gold-400 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(d.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
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

interface DealFormProps {
  form: Omit<Deal, 'id' | 'created_at'>;
  setForm: React.Dispatch<React.SetStateAction<Omit<Deal, 'id' | 'created_at'>>>;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

function DealForm({ form, setForm, saving, onSave, onCancel }: DealFormProps) {
  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { name: '', price: '' }]
    }));
  };

  const removeItem = (idx: number) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  };

  const updateItemField = (idx: number, field: keyof DealItem, val: string) => {
    setForm(prev => {
      const updated = [...prev.items];
      updated[idx] = { ...updated[idx], [field]: val === '' ? undefined : val };
      return { ...prev, items: updated };
    });
  };

  const selectPreset = (gradient: string, accent: string) => {
    setForm(prev => ({ ...prev, gradient, accent_color: accent }));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Titel *</label>
          <input className="input-premium" value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} placeholder="z.B. Happy Morning" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Untertitel</label>
          <input className="input-premium" value={form.subtitle || ''} onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))} placeholder="z.B. Jubiläums-Deals" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Zusatzinfo / Beschreibung (Mehrzeilig möglich)</label>
          <textarea className="input-premium min-h-[60px] resize-y" value={form.description || ''} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="z.B. Zu jedem Menü: Amaretti..." />
        </div>

        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Farbschema & Design</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {THEME_PRESETS.map((preset, idx) => {
              const isSelected = form.gradient === preset.gradient;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectPreset(preset.gradient, preset.accent)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                    isSelected ? 'border-gold-400 bg-gold-400/5' : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <div className={`w-3 h-6 rounded bg-gradient-to-b ${preset.gradient}`} />
                  <span className="text-xs text-white/70 font-sans truncate">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-6 items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-white/70 font-sans cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_new}
              onChange={(e) => setForm(prev => ({ ...prev, is_new: e.target.checked }))}
              className="rounded bg-dark-500 border-white/10 text-gold-400 focus:ring-gold-400"
            />
            <span>"NEU" Badge anzeigen</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70 font-sans cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_special}
              onChange={(e) => setForm(prev => ({ ...prev, is_special: e.target.checked }))}
              className="rounded bg-dark-500 border-white/10 text-gold-400 focus:ring-gold-400"
            />
            <span>"SPECIAL" Badge anzeigen</span>
          </label>
        </div>
      </div>

      {/* Dynamic Deal Items Section */}
      <div className="border-t border-white/5 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-sans text-gold-400 uppercase tracking-wider font-semibold">Menüs / Produkte im Deal</h4>
          <button type="button" onClick={addItem} className="text-xs flex items-center gap-1 text-gold-400 hover:text-gold-300 font-sans transition-all">
            <Plus className="w-3.5 h-3.5" /> Produkt hinzufügen
          </button>
        </div>

        {form.items.length === 0 ? (
          <div className="glass-card-light p-4 text-center text-white/30 text-xs font-sans">
            Noch keine Produkte eingetragen. Mindestens ein Produkt wird empfohlen.
          </div>
        ) : (
          <div className="space-y-3">
            {form.items.map((item, idx) => (
              <div key={idx} className="glass-card-light p-4 relative group/item border border-white/5 hover:border-white/10">
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-2 right-2 text-white/20 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
                  <div>
                    <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Produktname/Kombination *</label>
                    <input
                      className="input-premium text-xs py-1.5"
                      value={item.name}
                      onChange={(e) => updateItemField(idx, 'name', e.target.value)}
                      placeholder="z.B. Kaffee + Gipfeli + Valser"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Aktionspreis *</label>
                      <input
                        className="input-premium text-xs py-1.5"
                        value={item.price}
                        onChange={(e) => updateItemField(idx, 'price', e.target.value)}
                        placeholder="z.B. 7.80 CHF"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Normalpreis (optional)</label>
                      <input
                        className="input-premium text-xs py-1.5"
                        value={item.oldPrice || ''}
                        onChange={(e) => updateItemField(idx, 'oldPrice', e.target.value)}
                        placeholder="z.B. 9.90 CHF"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Zusatzbemerkung (optional)</label>
                    <input
                      className="input-premium text-xs py-1.5"
                      value={item.note || ''}
                      onChange={(e) => updateItemField(idx, 'note', e.target.value)}
                      placeholder="z.B. (Costa Kaffee, Valser oder Cola Zero)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <button
          onClick={onSave}
          disabled={saving || !form.title || form.items.some(i => !i.name || !i.price)}
          className="btn-gold flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
        </button>
        <button onClick={onCancel} className="btn-gold-outline flex items-center gap-2 text-sm">
          <X className="w-4 h-4" /> Abbrechen
        </button>
      </div>
    </div>
  );
}
