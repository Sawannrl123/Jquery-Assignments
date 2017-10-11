$(document).ready(function(){
	a = [];
	b = 0;
	
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
	openChatWindow();
	minimize();
	maximize();
	close();
	doubleClickMaximizePopup();
});

function doubleClickMaximizePopup() {
	$('.top-bar').on('dblclick', function(){
		$('.chat-container').toggleClass('maximize');
		$('.chat-container').removeClass('minimize');
		adjustChatWindow();
	});
}

function openChatWindow() {
	$('.open-chat-window').on('click', function(){
		$('.chat-container').show(500, function(){
			adjustChatWindow();
			height = $('.chat')[0].scrollHeight;
			scrollToChatBottom(height);
		});
		$('.overlay').show(500);
		//doFirst();
	});
}

function minimize() {
	$('#minimize').on('click', function(){
		$('.chat-container').toggleClass('minimize');
		$('.chat-container').removeClass('maximize');
		adjustChatWindow();
	});
}
function maximize() {
	$('#maximize').on('click', function(){
		$('.chat-container').toggleClass('maximize');
		$('.chat-container').removeClass('minimize');
		adjustChatWindow();
	});
}
function close() {
	$('#close').on('click', function(){
		$('.chat-container').hide(500);
		$('.overlay').hide(500);
		$('.chat-container').removeClass('maximize');
		$('.chat-container').removeClass('minimize');
	});
}

function adjustChatWindow() {
	var textarea_height = $('.messageTextarea').outerHeight();
	var chat_height = $('.chat-wrapper').height() - textarea_height;
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

function dragStart(event) {
    //event.dataTransfer.setData("Text", event.target.id);
    var elem = event.target;
    var top_pos = parseInt($(elem).offset().top);
    var left_pos = parseInt($(elem).offset().left);
    console.log('DragStart');
    $(elem).css({
    	'position': 'absolute'
    });
}

function dragging(event) {
    //document.getElementById("demo").innerHTML = "The p element is being dragged";
    var elem = event.target;
    var top_pos = parseInt($(elem).offset().top);
    var left_pos = parseInt($(elem).offset().left);
    console.log(top_pos, left_pos);
    $(elem).css({
    	'top': top_pos,
    	'left': left_pos
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    /*var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));*/
    //document.getElementById("demo").innerHTML = "The p element was dropped";
    var elem = event.target;
    var top_pos = parseInt($(elem).offset().top);
    var left_pos = parseInt($(elem).offset().left);
    $(elem).css({
    	'top': top_pos,
    	'left': left_pos
    });
}