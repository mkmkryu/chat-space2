$(function() {
    $('.js-form').on('submit', function(e) {
      e.preventDefault();
      todo = $('.js-form__text-field').val();
      console.log(todo);
    });
  });