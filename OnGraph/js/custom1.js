$(document).ready(function(){
	a = [];

	adjustChatWindow();
	var initial_chat = JSON.parse(localStorage.getItem('chat_text'));
	if(initial_chat != undefined) {
		a = initial_chat;
	}
	$('.messageTextarea').on('input', function(e) {
	    $(this).css('height', "60px");
	    $(this).css('height', this.scrollHeight+2);
	    adjustChatWindow();
	});
	submitChatText();
	$('#chat_form').on('submit', function(e){
		e.preventDefault();
		var chat_text = $('.messageTextarea').val();
		$('.messageTextarea').val("");
		SaveDataToLocalStorage(chat_text);
		return false;
	});
	loadChat(a);
	height = $('.chat')[0].scrollHeight;
	scrollToChatBottom(height);
});

function adjustChatWindow() {
	var textarea_height = $('.messageTextarea').outerHeight();
	var chat_height = $('.chat-container').innerHeight() - textarea_height;
	$('.chat').innerHeight(chat_height);
}

function submitChatText() {
	$('.messageTextarea').keydown(function(event) {
	    if (event.keyCode == 13) {
	        $('#chat_form').submit();
	        return false;
	    }
	});
}

function SaveDataToLocalStorage(data) {
    a.push(data);
    localStorage.setItem('chat_text', JSON.stringify(a));
    a = JSON.parse(localStorage.getItem('chat_text'));
    $('.chat ul').append('<li>'+data+'</li>');
    height = $('.chat')[0].scrollHeight;
    scrollToChatBottom(height);
}

function loadChat(chat_data) {
	var html = '';
	$.each(chat_data, function( index, value ) {
	  html=html+'<li>'+value+'</li>';
	});
	$('.chat ul').html(html);
}

function scrollToChatBottom(height) {
	$('.chat').animate({
        scrollTop: height
    }, 1000);
}
