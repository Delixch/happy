import { type DailySpecial } from '../../lib/supabase';
import ImageUpload from '../../components/ImageUpload';
import ErrorBanner from '../../components/admin/ErrorBanner';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Plus, Pencil, Trash2, Save, X, Loader2, Calendar } from 'lucide-react';

type SpecialForm = Omit<DailySpecial, 'id' | 'created_at'>;

const emptySpecial: SpecialForm = {
  title: '', description: '', original_price: '', special_price: '',
  image_url: null, valid_date: new Date().toISOString().split('T')[0], is_active: true,
};

export default function AdminAktuelles() {
  const {
    items: specials, loading, editing, form, setForm, isNew, saving, error, setError,
    startNew: startNewSpecial, startEdit, cancel, save, remove,
  } = useAdminCrud<DailySpecial, SpecialForm>({
    table: 'daily_specials',
    orderBy: { column: 'valid_date', ascending: false },
    emptyForm: emptySpecial,
    toForm: (s) => ({
      title: s.title, description: s.description, original_price: s.original_price,
      special_price: s.special_price, image_url: s.image_url, valid_date: s.valid_date, is_active: s.is_active,
    }),
    isValid: (f) => !!f.title && !!f.special_price,
    confirmDeleteMessage: 'Dieses Tagesangebot wirklich löschen?',
  });

  const startNew = () => startNewSpecial();

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Tagesangebote</h1>
          <p className="text-white/40 font-sans text-sm mt-1">
            Heute's Spezial — jeden Tag ein neues Angebot
          </p>
        </div>
        <button onClick={startNew} className="admin-btn flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neues Angebot
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {isNew && (
        <div className="admin-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-[#FFFFCC] uppercase tracking-wider mb-4">Neues Tagesangebot</h3>
          <SpecialForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#FFFFCC] animate-spin" /></div>
      ) : specials.length === 0 && !isNew ? (
        <div className="admin-card p-12 text-center"><p className="text-white/30 font-sans">Noch keine Tagesangebote.</p></div>
      ) : (
        <div className="space-y-3">
          {specials.map((s) => (
            <div key={s.id} className={`admin-card overflow-hidden ${!s.is_active ? 'opacity-50' : ''}`}>
              {editing === s.id ? (
                <div className="p-6"><SpecialForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} /></div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {s.image_url && <img src={s.image_url} alt={s.title} className="w-12 h-12 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-sans font-medium text-sm">{s.title}</p>
                      {s.valid_date === today && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          Heute
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/30 font-sans text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {s.valid_date}
                      </span>
                      {s.original_price && <span className="text-white/20 line-through font-sans text-xs">{s.original_price}</span>}
                      <span className="text-[#FFFFCC] font-serif font-bold text-sm">{s.special_price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(s)} className="p-2 text-white/30 hover:text-[#FFFFCC] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(s.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

function SpecialForm({ form, setForm, saving, onSave, onCancel }: {
  form: Omit<DailySpecial, 'id' | 'created_at'>; setForm: (f: Omit<DailySpecial, 'id' | 'created_at'>) => void;
  saving: boolean; onSave: () => void; onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Titel *</label>
          <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="z.B. Mystery Gipfeli Box" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung</label>
          <textarea className="admin-input min-h-[60px] resize-y" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Kurze Beschreibung" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Originalpreis</label>
          <input className="admin-input" value={form.original_price || ''} onChange={(e) => setForm({ ...form, original_price: e.target.value })} placeholder="z.B. 9.50 CHF" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Spezialpreis *</label>
          <input className="admin-input" value={form.special_price} onChange={(e) => setForm({ ...form, special_price: e.target.value })} placeholder="z.B. 5.90 CHF" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Gültig am *</label>
          <input className="admin-input" type="date" value={form.valid_date} onChange={(e) => setForm({ ...form, valid_date: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Status</label>
          <select className="admin-input" value={form.is_active ? 'true' : 'false'} onChange={(e) => setForm({ ...form, is_active: e.target.value === 'true' })}>
            <option value="true">Aktiv</option>
            <option value="false">Inaktiv</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Bild</label>
        <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
      </div>
      <div className="flex items-center gap-3 pt-2 flex-wrap">
        <button onClick={onSave} disabled={saving || !form.title || !form.special_price} className="admin-btn flex items-center gap-2 text-sm px-5 py-2.5 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
        </button>
        <button onClick={onCancel} className="admin-btn-outline flex items-center gap-2 text-sm px-5 py-2.5 whitespace-nowrap"><X className="w-4 h-4" /> Abbrechen</button>
      </div>
    </div>
  );
}
