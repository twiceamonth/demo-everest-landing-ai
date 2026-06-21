import { useState, useEffect } from 'react';
import { fetchPricing, PricingResponse } from '../services/pricingService';
import { PricingItem } from '../App';

interface UsePricingReturn {
  pricing: PricingResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getPricingFor: (audience: 'general' | 'parents' | 'men') => PricingItem[];
}

export function usePricing(): UsePricingReturn {
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPricing();
      setPricing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки тарифов');
      console.error('Pricing load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, []);

  const getPricingFor = (audience: 'general' | 'parents' | 'men'): PricingItem[] => {
    if (!pricing) return [];
    return pricing[audience] || [];
  };

  return {
    pricing,
    loading,
    error,
    refetch: loadPricing,
    getPricingFor,
  };
}
