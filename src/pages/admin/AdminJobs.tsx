import { useState, useEffect } from 'react';
import { supabase, type Job } from '../../lib/supabase';
import { Plus, Pencil, Trash2, Save, X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';

const emptyJob: Omit<Job, 'id' | 'created_at'> = {
  title: '', location: '', type: 'Vollzeit', shift: '', description: '',
  requirements: [], is_active: true, sort_order: 0,
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyJob);
  const [reqInput, setReqInput] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await supabase.from('jobs').select('*').order('sort_order');
    if (data) setJobs(data);
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const startNew = () => { setForm({ ...emptyJob, sort_order: jobs.length + 1 }); setIsNew(true); setEditing(null); setReqInput(''); };
  const startEdit = (j: Job) => {
    setForm({ title: j.title, location: j.location, type: j.type, shift: j.shift, description: j.description, requirements: j.requirements || [], is_active: j.is_active, sort_order: j.sort_order });
    setEditing(j.id); setIsNew(false); setReqInput('');
  };
  const cancel = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!form.title) return;
    setSaving(true);
    if (isNew) await supabase.from('jobs').insert([form]);
    else if (editing) await supabase.from('jobs').update(form).eq('id', editing);
    setSaving(false); cancel(); fetchJobs();
  };

  const remove = async (id: string) => {
    if (!confirm('Dieses Inserat wirklich löschen?')) return;
    await supabase.from('jobs').delete().eq('id', id);
    fetchJobs();
  };

  const toggleActive = async (j: Job) => {
    await supabase.from('jobs').update({ is_active: !j.is_active }).eq('id', j.id);
    fetchJobs();
  };

  const addReq = () => {
    if (!reqInput.trim()) return;
    setForm({ ...form, requirements: [...form.requirements, reqInput.trim()] });
    setReqInput('');
  };

  const removeReq = (index: number) => {
    setForm({ ...form, requirements: form.requirements.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Jobs verwalten</h1>
          <p className="text-white/40 font-sans text-sm mt-1">{jobs.length} Inserate ({jobs.filter((j) => j.is_active).length} aktiv)</p>
        </div>
        <button onClick={startNew} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Neues Inserat
        </button>
      </div>

      {isNew && (
        <div className="glass-card p-6 mb-6">
          <h3 className="text-sm font-sans font-semibold text-gold-400 uppercase tracking-wider mb-4">Neues Inserat</h3>
          <JobForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel}
            reqInput={reqInput} setReqInput={setReqInput} addReq={addReq} removeReq={removeReq} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-gold-400 animate-spin" /></div>
      ) : jobs.length === 0 && !isNew ? (
        <div className="glass-card p-12 text-center"><p className="text-white/30 font-sans">Noch keine Inserate.</p></div>
      ) : (
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.id} className={`glass-card overflow-hidden ${!j.is_active ? 'opacity-50' : ''}`}>
              {editing === j.id ? (
                <div className="p-6">
                  <JobForm form={form} setForm={setForm} saving={saving} onSave={save} onCancel={cancel}
                    reqInput={reqInput} setReqInput={setReqInput} addReq={addReq} removeReq={removeReq} />
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-sans font-medium text-sm">{j.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider ${
                        j.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>{j.is_active ? 'Aktiv' : 'Inaktiv'}</span>
                    </div>
                    <p className="text-white/30 font-sans text-xs">{j.location} · {j.type}{j.shift ? ` · ${j.shift}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleActive(j)} className="p-2 text-white/30 hover:text-gold-400 transition-colors" title={j.is_active ? 'Deaktivieren' : 'Aktivieren'}>
                      {j.is_active ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button onClick={() => startEdit(j)} className="p-2 text-white/30 hover:text-gold-400 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(j.id)} className="p-2 text-white/30 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

function JobForm({ form, setForm, saving, onSave, onCancel, reqInput, setReqInput, addReq, removeReq }: {
  form: Omit<Job, 'id' | 'created_at'>; setForm: (f: Omit<Job, 'id' | 'created_at'>) => void;
  saving: boolean; onSave: () => void; onCancel: () => void;
  reqInput: string; setReqInput: (v: string) => void; addReq: () => void; removeReq: (i: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Titel *</label>
          <input className="input-premium" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="z.B. Bäcker/in" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Standort</label>
          <input className="input-premium" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="z.B. Langstrasse, Zürich" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschäftigungsart</label>
          <select className="input-premium" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="Vollzeit">Vollzeit</option>
            <option value="Teilzeit">Teilzeit</option>
            <option value="Aushilfe">Aushilfe</option>
            <option value="Praktikum">Praktikum</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Schicht</label>
          <input className="input-premium" value={form.shift || ''} onChange={(e) => setForm({ ...form, shift: e.target.value })} placeholder="z.B. Nachtschicht" />
        </div>
        <div>
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Status</label>
          <select className="input-premium" value={form.is_active ? 'true' : 'false'} onChange={(e) => setForm({ ...form, is_active: e.target.value === 'true' })}>
            <option value="true">Aktiv</option>
            <option value="false">Inaktiv</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-1">Beschreibung</label>
          <textarea className="input-premium min-h-[80px] resize-y" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Stellenbeschreibung" />
        </div>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-xs font-sans text-white/50 uppercase tracking-wider mb-2">Anforderungen</label>
        {form.requirements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {form.requirements.map((req, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-dark-400 text-white/60 text-xs font-sans rounded-full border border-white/5">
                {req}
                <button onClick={() => removeReq(i)} className="text-white/30 hover:text-red-400 transition-colors ml-1"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input className="input-premium flex-1" value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addReq(); } }} placeholder="Anforderung eingeben + Enter" />
          <button type="button" onClick={addReq} className="btn-gold-outline text-xs px-4">+</button>
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
