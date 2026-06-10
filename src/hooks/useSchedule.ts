// src/hooks/useSchedule.ts
import { useState, useEffect } from 'react';
import { fetchSchedule, ScheduleResponse } from '../services/scheduleService';
import { ScheduleItem } from '../App';

interface UseScheduleReturn {
  schedule: ScheduleResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getScheduleFor: (programId: string | undefined, branch: 'raduzhny' | 'south') => ScheduleItem[];
}

export function useSchedule(): UseScheduleReturn {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSchedule();
      setSchedule(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      console.error('Schedule load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  // Безопасный getter с fallback на пустой массив
  const getScheduleFor = (
    programId: string | undefined,
    branch: 'raduzhny' | 'south'
  ): ScheduleItem[] => {
    if (!schedule || !programId) return [];
    return schedule[programId]?.[branch] || [];
  };

  return {
    schedule,
    loading,
    error,
    refetch: loadSchedule,
    getScheduleFor,
  };
}
