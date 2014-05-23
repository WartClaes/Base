(function($) {
    $.fn.scrollToAnchor = function(offset) {
        var $this = this;

        $this.bind('click', function(event){
            var href = $(this).attr('href');

            if(href.substring(0, 1) === '#' && $(href).length) {
                event.preventDefault();

                var top = $(href).offset().top;

                if(typeof offset !== 'undefined'){
                    top = top - parseInt(offset);
                }

                $('html, body').animate({
                    scrollTop: top
                }, 'slow');

                return false;
            }
        });
    };
}(jQuery));