$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
      var image = (message.image) ? `<img src="${message.image}">` : " " ;
      var html = `<div class="user1">
                    <div class="user">
                      <name>
                        ${message.user_name}
                      </name>
                      <date>
                        ${message.date}
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
      console.table(data)
      var html = buildHTML(data);
      $('.contents__message').append(html);
    ScrollToNewMessage();
      $('.content').val('');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
})