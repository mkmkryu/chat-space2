$(function(){

  function buildMessage(message){
    var html =  `<div class="right-item">
                  <div class="right-midle__info">
                    <div class="right-midle__info--name">
                      ${message.user_name}
                    </div>
                    <div class="right-midle__info--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="right-item__message">
                    <p class="right-item__message-content">
                      ${message.content}
                    </p>
                  </div>
                </div>`
                
    return html;
  }

  $("form").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);    
    var url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message);
      $('.right-midle').append(html);
      $('.text__message').val('');
      $('input').prop('disabled', false);
    })

    .fail(function(){
			alert("メッセージの送信に失敗しました。");
    })
  })
});