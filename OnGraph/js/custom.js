$(document).ready(function(){
	$(window).scroll(function(){
		onFooterViewSidebarHeight();
        sticky_relocate();
	});
    sticky_relocate();
});

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top-100;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
    } else {
        $('#sticky').removeClass('stick');
 	}
}

function onFooterViewSidebarHeight() {
    var winHeight = $(window).height();
    var winViewTop = $(window).scrollTop();
    var footerTop = $('#footer-up').offset().top;
    var winViewBottom = winViewTop + winHeight;
    var footerView = winViewBottom - footerTop;
    var adjustSideBarHeight = winHeight - footerView - 100;
    if (isScrolledIntoView('#footer-up') === true) {
        $('#sticky.stick').outerHeight(adjustSideBarHeight);
    }
    else {
        adjustSideBarHeight = winHeight - 100;
        $('#sticky.stick').outerHeight(adjustSideBarHeight);
    }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}