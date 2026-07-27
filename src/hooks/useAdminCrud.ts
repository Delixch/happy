import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UseAdminCrudOptions<T, TForm> {
  table: string;
  orderBy: { column: string; ascending?: boolean };
  emptyForm: TForm;
  toForm: (item: T) => TForm;
  isValid: (form: TForm) => boolean;
  confirmDeleteMessage: string;
}

export function useAdminCrud<T extends { id: string }, TForm extends object>({
  table,
  orderBy,
  emptyForm,
  toForm,
  isValid,
  confirmDeleteMessage,
}: UseAdminCrudOptions<T, TForm>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<TForm>(emptyForm);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy.column, { ascending: orderBy.ascending ?? true });
    if (error) setError('Daten konnten nicht geladen werden: ' + error.message);
    if (data) setItems(data as T[]);
    setLoading(false);
  }, [table, orderBy.column, orderBy.ascending]);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNew = (overrides?: Partial<TForm>) => {
    setForm({ ...emptyForm, ...overrides });
    setIsNew(true);
    setEditing(null);
  };

  const startEdit = (item: T) => {
    setForm(toForm(item));
    setEditing(item.id);
    setIsNew(false);
  };

  const cancel = () => {
    setEditing(null);
    setIsNew(false);
  };

  const save = async () => {
    if (!isValid(form)) return;
    setSaving(true);
    const { error } = isNew
      ? await supabase.from(table).insert([form])
      : await supabase.from(table).update(form).eq('id', editing!);
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
    if (!confirm(confirmDeleteMessage)) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      setError('Löschen fehlgeschlagen: ' + error.message);
      return;
    }
    fetchItems();
  };

  return {
    items,
    loading,
    editing,
    form,
    setForm,
    isNew,
    saving,
    error,
    setError,
    fetchItems,
    startNew,
    startEdit,
    cancel,
    save,
    remove,
  };
}
