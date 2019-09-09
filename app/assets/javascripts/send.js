$(function(){
  $("form").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData();    
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});