import { AlertTriangle, X } from 'lucide-react';

export default function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-sans text-red-300">
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss} className="text-red-300/70 hover:text-red-200 flex-shrink-0" aria-label="Fehlermeldung schliessen">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
