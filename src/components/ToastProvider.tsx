
"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type?: Toast['type']) => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed z-[9999] top-6 right-6 flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[220px] rounded-xl px-5 py-3 shadow-lg text-sm font-medium animate-fade-in-up transition-all
              ${toast.type === 'success' ? 'bg-[#e6f9ed] text-[#1f6946] border border-[#b9d8c7]' : ''}
              ${toast.type === 'error' ? 'bg-[#ffeaea] text-[#a12a2a] border border-[#f5bcbc]' : ''}
              ${toast.type === 'info' || !toast.type ? 'bg-white/90 text-[#2e4f7a] border border-[#d6dae2]' : ''}
            `}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
