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
}(jQuery));