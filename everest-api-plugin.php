<?php
/**
 * Plugin Name: Everest WP API Integration
 * Description: Кастомный плагин для интеграции расписания и абонементов Лендинга Эверест с WordPress REST API.
 * Version: 1.0.0
 * Author: Everest Dev
 */

if (!defined('ABSPATH')) {
    exit; // Запрет прямого доступа
}

/**
 * Класс интеграции Everest WP API
 */
class Everest_WP_Integration {

    public function __construct() {
        // Регистрация эндпоинтов REST API
        add_action('rest_api_init', [$this, 'register_rest_endpoints']);
        
        // Разрешение CORS заголовков (чтобы SPA на поддомене или в другой папке могла делать запросы)
        add_filter('rest_pre_serve_request', [$this, 'handle_cors'], 10, 4);

        // Регистрация страницы настроек в админ-панели (как альтернативный супер-быстрый способ редактирования)
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_init', [$this, 'register_plugin_settings']);
    }

    /**
     * Разрешение CORS запросов
     */
    public function handle_cors($value, $result, $request, $server) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce");
        return $value;
    }

    /**
     * Регистрация эндпоинтов
     */
    public function register_rest_endpoints() {
        // 1. Расписание: GET /wp-json/everest/v1/schedule
        register_rest_route('everest/v1', '/schedule', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_schedule'],
            'permission_callback' => '__return_true',
        ]);

        // 2. Цены/Абонементы: GET /wp-json/everest/v1/pricing
        register_rest_route('everest/v1', '/pricing', [
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => [$this, 'get_pricing'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Возвращает расписание тренировок
     */
    public function get_schedule(WP_REST_Request $request) {
        // Сначала проверяем, сохранены ли настройки прямого редактирования в плагине
        $custom_schedule = get_option('everest_custom_schedule');
        if (!empty($custom_schedule)) {
            $data = json_decode($custom_schedule, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return new WP_REST_Response($data, 200);
            }
        }

        // Если вы настроили Custom Post Types (название CPT 'schedule_item')
        // и хотите тянуть из них, вот алгоритм разбора полей:
        $args = [
            'post_type'      => 'schedule_item', // Имя вашего CPT для расписания
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ];

        $posts = get_posts($args);
        
        // Если записей в CPT нет, отдаем базовый шаблон, чтобы сайт не сломался
        if (empty($posts)) {
            return new WP_REST_Response($this->get_mock_schedule(), 200);
        }

        $formatted_schedule = [
            'bjj' => ['raduzhny' => [], 'south' => []],
            'grappling' => ['raduzhny' => [], 'south' => []],
            'kudo' => ['raduzhny' => [], 'south' => []],
        ];

        foreach ($posts as $post) {
            $id = $post->ID;
            
            // Получаем мета-поля (или с помощью ACF get_field('field_name', $id))
            $program = get_post_meta($id, 'program', true); // 'bjj', 'grappling', 'kudo'
            $branch  = get_post_meta($id, 'branch', true);  // 'raduzhny', 'south'
            
            $day     = get_post_meta($id, 'day', true);     // 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
            $time    = get_post_meta($id, 'time', true);    // '18:00'
            $title   = $post->post_title;                   // Название (например: 'Fundamentals', 'Kudo Kids')
            $coach   = get_post_meta($id, 'coach', true);   // 'В. Падалко'

            // Безопасно заполняем структуру
            if (isset($formatted_schedule[$program][$branch])) {
                $formatted_schedule[$program][$branch][] = [
                    'id'    => 'wp_' . $id,
                    'day'   => $day ? $day : 'Пн',
                    'time'  => $time ? $time : '10:00',
                    'title' => $title,
                    'coach' => $coach ? $coach : 'Тренер'
                ];
            }
        }

        return new WP_REST_Response($formatted_schedule, 200);
    }

    /**
     * Возвращает тарифы / абонементы
     */
    public function get_pricing(WP_REST_Request $request) {
        // Проверяем настроенный JSON в опции админки
        $custom_pricing = get_option('everest_custom_pricing');
        if (!empty($custom_pricing)) {
            $data = json_decode($custom_pricing, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return new WP_REST_Response($data, 200);
            }
        }

        // Если вы настроили Custom Post Types (название CPT 'membership')
        $args = [
            'post_type'      => 'membership', // Имя CPT для абонементов
            'posts_per_page' => -1,
            'post_status'    => 'publish',
            'orderby'        => 'menu_order', // Сортировка по порядку перетаскивания записей
            'order'          => 'ASC'
        ];

        $posts = get_posts($args);

        if (empty($posts)) {
            return new WP_REST_Response($this->get_mock_pricing(), 200);
        }

        $formatted_pricing = [
            'general' => [],
            'parents' => [],
            'men'     => []
        ];

        foreach ($posts as $post) {
            $id = $post->ID;

            // Читаем аудиторию (general, parents, men)
            // Это может быть кастомное поле или Таксономия в WP.
            $audience = get_post_meta($id, 'audience', true); // 'general', 'parents', 'men'
            if (!$audience) {
                $audience = 'general';
            }

            $price  = get_post_meta($id, 'price', true);  // '4500' или '700'
            $period = get_post_meta($id, 'period', true); // 'в месяц (групповые)'
            
            // Список преимуществ (например, текстовое поле, каждая строка с новой строки)
            $items_text = get_post_meta($id, 'features', true);
            $items = [];
            if (!empty($items_text)) {
                $items = array_filter(array_map('trim', explode("\n", $items_text)));
            }

            // Добавляем запись в нужный массив
            if (isset($formatted_pricing[$audience])) {
                $formatted_pricing[$audience][] = [
                    'id'     => 'wp_price_' . $id,
                    'name'   => $post->post_title,
                    'price'  => $price ? $price : '0',
                    'period' => $period ? $period : '',
                    'items'  => array_values($items)
                ];
            }
        }

        return new WP_REST_Response($formatted_pricing, 200);
    }

    /**
     * Админ-меню настроек (для визуального контроля и прямого JSON редактирования)
     */
    public function register_admin_menu() {
        add_menu_page(
            'Эверест Лендинг', 
            'Эверест API', 
            'manage_options', 
            'everest-landing-config', 
            [$this, 'render_admin_page'], 
            'dashicons-clipboard',
            30
        );
    }

    public function register_plugin_settings() {
        register_setting('everest_settings_group', 'everest_custom_schedule');
        register_setting('everest_settings_group', 'everest_custom_pricing');
    }

    public function render_admin_page() {
        $custom_schedule = get_option('everest_custom_schedule', json_encode($this->get_mock_schedule(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $custom_pricing  = get_option('everest_custom_pricing', json_encode($this->get_mock_pricing(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        ?>
        <div class="wrap">
            <h1>Управление расписанием и тарифами (Эверест Лендинг)</h1>
            <p>Вы можете редактировать данные напрямую через JSON ниже (это применится мгновенно) или использовать Custom Post Types в вашей теме.</p>
            
            <form method="post" action="options.php">
                <?php settings_fields('everest_settings_group'); ?>
                <?php do_settings_sections('everest_settings_group'); ?>

                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label for="everest_custom_schedule"><strong>Расписание тренировок (JSON РФ)</strong></label>
                                <p class="description">Должен соответствовать структуре дней (Пн, Вт...), видов спорта (bjj, kudo, grappling) и филиалов (raduzhny, south).</p>
                            </th>
                            <td>
                                <textarea id="everest_custom_schedule" name="everest_custom_schedule" rows="18" class="large-text code" style="font-family: monospace; font-size: 13px;"><?php echo esc_textarea($custom_schedule); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="everest_custom_pricing"><strong>Абонементы и цены (JSON)</strong></label>
                                <p class="description">Категории: general (Общий), parents (Родителям), men (Мужчинам).</p>
                            </th>
                            <td>
                                <textarea id="everest_custom_pricing" name="everest_custom_pricing" rows="18" class="large-text code" style="font-family: monospace; font-size: 13px;"><?php echo esc_textarea($custom_pricing); ?></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <?php submit_button('Сохранить настройки лендинга'); ?>
            </form>
        </div>
        <?php
    }

    /**
     * Стандартные моковые данные расписания в случае пустого CPT
     */
    private function get_mock_schedule() {
        return [
            'bjj' => [
                'raduzhny' => [
                    ['id' => 'r1', 'day' => 'Пн', 'time' => '10:00', 'title' => 'Fundamentals', 'coach' => 'А. Соколов'],
                    ['id' => 'r2', 'day' => 'Ср', 'time' => '10:00', 'title' => 'Fundamentals', 'coach' => 'А. Соколов'],
                    ['id' => 'r3', 'day' => 'Пт', 'time' => '10:00', 'title' => 'Fundamentals', 'coach' => 'А. Соколов'],
                    ['id' => 'r4', 'day' => 'Пн', 'time' => '18:00', 'title' => 'Pro Level', 'coach' => 'Д. Новиков'],
                    ['id' => 'r5', 'day' => 'Вт', 'time' => '18:00', 'title' => 'Pro Level', 'coach' => 'Д. Новиков'],
                    ['id' => 'r6', 'day' => 'Ср', 'time' => '18:00', 'title' => 'Pro Level', 'coach' => 'Д. Новиков'],
                    ['id' => 'r7', 'day' => 'Чт', 'time' => '18:00', 'title' => 'Pro Level', 'coach' => 'Д. Новиков'],
                    ['id' => 'r8', 'day' => 'Пт', 'time' => '18:00', 'title' => 'Pro Level', 'coach' => 'Д. Новиков'],
                    ['id' => 'r9', 'day' => 'Сб', 'time' => '14:00', 'title' => 'Sparring Session', 'coach' => 'М. Волков'],
                ],
                'south' => [
                    ['id' => 's1', 'day' => 'Пн', 'time' => '09:00', 'title' => 'Morning BJJ', 'coach' => 'А. Семенов'],
                    ['id' => 's2', 'day' => 'Ср', 'time' => '09:00', 'title' => 'Morning BJJ', 'coach' => 'А. Семенов'],
                    ['id' => 's3', 'day' => 'Пт', 'time' => '09:00', 'title' => 'Morning BJJ', 'coach' => 'А. Семенов'],
                    ['id' => 's4', 'day' => 'Вт', 'time' => '19:00', 'title' => 'Evening Pro', 'coach' => 'А. Чернов'],
                    ['id' => 's5', 'day' => 'Чт', 'time' => '19:00', 'title' => 'Evening Pro', 'coach' => 'А. Чернов'],
                    ['id' => 's6', 'day' => 'Сб', 'time' => '13:00', 'title' => 'Sparring', 'coach' => 'А. Семенов'],
                ]
            ],
            'grappling' => [
                'raduzhny' => [
                    ['id' => 'rg1', 'day' => 'Вт', 'time' => '18:00', 'title' => 'Grappling Intro', 'coach' => 'В. Падалко'],
                    ['id' => 'rg2', 'day' => 'Чт', 'time' => '18:00', 'title' => 'Grappling Intro', 'coach' => 'В. Падалко'],
                    ['id' => 'rg3', 'day' => 'Сб', 'time' => '12:00', 'title' => 'Open Mat', 'coach' => 'Сборная'],
                    ['id' => 'rg4', 'day' => 'Пн', 'time' => '20:00', 'title' => 'No-Gi Advanced', 'coach' => 'А. Чернов'],
                    ['id' => 'rg5', 'day' => 'Ср', 'time' => '20:00', 'title' => 'No-Gi Advanced', 'coach' => 'А. Чернов'],
                ],
                'south' => [
                    ['id' => 'sg1', 'day' => 'Пн', 'time' => '19:00', 'title' => 'Grappling Basics', 'coach' => 'А. Семенов'],
                    ['id' => 'sg2', 'day' => 'Ср', 'time' => '19:00', 'title' => 'Grappling Basics', 'coach' => 'А. Семенов'],
                    ['id' => 'sg3', 'day' => 'Пт', 'time' => '19:00', 'title' => 'Grappling Advanced', 'coach' => 'А. Семенов'],
                    ['id' => 'sg4', 'day' => 'Сб', 'time' => '11:00', 'title' => 'Open Mat', 'coach' => 'А. Семенов'],
                ]
            ],
            'kudo' => [
                'raduzhny' => [
                    ['id' => 'rk1', 'day' => 'Вт', 'time' => '10:00', 'title' => 'Kudo Kids', 'coach' => 'В. Падалко'],
                    ['id' => 'rk2', 'day' => 'Чт', 'time' => '10:00', 'title' => 'Kudo Kids', 'coach' => 'В. Падалко'],
                    ['id' => 'rk3', 'day' => 'Сб', 'time' => '10:00', 'title' => 'Kudo Intensive', 'coach' => 'В. Падалко'],
                    ['id' => 'rk4', 'day' => 'Пн', 'time' => '19:00', 'title' => 'Kudo Adults', 'coach' => 'В. Падалко'],
                    ['id' => 'rk5', 'day' => 'Ср', 'time' => '19:00', 'title' => 'Kudo Adults', 'coach' => 'В. Падалко'],
                ],
                'south' => [
                    ['id' => 'sk1', 'day' => 'Пн', 'time' => '17:00', 'title' => 'Kudo Kids', 'coach' => 'А. Чернов'],
                    ['id' => 'sk2', 'day' => 'Ср', 'time' => '17:00', 'title' => 'Kudo Kids', 'coach' => 'А. Чернов'],
                    ['id' => 'sk3', 'day' => 'Пт', 'time' => '17:00', 'title' => 'Kudo Kids', 'coach' => 'А. Чернов'],
                    ['id' => 'sk4', 'day' => 'Вт', 'time' => '20:00', 'title' => 'Kudo Adults', 'coach' => 'А. Чернов'],
                    ['id' => 'sk5', 'day' => 'Чт', 'time' => '20:00', 'title' => 'Kudo Adults', 'coach' => 'А. Чернов'],
                ]
            ]
        ];
    }

    /**
     * Стандартные моковые данные цен в случае пустого CPT
     */
    private function get_mock_pricing() {
        return [
            'general' => [
                ['id' => 'single', 'name' => 'Разовое занятие', 'price' => '700', 'period' => 'за 1 тренировку в группе', 'items' => ['Занятие в общей группе по расписанию', 'Любая дисциплина на выбор', 'Инструктаж тренера и разбор ошибок']],
                ['id' => 'unlimit', 'name' => 'Абонемент на месяц', 'price' => '4500', 'period' => 'в месяц (групповые)', 'items' => ['Все дисциплины без ограничений по посещениям', 'Развитие выносливости и техники', 'Поддержка наставника в общем чате']],
                ['id' => 'personal', 'name' => 'Индивидуально', 'price' => '1600', 'period' => 'за 1 персональную тренировку', 'items' => ['100% внимания личного тренера', 'Индивидуальная программа и удобный график', 'Быстрый и безопасный прогресс на ковре']],
            ],
            'parents' => [
                ['id' => 'single', 'name' => 'Разовое детское', 'price' => '700', 'period' => 'за 1 тренировку в группе', 'items' => ['Групповое занятие с детьми своего возраста', 'Оценка координации и интереса ребенка', 'Безопасное вливание в дружную команду']],
                ['id' => 'unlimit', 'name' => 'Детский абонемент', 'price' => '4500', 'period' => 'в месяц (групповые)', 'items' => ['Посещение Кудо или Джиу-Джитсу (3 раза в неделю)', 'Заморока абонемента по медицинской справке', 'Участие в детских турнирах и аттестациях']],
                ['id' => 'personal', 'name' => 'Индивидуально (Дети)', 'price' => '1600', 'period' => 'за 1 персональную тренировку', 'items' => ['Штучный разбор детской техники и моторики', 'Особенно чуткий и осторожный подход', 'Максимальная безопасность под присмотром']],
            ],
            'men' => [
                ['id' => 'single', 'name' => 'Разовый бойцовский', 'price' => '700', 'period' => 'за 1 тренировку в группе', 'items' => ['Бойцовская тренировка в группе мужчин', 'Кудо, Джиу-Джитсу или Грэпплинг', 'Проверка сил на ковре в полную нагрузку']],
                ['id' => 'unlimit', 'name' => 'Безлимит на месяц', 'price' => '4500', 'period' => 'в месяц (групповые)', 'items' => ['Доступ ко всем группам и расписаниям', '3 тренировки в неделю с возможностью отработок', 'Развитие выносливости и мужской силы']],
                ['id' => 'personal', 'name' => 'Индивидуальная работа', 'price' => '1600', 'period' => 'за 1 персональную тренировку', 'items' => ['1 на 1 со старшим мастером', 'Постановка нокаутирующих ударов и захватов', 'Гибкий график до или после вашей работы']],
            ]
        ];
    }
}

// Запускаем плагин
new Everest_WP_Integration();
