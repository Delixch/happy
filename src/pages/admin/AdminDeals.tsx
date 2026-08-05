import { supabase, type Deal, type DealItem } from '../../lib/supabase';
import ErrorBanner from '../../components/admin/ErrorBanner';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Plus, Pencil, Trash2, Save, X, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const THEME_PRESETS = [
  { label: 'Amber (Morgen)', gradient: 'from-amber-500/20 to-orange-600/20', accent: 'text-amber-400' },
  { label: 'Emerald (Mittag)', gradient: 'from-emerald-500/20 to-green-600/20', accent: 'text-emerald-400' },
  { label: 'Rose (Abend)', gradient: 'from-rose-500/20 to-red-600/20', accent: 'text-rose-400' },
  { label: 'Gold (Spezial)', gradient: 'from-[#FFFFCC]/20 to-amber-500/20', accent: 'text-[#FFFFCC]' },
];

type DealForm = Omit<Deal, 'id' | 'created_at'>;

const emptyDeal: DealForm = {
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
  const {
    items: deals, loading, editing, form, setForm, isNew, saving, error, setError,
    startNew: startNewDeal, startEdit, cancel, save, remove, fetchItems: fetchDeals,
  } = useAdminCrud<Deal, DealForm>({
    table: 'deals',
    orderBy: { column: 'sort_order', ascending: true },
    emptyForm: emptyDeal,
    toForm: (d) => ({
      title: d.title,
      subtitle: d.subtitle || '',
      description: d.description || '',
      gradient: d.gradient,
      accent_color: d.accent_color,
      is_new: d.is_new,
      is_special: d.is_special,
      items: d.items || [],
      sort_order: d.sort_order,
    }),
    isValid: (f) => !!f.title,
    confirmDeleteMessage: 'Diesen Deal wirklich löschen?',
  });

  const startNew = () => {
    const nextSort = deals.length > 0 ? Math.max(...deals.map(d => d.sort_order)) + 1 : 0;
    startNewDeal({ sort_order: nextSort });
  };

  const move = async (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= deals.length) return;

    const current = deals[index];
    const swap = deals[nextIndex];
    const currentOrder = current.sort_order;
    const swapOrder = swap.sort_order;

    const [{ error: e1 }, { error: e2 }] = await Promise.all([
      supabase.from('deals').update({ sort_order: swapOrder }).eq('id', current.id),
      supabase.from('deals').update({ sort_order: currentOrder }).eq('id', swap.id),
    ]);
    if (e1 || e2) {
      setError('Reihenfolge konnte nicht geändert werden: ' + (e1 || e2)!.message);
      return;
    }
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
        <button onClick={startNew} className="admin-btn flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neuer Deal
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {isNew && (
        <div className="admin-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-[#FFFFCC] uppercase tracking-wider mb-4">Neuer Deal</h3>
          <DealForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#FFFFCC] animate-spin" />
        </div>
      ) : deals.length === 0 && !isNew ? (
        <div className="admin-card p-12 text-center">
          <p className="text-white/30 font-sans">Noch keine Deals angelegt.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deals.map((d, index) => (
            <div key={d.id} className="admin-card overflow-hidden">
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
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider bg-[#FFFFCC]/10 text-[#FFFFCC] border border-[#FFFFCC]/20">SPECIAL</span>
                        )}
                      </div>
                    </div>
                    {d.description && (
                      <p className="text-white/30 font-sans text-xs truncate mt-1">{d.description}</p>
                    )}
                    <p className="text-[#FFFFCC] font-sans text-xs mt-1">
                      {d.items?.length || 0} Menüs/Produkte hinterlegt
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-white/30 hover:text-[#FFFFCC] disabled:opacity-20 disabled:hover:text-white/30 transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(index, 'down')}
                      disabled={index === deals.length - 1}
                      className="p-2 text-white/30 hover:text-[#FFFFCC] disabled:opacity-20 disabled:hover:text-white/30 transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => startEdit(d)} className="p-2 text-white/30 hover:text-[#FFFFCC] transition-colors">
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
          <input className="admin-input" value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} placeholder="z.B. Happy Morning" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Untertitel</label>
          <input className="admin-input" value={form.subtitle || ''} onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))} placeholder="z.B. Jubiläums-Deals" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Zusatzinfo / Beschreibung (Mehrzeilig möglich)</label>
          <textarea className="admin-input min-h-[60px] resize-y" value={form.description || ''} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="z.B. Zu jedem Menü: Amaretti..." />
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
                    isSelected ? 'border-[#FFFFCC] bg-[#FFFFCC]/5' : 'border-white/5 bg-white/[0.01]'
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
              className="rounded bg-[#232300] border-white/10 text-[#FFFFCC] focus:ring-[#FFFFCC]"
            />
            <span>"NEU" Badge anzeigen</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70 font-sans cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_special}
              onChange={(e) => setForm(prev => ({ ...prev, is_special: e.target.checked }))}
              className="rounded bg-[#232300] border-white/10 text-[#FFFFCC] focus:ring-[#FFFFCC]"
            />
            <span>"SPECIAL" Badge anzeigen</span>
          </label>
        </div>
      </div>

      {/* Dynamic Deal Items Section */}
      <div className="border-t border-white/5 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-sans text-[#FFFFCC] uppercase tracking-wider font-semibold">Menüs / Produkte im Deal</h4>
          <button type="button" onClick={addItem} className="text-xs flex items-center gap-1 text-[#FFFFCC] hover:text-[#F0F0B0] font-sans transition-all">
            <Plus className="w-3.5 h-3.5" /> Produkt hinzufügen
          </button>
        </div>

        {form.items.length === 0 ? (
          <div className="admin-card-light p-4 text-center text-white/30 text-xs font-sans">
            Noch keine Produkte eingetragen. Mindestens ein Produkt wird empfohlen.
          </div>
        ) : (
          <div className="space-y-3">
            {form.items.map((item, idx) => (
              <div key={idx} className="admin-card-light p-4 relative group/item border border-white/5 hover:border-white/10">
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
                      className="admin-input text-xs py-1.5"
                      value={item.name}
                      onChange={(e) => updateItemField(idx, 'name', e.target.value)}
                      placeholder="z.B. Kaffee + Gipfeli + Valser"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Aktionspreis *</label>
                      <input
                        className="admin-input text-xs py-1.5"
                        value={item.price}
                        onChange={(e) => updateItemField(idx, 'price', e.target.value)}
                        placeholder="z.B. 7.80 CHF"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Normalpreis (optional)</label>
                      <input
                        className="admin-input text-xs py-1.5"
                        value={item.oldPrice || ''}
                        onChange={(e) => updateItemField(idx, 'oldPrice', e.target.value)}
                        placeholder="z.B. 9.90 CHF"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-sans text-white/40 uppercase mb-0.5">Zusatzbemerkung (optional)</label>
                    <input
                      className="admin-input text-xs py-1.5"
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
          className="admin-btn flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
        </button>
        <button onClick={onCancel} className="admin-btn-outline flex items-center gap-2 text-sm">
          <X className="w-4 h-4" /> Abbrechen
        </button>
      </div>
    </div>
  );
}
