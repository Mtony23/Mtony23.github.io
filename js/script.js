window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    });
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    
    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    

    /// MODAL
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });


    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.purchase').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });


    $('input[name=phone]').mask("+999-9999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Slider

    let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.slick-prev'),
    next = document.querySelector('.slick-next'),
    dotsWrap = document.querySelector('.carousel__dots'),
    dots = document.querySelectorAll('.carousel__dot');

showSlides(slideIndex);

function showSlides(n) {

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    dots.forEach((item) => item.classList.remove('carousel__dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('carousel__dot-active');
}

function plusSlides(n) {
    showSlides(slideIndex += n); 
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener('click', function() {
    plusSlides(-1);
});

next.addEventListener('click', function() {
    plusSlides(1);
});

dotsWrap.addEventListener('click', function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
        if (event.target.classList.contains('carousel__dot') && event.target == dots[i-1]) {
            currentSlide(i);
        }
    }
});


});




