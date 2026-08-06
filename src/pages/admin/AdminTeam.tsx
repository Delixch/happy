import { type TeamMember } from '../../lib/supabase';
import ImageUpload from '../../components/ImageUpload';
import ErrorBanner from '../../components/admin/ErrorBanner';
import { useAdminCrud } from '../../hooks/useAdminCrud';
import { Plus, Pencil, Trash2, Save, X, Loader2 } from 'lucide-react';

type MemberForm = Omit<TeamMember, 'id' | 'created_at'>;

const emptyMember: MemberForm = {
  name: '', role: '', description: '', image_url: null, sort_order: 0,
};

export default function AdminTeam() {
  const {
    items: members, loading, editing, form, setForm, isNew, saving, error, setError,
    startNew: startNewMember, startEdit, cancel, save, remove,
  } = useAdminCrud<TeamMember, MemberForm>({
    table: 'team_members',
    orderBy: { column: 'sort_order' },
    emptyForm: emptyMember,
    toForm: (m) => ({ name: m.name, role: m.role, description: m.description, image_url: m.image_url, sort_order: m.sort_order }),
    isValid: (f) => !!f.name && !!f.role,
    confirmDeleteMessage: 'Dieses Teammitglied wirklich löschen?',
  });

  const startNew = () => startNewMember({ sort_order: members.length + 1 });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Team verwalten</h1>
          <p className="text-white/40 font-sans text-sm mt-1">{members.length} Mitglieder</p>
        </div>
        <button onClick={startNew} className="admin-btn flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neues Mitglied
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {isNew && (
        <div className="admin-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-[#FFFFCC] uppercase tracking-wider mb-4">Neues Mitglied</h3>
          <MemberForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#FFFFCC] animate-spin" /></div>
      ) : members.length === 0 && !isNew ? (
        <div className="admin-card p-12 text-center"><p className="text-white/30 font-sans">Noch keine Teammitglieder.</p></div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="admin-card overflow-hidden">
              {editing === m.id ? (
                <div className="p-6"><MemberForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel} /></div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  {m.image_url ? (
                    <img src={m.image_url} alt={m.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-1 ring-[#FFFFCC]/20" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#2C2C00] border border-white/10 flex items-center justify-center text-[#FFFFCC]/40 font-serif text-lg flex-shrink-0">
                      {m.name[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-sans font-medium text-sm">{m.name}</p>
                    <p className="text-[#FFFFCC]/60 font-sans text-xs">{m.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(m)} className="p-2 text-white/30 hover:text-[#FFFFCC] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(m.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

function MemberForm({ form, setForm, saving, onSave, onCancel }: {
  form: Omit<TeamMember, 'id' | 'created_at'>; setForm: (f: Omit<TeamMember, 'id' | 'created_at'>) => void;
  saving: boolean; onSave: () => void; onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Name *</label>
          <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Rolle *</label>
          <input className="admin-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="z.B. Bäcker/in" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung</label>
          <textarea className="admin-input min-h-[80px] resize-y" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Kurze Beschreibung" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Reihenfolge</label>
          <input className="admin-input" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Foto</label>
        <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
      </div>
      <div className="flex items-center gap-3 pt-2 flex-wrap">
        <button onClick={onSave} disabled={saving || !form.name || !form.role} className="admin-btn flex items-center gap-2 text-sm px-5 py-2.5 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
        </button>
        <button onClick={onCancel} className="admin-btn-outline flex items-center gap-2 text-sm px-5 py-2.5 whitespace-nowrap"><X className="w-4 h-4" /> Abbrechen</button>
      </div>
    </div>
  );
}
