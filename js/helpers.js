(function($) {
    $.fn.numeric = function() {
        var $this = this;

        $this.bind('keydown keyup', function(event){
            var $this = $(this),
                maxChars = $this.attr('data-max-length');

            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 || (event.keyCode === 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            }

            // Ensure that it is a number and stop the keypress
            if ((!event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }

            if (typeof maxChars !== 'undefined') {
                if($this.val().length >= maxChars){
                    $this.val($this.val().substr(0, maxChars));
                }
            }
        });
    };

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

    $.fn.tagger = function(settings){
        var defaults = {
            prefix : 'tag',
            btnText: 'Add'
        };

        $.extend(defaults, settings);

        function addTag(data){
            if(data === '' || typeof data === 'undefined') {
                return;
            }

            var html = '',
                tag = data.split(','),
                l = tag.length;

            for ( var i = 0; i < l; ++i ){

                if(tag[i] !== ' '){
                    if(tag[i].indexOf(' ') === 0){
                        tag[i] = tag[i].substr(1);
                    }

                    html = '<span class="' + defaults.prefix + '-tag">' + tag[i] + '<span class="' + defaults.prefix + '-close">x</span></span>';
                }

                $container.append(html);
            }

            updateTags();
        }

        function removeTag($el){
            $el.closest('.' + defaults.prefix + '-tag').remove();
            updateTags();
        }

        function updateTags(){
            var list = '';

            $.each($('.' + defaults.prefix + '-tag'), function(){
                list += $(this).text().substring(0, $(this).text().length-1) + ', ';
            });

            $this.val(list.substring(0, list.length-2));
        }

        var $this = this,
            $btn = $('<a id="' +defaults.prefix + '-add">' + defaults.btnText + '</a>'),
            $input = $('<input type="text" class="' + defaults.prefix + '-input" />'),
            $container = $('<div id="' + defaults.prefix + '-container" />');


        $this.hide();

        $this.after($btn, $input, $container);

        addTag($this.val());

        $btn.bind('click', function(event){
            event.preventDefault();

            addTag($input.val());

            $input.val('');
        });

        $input.bind('keyup', function(event){
            if(event.which === 13) {
                $btn.trigger('click');
            }
        });

        $('body').on('click', '.' + defaults.prefix + '-close', function(){
            removeTag($(this));
        });
    };
}(jQuery));