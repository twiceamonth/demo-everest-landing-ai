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
      { id: 'r1', day: 'Пн', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов' },
      { id: 'r2', day: 'Ср', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов' },
      { id: 'r3', day: 'Пт', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов' },
      { id: 'r4', day: 'Пн', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков' },
      { id: 'r5', day: 'Вт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков' },
      { id: 'r6', day: 'Ср', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков' },
      { id: 'r7', day: 'Чт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков' },
      { id: 'r8', day: 'Пт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков' },
      { id: 'r9', day: 'Сб', time: '14:00', title: 'Sparring Session', coach: 'М. Волков' },
    ],
    south: [
      { id: 's1', day: 'Пн', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов' },
      { id: 's2', day: 'Ср', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов' },
      { id: 's3', day: 'Пт', time: '09:00', title: 'Morning BJJ', coach: 'А. Семенов' },
      { id: 's4', day: 'Вт', time: '19:00', title: 'Evening Pro', coach: 'А. Чернов' },
      { id: 's5', day: 'Чт', time: '19:00', title: 'Evening Pro', coach: 'А. Чернов' },
      { id: 's6', day: 'Сб', time: '13:00', title: 'Sparring', coach: 'А. Семенов' },
    ],
  },
  grappling: {
    raduzhny: [
      { id: 'rg1', day: 'Вт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко' },
      { id: 'rg2', day: 'Чт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко' },
      { id: 'rg3', day: 'Сб', time: '12:00', title: 'Open Mat', coach: 'Сборная' },
      { id: 'rg4', day: 'Пн', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов' },
      { id: 'rg5', day: 'Ср', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов' },
    ],
    south: [
      { id: 'sg1', day: 'Пн', time: '19:00', title: 'Grappling Basics', coach: 'А. Семенов' },
      { id: 'sg2', day: 'Ср', time: '19:00', title: 'Grappling Basics', coach: 'А. Семенов' },
      { id: 'sg3', day: 'Пт', time: '19:00', title: 'Grappling Advanced', coach: 'А. Семенов' },
      { id: 'sg4', day: 'Сб', time: '11:00', title: 'Open Mat', coach: 'А. Семенов' },
    ],
  },
  kudo: {
    raduzhny: [
      { id: 'rk1', day: 'Вт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко' },
      { id: 'rk2', day: 'Чт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко' },
      { id: 'rk3', day: 'Сб', time: '10:00', title: 'Kudo Intensive', coach: 'В. Падалко' },
      { id: 'rk4', day: 'Пн', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко' },
      { id: 'rk5', day: 'Ср', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко' },
    ],
    south: [
      { id: 'sk1', day: 'Пн', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов' },
      { id: 'sk2', day: 'Ср', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов' },
      { id: 'sk3', day: 'Пт', time: '17:00', title: 'Kudo Kids', coach: 'А. Чернов' },
      { id: 'sk4', day: 'Вт', time: '20:00', title: 'Kudo Adults', coach: 'А. Чернов' },
      { id: 'sk5', day: 'Чт', time: '20:00', title: 'Kudo Adults', coach: 'А. Чернов' },
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