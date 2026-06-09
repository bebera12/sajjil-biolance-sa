import { useState, useCallback } from 'react';
import { ProductRegistration, ProductCategory, StepStatus, createRegistration } from '@/lib/registration-data';

const STORAGE_KEY = 'sajjil_registrations';

function loadRegistrations(): ProductRegistration[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveRegistrations(regs: ProductRegistration[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(regs));
}

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<ProductRegistration[]>(loadRegistrations);

  const addRegistration = useCallback((name: string, category: ProductCategory) => {
    const reg = createRegistration(name, category);
    setRegistrations(prev => {
      const next = [reg, ...prev];
      saveRegistrations(next);
      return next;
    });
    return reg.id;
  }, []);

  const updateStepStatus = useCallback((regId: string, stepId: string, status: StepStatus) => {
    setRegistrations(prev => {
      const next = prev.map(r =>
        r.id === regId
          ? { ...r, steps: r.steps.map(s => s.id === stepId ? { ...s, status } : s) }
          : r
      );
      saveRegistrations(next);
      return next;
    });
  }, []);

  const deleteRegistration = useCallback((regId: string) => {
    setRegistrations(prev => {
      const next = prev.filter(r => r.id !== regId);
      saveRegistrations(next);
      return next;
    });
  }, []);

  return { registrations, addRegistration, updateStepStatus, deleteRegistration };
}
