/*  ---------------------------------------------------
 by IVAN SMIT
---------------------------------------------------------  */



'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.gallery-controls li').on('click', function () {
            $('.gallery-controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.gallery-filter').length > 0) {
            var containerEl = document.querySelector('.gallery-filter');
            var mixer = mixitup(containerEl);
        }

    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 2,
        dots: true,
        // autoplay: true,
        loop: true,
        smartSpeed: 1200,
        margin: 0,
        responsive: {
            320: {
                items: 1,
            },
            480: {
                items: 1,
            },
            992: {
                items: 2,
            }
        }
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /*------------------
        About Counter Up
    --------------------*/
    $('.ab-count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);





document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-section');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Скроллим вниз — скрываем панель
            header.style.transform = 'translateY(-100%)';
        } else {
            // Скроллим вверх — показываем панель
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
});


(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight+50;
        let startPosition = window.scrollY;
        let startTime = null;

        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());


function scrollToDescription(descId) {
    const descElement = document.getElementById(descId);
    if (descElement) {
        // Плавная прокрутка к элементу описания
        descElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // (Опционально) Кратковременное выделение элемента
        const originalBg = descElement.style.backgroundColor;
        descElement.style.backgroundColor = 'rgba(186, 169, 143, 0.15)'; // Светлый акцент
        setTimeout(() => {
            descElement.style.backgroundColor = originalBg; // Сброс фона
        }, 1500); // Сброс через 1.5 секунды
    } else {
        console.warn(`Элемент описания с ID ${descId} не найден.`);
    }
}




// Параллакс эффект для всей карточки товара
document.addEventListener('DOMContentLoaded', function() {
    const productCard = document.getElementById('productCardParallax');
    
    if (!productCard) return;
    
    const layers = productCard.querySelectorAll('.parallax-layer');
    const parallaxContainer = productCard.querySelector('.product-parallax-container');
    
    // Если нет контейнера с изображениями, выходим
    if (!parallaxContainer || layers.length === 0) return;
    
    productCard.addEventListener('mousemove', (e) => {
        // Получаем координаты мыши относительно всей карточки
        const rect = productCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Рассчитываем смещение на основе положения мыши
        // Центр карточки = (0.5, 0.5), края = (0, 0) или (1, 1)
        const centerX = 0.5;
        const centerY = 0.5;
        
        // Смещение от центра (от -0.5 до +0.5)
        const offsetX = x - centerX;
        const offsetY = y - centerY;
        
        // Применяем параллакс к каждому слою с разной интенсивностью
        layers.forEach((layer, index) => {
            // Интенсивность увеличивается с каждым слоем
            // layer-bg (index 0) - самый слабый эффект
            // layer-closeup (index 2) - самый сильный эффект
            const intensity = (index + 1) * 20; // 20, 40, 60px максимальное смещение
            
            const moveX = offsetX * intensity;
            const moveY = offsetY * intensity;
            
            // Плавное движение
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            layer.style.transition = 'transform 0.1s linear';
        });
    });
    
    // Сброс позиций при уходе мыши с карточки
    productCard.addEventListener('mouseleave', () => {
        layers.forEach((layer) => {
            layer.style.transform = 'translate(0, 0)';
            layer.style.transition = 'transform 0.5s ease';
            
            // Возвращаем обычный transition после анимации возврата
            setTimeout(() => {
                layer.style.transition = 'transform 0.1s linear';
            }, 500);
        });
    });
    
    // Дополнительно: эффект при наведении на карточку
    productCard.addEventListener('mouseenter', () => {
        layers.forEach((layer, index) => {
            // Легкое увеличение слоев при наведении
            const scale = 1 + (index * 0.01); // 1.00, 1.01, 1.02
            layer.style.transform = `scale(${scale})`;
            layer.style.transition = 'transform 0.3s ease';
        });
        
        setTimeout(() => {
            layers.forEach((layer) => {
                layer.style.transform = 'translate(0, 0)';
                layer.style.transition = 'transform 0.1s linear';
            });
        }, 300);
    });
});
