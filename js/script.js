// slick-slider на JQwery
$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 1200,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png" alt="slide1"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png" alt="slide1"></button>',
      responsive: [{
         breakpoint: 992,
         settings: {
            dots: true,
            arrows: false
         }
      }]
   });

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });




   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         });
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');


   //! MODAL 

   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
   });

   $('.button_mini').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn(700);
      });
   });

   // закрытие модального окна по крестику и по клику за пределами окна
   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #order, #thanks').fadeOut(500);
   });

   // validation

   function validateForms(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2
            },
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: {
               required: "Пожалуйста, введите свое имя",
               minlength: jQuery.validator.format("Минимальное количество символов {0}!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Пожалуйста, введите свой E-mail",
               email: "Ваш email должен быть в формате name@domain.com"
            }
         }
      });
   };

   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   $("input[name=phone]").mask("+7 (999) 999-99-99");

   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }

      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll and page up 
   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });
   AOS.init();
});