$(function(){

  function buildMessage(message){
      var imhtml = message.image ? "<img class=right-item__message-image src=  " + message.image + "></img>" : '';
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
                      ${imhtml}
                    </div>
                  </div>`
                
    return html;
  }

  $("#new_message").on("submit",function(e){
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
      $('input').prop('disabled', false);
      $('.right-midle').animate({scrollTop: $('.right-midle')[0].scrollHeight}, 'fast');
      $("#new_message")[0].reset();
    })
    
    .fail(function(){
			alert("メッセージの送信に失敗しました。");
    })
  })
});