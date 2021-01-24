(function($) {
    "use strict";
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

})(jQuery);


$( document ).ready(function() {
    if(localStorage.getItem("particle") == "true")
    particlesJS.load('particles-js', '/js/particles.json', function() {});

    feather.replace();
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })