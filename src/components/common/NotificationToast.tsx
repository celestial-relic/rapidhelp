import React from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useRapidhelp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        let bgStyle = 'bg-slate-900 border-slate-700 text-white';
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />;

        if (n.type === 'success') {
          bgStyle = 'bg-[#0C1C34] border-emerald-500/40 text-white shadow-emerald-950/30';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
        } else if (n.type === 'warning') {
          bgStyle = 'bg-[#0C1C34] border-amber-500/40 text-white shadow-amber-950/30';
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
        } else if (n.type === 'error') {
          bgStyle = 'bg-[#0C1C34] border-rose-500/40 text-white shadow-rose-950/30';
          icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />;
        }

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-in ${bgStyle}`}
          >
            {icon}
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="text-xs font-bold tracking-wide uppercase text-white/90">
                {n.title}
              </h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{n.message}</p>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
