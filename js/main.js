/**
 * Инициализация каскадной анимации появления страницы.
 * Добавляет класс .page-loaded к <body>, который триггерит CSS-анимации
 * в блоках header, footer и hero.
 */
(function initPageAnimations() {
    'use strict';

    // Ждем полного построения DOM-дерева.
    // Альтернатива: window.addEventListener('load', ...) — ждать картинки/шрифты.
    // Для плавного старта UI лучше использовать DOMContentLoaded + двойной rAF.

    const onDomReady = () => {
        // Двойной requestAnimationFrame — стандартный паттерн для гарантии,
        // что браузер уже отрендерил текущее состояние (opacity: 0) 
        // и создал GPU-слои для transform/opacity.
        // Без этого анимация может "прыгнуть" или не запуститься корректно.

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.add('page-loaded');

                console.log('[Animation] Page loaded class added. Animations started.');
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDomReady);
    } else {
        // Если DOM уже готов (например, при hot-reload в dev-среде)
        onDomReady();
    }
})();