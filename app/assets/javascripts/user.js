$(function(){

  var user_list = $(".chat-group-form__search.clearfix");
  var user_add = $(".chat-group-form__add.clearfix");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
  </div>`
  user_list.append(html);
  }
  
  function appendErrMsgToHTML(msg){
    var html = `
                  <div class='chat-group-user clearfix'>${msg}</div>
                `
    user_list.append(html);
  }

  function newAppendUser(user,id){
    var html = `<div class='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${user}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  user_add.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  

    .done(function(users){
      $(".chat-group-user.clearfix").remove();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }

    })

    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(){
    var user = $(this).data('user-name');
    var id = $(this).data('user-id');
    $(this).parent().remove();
    newAppendUser(user,id);

  });

  $(document).on("click",".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  });

});