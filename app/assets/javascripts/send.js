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
                      <p class="right-item__message-content" data-id = ${message.id}>
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


  var reloadMessages = function() {
    if(document.URL.match(/messages/)){
    last_message_id = $('.right-item__message-content').last().data('id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.right-midle').append(insertHTML);
          $('.right-midle').animate({scrollTop: $('.right-midle')[0].scrollHeight}, 'fast');
        });
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
  };

  setInterval(reloadMessages,5000);
});
