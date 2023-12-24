function widget_gallery_slider() {

    $('body:not(.ippedit) .widget_gallery01.add_design1 .wrapper_item, body:not(.ippedit) .widget_gallery01.add_design5 .wrapper_item').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 400,
        cssEase: 'ease-in-out',
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });

    $('body.ippedit .widget_gallery01.add_design1 .wrapper_item, body.ippedit .widget_gallery01.add_design5 .wrapper_item').slick({
        speed: 400,
        pauseOnHover: true,
        cssEase: 'ease-in-out',
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });

    if ($('body:not(.ippedit) .gallery_single, .gallery_single.slide_single').length) {
        var $gallery_single_slider = $('.gallery_single_slider');
        var $gallery_single_slider_thum = $('.gallery_single_slider_thum');
        $gallery_single_slider_thum.each(function () {
            $(this).append($(this).prev('.gallery_single_slider').contents().clone());
        });
        $gallery_single_slider.slick({
            speed: 400,
            cssEase: 'ease-in-out',
            dotsClass: 'pointer',
            draggable: false,
            fade: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            asNavFor: $gallery_single_slider_thum,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        draggable: true,
                        swipe: true,
                        fade: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        draggable: true,
                        swipe: true,
                        fade: false,
                        dots: true,
                        adaptiveHeight: true,
                    }
                },
            ],
        });
        $gallery_single_slider_thum.slick({
            speed: 400,
            cssEase: 'ease-in-out',
            draggable: false,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            focusOnSelect: true,
            asNavFor: $gallery_single_slider
        });

        $('.gallery_single_slider_thum a img').unwrap();
    }
}
