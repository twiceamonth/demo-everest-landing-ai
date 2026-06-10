import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  Menu, 
  X, 
  Calendar, 
  Check, 
  Star,
  ChevronDown,
  MapPin,
  Clock,
  Award,
  Users,
  Target,
  Zap,
  Shield,
  Dumbbell,
  Heart,
  Compass,
  Gift,
	ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import png1 from './assets/1.png'
import png2 from './assets/2.png'
import png3 from './assets/3.png'
import about_us from './assets/about-us.png'
import bjj from './assets/bjj.jpg'
import greppling from './assets/greppling.jpg'
import hero_men from './assets/hero_men.jpg'
import hero_parents from './assets/hero_parents.jpg'
import image2 from './assets/image2.svg'
import kudo from './assets/kudo.jpg'
import logo from './assets/logo.png'
import vk from './assets/vk.png'
import yandex from './assets/yandex-logo.svg'
import gis2 from './assets/2gis-logo.svg'

// --- Types ---
interface Coach {
  id: string;
  name: string;
  rank: string;
  title: string;
  bio: string;
  image: string;
  achievements: string[];
  specialization: string[];
}

interface Program {
  id: string;
  name: string;
  target: string;
  description: string;
  image: string;
}

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  coach: string;
  type: 'fundamentals' | 'advanced' | 'sparring' | 'free';
}

// --- Data ---
const COACHES: Coach[] = [
  {
    id: 'padalko',
    name: 'Падалко Владимир Сергеевич',
    rank: '2 Дан JKA / 1 Кю ФКР',
    title: 'Тренер по Кудо / МС России',
    bio: 'Вице-президент Федерации Кудо Томской области. Высшее экономическое образование ТГУ ЭФ. Специалист по спортивной подготовке по виду спорта. Мастер спорта России. Судья 1й категории. 2 Дан - JKA. 1 кю - ФКР',
    image: png1,
    achievements: [
      'Мастер спорта России',
      'Мастер 2го Дана JKA',
      'Судья 1-й категории'
    ],
    specialization: [
      'Кудо',
      'Каратэ JKA',
      'Спортивная подготовка'
    ]
  },
  {
    id: 'chernov',
    name: 'Чернов Андрей Алексеевич',
    rank: 'Черный пояс 5 дан',
    title: 'Директор центра / Старший тренер по боевому джиу-джитсу',
    bio: 'Образование высшее, ТГПУ факультет физической культуры. Тренерский стаж с 2003 года. Тренирует детей, юношей и взрослых. Основатель региональной общественной организации "Федерация боевого дзю-дзютцу" Томской Области. Черный пояс 5 дан. Педагог 1 категории.',
    image: png2,
    achievements: [
      'Основатель Федерации боевого дзю-дзютцу ТО',
      'Черный пояс 5 дан',
      'Педагог 1 категории'
    ],
    specialization: [
      'Боевое джиу-джитсу',
      'Детские тренировки',
      'Подготовка инструкторов'
    ]
  },
  {
    id: 'semenov',
    name: 'Семенов Александр Иванович',
    rank: 'Сборная Томской Области',
    title: 'Тренер по боевому джиу-джитсу',
    bio: 'Помощник главного тренера спортивного Центра "Эверест". Входит в состав сборной Томской области. Тренирует детей с 7 лет. Призер кубка России по боевому джиу-джитсу, многократный чемпион Сибири.',
    image: png3,
    achievements: [
      'Призер кубка России',
      'Многократный чемпион Сибири',
      'Член сборной Томской области'
    ],
    specialization: [
      'Боевое джиу-джитсу',
      'Детские тренировки (7+)',
      'Спортивная подготовка'
    ]
  }
];

const PROGRAMS: Program[] = [
  {
    id: 'bjj',
    name: 'Боевое джиу-джитсу',
    target: 'Для детей / Для взрослых',
    description: 'Система самозащиты и рукопашного боя, вобравшая в себя лучшие приемы из борьбы, ударов и болевых воздействий. Обучение включает технику бросков, удушающих и болевых приемов на руки и ноги.',
    image: bjj,
  },
  {
    id: 'kudo',
    name: 'Кудо',
    target: 'Для детей / Для взрослых',
    description: 'Современное полноконтактное боевое искусство, сочетающее в себе карате, дзюдо и тайский бокс. Особенности — защитный шлем и возможность использовать как ударную, так и борцовскую технику.',
    image: kudo,
  },
  {
    id: 'grappling',
    name: 'Грэпплинг',
    target: 'Для детей / Для взрослых',
    description: 'Вид спортивного единоборства, совмещающий технику всех борцовских дисциплин с минимальными ограничениями по использованию болевых и удушающих приемов. В отличие от БЖЖ, здесь не используется кимоно, что делает схватки более динамичными и скоростными.',
    image: greppling, // Grappling action
  }
];

const SCHEDULE: ScheduleItem[] = [
  { id: '1', day: 'Пн', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
  { id: '2', day: 'Ср', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
  { id: '3', day: 'Пт', time: '10:00', title: 'Fundamentals', coach: 'А. Соколов', type: 'fundamentals' },
  { id: '4', day: 'Пн', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
  { id: '5', day: 'Вт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
  { id: '6', day: 'Ср', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
  { id: '7', day: 'Чт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
  { id: '8', day: 'Пт', time: '18:00', title: 'Pro Level', coach: 'Д. Новиков', type: 'advanced' },
  { id: '9', day: 'Сб', time: '14:00', title: 'Sparring Session', coach: 'М. Волков', type: 'sparring' },
];

const REVIEWS_MAP = {
  general: [
    { id: '1', name: 'Сергей Перминов', date: 'Яндекс.Карты – 2 октября 2025', rating: 5, text: 'Зал супер ребëнок занимается уже 3 года! Тренер хороший по джиу-джитсу Андрей Алексеевич! Тренеруюсь сам в этом зале уже 2 года!' },
    { id: '2', name: 'Николай Спирин', date: 'Яндекс.Карты – 23 февраля 2026', rating: 5, text: 'Место сильных, место силы. В этом клубе работают профессионалы . Мальчишки и девчонки а так же их родители кто хочет присоединиться к спорту духовитых вам нужно сюда 💪' },
    { id: '3', name: 'оксана шелепень', date: 'Яндекс.Карты – 5 июня 2021', rating: 5, text: 'Спортклуб Эверест , рядом с нашим домом.Внук ходит сюда на тренировки , ему очень все нравится. Тренер очень хороший ,Антон Александрович.Мы очень всем довольны.' },
  ],
  parents: [
    { id: 'p1', name: 'Наталья s.', date: 'Яндекс.Карты – 2 октября 2025', rating: 5, text: 'Сын ходит в Эверест уже год. За это время очень многому научился.Достиг определенных успехов.Постоянно проходят внутренние соревнования,летом ездили на спортивные сборы. Команда ребят очень дружная. Тренер ,Андрей Алексеевич, умеет заинтересовать ребят, передает свои знания и опыт детям .Сыну очень нравится заниматься. Рекомендую всем!' },
    { id: 'p2', name: 'Наталья 🌼', date: '2Гис – 1 ноября 2025', rating: 5, text: 'Замечательный тренер,за каждого подопечного переживает,как за своего ребенка. Удобное расположение. Сын ходит второй год,стал уверенней и смелее. Часто проходят внутренние соревнования и различные мероприятия. Открылся второй филиал в Южных воротах. Очень рекомендую для занятий мальчиков (и девочек тоже)' },
    { id: 'p3', name: 'Максим Попов', date: '2Гис – 11 февраля 2024', rating: 5, text: 'Прекрасный центр! Двое моих детей ходят туда на занятия. Нравится активность директора этого заведения: постоянные соревнования, неравнодушное отношение к ученикам, и видно, что человек живёт спортом и детьми. Спасибо Вам, Андрей Алексеевич!' },
  ],
  men: [
    { id: 'm1', name: 'Сергей Перминов', date: '2Гис – 11 февраля 2024', rating: 5, text: 'Здравствуйте Тренеруюсь в этом клубе уже пол года!!!Тренер Андрей Алексеевич очень хороший!!! Команда у нас тоже хорошая!!! Ребята друг друга увожают!!!Рекомендую' },
    { id: 'm2', name: 'Петя Романов', date: '2Гис – 14 сентября 2024', rating: 5, text: 'Эверест прикольный туда я хожу на боевое искусство советую сходить очень сильно помогает в сложных ситуациях, особенно когда тебя начинают бить' },
    { id: 'm3', name: 'юрий орехов', date: 'Яндекс.Карты – 5 октября 2021', rating: 4, text: 'Зал не большой, но есть разные виды спорта, очень хороший тренер по борьбе самбо' },
  ]
};

const BENEFITS_MAP = {
  general: [
    { title: 'Уверенность', desc: 'Побеждайте внутренние страхи и сомнения, становясь сильнее с каждой тренировкой.', icon: <Check size={40} /> },
    { title: 'Дисциплина', desc: 'Регулярные тренировки закаляют характер и приучают к порядку во всех сферах жизни.', icon: <Shield size={40} /> },
    { title: 'Сила', desc: 'Развивайте силу своего тела под руководством профессиональных тренеров.', icon: <Dumbbell size={40} /> },
    { title: 'Техника', desc: 'Овладейте искусством рычагов и контроля, позволяющим побеждать более крупных противников.', icon: <Zap size={40} /> },
    { title: 'Дух', desc: 'Обретите ментальную устойчивость, которая приходит через преодоление трудностей на татами.', icon: <Target size={40} /> },
    { title: 'Сообщество', desc: 'Станьте частью сплоченного братства сильных людей, всегда готовых поддержать.', icon: <Users size={40} /> },
  ],
  parents: [
    { title: 'УВЕРЕННОСТЬ', desc: 'Ваш ребенок победит свои внутренние страхи и сомнения, становясь сильнее с каждым занятием на татами.', icon: <Zap size={40} /> },
    { title: 'ДИСЦИПЛИНА', desc: 'Регулярные тренировки закаляют характер вашего ребенка и приучают к порядку во всех сферах жизни.', icon: <Target size={40} /> },
    { title: 'СИЛА', desc: 'Здесь ваш ребенок сможет развить сильное и выносливое тело под чутким руководством опытных инструкторов.', icon: <Dumbbell size={40} /> },
    { title: 'ТЕХНИКА', desc: 'Ваш ребенок овладеет искусством рычагов и контроля, позволяющим защититься от противников.', icon: <Shield size={40} /> },
    { title: 'ДУХ', desc: 'Ваш ребенок обретет ментальную устойчивость, которая приходит через преодоление трудностей.', icon: <Award size={40} /> },
    { title: 'СООБЩЕСТВО', desc: 'Ваш ребенок станет частью сплоченного детского коллектива, всегда готового поддержать.', icon: <Users size={40} /> },
  ],
  men: [
    { title: 'ЭНЕРГИЯ', desc: 'Тренировки помогут вернуть бодрость и ощущение сил на каждый день – без вечной усталости и «разбитого» утра.', icon: <Zap size={40} /> },
    { title: 'ТОНУС', desc: 'Вы почувствуете, как тело становится собраннее, а кофе больше не нужен как единственный источник энергии.', icon: <Dumbbell size={40} /> },
    { title: 'СТРОЙНОСТЬ', desc: 'Регулярные занятия помогут убрать лишнее, вернуть легкость в теле и снова комфортно смотреть на себя в зеркало.', icon: <Target size={40} /> },
    { title: 'ЗДОРОВАЯ СПИНА И СУСТАВЫ', desc: 'Тренировки укрепляют тело, снижают дискомфорт от сидячего образа жизни и помогают двигаться свободнее.', icon: <Heart size={40} /> },
    { title: 'УВЕРЕННОСТЬ В СЕБЕ', desc: 'Вы снова почувствуете, что в форме, сильнее и увереннее – не только внешне, но и внутренне.', icon: <Award size={40} /> },
    { title: 'ПОДДЕРЖКА И КОМФОРТ', desc: 'Заниматься можно без стресса: в понятной атмосфере, под контролем тренера, без лишнего давления и неловкости.', icon: <Users size={40} /> },
  ]
};

const AUDIENCE_HERO_MAP = {
  general: {
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA046Pdpw7o5BuYQ8-1D2pDhy0sdJy6tYK6ZifIdKKhL4qy8qP8GK08Opu7Eb-GjmzApmnxvDwirw_blS5_7VKmdluIIh5bk1J-9hKgHjtI01JUghe0M6eMCBb_J3itdzHkBRhuLqUZ-uhRToeEnA8iTbrZXRQtWJHuwB1oodjDjTtmrV-Wird6YjdQLqh-1AJbyTHtP7aoST_6oTCX-qmhK4_PXl-fTky9zQHOgLoGhZ-3wgbWsQCaHEK_VVGuvzFOxEfyJ2nFwYdf',
    badge: null,
    subBadge: 'БОЕВОЕ ДЖИУ-ДЖИТСУ • КУДО • ГРЭППЛИНГ',
    ctaText: (
              <>
                ЗАПИСАТЬСЯ НА
                <br className="sm:hidden" />
                {' '}БЕСПЛАТНУЮ ТРЕНИРОВКУ
              </>
            ),
    titleText: (
      <>
        ПУТЬ <br className="sm:hidden" /> К&nbsp;ВЕРШИНЕ <br className="sm:hidden" /> МАСТЕРСТВА
      </>
    ),
    description: null
  },
  parents: {
    bgImage: hero_parents,
    badge: 'Безопасность • Дисциплина • Здоровье',
    subBadge: 'КУДО И ДЖИУ-ДЖИТСУ ДЛЯ ДЕТЕЙ ОТ 4 ЛЕТ',
    ctaText: 'ЗАПИСАТЬ РЕБЕНКА НА БЕСПЛАТНУЮ ТРЕНИРОВКУ',
    titleText: (
      <>
        ВОСПИТАНИЕ <br className="sm:hidden" /> ХАРАКТЕРА <br className="sm:hidden" /> И СИЛЫ
      </>
    ),
    description: 'Развиваем дисциплину, уверенность в себе и физическую выносливость с самого детства в безопасном формате тренировок с заботливыми наставниками.'
  },
  men: {
    bgImage: hero_men,
    badge: 'Мини-группы • Личный контроль • Восстановление',
    subBadge: 'БОЕВОЕ ДЖИУ-ДЖИТСУ • КУДО • ГРЭППЛИНГ',
    ctaText: 'НАЧАТЬ С БЕСПЛАТНОЙ ТРЕНИРОВКИ',
    titleText: (
      <>
        ТЕЛО НЕ ЖДЁТ. <br /> ВЕРНИ КОНТРОЛЬ <br /> <span className="whitespace-nowrap">НАД СОБОЙ</span>
      </>
    ),
    description: 'Персональные тренировки для мужчин 35+. Мини-группы до 6 человек. Личный контроль без жестких боев — системное восстановление силы.'
  }
};

const ABOUT_US_MAP = {
  general: about_us,
  parents: about_us,
  men: hero_men, 
};

const AUDIENCE_STATS_MAP = {
  general: [
    { value: '3', label: 'Вида спорта' },
    { value: '462', label: 'Наград' },
    { value: '3', label: 'Тренера' },
    { value: '951', label: 'Воспитанников' },
  ],
  parents: [
    { value: '23', label: <>года опыта<br />воспитания детей</> },
    { value: '0%', label: 'травм на\u00a0мягком татами' },
    { value: '3', label: 'опытных тренера-наставника' },
    { value: '3', label: 'детские секции' },
  ],
  men: [
    { value: '6', label: 'человек в\u00a0мини-группе' },
    { value: '35+', label: 'осознанный возраст на\u00a0ковре' },
    { value: '100%', label: 'контроль безопасности и нагрузок' },
    { value: '20+', label: 'мужчин в\u00a0сильном сообществе' },
  ]
};

const AUDIENCE_PROGRAMS_MAP = {
  general: PROGRAMS,
  parents: [
    {
      id: 'bjj',
      name: 'Боевое джиу-джитсу для детей',
      target: 'Младшая (4+) и старшая группы',
      description: 'Безопасное введение детей в мир борьбы. Основы самостраховки, мягкая гимнастика, развитие силы и гибкости без вреда для спины. Ребенок научится думать тактически и владеть своим телом.',
      image: 'https://everest.tomsk.ru/wp-content/uploads/2023/12/Frame-1046077-1.png'
    },
    {
      id: 'kudo',
      name: 'Кудо для детей',
      target: 'Группы 4-6 лет и 7+ лет',
      description: 'Динамичное боевое искусство в защитных шлемах NEO HEAD GEAR с защитными пластиковыми забралами, минимизирующими любой риск травм. Воспитываем командный дух, мужскую и спортивную дисциплину, уважение к старшим.',
      image: 'https://everest.tomsk.ru/wp-content/uploads/2024/01/Frame-1046075.png'
    },
    {
      id: 'grappling',
      name: 'Детский грэпплинг',
      target: 'Для детей от 7 лет',
      description: 'Увлекательная скоростная борьба без кимоно. Учит ловкости, выносливости и быстрой реакции в игровом формате. Развивает невероятную координацию и упорство у ребенка.',
      image: 'https://everest.tomsk.ru/wp-content/uploads/2024/01/Frame-10461172.png'
    }
  ],
  men: [
    {
      id: 'bjj',
      name: 'Боевое джиу-джитсу',
      target: 'Для мужчин / Новички и профи',
      description: 'Прикладная система самообороны и рукопашного боя. Болевые и удушающие приемы, бросковая техника, контроль оппонента в партере. Идеально подходит для обретения уверенности и боевой техники на любой случай жизни.',
      image: bjj
    },
    {
      id: 'kudo',
      name: 'Кудо',
      target: 'Реальное полноконтактное кудо',
      description: 'Максимально приближенное к жизни боевое искусство. Сочетает мощную ударную технику руками и ногами, подножки, подсечки, борьбу в партере. Защитный шлем с забралом позволяет драться в полную силу с минимальной вероятностью синяков для офисной работы.',
      image: kudo
    },
    {
      id: 'grappling',
      name: 'Грэпплинг',
      target: 'Для мужчин любого уровня',
      description: 'Функциональный борцовский тренинг. Никаких кимоно — быстрая, силовая борьба на татами на основе болевых и удушающих. Развивает железную спину, стальной хват и безграничную кардио-выносливость.',
      image: greppling
    }
  ]
};

const AUDIENCE_PRICING_MAP = {
  general: [
    { id: 'single', name: 'Разовое занятие', price: '700', period: 'за 1 тренировку в группе', items: ['Занятие в общей группе по расписанию', 'Любая дисциплина на выбор', 'Инструктаж тренера и разбор ошибок'] },
    { id: 'unlimit', name: 'Абонемент на месяц', price: '4500', period: 'в месяц (групповые)', items: ['Все дисциплины без ограничений по посещениям', 'Развитие выносливости и техники', 'Поддержка наставника в общем чате'] },
    { id: 'personal', name: 'Индивидуально', price: '1600', period: 'за 1 персональную тренировку', items: ['100% внимания личного тренера', 'Индивидуальная программа и удобный график', 'Быстрый и безопасный прогресс на ковре'] },
  ],
  parents: [
    { id: 'single', name: 'Разовое детское', price: '700', period: 'за 1 тренировку в группе', items: ['Групповое занятие с детьми своего возраста', 'Оценка координации и интереса ребенка', 'Безопасное вливание в дружную команду'] },
    { id: 'unlimit', name: 'Детский абонемент', price: '4500', period: 'в месяц (групповые)', items: ['Посещение Кудо или Джиу-Джитсу (3 раза в неделю)', 'Заморозка абонемента по медицинской справке', 'Участие в детских турнирах и аттестациях'] },
    { id: 'personal', name: 'Индивидуально (Дети)', price: '1600', period: 'за 1 персональную тренировку', items: ['Штучный разбор детской техники и моторики', 'Особенно чуткий и осторожный подход', 'Максимальная безопасность под присмотром'] },
  ],
  men: [
    { id: 'single', name: 'Разовый бойцовский', price: '700', period: 'за 1 тренировку в группе', items: ['Бойцовская тренировка в группе мужчин', 'Кудо, Джиу-Джитсу или Грэпплинг', 'Проверка сил на ковре в полную нагрузку'] },
    { id: 'unlimit', name: 'Безлимит на месяц', price: '4500', period: 'в месяц (групповые)', items: ['Доступ ко всем группам и расписаниям', '3 тренировки в неделю с возможностью отработок', 'Развитие выносливости и мужской силы'] },
    { id: 'personal', name: 'Индивидуальная работа', price: '1600', period: 'за 1 персональную тренировку', items: ['1 на 1 со старшим мастером', 'Постановка нокаутирующих ударов и захватов', 'Гибкий график до или после вашей работы'] },
  ]
};

const FAQ_LIST = [
  // Блок 1: Общие вопросы о процессе и входе в спорт (снимаем базовые страхи)
  { q: 'Как проходит занятие?', a: 'Каждое занятие длится от 60 до 90 минут и состоит из нескольких обязательных этапов: интенсивная разминка и суставная гимнастика, отработка элементов страховки при падении (самостраховка), изучение и отработка технических приемов в парах, учебные спарринги (для опытных спортсменов) и заминка в конце для восстановления дыхания.' },
  { q: 'Можно ли приходить, если никогда не занимался единоборствами?', a: 'Да, конечно! Большая часть наших учеников изначально приходит к нам без какого-либо спортивного опыта. Программа тренировок выстроена так, чтобы нагрузка увеличивалась постепенно, а все базовые элементы самостраховки и приемов подробно разбирались с самого нуля.' },
  { q: 'Как выбрать направление единоборств?', a: 'Выбор зависит от ваших целей. Если вы хотите сделать акцент на бросковой технике, болевых и удушающих приемах на ковре без ударов — вам отлично подойдет спортивное джиу-джитсу. Если вам интересна универсальная полноконтактная система, сочетающая удары, броски и борьбу в шлеме — выбирайте кудо. Мы рекомендуем сходить на пробное занятие по обоим направлениям, чтобы определиться.' },
  
  // Блок 2: Организация, график и быт (актуально для всех перед записью)
  { q: 'Как часто проходят тренировки?', a: 'Тренировки в группах проходят по расписанию от 2 до 4 раз в неделю. Большинство детских и взрослых групп занимаются 3 раза в неделю в удобное вечернее время.' },
  { q: 'Сколько раз в неделю нужно заниматься для видимого результата?', a: 'Оптимальный режим для большинства учеников — 3 раза в неделю. Это позволяет эффективно осваивать технику, укреплять тело и выносливость, успевая при этом полностью восстанавливаться. На начальном этапе можно заниматься 2 раза в неделю.' },
  { q: 'Что нужно взять на первую тренировку?', a: 'Удобную спортивную форму (футболку и спортивные штаны/шорты без замков и опасной фурнитуры), сменную обувь (сланцы, чтобы дойти от раздевалки до ковра), бутылку воды и душевые принадлежности (если планируете принять душ). Сами тренировки проходят босиком на специальном покрытии (татами).' },
  { q: 'Нужна ли справка от врача?', a: 'Да, здоровье и безопасность наших учеников — главный приоритет. Для регулярных занятий требуется медицинская справка (от терапевта для взрослых и от педиатра для детей) об отсутствии противопоказаний к физическим нагрузкам.' },
  { q: 'Если заболел и пропустил тренировку, возможен ли перерасчет?', a: 'Да, при пропуске занятий по болезни мы делаем перерасчет стоимости или продлеваем действие абонемента (заморозка). Для этого достаточно предоставить медицинскую справку или предупредить администратора.' },

  // Блок 3: Специфика для ЦА "Взрослые"
  { q: 'Есть ли занятия для взрослых новичков?', a: 'Да, у нас работают специальные взрослые группы начального уровня. В них занимаются люди разного возраста и уровня физической подготовки, поэтому вы будете чувствовать себя максимально комфортно на тренировках с первого дня.' },

  // Блок 4: Специфика для ЦА "Родители / Дети"
  { q: 'С какого возраста можно приводить детей?', a: 'Мы принимаем детей в секции кудо и джиу-джитсу с 4-х лет. Для младших групп тренировки проходят в игровой форме с упором на развитие координации, ловкости, общей физической подготовки и игровой дисциплины.' },
  { q: 'Есть ли скидки для нескольких детей?', a: 'Да, у нас действует семейная скидка. Если секцию посещают двое или более детей из одной семьи, мы предоставляем специальную скидку на абонементы. Подробную информацию вам с радостью предоставит администратор.' }
];

const AUDIENCE_FAQ_MAP = {
  general: FAQ_LIST,
  parents: [
    FAQ_LIST[9],  // С какого возраста можно приводить детей?
    FAQ_LIST[5],  // Что нужно взять на первую тренировку?
    FAQ_LIST[6],  // Нужна ли справка от врача?
    FAQ_LIST[10], // Есть ли скидки для нескольких детей?
    FAQ_LIST[7],  // Если заболел и пропустил тренировку, возможен ли перерасчет?
    FAQ_LIST[3],  // Как часто проходят тренировки?
  ],
  men: [
    FAQ_LIST[1],  // Можно ли приходить, если никогда не занимался единоборствами?
    FAQ_LIST[8],  // Есть ли занятия для взрослых новичков?
    FAQ_LIST[0],  // Как проходит занятие?
    FAQ_LIST[2],  // Как выбрать направление единоборств?
    FAQ_LIST[4],  // Сколько раз в неделю нужно заниматься для видимого результата?
    FAQ_LIST[7],  // Если заболел и пропустил тренировку, возможен ли перерасчет?
  ]
};

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const TIMES = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

const sendLead = async (name: string, phone: string) => {
  // получаем audience из URL
  const params = new URLSearchParams(window.location.search)
  var audience = params.get('audience') || 'Общая'

  // преобразуем audience согласно требованиям
  if (audience === 'parents') {
    audience = 'Родители и дети'
  } else if (audience === 'men') {
    audience = 'Взрослые мужчины'
  }

  const formData = new FormData()

  formData.append('your-name', name)
  formData.append('your-phone', phone)
  formData.append('audience', audience)

  const res = await fetch(
    'https://everest.tomsk.ru/wp-json/contact-form-7/v1/contact-forms/9124/feedback',
    {
      method: 'POST',
      body: formData
    }
  )

  const data = await res.json()
  return data
}

// --- Components ---

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 md:p-8 z-[101] pointer-events-none"
          >
            <div className="bg-surface-container-low w-full max-w-5xl max-h-full overflow-auto border border-outline-variant shadow-2xl relative pointer-events-auto">
              {/* Sticky Close Button (Floating) */}
              <div className="sticky top-0 left-0 right-0 z-50 h-0 pointer-events-none">
                <div className="flex justify-end p-2 md:p-4">
                  <button 
                    onClick={onClose}
                    className="text-on-surface/50 hover:text-primary-container transition-colors pointer-events-auto bg-surface-container-low/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-outline-variant"
                  >
                    <X size={28} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="relative">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const formatRussianPhoneNumber = (val: string) => {
  let digits = val.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('8')) {
    digits = '7' + digits.substring(1);
  } else if (!digits.startsWith('7')) {
    digits = '7' + digits;
  }

  digits = digits.substring(0, 11);

  let result = '+7';
  if (digits.length > 1) {
    result += ' (' + digits.substring(1, 4);
  }
  if (digits.length > 4) {
    result += ') ' + digits.substring(4, 7);
  }
  if (digits.length > 7) {
    result += '-' + digits.substring(7, 9);
  }
  if (digits.length > 9) {
    result += '-' + digits.substring(9, 11);
  }
  return result;
};

const RegistrationForm = ({ coachName, onSuccess, onOpenPrivacy }: { coachName?: string; onSuccess: () => void; onOpenPrivacy?: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
    setName(val);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    if (!inputVal) {
      setPhone('');
      return;
    }

    // Handles backspace gracefully when format character is deleted
    if (inputVal.length < phone.length) {
      const lastCharOfCurrent = phone[phone.length - 1];
      const formattingChars = [' ', '-', ')', '('];
      if (formattingChars.includes(lastCharOfCurrent)) {
        let digits = phone.replace(/\D/g, '');
        if (digits.length > 0) {
          digits = digits.slice(0, -1);
          inputVal = digits;
        }
      }
    }

    const formatted = formatRussianPhoneNumber(inputVal);
    setPhone(formatted);
  };

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone('+7');
    }
  };

  return (
    <div className="px-8 py-12 md:px-16 md:py-20 bg-surface-container relative">
      <div className=" grit-texture absolute inset-0 opacity-5" />
      <div className="h-1.5 w-full bg-primary-container absolute top-0 left-0" />
      
      <div className="mb-12">
        <h2 className="font-display text-[31px] sm:text-4xl md:text-5xl font-extrabold uppercase italic tracking-tighter mb-4 text-on-surface leading-[1]">
          Записаться <br className="sm:hidden" /> <span className="whitespace-nowrap">на тренировку</span>
        </h2>
        {coachName && (
          <p className="text-primary font-display font-bold uppercase tracking-widest mb-2">
            К тренеру: {coachName}
          </p>
        )}
        <p className="text-on-surface-variant border-l-4 border-primary-container pl-4 font-body-lg">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>

      <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
        <div className="group relative">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Ваше имя
          </label>
          <input 
            type="text" 
            required
            value={name}
            onChange={handleNameChange}
            placeholder="Введите имя"
            className="w-full bg-transparent border-b-2 border-outline-variant py-4 px-0 font-body-lg text-on-surface placeholder:text-on-secondary-container focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        <div className="group relative">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Номер телефона *
          </label>
          <input 
            required
            type="tel" 
            value={phone}
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$"
            title="Формат: +7 (999) 999-99-99"
            placeholder="+7 (___) ___-__-__"
            className="w-full bg-transparent border-b-2 border-outline-variant py-4 px-0 font-body-lg text-on-surface placeholder:text-on-secondary-container focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        <div className="pt-2">
          <p className="text-[10px] text-on-secondary-container opacity-60 mb-8 italic">
            * Обязательное поле для заполнения.
          </p>
          <button 
		onClick={async () => {
		const result = await sendLead(name, phone)
		}}		
className="w-full btn-primary flex items-center justify-center gap-4 text-xl">
            <span>Записаться</span>
            <ArrowRight />
          </button>
        </div>

        <p className="text-center text-[10px] text-on-secondary-container uppercase tracking-[0.2em] opacity-50">
	      Нажимая кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с{' '}
	      <button 
			  type="button"
			  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenPrivacy?.(); }} 
			  className="underline hover:text-primary transition-colors cursor-pointer"
			>
			  политикой конфиденциальности
			</button>. 
	    </p>
      </form>
    </div>
  );
};

export default function App() {
  // 1. СНАЧАЛА объявляем audience, так как от неё зависят useEffect ниже
  const [audience, setAudience] = useState<'general' | 'parents' | 'men'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlAudience = params.get('audience');
      if (urlAudience === 'general' || urlAudience === 'parents' || urlAudience === 'men') {
        return urlAudience;
      }
    }
    return 'general';
  });

  // 2. Остальные состояния
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [pillRect, setPillRect] = useState<{ width: number; height: number; left: number; top: number } | null>(null);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeModal, setActiveModal] = useState<'none' | 'registration' | 'coach' | 'schedule' | 'privacy'>('none');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bottomFormSubmitted, setBottomFormSubmitted] = useState(false);
  const [bottomName, setBottomName] = useState('');
  const [bottomPhone, setBottomPhone] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
	const [showCookieBanner, setShowCookieBanner] = useState(true);

  // 3. Синхронизация audience с URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const urlAudience = params.get('audience') || 'general';
    if (urlAudience !== audience) {
      if (audience === 'general') url.searchParams.delete('audience');
      else url.searchParams.set('audience', audience);
      window.history.pushState({ audience }, '', url.toString());
    }
  }, [audience]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlAudience = params.get('audience') || 'general';
      if (urlAudience === 'general' || urlAudience === 'parents' || urlAudience === 'men') {
        setAudience(urlAudience);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 4. Анимация подложки (теперь audience уже существует!)
  useEffect(() => {
    const updatePill = () => {
      if (!tabsContainerRef.current) return;
      const activeButton = tabsContainerRef.current.querySelector(`[data-tab="${audience}"]`) as HTMLElement;
      if (activeButton) {
        const containerRect = tabsContainerRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        setPillRect({
          width: buttonRect.width,
          height: buttonRect.height,
          left: buttonRect.left - containerRect.left,
          top: buttonRect.top - containerRect.top,
        });
      }
    };
    const rafId = requestAnimationFrame(updatePill);
    window.addEventListener('resize', updatePill);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePill);
    };
  }, [audience]);

	// Проверяем, давал ли пользователь согласие на куки ранее
	useEffect(() => {
	  const cookieConsent = localStorage.getItem('everest_cookie_consent');
	  if (cookieConsent === 'accepted') {
	    setShowCookieBanner(false);
	  }
	}, []);
	
  // 5. Скролл и IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    
    const sections = ['about', 'benefits', 'coaches', 'programs', 'reviews', 'pricing', 'faq', 'locations'];
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const openRegistration = (coach?: Coach) => {
    setSelectedCoach(coach || null);
    setActiveModal('registration');
  };

  const openCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setActiveModal('coach');
  };

  const openSchedule = (program?: Program) => {
    setSelectedProgram(program || null);
    setActiveModal('schedule');
  };

  const getDifferentiatedSchedule = (programId: string | undefined): ScheduleItem[] => {
    if (programId === 'grappling') {
      return [
        { id: 'g1', day: 'Вт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко', type: 'fundamentals' },
        { id: 'g2', day: 'Чт', time: '18:00', title: 'Grappling Intro', coach: 'В. Падалко', type: 'fundamentals' },
        { id: 'g3', day: 'Сб', time: '12:00', title: 'Open Mat', coach: 'Сборная', type: 'free' } as any,
        { id: 'g4', day: 'Пн', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов', type: 'advanced' },
        { id: 'g5', day: 'Ср', time: '20:00', title: 'No-Gi Advanced', coach: 'А. Чернов', type: 'advanced' },
      ];
    }
    if (programId === 'kudo') {
      return [
        { id: 'k1', day: 'Вт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко', type: 'fundamentals' },
        { id: 'k2', day: 'Чт', time: '10:00', title: 'Kudo Kids', coach: 'В. Падалко', type: 'fundamentals' },
        { id: 'k3', day: 'Сб', time: '10:00', title: 'Kudo Intensive', coach: 'В. Падалко', type: 'advanced' },
        { id: 'k4', day: 'Пн', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко', type: 'advanced' } as any,
        { id: 'k5', day: 'Ср', time: '19:00', title: 'Kudo Adults', coach: 'В. Падалко', type: 'advanced' } as any,
      ];
    }
    // Default: BJJ
    return SCHEDULE;
  };

  const handleRegistrationSuccess = () => {
    alert('Заявка успешно отправлена! Мы перезвоним вам.');
    setActiveModal('none');
  };

	const handleAcceptCookies = () => {
		localStorage.setItem('everest_cookie_consent', 'accepted');
		setShowCookieBanner(false);
	};

  const renderNavLinks = (onLinkClick?: () => void) => (
    <>
      <a href="#about" onClick={onLinkClick} className={`anchor-link ${activeSection === 'about' ? 'active' : ''}`}>О нас</a>
      <a href="#coaches" onClick={onLinkClick} className={`anchor-link ${activeSection === 'coaches' ? 'active' : ''}`}>Тренеры</a>
      <a href="#programs" onClick={onLinkClick} className={`anchor-link ${activeSection === 'programs' ? 'active' : ''}`}>Программы</a>
      <a href="#pricing" onClick={onLinkClick} className={`anchor-link ${activeSection === 'pricing' ? 'active' : ''}`}>Абонементы</a>
      <a href="#faq" onClick={onLinkClick} className={`anchor-link ${activeSection === 'faq' ? 'active' : ''}`}>Вопросы</a>
      <a href="#locations" onClick={onLinkClick} className={`anchor-link ${activeSection === 'locations' ? 'active' : ''}`}>Филиалы</a>
    </>
  );

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <div className="grit-texture fixed inset-0 z-50 pointer-events-none" />

      {/* --- Sticky Header --- */}
      <header className={`fixed top-0 w-full z-[80] transition-all duration-300 ${isNavScrolled ? 'bg-surface/90 backdrop-blur-md shadow-2xl py-4' : 'bg-transparent py-8'}`}>
        <div className="px-gutter max-w-container-max mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
            }}
          >
            <img 
              src={logo}
              alt="ЭВЕРЕСТ" 
              className="h-12 md:h-16 w-auto group-hover:brightness-110 transition-all"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {renderNavLinks()}
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+73822256465" className="hidden sm:flex items-center gap-2 text-on-surface hover:text-primary transition-colors text-sm font-bold">
              <Phone size={18} className="text-primary-container" />
              +7 (3822) 25-64-65
            </a>
            <a href="https://vk.com/everest_tomsk" target="_blank" rel="noopener noreferrer" className="vk-link hidden sm:flex items-center justify-center shrink-0 w-8 h-8" aria-label="VK">
              <img 
                src={vk} 
                alt="VK" 
                referrerPolicy="no-referrer"
              />
            </a>
            <button className="lg:hidden text-on-surface" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={32} />
            </button>
          </div>
        </div>

		    {/* --- Audience Switcher (Desktop) --- */}
	    <div className="hidden lg:block mt-4 border-t border-outline-variant/10 pt-3">
	      <div className="max-w-container-max mx-auto flex justify-center">
	        <div 
	          ref={tabsContainerRef}
	          className="relative bg-surface-container-low/85 backdrop-blur-xl p-1 rounded-full border border-outline-variant/30 flex items-center gap-1 shadow-lg"
	        >
	          {/* Единая подложка, которая плавно перемещается между вкладками */}
	          {pillRect && (
	            <motion.div 
	              initial={false}
	              animate={{
	                width: pillRect.width,
	                height: pillRect.height,
	                x: pillRect.left,
	                y: pillRect.top,
	              }}
	              transition={{ type: 'spring', stiffness: 450, damping: 32, mass: 0.8 }}
	              className="absolute top-0 left-0 bg-primary-container rounded-full pointer-events-none z-0"
	            />
	          )}
	
	          {[
	            { id: 'general', label: 'О школе' },
	            { id: 'parents', label: 'Дети' },
	            { id: 'men', label: 'Взрослые' }
	          ].map((tab) => (
	            <button
	              key={tab.id}
	              data-tab={tab.id} // Важно для поиска активной кнопки
	              onClick={() => setAudience(tab.id as any)}
	              // transition-all заменен на transition-colors для избежания конфликтов
	              className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
	                audience === tab.id ? 'text-white' : 'text-on-surface-variant hover:text-primary-container'
	              }`}
	            >
	              <span className="relative z-10">{tab.label}</span>
	            </button>
	          ))}
	        </div>
	      </div>
	    </div>
      </header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col p-8"
          >
            <div 
              className="flex justify-between items-center mb-12 cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
            >
              <img 
                src={logo} 
                alt="ЭВЕРЕСТ" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
              <button onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(false); }}>
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 text-2xl">
              {renderNavLinks(() => setMobileMenuOpen(false))}
            </nav>
            <div className="mt-auto pt-8 border-t border-outline-variant">
              <a href="tel:+73822256465" className="flex items-center gap-4 text-xl font-bold mb-6 text-on-surface hover:text-primary transition-colors">
                <Phone size={24} className="text-primary-container" />
                +7 (3822) 25-64-65
              </a>
              <button onClick={() => { setMobileMenuOpen(false); openRegistration(); }} className="btn-primary w-full text-xl py-6">
                Записаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-28 lg:pb-0">
        {/* --- Hero Section --- */}
        <section className="relative min-h-[95vh] flex items-center pt-20 md:pt-28 lg:pt-36 pb-28 lg:pb-16">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              key={audience}
              src={AUDIENCE_HERO_MAP[audience].bgImage} 
              alt="Everest Combat Background"
              className="w-full h-full object-cover grayscale brightness-[0.45] transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>
          
          <div className="relative z-10 px-gutter max-w-container-max mx-auto w-full">
            <motion.div 
              key={audience}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl lg:max-w-6xl w-full"
            >
              <h1 className="font-display text-[1.8rem] max-[320px]:text-[1.5rem] min-[360px]:text-[2rem] min-[400px]:text-[2.35rem] sm:text-6xl md:text-[4.75rem] lg:text-[4.75rem] xl:text-[5.5rem] text-on-surface mb-4 uppercase font-black leading-[0.9] tracking-tighter">
                <img 
                  src={image2}
                  alt="ЭВЕРЕСТ" 
                  className="h-[4.5rem] sm:h-24 md:h-28 lg:h-32 w-auto object-contain mb-0 sm:mb-3 inline-block"
                  style={{ filter: 'invert(91%) sepia(21%) saturate(225%) hue-rotate(163deg) brightness(98%) contrast(93%)' }}
                  referrerPolicy="no-referrer"
                />
                <br />
                <span className="text-primary-container italic">
                  {AUDIENCE_HERO_MAP[audience].titleText}
                </span>
              </h1>
              
              <p className="text-primary font-display font-bold uppercase tracking-[0.4em] mb-2 text-[10px] md:text-sm">
                {AUDIENCE_HERO_MAP[audience].badge}
              </p>
              
              <p className="text-on-surface/80 font-display font-bold uppercase tracking-[0.2em] mb-4 text-[9px] md:text-xs">
                {AUDIENCE_HERO_MAP[audience].subBadge}
              </p>

              {AUDIENCE_HERO_MAP[audience].description && (
                <p className="text-on-surface-variant/95 text-body-md md:text-body-lg mb-6 max-w-4xl border-l-[3px] border-primary-container pl-4 normal-case font-medium leading-relaxed">
                  {AUDIENCE_HERO_MAP[audience].description}
                </p>
              )}

              <button 
                onClick={() => openRegistration()} 
                className="btn-primary text-[10px] min-[320px]:text-[11px] min-[360px]:text-sm sm:text-lg md:text-xl w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 group max-w-full"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-4">
                  <span className="text-center">
                    {AUDIENCE_HERO_MAP[audience].ctaText}
                  </span>
                  <ArrowRight className="shrink-0 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-12 md:py-20 bg-surface-container relative overflow-hidden scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
            <div className="flex-1">
              <h2 className="section-title">О нас</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 md:mb-12">
                <div>
                  <div className="text-primary-container font-display text-5xl sm:text-6xl font-black italic">2003</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2 text-on-surface/80 leading-relaxed">год основания клуба</div>
                </div>
                <div>
                  <div className="text-primary-container font-display text-5xl sm:text-6xl font-black italic">2017</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2 text-on-surface/80 leading-relaxed">год создания центра физической культуры и спорта</div>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16 mt-8 md:mt-12 border-t border-outline-variant/30 pt-8 md:pt-12">
                {AUDIENCE_STATS_MAP[audience].map((stat, i) => (
                  <div key={i}>
                    <div className="text-primary-container font-display text-4xl sm:text-5xl font-black italic">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs uppercase font-bold tracking-widest mt-2 leading-tight text-on-surface-variant">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-8 border-l-8 border-primary-container" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-8 border-r-8 border-primary-container" />
              <motion.img 
				key={audience}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				src={ABOUT_US_MAP[audience]} 
				alt="Academy interior "
				className="w-full brightness-100 transition-all duration-700 shadow-2xl "
				referrerPolicy="no-referrer "
			  />
            </div>
          </div>
        </section>

        {/* --- Benefits Section --- */}
        <section id="benefits" className="py-12 md:py-20 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Что дают тренировки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS_MAP[audience].map((item) => (
              <motion.div 
                key={item.title}
                whileHover={{ scale: 1.02 }}
                className="card-dark p-6 min-[375px]:p-8 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 group-hover:bg-primary-container/20 transition-colors flex items-center justify-center -mr-4 -mt-4 rotate-12">
                  <span className="text-primary-container -rotate-12">{item.icon}</span>
                </div>
                <h3 className="font-display text-2xl uppercase font-bold italic mb-4 text-on-surface">{item.title}</h3>
                <p className="text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Coaches Section --- */}
        <section id="coaches" className="py-12 md:py-20 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Тренеры</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {COACHES.map((coach) => (
              <div key={coach.id} className="group cursor-pointer flex flex-col h-full w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] max-w-[400px]" onClick={() => openCoach(coach)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-highest mb-4 md:mb-6 shrink-0">
                  <img 
                    src={coach.image} 
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-0 bg-primary-container px-6 py-2 shadow-xl -translate-x-2">
                    <span className="font-display font-bold uppercase italic text-sm text-white tracking-widest">{coach.rank}</span>
                  </div>
                </div>
                <div className="flex-grow mb-4">
                  <h3 className="font-display text-2xl uppercase font-black italic mb-2 group-hover:text-primary transition-colors">{coach.name}</h3>
                  <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest border-l-2 border-primary-container pl-3 py-1">{coach.title}</p>
                </div>
                <button className="btn-outline w-full py-3 mt-auto">Подробнее</button>
              </div>
            ))}
          </div>
        </section>

        {/* --- Programs Section --- */}
        <section id="programs" className="py-12 md:py-20 bg-surface-container relative scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto">
            <h2 className="section-title">Наши виды спорта</h2>
            <div className="space-y-12 md:space-y-24">
              {AUDIENCE_PROGRAMS_MAP[audience].map((program, idx) => (
                <div key={program.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full">
                    <img 
                      src={program.image} 
                      alt={program.name}
                      className="w-full h-[250px] sm:h-[400px] object-cover brightness-100 transition-all duration-700 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-3xl md:text-5xl font-black uppercase text-primary-container italic mb-2 md:mb-4">{program.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-[0.2em] mb-4 md:mb-8">{program.target}</p>
                    <p className="text-on-surface-variant text-body-lg mb-6 md:mb-10 leading-relaxed">{program.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => openSchedule(program as any)} className="btn-outline flex items-center justify-center gap-2">
                        <Calendar size={20} className="text-primary-container" />
                        Посмотреть расписание
                      </button>
                      <button onClick={() => openRegistration()} className="btn-primary">Записаться</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Reviews Section --- */}
		<section id="reviews" className="py-12 md:py-20 px-gutter max-w-container-max mx-auto overflow-hidden scroll-mt-24">
		  <div className="flex flex-col mb-6 md:mb-12 gap-4 text-center lg:text-left">
		    <h2 className="section-title mb-0 text-[32px]">Отзывы</h2>
		  </div>
		  
		  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		    {REVIEWS_MAP[audience].map((review) => (
		      <div key={review.id} className="bg-surface-container p-6 min-[375px]:p-8 border border-outline-variant/20 hover:border-primary/40 transition-colors">
		        <div className="mb-4 md:mb-6">
		          <div className="mb-3 md:mb-4">
		            <h4 className="font-display font-bold text-lg mb-1">{review.name}</h4>
		            <div className="flex gap-0.5 text-yellow-500 mb-2">
		              {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
		            </div>
		            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{review.date}</p>
		          </div>
		        </div>
		        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
		      </div>
		    ))}
		  </div>
		  
		  <div className="mt-6 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
		    <a 
			  href="https://yandex.ru/maps/org/everest/107137209858/reviews/" 
			  target="_blank" 
			  rel="noopener noreferrer"
			  className="btn-outline flex items-center justify-center gap-3 w-full sm:w-auto px-6"
			>
			  {/* Yandex Maps Icon - фиксированный размер 16x16px */}
			  <img
			    src={yandex}
			    alt="yandex maps"
			    className="h-4 w-4 object-contain shrink-0"
			  />
			  <span>Читать на Яндекс.Картах</span>
			</a>
		    
		    <a 
			  href="https://2gis.ru/tomsk/firm/70000001039795089/tab/reviews" 
			  target="_blank" 
			  rel="noopener noreferrer"
			  className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto px-6"
			>
			  {/* 2GIS Icon - фиксированный размер 16x16px */}
			  <img
			    src={gis2}
			    alt="2gis"
			    className="h-4 w-4 object-contain shrink-0"
			  />
			  <span>Читать в 2ГИС</span>
			</a>
		  </div>
		</section>
		  
        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-12 md:py-20 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Абонементы</h2>

          {/* --- Trial Promo Banner --- */}
          <div className="mb-12 bg-primary-container/10 border border-primary-container/30 border-l-[6px] border-l-primary-container p-6 sm:p-8 rounded-r-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4 sm:gap-6 text-left">
              <div className="bg-primary-container text-white p-3.5 sm:p-4 rounded-full shrink-0 shadow-lg">
                <Gift size={28} className="text-white animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-black uppercase text-xl sm:text-2xl text-primary-container italic leading-tight">Первая тренировка бесплатно!</h4>
                <p className="text-sm text-on-surface-variant/90 mt-1 max-w-2xl leading-normal">
                  Для всех новых учеников пробное групповое занятие по любому направлению абсолютно бесплатно. Приходите, знакомьтесь с клубом и тренером без каких-либо затрат.
                </p>
              </div>
            </div>
            <button onClick={() => openRegistration()} className="btn-primary py-3 px-6 text-xs sm:text-sm shrink-0 whitespace-nowrap group">
              <span className="flex items-center gap-2">
                Записаться бесплатно <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {AUDIENCE_PRICING_MAP[audience].map((plan, idx) => (
              <div 
                key={plan.id}
                className={`flex flex-col p-6 min-[375px]:p-8 md:p-12 text-center transition-all duration-300 ${idx === 1 ? 'bg-primary-container lg:scale-105 shadow-2xl relative z-10' : 'bg-surface-container border-t-8 border-primary-container lg:hover:-translate-y-2'}`}
              >
                {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-on-surface text-background px-4 py-1 font-bold uppercase text-[10px] tracking-widest">Популярный</div>}
                <h3 className={`font-display text-2xl uppercase font-black italic mb-4 md:mb-8 ${idx === 1 ? 'text-white' : 'text-on-surface'}`}>{plan.name}</h3>
                <div className="mb-4 md:mb-8 flex flex-col items-center">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black italic ${idx === 1 ? 'text-white' : 'text-primary'} ${plan.price.length > 5 ? 'text-4xl' : 'text-5xl sm:text-6xl'}`}>{plan.price}</span>
                    {plan.price !== 'Бесплатно' && plan.price !== 'Скидка' && (
                      <span className={`uppercase font-bold text-sm ${idx === 1 ? 'text-white/80' : 'text-on-surface-variant'}`}>руб.</span>
                    )}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mt-2 ${idx === 1 ? 'text-white/70' : 'text-primary'}`}>{plan.period}</span>
                </div>
                <ul className={`space-y-4 mb-6 md:mb-12 flex-grow ${idx === 1 ? 'text-white/90' : 'text-on-surface-variant'}`}>
                  {plan.items.map((item, i) => (
                    <li key={i} className="flex items-center justify-center gap-2">
                       <Check size={16} /> {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openRegistration()}
                  className={`py-4 font-display font-bold uppercase transition-all ${idx === 1 ? 'bg-white text-primary-container hover:bg-on-primary-container' : 'border-2 border-primary-container text-primary-container hover:bg-primary-container hover:text-white'}`}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>

          {/* --- Family Discount Promo Banner (Parents Only) --- */}
          {audience === 'parents' && (
            <div className="mt-12 bg-secondary-container/15 border border-secondary-container/40 border-l-[6px] border-l-secondary-container p-6 sm:p-8 rounded-r-2xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-4 sm:gap-6 text-left">
                <div className="bg-secondary-container text-on-secondary-container p-3.5 sm:p-4 rounded-full shrink-0 shadow-lg">
                  <Users size={28} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-black uppercase text-xl sm:text-2xl text-secondary-container italic leading-tight">
                    Скидка 20% на второго ребёнка
                  </h4>
                  <p className="text-sm text-on-surface-variant/90 mt-1 max-w-2xl leading-normal">
                    Приводите на тренировки второго ребенка — и получите скидку 20% на абонемент второго ребёнка. 
                    Это удобно: оба ребёнка занимаются в одном месте, в одно время и под присмотром одних и тех же тренеров. 
                    А ваш семейный бюджет заметно экономится.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" className="py-12 md:py-20 bg-surface-container relative scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto max-w-4xl">
            <h2 className="section-title text-center border-l-0 pl-0">Вопросы и ответы</h2>
            <div className="space-y-4">
              {AUDIENCE_FAQ_MAP[audience].map((faq, i) => (
                <div key={i} className="bg-surface border border-outline-variant transition-all hover:border-primary">
                  <details className="group">
                    <summary className="flex justify-between items-center p-5 md:p-8 cursor-pointer list-none font-display font-bold uppercase text-base md:text-lg group-hover:text-primary transition-colors">
                      {faq.q}
                      <ChevronDown size={24} className="group-open:rotate-180 transition-transform text-primary" />
                    </summary>
                    <div className="px-5 pb-5 md:px-8 md:pb-8 text-on-surface-variant leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Locations Section --- */}
        <section id="locations" className="py-12 md:py-20 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Как нас найти</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            {[
              { 
                name: 'Филиал Радужный', 
                addr: 'мкр. Радужный, ул. Ленская, 12', 
                features: 'БЖЖ, грэпплинг, кудо',
                map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb3d6nU4-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D' // Mock map
              },
              { 
                name: 'Филиал Южные Ворота', 
                addr: 'мкр. Южные Ворота, ул. Тихая, 105 (2 этаж)', 
                features: 'Детские и взрослые группы',
                map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb3d6nU4-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D46XWq7-D' // Mock map
              },
            ].map((loc, i) => (
              <div key={i} className="card-dark group">
                <div className="h-64 sm:h-80 overflow-hidden relative">
                  <iframe 
                    src={i === 0 
                      ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2197.834460786523!2d84.97864817754637!3d56.513233873289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4326940a00000001%3A0xc3f6a2b8e5c4a5!2z0YPQuy4g0JvQtdC90YHQutCw0Y8sIDEyLCDQotC-0LzRgdC6LCDQotC-0LzRgdC60LDRjyDQvtCx0LsuLCA2MzQwMDE!5e0!3m2!1sru!2sru!4v1715431234567!5m2!1sru!2sru"
                      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2203.456789012345!2d84.987654321098!3d56.456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDI3JzI0LjQiTiA4NMKwNTknMTUuNSJF!5e0!3m2!1sru!2sru!4v1715431234568!5m2!1sru!2sru"
                    }
                    width="100%" 
                    height="100%" 
                    className="border-0 grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700" 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-2xl uppercase font-black italic mb-2">{loc.name}</h3>
                  <p className="text-on-surface opacity-80 mb-1">{loc.addr}</p>
                  <p className="text-primary-container font-display text-xs font-bold uppercase tracking-widest">{loc.features}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Bottom Registration Form --- */}
        <section className="py-12 md:py-20 px-gutter max-w-container-max mx-auto scroll-mt-24 border-t border-outline-variant">
          <div className="card-dark overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side: Premium image / copy */}
            <div className="p-8 md:p-16 flex flex-col justify-between relative min-h-[350px] lg:min-h-full">
              <div className="grit-texture absolute inset-0 opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/95 lg:to-transparent z-10" />
              <img 
                src={
                  audience === 'men' 
                    ? 'https://everest.tomsk.ru/wp-content/uploads/2024/01/Frame-1046075.png' // Kudo image
                    : audience === 'parents'
                    ? 'https://everest.tomsk.ru/wp-content/uploads/2023/12/Frame-1046077-1.png' // BJJ kids
                    : 'https://everest.tomsk.ru/wp-content/uploads/2024/01/Frame-10461172.png' // Grappling
                }
                alt="Запись на тренировку"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-20 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-primary-container text-on-primary-container text-[10px] font-black uppercase tracking-widest px-3 py-1 mb-6 rounded-sm">
                    быстрый старт
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black uppercase italic leading-none text-on-surface tracking-tighter mb-4">
                    {audience === 'parents' ? (
                      <>Запишите ребенка <br className="hidden sm:block" /> <span className="whitespace-nowrap">на бесплатное</span> <br className="hidden sm:block" /> занятие</>
                    ) : audience === 'men' ? (
                      <>Запишитесь <br className="hidden sm:block" /> <span className="whitespace-nowrap">на бесплатное</span> <br className="hidden sm:block" /> занятие</>
                    ) : (
                      <>Записаться <br className="hidden sm:block" /> <span className="whitespace-nowrap">на пробную</span> <br className="hidden sm:block" /> тренировку</>
                    )}
                  </h2>
                  <p className="text-on-surface-variant max-w-sm text-sm sm:text-base leading-relaxed mt-4">
                    {audience === 'parents' 
                      ? 'Сделайте первый шаг к дисциплине и сильному духу вашего ребенка. Пробная тренировка проходит под присмотром опытных и заботливых наставников.'
                      : audience === 'men'
                      ? 'Восстановите тонус, уверенность и силу без жестких боев и перегрузок. Начните тренировки в мини-группе до 6 человек.'
                      : 'Заполните форму и начните путь к спортивным вершинам. Первая тренеровка бесплатно.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Modern Inline Form */}
            <div className="bg-surface-container-low p-8 md:p-16 relative flex flex-col justify-center">
              {bottomFormSubmitted ? (
                <div className="h-full flex flex-col justify-center items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container mb-6 animate-bounce">
                    <Check size={32} />
                  </div>
                  <h3 className="font-display text-2xl uppercase font-black italic mb-2 text-on-surface">Ваша заявка принята!</h3>
                  <p className="text-on-surface-variant max-w-sm text-sm">
                    Мы свяжемся с вами в ближайшее время, чтобы подтвердить время вашей первой тренировки. До встречи в зале!
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setBottomFormSubmitted(true); }}>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-primary">Ваше имя</label>
                    <input 
                      type="text" 
                      required
                      value={bottomName}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
                        setBottomName(val);
                      }}
                      placeholder={audience === 'parents' ? 'Имя ребенка или родителя' : 'Введите ваше имя'}
                      className="w-full bg-transparent border-b border-outline-variant py-3 px-0 text-on-surface placeholder:text-on-secondary-container/40 focus:outline-none focus:border-primary transition-all text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-primary">Телефон *</label>
                    <input 
                      type="tel" 
                      required
                      value={bottomPhone}
                      onChange={(e) => {
                        let inputVal = e.target.value;
                        if (!inputVal) {
                          setBottomPhone('');
                          return;
                        }

                        // Handles backspace gracefully when format character is deleted
                        if (inputVal.length < bottomPhone.length) {
                          const lastCharOfCurrent = bottomPhone[bottomPhone.length - 1];
                          const formattingChars = [' ', '-', ')', '('];
                          if (formattingChars.includes(lastCharOfCurrent)) {
                            let digits = bottomPhone.replace(/\D/g, '');
                            if (digits.length > 0) {
                              digits = digits.slice(0, -1);
                              inputVal = digits;
                            }
                          }
                        }

                        const formatted = formatRussianPhoneNumber(inputVal);
                        setBottomPhone(formatted);
                      }}
                      onFocus={() => {
                        if (!bottomPhone) {
                          setBottomPhone('+7');
                        }
                      }}
                      pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$"
                      title="Формат: +7 (999) 999-99-99"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-transparent border-b border-outline-variant py-3 px-0 text-on-surface placeholder:text-on-secondary-container/40 focus:outline-none focus:border-primary transition-all text-base"
                    />
                  </div>

                  <div className="pt-4">
                    <button 
			onClick={async () => {
				const result = await sendLead(bottomName, bottomPhone)
				}}
type="submit" className="w-full btn-primary flex items-center justify-center gap-4 py-4 text-base font-bold uppercase tracking-widest">
                      <span>Записаться бесплатно</span>
                      <ArrowRight size={18} />
                    </button>
                    <p className="text-center text-[10px] text-on-secondary-container opacity-50 mt-4 uppercase tracking-widest leading-relaxed">
					  Нажимая кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с{' '}
					  <button 
						  type="button"
						  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenPrivacy?.(); }} 
						  className="underline hover:text-primary transition-colors cursor-pointer"
						>
						  политикой конфиденциальности
						</button>.
					</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-12 md:py-20 px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-8 md:mb-16">
            <div className="shrink-0">
              <img 
                src={logo} 
                alt="ЭВЕРЕСТ" 
                className="h-16 w-auto mb-6"
                referrerPolicy="no-referrer"
              />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Центр физической</p> 
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">культуры и спорта «Эверест»</p>
            </div>
          
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-8 md:gap-y-12 flex-grow text-left">
              <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Контакты</h4>
              <a href="tel:+73822256465" className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-primary-container" />
                +7 (3822) 25-64-65
              </a>
              <div className="space-y-2">
                <p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} className="text-primary-container shrink-0" />
                  Филиал Радужный: ул. Ленская, 12
                </p>
                <p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} className="text-primary-container shrink-0" />
                  Филиал Южные Ворота: ул. Тихая, 105
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Меню</h4>
              <nav className="flex flex-col gap-2">
                <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">О нас</a>
                <a href="#coaches" className="text-on-surface-variant hover:text-primary transition-colors">Тренеры</a>
                <a href="#programs" className="text-on-surface-variant hover:text-primary transition-colors">Программы</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Инфо</h4>
              <nav className="flex flex-col gap-2">
			  <button 
			    onClick={() => setActiveModal('privacy')} 
			    className="text-on-surface-variant hover:text-primary transition-colors text-left"
			  >
			    Политика конфиденциальности
			  </button>
			</nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Соцсети</h4>
              <div className="flex justify-center md:justify-start">
                <a href="https://vk.com/everest_tomsk" target="_blank" rel="noopener noreferrer" className="vk-link flex items-center justify-center shrink-0 w-10 h-10" aria-label="VK">
                  <img 
                    src={vk}
                    alt="VK" 
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-12 border-t border-outline-variant w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50">
            <span>© 2026 Центр физической культуры и спорта «Эверест»</span>
            <span>Сделано для чемпионов</span>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      <Modal isOpen={activeModal === 'registration'} onClose={() => setActiveModal('none')}>
		  <RegistrationForm 
		    coachName={selectedCoach?.name} 
		    onSuccess={handleRegistrationSuccess} 
		    onOpenPrivacy={() => setActiveModal('privacy')} 
		  />
	</Modal>

      <Modal isOpen={activeModal === 'coach'} onClose={() => setActiveModal('none')}>
        {selectedCoach && (
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="w-full lg:w-5/12 relative bg-surface-container-highest overflow-hidden h-[400px] lg:h-auto">
              <img 
                src={selectedCoach.image} 
                alt={selectedCoach.name}
                className="w-full h-full object-cover object-top transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-0 bg-primary-container px-6 py-3 shadow-lg transform -translate-x-2">
                <span className="font-display font-bold text-on-primary-container uppercase italic tracking-widest">{selectedCoach.rank}</span>
              </div>
            </div>
            <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-between bg-surface-container relative overflow-hidden">
               <div className="grit-texture absolute inset-0 opacity-5" />
               <div className="relative z-10 flex flex-col h-full uppercase">
                 <div className="mb-10">
                   <h2 className="font-display text-4xl md:text-5xl text-on-surface uppercase tracking-tighter italic mb-1 font-black">{selectedCoach.name}</h2>
                   <p className="text-primary uppercase tracking-[0.2em] font-bold text-xs">{selectedCoach.title}</p>
                   <div className="h-1 w-20 bg-primary-container mt-4" />
                 </div>
                 
                 <div className="space-y-8 text-on-surface-variant overflow-y-auto pr-2 custom-scrollbar">
                   <p className="text-lg leading-relaxed normal-case">{selectedCoach.bio}</p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
                     <div>
                       <h4 className="font-display font-bold text-on-surface uppercase text-sm mb-4 tracking-widest">Достижения</h4>
                       <ul className="space-y-2">
                         {selectedCoach.achievements.map((a, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm">
                             <Award size={16} className="text-primary-container shrink-0 mt-0.5" />
                             {a}
                           </li>
                         ))}
                       </ul>
                                                     </div>
                      <div>
                        <h4 className="font-display font-bold text-on-surface uppercase text-sm mb-4 tracking-widest font-black italic">Специализация</h4>
                        <ul className="space-y-2">
                          {selectedCoach.specialization.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Target size={16} className="text-primary-container shrink-0 mt-0.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 relative z-10">
                  <button 
                    onClick={() => setActiveModal('registration')} 
                    className="btn-primary w-full flex items-center justify-center gap-1.5 text-[10px] min-[320px]:text-xs min-[360px]:text-sm sm:text-base md:text-lg whitespace-nowrap px-2 min-[360px]:px-4 sm:px-6 py-3"
                  >
                    <span>Записаться на тренировку</span>
                    <ArrowRight className="shrink-0 h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'schedule'} onClose={() => setActiveModal('none')}>
        <div className="flex flex-col h-full max-h-[90vh]">
          <header className="p-4 md:p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar size={32} className="text-primary-container" />
              <h2 className="font-display text-sm md:text-lg font-extrabold uppercase italic w-auto max-w-[calc(100vw-140px)] md:max-w-none md:whitespace-nowrap">
                Расписание: {selectedProgram ? selectedProgram.name : 'Все тренировки'}
              </h2>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto bg-surface-container-low">
            <div className="min-w-[800px] grid grid-cols-[100px_repeat(7,1fr)]">
              {/* Day Headers */}
              <div className="h-12 border-r border-b border-outline-variant bg-surface-container-high sticky top-0 z-20 flex items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Время</span>
              </div>
              {DAYS.map((day) => (
                <div key={day} className="h-12 border-r border-b border-outline-variant bg-surface-container-high sticky top-0 z-20 flex flex-col items-center justify-center">
                  <span className="font-display font-bold uppercase text-primary">{day}</span>
                  <span className="text-[8px] text-on-surface-variant">---</span>
                </div>
              ))}

              {/* Time Slots */}
              {TIMES.map((time) => {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMin = now.getMinutes();
                const slotHour = parseInt(time.split(':')[0]);
                
                // Show line if current time falls within this slot range (2 hours)
                const showTimeIndicator = currentHour >= slotHour && currentHour < slotHour + 2;
                const topPercent = showTimeIndicator ? ((currentHour - slotHour) * 60 + currentMin) / 120 * 100 : 0;

                const currentSchedule = getDifferentiatedSchedule(selectedProgram?.id);

                return (
                  <React.Fragment key={time}>
                    <div className="h-14 md:h-16 border-r border-b border-outline-variant flex items-start justify-center pt-2 text-[10px] font-bold text-on-surface-variant relative">
                      {time}
                      {showTimeIndicator && (
                        <div 
                          className="absolute left-0 right-0 h-0.5 bg-primary-container z-30 flex items-center" 
                          style={{ top: `${topPercent}%` }}
                        >
                          <div className="w-2 h-2 bg-primary-container rounded-full -ml-1 shadow-lg shadow-primary-container/50" />
                        </div>
                      )}
                    </div>
                    {DAYS.map((day) => {
                       const session = currentSchedule.find(s => s.day === day && s.time === time);
                       return (
                         <div key={`${day}-${time}`} className="h-14 md:h-16 border-r border-b border-outline-variant relative p-0.5 group">
                           {showTimeIndicator && (
                             <div 
                               className="absolute left-0 right-0 h-0.5 bg-primary-container/30 z-30 pointer-events-none" 
                               style={{ top: `${topPercent}%` }}
                             />
                           )}
                           {session && (
                             <div className={`h-full w-full border-l-2 md:border-l-4 p-0.5 md:p-1 flex flex-col justify-center transition-colors shadow-lg cursor-pointer overflow-hidden ${
                               session.type === 'fundamentals' ? 'bg-surface-variant border-primary-container hover:bg-surface-bright' :
                               session.type === 'advanced' ? 'bg-primary-container border-white hover:brightness-110' :
                               'bg-secondary-container border-on-secondary-container hover:brightness-110'
                             }`}>
                               <span className={`text-[5px] md:text-[7px] font-black uppercase leading-tight mb-0.25 ${session.type === 'advanced' ? 'text-white/80' : 'text-primary'}`}>{session.title}</span>
                               <span className={`text-[9px] font-black leading-tight mb-0.25 ${session.type === 'advanced' ? 'text-white' : 'text-on-surface'}`}>{selectedProgram?.name || 'ТРЕНИРОВКА'}</span>
                               <span className={`text-[9px] italic leading-none opacity-80 ${session.type === 'advanced' ? 'text-white/70' : 'text-on-surface-variant'}`}>{session.coach}</span>
                             </div>
                           )}
                         </div>
                       );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <footer className="p-4 md:p-6 bg-surface border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-surface-variant border-l-2 border-primary-container" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Базовый</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-container" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Продвинутый</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary-container" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Спарринг</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveModal('registration')} 
              className="btn-primary w-full md:w-auto text-[10px] min-[320px]:text-xs min-[360px]:text-sm sm:text-base px-3 sm:px-6 py-3 whitespace-nowrap"
            >
              Записаться на тренировку
            </button>
          </footer>
        </div>
      </Modal>

      {/* --- Floating Audience Switcher (Mobile Tab Bar) --- */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[90] bg-surface-container/90 backdrop-blur-xl rounded-2xl border border-outline-variant/30 py-2.5 px-4 shadow-2xl flex justify-around items-center">
        <button 
          onClick={() => setAudience('general')}
          className={`flex flex-col items-center gap-1 transition-colors duration-200 ${audience === 'general' ? 'text-primary-container' : 'text-on-surface-variant'}`}
        >
          <Compass size={20} className={audience === 'general' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] font-bold uppercase tracking-wider">О школе</span>
        </button>
        
        <button 
          onClick={() => setAudience('parents')}
          className={`flex flex-col items-center gap-1 transition-colors duration-200 ${audience === 'parents' ? 'text-primary-container' : 'text-on-surface-variant'}`}
        >
          <Heart size={20} className={audience === 'parents' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Дети</span>
        </button>

        <button 
          onClick={() => setAudience('men')}
          className={`flex flex-col items-center gap-1 transition-colors duration-200 ${audience === 'men' ? 'text-primary-container' : 'text-on-surface-variant'}`}
        >
          <Dumbbell size={20} className={audience === 'men' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Взрослые</span>
        </button>
      </div>

		<Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal('none')}>
		  <div className="bg-surface-container-low text-on-surface-variant max-h-[90vh] overflow-y-auto">
		    <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto space-y-8 text-sm md:text-base leading-relaxed normal-case font-normal">
		      
		      {/* Заголовок документа */}
		      <header className="text-center border-b border-outline-variant/30 pb-8 space-y-2">
		        <h2 className="font-display text-xl md:text-3xl font-black uppercase italic text-on-surface leading-tight">
		          Политика
		        </h2>
		        <p className="text-sm md:text-base italic text-on-surface-variant">
		          в отношении обработки персональных данных
		        </p>
		        <p className="text-sm md:text-base text-on-surface font-bold mt-4">
		          Автономной некоммерческой организации Центр физической культуры и спорта «Эверест»
		        </p>
		        <p className="text-sm text-on-surface-variant">(г. Томск)</p>
		        <p className="text-sm font-bold text-on-surface mt-2">30.01.2026</p>
		      </header>
		
		      {/* 1. Общие положения */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">1. Общие положения</h3>
		        <p>1.1. Настоящая Политика определяет порядок и условия обработки персональных данных (далее – ПДн) в Автономной некоммерческой организации Центр физической культуры и спорта «Эверест» (далее – Оператор, Организация) в соответствии с Конституцией РФ, Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» (далее – Закон), иными нормативными правовыми актами.</p>
		        
		        <p>1.2. Сведения об Операторе:</p>
		        <div className="pl-4 space-y-1 border-l-2 border-primary-container/50 bg-surface-container/30 p-4 rounded-r">
		          <p><span className="font-bold text-on-surface">Полное наименование:</span> Автономная некоммерческая организация Центр физической культуры и спорта «Эверест»</p>
		          <p><span className="font-bold text-on-surface">Сокращенное наименование:</span> АНО ЦФКС «Эверест»</p>
		          <p><span className="font-bold text-on-surface">Юридический/почтовый адрес:</span> 634026, г. Томск, ул. Героев Чубаровцев, д. 69</p>
		          <p>ИНН 7017418582, КПП 701701001, ОГРН 1177000100023</p>
		          <p><span className="font-bold text-on-surface">Адрес электронной почты:</span> cfs-everest@mail.ru</p>
		          <p><span className="font-bold text-on-surface">Телефон:</span> +7 (952) 893-44-61</p>
		          <p><span className="font-bold text-on-surface">Генеральный директор:</span> Чернов Андрей Алексеевич</p>
		        </div>
		        
		        <p>1.3. Политика действует бессрочно до замены новой версией. Текст Политики размещается в свободном доступе на официальном сайте Оператора https://everest.tomsk.ru/ в подвале (футере) страниц. Контроль за исполнением требований Политики возлагается на ответственного за организацию обработки ПДн, назначаемого приказом Генерального директора.</p>
		        <p>1.4. Обработка ПДн осуществляется на законной и справедливой основе, ограничивается достижением конкретных, заранее определенных целей. Не допускается обработка ПДн, несовместимая с целями их сбора.</p>
		      </section>
		
		      {/* 2. Правовые основания */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">2. Правовые основания обработки персональных данных</h3>
		        <p>2.1. Правовыми основаниями обработки ПДн являются:</p>
		        <ul className="list-disc pl-6 space-y-1.5">
		          <li>Конституция РФ;</li>
		          <li>Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»;</li>
		          <li>Трудовой кодекс РФ;</li>
		          <li>Гражданский кодекс РФ;</li>
		          <li>Устав АНО ЦФКС «Эверест»;</li>
		          <li>договоры, заключаемые между Оператором и субъектами ПДн;</li>
		          <li>согласия субъектов ПДн на обработку персональных данных (в том числе на распространение ПДн);</li>
		          <li>иные федеральные законы и нормативные правовые акты.</li>
		        </ul>
		      </section>
		
		      {/* 3. Цели, объем и условия */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">3. Цели, объем и условия обработки персональных данных</h3>
		        <p>Оператор обрабатывает ПДн следующих категорий субъектов:</p>
		        <ul className="list-disc pl-6 space-y-1.5">
		          <li>посетители сайта (пользователи, заполнившие формы обратной связи, записи на тренировку, оставившие заявку на консультацию);</li>
		          <li>сотрудники Оператора (в том числе бывшие работники, кандидаты на вакантные должности);</li>
		          <li>тренерско-преподавательский состав, данные которых размещены на Сайте для информирования неограниченного круга лиц;</li>
		          <li>контрагенты и представители юридических лиц (в рамках договорных отношений).</li>
		        </ul>
		
		        <div className="pt-4 space-y-3">
		          <p className="font-bold text-on-surface">3.1. Цель: Обработка запросов и обращений (обратная связь, запись на тренировку, консультации)</p>
		          <p><span className="font-semibold text-on-surface/90">Категории субъектов:</span> посетители сайта, клиенты, их представители.</p>
		          <p className="font-semibold text-on-surface/90">Перечень ПДн:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>фамилия, имя (отчество – при наличии);</li>
		            <li>контактный номер телефона;</li>
		            <li>адрес электронной почты (при заполнении соответствующих полей).</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Способы обработки:</span> сбор через онлайн-формы на сайте, автоматизированная и неавтоматизированная обработка, передача ответственному сотруднику, хранение в электронных журналах и/или CRM-системе.</p>
		          <p className="font-semibold text-on-surface/90">Сроки обработки и хранения:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>ПДн обрабатываются до момента завершения обработки обращения (ответ на запрос, запись на тренировку);</li>
		            <li>после достижения цели ПДн хранятся не более 1 года в архиве обращений для подтверждения факта оказания услуги и решения спорных вопросов, после чего уничтожаются.</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Порядок уничтожения:</span> стирание данных из электронных носителей (CRM, почта) и уничтожение бумажных носителей (акт об уничтожении).</p>
		          <p><span className="font-semibold text-on-surface/90">Правовое основание:</span> п. 1 ч. 1 ст. 6 Закона № 152-ФЗ (согласие субъекта ПДн).</p>
		        </div>
		
		        <div className="pt-4 space-y-3">
		          <p className="font-bold text-on-surface">3.2. Цель: Анализ статистики посещаемости сайта и поведения пользователей с использованием метрических программ</p>
		          <p><span className="font-semibold text-on-surface/90">Категории субъектов:</span> все посетители сайта https://everest.tomsk.ru/.</p>
		          <p><span className="font-semibold text-on-surface/90">Наименование метрической программы:</span> Яндекс Метрика (ООО «ЯНДЕКС»).</p>
		          <p className="font-semibold text-on-surface/90">Перечень ПДн (сведений), собираемых посредством метрических программ:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>IP-адрес;</li>
		            <li>данные о типе браузера, версии, разрешении экрана, операционной системе;</li>
		            <li>cookie-файлы;</li>
		            <li>источник перехода на сайт (реферер);</li>
		            <li>дата и время визита, просмотренные страницы, действия на страницах (клики, скроллы);</li>
		            <li>уникальный идентификатор пользователя, присваиваемый счетчиком.</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Способы обработки:</span> автоматизированный сбор данных при открытии сайта (только после получения согласия посетителя), передача ООО «ЯНДЕКС» для обработки на условиях агентского договора (политики Яндекса).</p>
		          <p className="font-semibold text-on-surface/90">Сроки обработки и хранения:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>данные хранятся в обезличенном виде в агрегированной статистике;</li>
		            <li>срок хранения персональных данных (идентифицирующих сведений) – не более 2 лет с момента их сбора; по истечении указанного срока данные автоматически удаляются средствами Яндекс Метрики.</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Правовое основание:</span> ч. 1 ст. 6 Закона № 152-ФЗ (согласие субъекта ПДн, выраженное через активные действия на сайте – нажатие кнопки «Принять» во всплывающем баннере).</p>
		          <p><span className="font-semibold text-on-surface/90">Информирование:</span> при входе на сайт демонстрируется баннер с уведомлением об использовании Яндекс Метрики и запросом согласия. Факт нажатия кнопки «Принять» фиксируется в cookie.</p>
		        </div>
		
		        <div className="pt-4 space-y-3">
		          <p className="font-bold text-on-surface">3.3. Цель: Размещение на официальном сайте информации о тренерском составе в целях информирования неограниченного круга лиц (распространение персональных данных)</p>
		          <p><span className="font-semibold text-on-surface/90">Категории субъектов:</span> сотрудники (тренеры) АНО ЦФКС «Эверест».</p>
		          <p className="font-semibold text-on-surface/90">Перечень ПДн, разрешенных к распространению:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>фамилия, имя, отчество;</li>
		            <li>фотография (изображение);</li>
		            <li>специализация / направления тренировок;</li>
		            <li>образование (квалификация, спортивные достижения).</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Способы обработки:</span> размещение на странице сайта https://everest.tomsk.ru/our-team/ в открытом доступе.</p>
		          <p className="font-semibold text-on-surface/90">Сроки обработки и хранения:</p>
		          <ul className="list-disc pl-6 space-y-1">
		            <li>данные публикуются только при наличии отдельного письменного согласия сотрудника на распространение ПДн (ст. 10.1 Закона № 152-ФЗ);</li>
		            <li>данные размещаются на период действия согласия (обычно на срок трудового договора) и удаляются в течение 10 рабочих дней с момента отзыва согласия или прекращения трудовых отношений, если сотрудник запретил дальнейшее распространение.</li>
		          </ul>
		          <p><span className="font-semibold text-on-surface/90">Правовое основание:</span> ст. 10.1 Закона № 152-ФЗ (согласие на распространение ПДн).</p>
		        </div>
		
		        <div className="pt-4 space-y-3">
		          <p className="font-bold text-on-surface">3.4. Цель: Осуществление трудовых отношений и кадровое делопроизводство</p>
		          <p className="italic">(Сведения в соответствии с трудовым законодательством – обрабатываются согласно локальным актам; цели, объем и сроки указаны в отдельном документе «Положение о защите персональных данных работников». В настоящей Политике не детализируется, но упоминается для полноты.)</p>
		        </div>
		
		        <div className="pt-4 space-y-3">
		          <p className="font-bold text-on-surface">3.5. Иные цели</p>
		          <p>Иные цели обработки ПДн могут определяться при заключении договоров с контрагентами, а также при исполнении обязанностей, возложенных законодательством РФ. В таких случаях цели и объем соответствуют требованиям закона и условиям договора.</p>
		        </div>
		      </section>
		
		      {/* 4. Принципы и условия */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">4. Принципы и условия обработки персональных данных</h3>
		        <p>4.1. Обработка ПДн осуществляется с соблюдением принципов и условий, предусмотренных Законом № 152-ФЗ:</p>
		        <ul className="list-disc pl-6 space-y-1.5">
		          <li>законность и справедливая основа;</li>
		          <li>ограничение обработки достижением конкретных целей;</li>
		          <li>соответствие содержания и объема обрабатываемых ПДн заявленным целям;</li>
		          <li>недопустимость объединения баз данных, содержащих ПДн, обработка которых осуществляется в несовместимых между собой целях;</li>
		          <li>обеспечение точности, достаточности и актуальности ПДн;</li>
		          <li>хранение ПДн в форме, позволяющей определить субъекта, не дольше, чем этого требуют цели обработки.</li>
		        </ul>
		        <p>4.2. Оператор вправе поручить обработку ПДн другому лицу (например, ООО «ЯНДЕКС») с согласия субъекта ПДн на основании заключаемого договора. Лицо, осуществляющее обработку ПДн по поручению Оператора, обязуется соблюдать конфиденциальность ПДн и требования Закона № 152-ФЗ.</p>
		        <p>4.3. Трансграничная передача ПДн не осуществляется.</p>
		        <p>4.4. Оператор не принимает решений на основании исключительно автоматизированной обработки ПДн, порождающих юридические последствия или иным образом затрагивающих права субъектов.</p>
		      </section>
		
		      {/* 5. Права субъектов */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">5. Права субъектов персональных данных</h3>
		        <p>5.1. Субъект ПДн имеет право:</p>
		        <ul className="list-disc pl-6 space-y-1.5">
		          <li>на получение сведений об обработке его ПДн (ч. 7 ст. 14 Закона № 152-ФЗ);</li>
		          <li>требовать уточнения, блокирования или уничтожения ПДн в случае, если они являются неполными, устаревшими, недостоверными или обрабатываются незаконно;</li>
		          <li>отозвать согласие на обработку ПДн в любое время (с учетом ограничений, установленных законом);</li>
		          <li>обжаловать действия или бездействие Оператора в уполномоченном органе по защите прав субъектов ПДн (Роскомнадзор) или в судебном порядке;</li>
		          <li>на защиту своих прав и законных интересов.</li>
		        </ul>
		        <p>5.2. Для реализации своих прав субъект ПДн направляет запрос в форме электронного документа (с обязательной простой электронной подписью) либо на бумажном носителе по адресу Оператора. Запрос должен содержать сведения, указанные в ч. 3 ст. 14 Закона № 152-ФЗ.</p>
		        <p>5.3. Оператор рассматривает запрос и направляет мотивированный ответ в течение 10 рабочих дней (с возможностью продления не более чем на 5 рабочих дней при наличии обоснованных причин).</p>
		      </section>
		
		      {/* 6. Меры безопасности */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">6. Меры по обеспечению безопасности персональных данных</h3>
		        <p>6.1. Оператор принимает необходимые правовые, организационные и технические меры для защиты ПДн от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.</p>
		        <p>6.2. К таким мерам относятся:</p>
		        <ul className="list-disc pl-6 space-y-1.5">
		          <li>назначение лица, ответственного за организацию обработки ПДн;</li>
		          <li>издание локальных актов по обработке ПДн;</li>
		          <li>применение правовых, организационных и технических мер безопасности (антивирусное ПО, контроль доступа, резервное копирование);</li>
		          <li>оценка вреда, который может быть причинен субъектам ПДн в случае нарушения требований Закона;</li>
		          <li>ознакомление работников с положениями законодательства и настоящей Политикой;</li>
		          <li>организация учета и хранения материальных носителей ПДн;</li>
		          <li>контроль за принимаемыми мерами.</li>
		        </ul>
		      </section>
		
		      {/* 7. Заключительные положения */}
		      <section className="space-y-4">
		        <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">7. Заключительные положения</h3>
		        <p>7.1. Настоящая Политика является общедоступным документом и подлежит опубликованию на официальном сайте Оператора. Изменения и дополнения в Политику вносятся при изменении законодательства РФ, целей и условий обработки ПДн.</p>
		        <p>7.2. Вопросы, не урегулированные настоящей Политикой, регулируются законодательством РФ.</p>
		        <p>7.3. Лица, виновные в нарушении требований законодательства РФ о персональных данных, несут ответственность, предусмотренную законодательством РФ.</p>
		      </section>
		
		      {/* Приложение и дата */}
		      <section className="pt-6 border-t border-outline-variant/30 space-y-4">
		        <p className="italic text-on-surface-variant/90">
		          Приложение: форма согласия на обработку персональных данных (для форм сбора на сайте) и форма согласия на распространение персональных данных (для сотрудников) — разрабатываются отдельно и утверждаются Генеральным директором.
		        </p>
		        <p className="font-bold text-on-surface text-base pt-4">
		          Дата вступления в силу: «30» января 2026 г.
		        </p>
		      </section>
		
		    </div>
		  </div>
		</Modal>

		{/* --- Scroll to Top Button --- */}
		  <AnimatePresence>
		    {showScrollTop && (
		      <motion.button
		        initial={{ opacity: 0, y: 20, scale: 0.8 }}
		        animate={{ opacity: 1, y: 0, scale: 1 }}
		        exit={{ opacity: 0, y: 20, scale: 0.8 }}
		        transition={{ duration: 0.3, ease: 'easeInOut' }}
		        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		        className="fixed z-[95] bottom-24 lg:bottom-8 right-4 lg:right-8 bg-primary-container text-white p-3 lg:p-4 rounded-full shadow-2xl border border-outline-variant/50 hover:bg-primary hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
		        aria-label="Наверх"
		      >
		        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
		      </motion.button>
		    )}
		  </AnimatePresence>

		{/* --- Cookie Consent Banner --- */}
		<AnimatePresence>
		  {showCookieBanner && (
		    <motion.div
		      initial={{ y: '100%', opacity: 0 }}
		      animate={{ y: 0, opacity: 1 }}
		      exit={{ y: '100%', opacity: 0 }}
		      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
		      className="fixed bottom-20 lg:bottom-4 left-4 right-4 lg:left-8 lg:right-8 lg:max-w-4xl z-[89] bg-surface-container border border-outline-variant shadow-2xl p-4 md:p-6 rounded-xl backdrop-blur-md"
		    >
		      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
		        <div className="flex-shrink-0 bg-primary-container/10 p-2.5 rounded-full hidden md:flex">
		          <Shield size={24} className="text-primary-container" />
		        </div>
		        <p className="flex-1 text-xs md:text-sm text-on-surface-variant leading-relaxed">
		          Мы используем файлы cookie и сервисы веб-аналитики (Яндекс.Метрика) для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с обработкой данных и{' '}
		         <button 
					  type="button"
					  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenPrivacy?.(); }} 
					  className="underline hover:text-primary transition-colors cursor-pointer"
					>
					  политикой конфиденциальности
					</button>.
		        </p>
		        <button
		          onClick={handleAcceptCookies}
		          className="btn-primary w-full md:w-auto whitespace-nowrap text-xs md:text-sm px-5 py-2.5 shrink-0"
		        >
		          Принять и закрыть
		        </button>
		      </div>
		    </motion.div>
		  )}
		</AnimatePresence>
    </div>
  );
}
