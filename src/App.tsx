import React, { useState, useEffect, ReactNode } from 'react';
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
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    id: 'ivanov',
    name: 'Иванов Артем Сергеевич',
    rank: 'Black Belt 2nd Degree',
    title: 'Шеф-инструктор / Мастер Спорта МК',
    bio: 'Обладатель черного пояса по бразильскому джиу-джитсу. За 15 лет в спорте прошел путь от новичка до чемпиона международных турниров. Образование: НГУ им. П.Ф. Лесгафта, специалист в области единоборств.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyAyeI3etltwOTWQqNwPCb0EEUHp6vA6xGmjC4Scq7--HMo-ZljaNox-1bQlq1kvYzRks2mey-js91q6dWLfOxYY3KPxdUSoxuI-uIc4SJqe0mV7oyiHlFR3Ap64bGGKVTflgUA-D8UXylWMSFvCpX47WydBqx2zYAZUAONuLUGkiFYLfGLligkdhvXMYNlXvS_pBnQXWjNOtYDFeRSpCzVPtXlMg288gq8VqIH0Z_tWVA12C3GZLQOlOZbLa3JOkJ33vB9DSMg3bN',
    achievements: [
      'Чемпион IBJJF European 2019',
      'Призер Abu Dhabi World Pro',
      'Вопитал 5 черных поясов'
    ],
    specialization: [
      'No-Gi / Grappling',
      'Self-Defense',
      'Pro-Level Tactics'
    ]
  },
  {
    id: 'petrov',
    name: 'Петров Петр Петрович',
    rank: 'Black Belt 1st Degree',
    title: 'Ведущий инструктор / МСМК',
    bio: 'Специалист по контактным единоборствам с опытом более 12 лет. Многократный победитель всероссийских турниров по боевому самбо и джиу-джитсу.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJwmJFVqMDLSZULCeMvt8MAmM1_mCnlUeaI9qnVweexVgssCnuLBHWaH9f0GuvBLNtlS9J3zN-MDCAqrjeEhYO9gGGn3S56hAZdVP01c_Y6Cl-UoCHxBmQ5Jjyk6ViBRMGSuzOy35uoStLL_ji_Q7zW99kNjTO_cGrD_NDHJcgruW_lHEr0CfY9tDjOoysRF0Mq7IDwM3kERE7KVCSY2GtjMeguaxN28F0nNV_SW-1LSKuh8iGYDXrPC4CipCQDe_Y_u3ftj5tNbcg',
    achievements: [
      'Чемпион России по БЖЖ',
      'Победитель международных кубков',
      'Опыт преподавания 10 лет'
    ],
    specialization: [
      'Children\'s BJJ',
      'Competition Prep',
      'Wrestling Fundamentals'
    ]
  },
  {
    id: 'sidorov',
    name: 'Сидоров Сидор Александрович',
    rank: 'Brown Belt',
    title: 'Инструктор / Чемпион Европы по Кудо',
    bio: 'Эксперт в области комбинированных техник. Совмещает карате, дзюдо и тайский бокс в единую систему эффективного боя.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYVbuGYGWXTGoBEdaPKiMA9WzIJdEPDMwJkxuVxwdXSn8tyImOpvu8cOf16j5la-f02hWgedmxZ2baz8hepoZ6sjmJb1xxFcVwBX0aWRRPI0q4dU43MxkLCFqafzGEs9Kq4PEIdBY3QvrXZ9lfAa8k9ePlxepQphgoUo2ddrKw1FFXyOYqNKX1NZHav3QA7uBwkpEQ3Q2BluF-Jym9kA1ksdrzjnsTOJypaoqGsMd_tBJEUyeAoeeueya4nyGboTb8gHqVcLtxq6gX',
    achievements: [
      'Чемпион Европы по Кудо',
      'Черный пояс по Карате',
      'Специалист по функциональной подготовке'
    ],
    specialization: [
      'Kudo Fighting',
      'Striking for Jitsu',
      'Endurance Training'
    ]
  }
];

const PROGRAMS: Program[] = [
  {
    id: 'bjj',
    name: 'Боевое джиу-джитсу',
    target: 'Для детей / Для взрослых',
    description: 'Система самозащиты и рукопашного боя, вобравшая в себя лучшие приемы из борьбы, ударов и болевых воздействий. Обучение включает технику бросков, удушающих и болевых приемов на руки и ноги.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC96JVLgVG33FqGTAE6VsyEqG_zlvOjmr9DY8Ixxf93xgqaREJIRI6N9WxW_G70mezYFK92enwZ0csldcB1E682MqtSjfdKzdFTBENq4qtj6hd9KPH9kA2yYpS3Um5grDdS1iUe7_MXkKr0zKwky30FmbGJJQ7f-AFqLiNnfNe36L4OwmzDhDbTIZ-B0ESHe2UE4LZ5zaNId4s8yMNJUBz3opbLYT4yQzMYbCWS0xXU_peyryBAjHXFP2_6KJlTmF28D9smd5LS2zuc',
  },
  {
    id: 'kudo',
    name: 'Кудо',
    target: 'Для детей / Для взрослых',
    description: 'Современное полноконтактное боевое искусство, сочетающее в себе карате, дзюдо и тайский бокс. Особенности — защитный шлем и возможность использовать как ударную, так и борцовскую технику.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6WEVFPG4SP1XSiWtZjDbTkyMQn0ilKVwdGWpXY1wNTZ1tLtbYv98Dwb0Snmz8OsPLbR9ZEkP5NG4CMDonZXD_v-T0yFGLpVGgp0UUwPT2nvVF7n3WG3y64mg9kPbRRN6QgpxPdiCwRuITGEHXQw2pmysUZRbXhAY3csCqii14QW50XoonfnOGEFXi6ecJM3K3WFmn4xOAZgL150TnU7xt4H3KtVxzktSnrYDh8byRC7JS5fHEO6yfROGXobKosj3isGyANKQ3gzq',
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

const REVIEWS = [
  { id: '1', name: 'Дмитрий Соколов', date: '15 января 2024', rating: 5, text: 'Отличный клуб! Тренеры — профессионалы своего дела. Атмосфера рабочая, дисциплина на высоте. Рекомендую всем, кто хочет научиться реально бороться.' },
  { id: '2', name: 'Анна Новикова', date: '2 февраля 2024', rating: 5, text: 'Сын занимается в детской группе уже год. Очень довольны результатом: стал более собранным, уверенным в себе. Тренеры находят подход к каждому ребенку.' },
  { id: '3', name: 'Михаил Волков', date: '21 марта 2024', rating: 5, text: 'Хороший зал, есть все необходимое. Тренировки интенсивные. Нравится, что много времени уделяется технике, а не просто "физухе".' },
];

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const TIMES = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

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
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-on-surface/50 hover:text-primary-container z-50 transition-colors"
              >
                <X size={32} />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RegistrationForm = ({ coachName, onSuccess }: { coachName?: string; onSuccess: () => void }) => {
  return (
    <div className="px-8 py-12 md:px-16 md:py-20 bg-surface-container relative">
      <div className=" grit-texture absolute inset-0 opacity-5" />
      <div className="h-1.5 w-full bg-primary-container absolute top-0 left-0" />
      
      <div className="mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase italic tracking-tighter mb-4 text-on-surface">
          Записаться на тренировку
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
            Ваше имя (необязательно)
          </label>
          <input 
            type="text" 
            placeholder="Введите имя"
            className="w-full bg-transparent border-b-2 border-outline-variant py-4 px-0 font-body-lg text-on-surface placeholder:text-on-secondary-container focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        <div className="group relative">
          <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Номер телефона (обязательно)
          </label>
          <input 
            required
            type="tel" 
            placeholder="+7 (___) ___-__-__"
            className="w-full bg-transparent border-b-2 border-outline-variant py-4 px-0 font-body-lg text-on-surface placeholder:text-on-secondary-container focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        <div className="pt-6">
          <button className="w-full btn-primary flex items-center justify-center gap-4 text-xl">
            <span>Записаться</span>
            <ArrowRight />
          </button>
        </div>

        <p className="text-center text-[10px] text-on-secondary-container uppercase tracking-[0.2em] opacity-50">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};

export default function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeModal, setActiveModal] = useState<'none' | 'registration' | 'coach' | 'schedule'>('none');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const sections = ['about', 'benefits', 'coaches', 'programs', 'reviews', 'pricing', 'faq', 'locations'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
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

  const openSchedule = () => {
    setActiveModal('schedule');
  };

  const handleRegistrationSuccess = () => {
    alert('Заявка успешно отправлена! Мы перезвоним вам.');
    setActiveModal('none');
  };

  const renderNavLinks = () => (
    <>
      <a href="#about" className={`anchor-link ${activeSection === 'about' ? 'active' : ''}`}>О нас</a>
      <a href="#coaches" className={`anchor-link ${activeSection === 'coaches' ? 'active' : ''}`}>Тренеры</a>
      <a href="#programs" className={`anchor-link ${activeSection === 'programs' ? 'active' : ''}`}>Программы</a>
      <a href="#pricing" className={`anchor-link ${activeSection === 'pricing' ? 'active' : ''}`}>Абонементы</a>
      <a href="#faq" className={`anchor-link ${activeSection === 'faq' ? 'active' : ''}`}>Вопросы</a>
      <a href="#locations" className={`anchor-link ${activeSection === 'locations' ? 'active' : ''}`}>Филиалы</a>
    </>
  );

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary-container selection:text-on-primary-container">
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
            <span className="font-display text-2xl md:text-3xl text-primary font-black uppercase tracking-tighter italic group-hover:brightness-110 transition-all">ЭВЕРЕСТ</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {renderNavLinks()}
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79990000000" className="hidden sm:flex items-center gap-2 text-on-surface hover:text-primary transition-colors text-sm font-bold">
              <Phone size={18} className="text-primary-container" />
              +7 (999) 000-00-00
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity hidden sm:block">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0ujjFcpHVGNwA4ey5SWFy1XKbNTItRqRTacZZZxuNPO5RLCiDJqhpZPxqHlMSs_DGuc_-vJ0Xsma_1gpdO7BsQ2WQ-SB7BmkyRonClcf6X-N0FAej0CZAflCgXEmUE1rInkqOxrqRZhB-WaPZ42iXjHE_WP3lGOMW1Ldtqsoj1tWdc-wgnCbi6TpCiupE1iwXZQphV06r7MO5jDxGgNsyTJoKZACY2S52rDQRoRXX8MeK0yfZo3BTNm4y4E" 
                alt="VK" 
                className="h-8 w-8 rounded-lg"
              />
            </a>
            <button className="lg:hidden text-on-surface" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={32} />
            </button>
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
              <span className="font-display text-2xl text-primary font-black uppercase tracking-tighter italic">ЭВЕРЕСТ</span>
              <button onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(false); }}>
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 text-2xl">
              {renderNavLinks()}
            </nav>
            <div className="mt-auto pt-8 border-t border-outline-variant">
              <a href="tel:+79990000000" className="flex items-center gap-4 text-xl font-bold mb-6">
                <Phone size={24} className="text-primary-container" />
                +7 (999) 000-00-00
              </a>
              <button onClick={() => { setMobileMenuOpen(false); openRegistration(); }} className="btn-primary w-full text-xl py-6">
                Записаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center pt-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA046Pdpw7o5BuYQ8-1D2pDhy0sdJy6tYK6ZifIdKKhL4qy8qP8GK08Opu7Eb-GjmzApmnxvDwirw_blS5_7VKmdluIIh5bk1J-9hKgHjtI01JUghe0M6eMCBb_J3itdzHkBRhuLqUZ-uhRToeEnA8iTbrZXRQtWJHuwB1oodjDjTtmrV-Wird6YjdQLqh-1AJbyTHtP7aoST_6oTCX-qmhK4_PXl-fTky9zQHOgLoGhZ-3wgbWsQCaHEK_VVGuvzFOxEfyJ2nFwYdf" 
              alt="BJJ Combat"
              className="w-full h-full object-cover grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>
          
          <div className="relative z-10 px-gutter max-w-container-max mx-auto w-full">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="font-display text-6xl md:text-8xl text-on-surface mb-6 uppercase font-black leading-[0.9] tracking-tighter">
                ЭВЕРЕСТ: <br />
                <span className="text-primary-container italic">ПУТЬ К ВЕРШИНЕ МАСТЕРСТВА</span>
              </h1>
              <p className="text-primary font-display font-bold uppercase tracking-[0.4em] mb-12 text-sm md:text-lg">
                Первая тренировка бесплатно!
              </p>
              <button onClick={() => openRegistration()} className="btn-primary text-xl md:text-2xl px-12 py-8 group">
                <span className="flex items-center gap-4">
                  ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ТРЕНИРОВКУ
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-32 bg-surface-container relative overflow-hidden scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="section-title">О нас</h2>
              <div className="space-y-6 text-on-surface-variant text-body-lg">
                <p>Спортивный клуб Эверест начал свое существование в 2003 г. За это время мы воспитали сотни атлетов, многие из которых стали мастерами спорта и чемпионами турниров.</p>
                <p>Юридический статус под названием Центр физической культуры и спорта «Эверест» получил в 2017 г. Тренировки проводятся для детей и взрослых. Организованы секции боевого джиу-джитсу, кудо.</p>
                <p>Проводятся соревнования и семинары по всей России, что позволяет нашим ученикам постоянно расти и обмениваться опытом с лучшими школами страны.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <div>
                  <div className="text-primary-container font-display text-5xl font-black italic">3</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2">Вида спорта</div>
                </div>
                <div>
                  <div className="text-primary-container font-display text-5xl font-black italic">462</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2">Наград</div>
                </div>
                <div>
                  <div className="text-primary-container font-display text-5xl font-black italic">3</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2">Тренера</div>
                </div>
                <div>
                  <div className="text-primary-container font-display text-5xl font-black italic">951</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-2">Воспитанников</div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-8 border-l-8 border-primary-container" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-8 border-r-8 border-primary-container" />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdZnDAyDIGEWuyMQknTyox5bjHmYZWjKIo6hlCxudXNrIS077TJht2hgu_9yyXic9U1yidTp5wg6t3KkL5Thnb93oqcQ6lTA7FMHQDyGRX_NduhdGTwM_zjdYJjjBRvdSXvhuEnRBpkP7KA-lzrkD8qOGF-jMNmS664i7gZbrN8zyBra___VUFJ7_Ofp6aKUGnOAGhVqs8IXabjsrZoI7HfEfPmDcGXola5BsiS58iKdAXFoFh_OyZJgGd-zqzWmOI2340VMv_Z4PL" 
                alt="Academy interior"
                className="w-full grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* --- Benefits Section --- */}
        <section id="benefits" className="py-32 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Что дают тренировки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Уверенность', desc: 'Побеждайте внутренние страхи и сомнения, становясь сильнее с каждым новым поединком.', icon: <Check size={40} /> },
              { title: 'Дисциплина', desc: 'Регулярные тренировки закаляют характер и приучают к порядку во всех сферах жизни.', icon: <Shield size={40} /> },
              { title: 'Сила', desc: 'Развивайте функциональное и атлетичное тело борца под руководством профессионалов.', icon: <Dumbbell size={40} /> },
              { title: 'Техника', desc: 'Овладейте искусством рычагов и контроля, позволяющим побеждать более крупных противников.', icon: <Zap size={40} /> },
              { title: 'Дух', desc: 'Обретите ментальную устойчивость, которая приходит через преодоление трудностей на татами.', icon: <Target size={40} /> },
              { title: 'Сообщество', desc: 'Станьте частью сплоченного братства сильных людей, всегда готовых поддержать.', icon: <Users size={40} /> },
            ].map((item) => (
              <motion.div 
                key={item.title}
                whileHover={{ scale: 1.02 }}
                className="card-dark p-8 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 group-hover:bg-primary-container/20 transition-colors flex items-center justify-center -mr-4 -mt-4 rotate-12">
                  <span className="text-primary-container -rotate-12">{item.icon}</span>
                </div>
                <h3 className="font-display text-2xl uppercase font-bold italic mb-4 text-on-surface">{item.title}</h3>
                <p className="text-on-surface-variant line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Coaches Section --- */}
        <section id="coaches" className="py-32 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Тренеры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {COACHES.map((coach) => (
              <div key={coach.id} className="group cursor-pointer flex flex-col h-full" onClick={() => openCoach(coach)}>
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-highest mb-6 shrink-0">
                  <img 
                    src={coach.image} 
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
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
        <section id="programs" className="py-32 bg-surface-container relative scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto">
            <h2 className="section-title">Наши виды спорта</h2>
            <div className="space-y-24">
              {PROGRAMS.map((program, idx) => (
                <div key={program.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <img 
                      src={program.image} 
                      alt={program.name}
                      className="w-full h-[400px] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700 shadow-2xl"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-4xl md:text-5xl font-black uppercase text-primary-container italic mb-4">{program.name}</h3>
                    <p className="text-primary font-bold uppercase tracking-[0.2em] mb-8">{program.target}</p>
                    <p className="text-on-surface-variant text-body-lg mb-10 leading-relaxed">{program.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={openSchedule} className="btn-outline flex items-center justify-center gap-2">
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
        <section id="reviews" className="py-32 px-gutter max-w-container-max mx-auto overflow-hidden scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <h2 className="section-title mb-0">Отзывы на Яндекс.Картах</h2>
            <div className="flex items-center gap-4 bg-surface-container p-4 border border-outline-variant/30">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="font-display font-bold text-2xl">5.0</span>
              <span className="text-on-surface-variant text-xs uppercase tracking-widest">на основе 300+ отзывов</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-surface-container p-8 border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">{review.name}</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  <Check size={12} /> Подтвержденный визит
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="btn-outline">Читать все отзывы</button>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-32 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Абонементы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'trial', name: 'Разовое занятие', price: '600', items: ['Знакомство с клубом', 'Любая дисциплина', 'Инструктаж тренера'] },
              { id: 'unlimit', name: 'Безлимит на месяц', price: '4500', items: ['Все дисциплины', 'Без ограничений', 'Спецпредложения'] },
              { id: 'personal', name: 'Индивидуально', price: '1200', items: ['Персональный график', '100% внимания тренера', 'Быстрый прогресс'] },
            ].map((plan, idx) => (
              <div 
                key={plan.id}
                className={`flex flex-col p-12 text-center transition-all duration-300 ${idx === 1 ? 'bg-primary-container scale-105 shadow-2xl relative z-10' : 'bg-surface-container border-t-8 border-primary-container hover:-translate-y-2'}`}
              >
                {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-on-surface text-background px-4 py-1 font-bold uppercase text-[10px] tracking-widest">Популярный</div>}
                <h3 className={`font-display text-2xl uppercase font-black italic mb-8 ${idx === 1 ? 'text-white' : 'text-on-surface'}`}>{plan.name}</h3>
                <div className="mb-8">
                  <span className={`text-6xl font-black italic ${idx === 1 ? 'text-white' : 'text-primary'}`}>{plan.price}</span>
                  <span className={`uppercase font-bold ml-2 text-sm ${idx === 1 ? 'text-white/80' : 'text-on-surface-variant'}`}>руб.</span>
                </div>
                <ul className={`space-y-4 mb-12 flex-grow ${idx === 1 ? 'text-white/90' : 'text-on-surface-variant'}`}>
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
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" className="py-32 bg-surface-container relative scroll-mt-24">
          <div className="grit-texture absolute inset-0 opacity-5" />
          <div className="px-gutter max-w-container-max mx-auto max-w-4xl">
            <h2 className="section-title text-center border-l-0 pl-0">Вопросы и ответы</h2>
            <div className="space-y-4">
              {[
                { q: 'Со скольки лет можно приводить детей?', a: 'Мы принимаем детей в секции с 4-х лет. Группы разделены по возрастам для максимальной безопасности и эффективности обучения.' },
                { q: 'Что нужно взять на первую тренировку?', a: 'Удобную спортивную одежду (футболка и шорты без металлических замков), сменную обувь (тапочки) и душевые принадлежности.' },
                { q: 'Нужна ли справка от врача?', a: 'Для допуска к тренировкам требуется справка об отсутствии противопоказаний к занятиям единоборствами.' },
                { q: 'Есть ли занятия для взрослых новичков?', a: 'Да, у нас есть специальные группы начального уровня, где обучают базовой технике с нуля.' },
              ].map((faq, i) => (
                <div key={i} className="bg-surface border border-outline-variant transition-all hover:border-primary">
                  <details className="group">
                    <summary className="flex justify-between items-center p-8 cursor-pointer list-none font-display font-bold uppercase text-lg group-hover:text-primary transition-colors">
                      {faq.q}
                      <ChevronDown size={24} className="group-open:rotate-180 transition-transform text-primary" />
                    </summary>
                    <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Locations Section --- */}
        <section id="locations" className="py-32 px-gutter max-w-container-max mx-auto scroll-mt-24">
          <h2 className="section-title">Как нас найти</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                <div className="h-80 overflow-hidden relative">
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
                <div className="p-8">
                  <h3 className="font-display text-2xl uppercase font-black italic mb-2">{loc.name}</h3>
                  <p className="text-on-surface opacity-80 mb-1">{loc.addr}</p>
                  <p className="text-primary-container font-display text-xs font-bold uppercase tracking-widest">{loc.features}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-20 px-gutter">
        <div className="max-w-container-max mx-auto flex flex-col items-center">
          <div className="font-display text-4xl text-primary font-black uppercase tracking-tighter italic mb-12">ЭВЕРЕСТ</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full mb-16 text-center md:text-left">
            <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Контакты</h4>
              <p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-primary-container" />
                +7 (999) 000-00-00
              </p>
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
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Политика конфиденциальности</a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Публичная оферта</a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Правила клуба</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-bold uppercase tracking-widest text-primary">Соцсети</h4>
              <div className="flex justify-center md:justify-start">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujjFcpHVGNwA4ey5SWFy1XKbNTItRqRTacZZZxuNPO5RLCiDJqhpZPxqHlMSs_DGuc_-vJ0Xsma_1gpdO7BsQ2WQ-SB7BmkyRonClcf6X-N0FAej0CZAflCgXEmUE1rInkqOxrqRZhB-WaPZ42iXjHE_WP3lGOMW1Ldtqsoj1tWdc-wgnCbi6TpCiupE1iwXZQphV06r7MO5jDxGgNsyTJoKZACY2S52rDQRoRXX8MeK0yfZo3BTNm4y4E" 
                    alt="VK" 
                    className="h-10 w-10 rounded-lg"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-outline-variant w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-50">
            <span>© 2024 Академия Джиу-Джитсу Эверест</span>
            <span>Сделано для чемпионов</span>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      <Modal isOpen={activeModal === 'registration'} onClose={() => setActiveModal('none')}>
        <RegistrationForm coachName={selectedCoach?.name} onSuccess={handleRegistrationSuccess} />
      </Modal>

      <Modal isOpen={activeModal === 'coach'} onClose={() => setActiveModal('none')}>
        {selectedCoach && (
          <div className="flex flex-col md:flex-row min-h-[600px]">
            <div className="w-full md:w-5/12 relative bg-surface-container-highest overflow-hidden h-[400px] md:h-auto">
              <img 
                src={selectedCoach.image} 
                alt={selectedCoach.name}
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-0 bg-primary-container px-6 py-3 shadow-lg transform -translate-x-2">
                <span className="font-display font-bold text-on-primary-container uppercase italic tracking-widest">{selectedCoach.rank}</span>
              </div>
            </div>
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between bg-surface-container relative overflow-hidden">
               <div className="grit-texture absolute inset-0 opacity-5" />
               <div className="relative z-10">
                 <div className="mb-10">
                   <h2 className="font-display text-4xl md:text-5xl text-on-surface uppercase tracking-tighter italic mb-1 font-black">{selectedCoach.name}</h2>
                   <p className="text-primary uppercase tracking-[0.2em] font-bold text-xs">{selectedCoach.title}</p>
                   <div className="h-1 w-20 bg-primary-container mt-4" />
                 </div>
                 
                 <div className="space-y-8 text-on-surface-variant">
                   <p className="text-lg leading-relaxed">{selectedCoach.bio}</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
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
                       <h4 className="font-display font-bold text-on-surface uppercase text-sm mb-4 tracking-widest">Специализация</h4>
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

               <div className="mt-12 relative z-10">
                 <button onClick={() => setActiveModal('registration')} className="btn-primary w-full flex items-center justify-center gap-4">
                    Записаться на тренировку
                    <ArrowRight />
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
              <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase italic">Расписание: Боевое Джиу-Джитсу</h2>
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
                       const session = SCHEDULE.find(s => s.day === day && s.time === time);
                       return (
                         <div key={`${day}-${time}`} className="h-14 md:h-16 border-r border-b border-outline-variant relative p-0.5 group">
                           {showTimeIndicator && (
                             <div 
                               className="absolute left-0 right-0 h-0.5 bg-primary-container/30 z-30 pointer-events-none" 
                               style={{ top: `${topPercent}%` }}
                             />
                           )}
                           {session && (
                             <div className={`h-full w-full border-l-4 p-2 flex flex-col justify-between transition-colors shadow-lg cursor-pointer ${
                               session.type === 'fundamentals' ? 'bg-surface-variant border-primary-container hover:bg-surface-bright' :
                               session.type === 'advanced' ? 'bg-primary-container border-white hover:brightness-110' :
                               'bg-secondary-container border-on-secondary-container hover:brightness-110'
                             }`}>
                               <span className={`text-[8px] font-black uppercase ${session.type === 'advanced' ? 'text-white/80' : 'text-primary'}`}>{session.title}</span>
                               <span className={`text-[10px] font-black leading-tight ${session.type === 'advanced' ? 'text-white' : 'text-on-surface'}`}>БОЕВОЕ ДЖИУ-ДЖИТСУ</span>
                               <span className={`text-[8px] italic ${session.type === 'advanced' ? 'text-white/70' : 'text-on-surface-variant'}`}>{session.coach}</span>
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
            <button onClick={() => setActiveModal('registration')} className="btn-primary w-full md:w-auto px-12">
              Записаться на тренировку
            </button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}
