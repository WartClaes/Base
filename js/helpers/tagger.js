(function($) {
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