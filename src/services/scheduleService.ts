import { ScheduleItem } from '../App';

// ============================================
// ТЕКУЩИЙ РЕЖИМ: Хардкод (заглушка)
// БУДУЩИЙ РЕЖИМ: WordPress REST API
// Переключатель режима:
const USE_WORDPRESS_API = false; // ← когда будете готовы, поставьте true
// ============================================

// Временные моковые данные (пока нет API)
const MOCK_SCHEDULE: Record<string, Record<'raduzhny' | 'south', ScheduleItem[]>> = {
  bjj: {
    raduzhny: [
      { id: 'r1', day: 'Пн', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
      { id: 'r2', day: 'Ср', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
      { id: 'r3', day: 'Пт', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
      { id: 'r4', day: 'Пн', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
      { id: 'r5', day: 'Вт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
      { id: 'r6', day: 'Ср', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
      { id: 'r7', day: 'Чт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
      { id: 'r8', day: 'Пт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
      { id: 'r9', day: 'Сб', time: '14:00', title: 'Sparring Session', coach: 'М. Волков', type: 'sparring' },
    ],
    south: [
      { id: 's1', day: 'Пн', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов', type: 'fundamentals' },
      { id: 's2', day: 'Ср', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов', type: 'fundamentals' },
      { id: 's3', day: 'Пт', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов', type: 'fundamentals' },
      { id: 's4', day: 'Вт', time: '19:00', title: 'Evening Pro', coach: 'А. Чернов', type: 'advanced' },
      { id: 's5', day: 'Чт', time: '19:00', title: 'Evening Pro', coach: 'А. Чернов', type: 'advanced' },
      { id: 's6', day: 'Сб', time: '13:00', title: 'Sparring', coach: 'А. Семенов', type: 'sparring' },
    ],
  },
  grappling: {
    raduzhny: [
      { id: 'rg1', day: 'Вт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко', type: 'fundamentals' },
      { id: 'rg2', day: 'Чт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко', type: 'fundamentals' },
      { id: 'rg3', day: 'Сб', time: '12:00', title: 'Open Mat', coach: 'Сборная', type: 'free' },
      { id: 'rg4', day: 'Пн', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов', type: 'advanced' },
      { id: 'rg5', day: 'Ср', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов', type: 'advanced' },
    ],
    south: [
      { id: 'sg1', day: 'Пн', time: '19:00', title: 'Grappling Basics', coach: 'А. Семенов', type: 'fundamentals' },
      { id: 'sg2', day: 'Ср', time: '19:00', title: 'Grappling Basics', coach: 'А. Семенов', type: 'fundamentals' },
      { id: 'sg3', day: 'Пт', time: '19:00', title: 'Grappling Advanced', coach: 'А. Семенов', type: 'advanced' },
      { id: 'sg4', day: 'Сб', time: '11:00', title: 'Open Mat', coach: 'А. Семенов', type: 'free' },
    ],
  },
  kudo: {
    raduzhny: [
      { id: 'rk1', day: 'Вт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко', type: 'fundamentals' },
      { id: 'rk2', day: 'Чт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко', type: 'fundamentals' },
      { id: 'rk3', day: 'Сб', time: '10:00', title: 'Kudo Intensive', coach: 'В. Падалко', type: 'advanced' },
      { id: 'rk4', day: 'Пн', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко', type: 'advanced' },
      { id: 'rk5', day: 'Ср', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко', type: 'advanced' },
    ],
    south: [
      { id: 'sk1', day: 'Пн', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов', type: 'fundamentals' },
      { id: 'sk2', day: 'Ср', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов', type: 'fundamentals' },
      { id: 'sk3', day: 'Пт', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов', type: 'fundamentals' },
      { id: 'sk4', day: 'Вт', time: '20:00', title: 'Kudo Adults', coach: 'А. Чернов', type: 'advanced' },
      { id: 'sk5', day: 'Чт', time: '20:00', title: 'Kudo Adults', coach: 'А. Чернов', type: 'advanced' },
    ],
  },
};

// Тип данных, который возвращает API
export interface ScheduleResponse {
  [programId: string]: {
    raduzhny: ScheduleItem[];
    south: ScheduleItem[];
  };
}

/**
 * Получить расписание из источника данных
 * В будущем: fetch к WordPress REST API
 */
export async function fetchSchedule(): Promise<ScheduleResponse> {
  if (USE_WORDPRESS_API) {
    // === БУДУЩИЙ РЕЖИМ: WordPress API ===
    const response = await fetch('https://everest.tomsk.ru/wp-json/everest/v1/schedule', {
      cache: 'no-store', // всегда свежие данные
    });
    
    if (!response.ok) {
      throw new Error('Не удалось загрузить расписание');
    }
    
    return response.json();
  }
  
  // === ТЕКУЩИЙ РЕЖИМ: Моковые данные ===
  // Имитируем задержку сети (чтобы UI loading state работал корректно)
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_SCHEDULE;
}
