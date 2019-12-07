$(function(){

  function buildHTML(message){
      var image = (message.image) ? `<img src="${message.image}">` : " " ;
      var html = `<div class="user1", data-message-id="${message.id}">
                    <div class="user">
                      <name>
                        ${message.user_name}
                      </name>
                      <date>
                        ${message.created_at}
                      </date>
                      <div class="message">
                        <p class="message__content">
                        ${message.content}
                        </p>   
                        ${image}         
                      </div>
                    </div>              
                  </div>`
    return html
  }
  function ScrollToNewMessage(){
    $('.contents__message').animate({scrollTop: $('.contents__message')[0].scrollHeight}, 'fast');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('#new_message')[0].reset();
      var html = buildHTML(data);
      $('.contents__message').append(html);
    ScrollToNewMessage();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })  
  })
  
  var reloadMessages = function () {
    last_message_id = $('.user1:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id} 
    })
    .done(function(messages) {
      let insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
        $('.contents__message').append(insertHTML);
      })  
      $('.contents__message').animate({scrollTop: $('.contents__message')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 7000);
});
