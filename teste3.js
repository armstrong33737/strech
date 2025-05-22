(function($) {
    "use strict"
    jQuery(document).ready(function() {

        // Department Slider
        $('.porfolio').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            nav: false,
            dots: true,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });

        // Date Picker
        jQuery('#datepicker').datetimepicker({
            timepicker:false,
            format:'d.m.Y',
        });

        // // Nice Select
        $('select').niceSelect();

    });

   
})(jQuery);
