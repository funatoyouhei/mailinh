(function() {
	"use strict";
	let tag = document.createElement("script"), firstScriptTag = document.getElementsByTagName("script")[0];
	tag.src = "https://www.youtube.com/iframe_api";
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	function onYouTubeIframeAPIReady(){
		const youtubeId = $('#mv .mv_mov').attr('data-youtubeid');
		new YT.Player("player", {
			width: 560,
			height: 315,
			videoId: youtubeId,
			playerVars:{
				loop: 1,
				playlist: youtubeId,
				controls: 0,
				disablekb: 0,
				fs: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				playsinline: 1,
				rel: 0,
				showinfo: 0
			},
			events:{
				"onReady": onPlayerReady,
				"onStateChange": onPlayerStateChange
			}
		});
	}
	function onPlayerReady(evt){
		evt.target.mute();
		evt.target.playVideo();
	}
	function onPlayerStateChange(evt){
		if(evt.data === YT.PlayerState.ENDED){
			evt.target.playVideo();
		}
	}
	if($('#mv .mv_mov')){
		window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
	}
})();

var h2fs;
var mvliw = 0;
$(function(){
	h2fs = parseFloat($('#mv .mv_text h2').css('font-size'));
	if($('#load').length){
		if($('#mv .mv_img').length){
			$('#mv').css({opacity: 0});
		}
	}else{
		if($('#mv .mv_img').length){
			$('#mv .mv_img li:nth-of-type(1) img').addClass('no_animation');
		}
	}
	if($('#mv .mv_img').length){
		mvliw = $('#mv .mv_img li').width();
	}
	$('*:not(.youtube_block)>iframe[src^="https://www.youtube.com/"]').each(function(){
		$(this).wrap("<div class='youtube_block'></div>");
	});
});

$(window).load(function(){
	mvFunc();
});

function movFunc(){
	var $mvmov = $('#mv .mv_mov');
	var $yframe = $('#mv .mv_mov iframe');
	function ResizeYT(){
		if($mvmov.width()*0.56 > $mvmov.height()){
			$yframe.css({width: '100vh'});
			$yframe.css({height: '120vh'});
			$yframe.css({marginTop: ($yframe.height() - $mvmov.height())/-2, marginLeft: 0});
		}else{
			$yframe.css({height: '100%'});
			$yframe.css({width: $yframe.height()/0.56});
			$yframe.css({marginTop: 0, marginLeft: ($yframe.width() - $mvmov.width())/-2});
		}
	}
	$(window).on('resize', ResizeYT);
	ResizeYT();
}

function mvFunc(){

	if($('#mv .mv_mov').length){
		if($('#mv .mv_mov .youtube_block')){
			$('#mv .mv_mov iframe').unwrap();
		}
		movFunc();
	}

	if($('#mv .mv_img').length){

		var z = 1;
		var flg = 0;
		var mvSpd = $("#mv").data('animation-duration') * 1000 * 1.4;
		var mvCount = $('#mv .mv_img > li').length;
		var mvNum = 0;
		$('#mv').stop().animate({opacity: 1}, 2000, 'easeInOutCubic');
		$("#mv .mv_img li img").css({animationDuration: mvSpd+'ms'});

		/*------#mv.slide04 05-----*/

		if($('#mv.slide04').length || $('#mv.slide05').length){
			var NTrate = 0;
			var NTh = 0;
			$.when(
				$('#mv .mv_img li').each(function(){
					var NTimg = new Image();
					NTimg.src = $(this).find('img').attr('src');
					if(NTrate <= NTimg.height / NTimg.width){
						NTrate = NTimg.height / NTimg.width;
					}
				})
			).done(function(){
				NTh = mvliw * NTrate;
				$('#mv').css({'cssText': 'height: '+NTh+'px!important;'});
			});
			function ResizeNT(){
				NTh = $('#mv .mv_img li img').width() * NTrate;
				$('#mv').css({'cssText': 'height: '+NTh+'px!important;'});
			}
			$(window).on('resize', ResizeNT);
			$(window).load(function(){
				$(window).on('resize', ResizeNT);
			});
		}

		/*------#mv.slide06 07-----*/

		if($('#mv.slide06').length || $('#mv.slide07').length){
			if(window.innerWidth >= 768){
				$('#mv .mv_img li:nth-of-type(2)').addClass('show r');
				$("#mv .mv_img li img").css({animationDuration: mvSpd*2+'ms'});
				mvNum = 1;
			}else{
				$("#mv .mv_img li img").css({animationDuration: mvSpd*4+'ms'});
			}
		}

		/*------#mv.slide08-----*/

		var mvNum8 = 0;
		if($('#mv.slide08').length){
			mvSpd = mvSpd / 1.4;
			if(mvCount > 1){
				if(mvCount == 2){
					for(var i=1; i<=2; i++){
						$('#mv .mv_img li:nth-of-type('+i+')').clone().appendTo($('#mv .mv_img'));
					}
					mvCount = 4;
				}else if(mvCount == 3){
					for(var i=1; i<=3; i++){
						$('#mv .mv_img li:nth-of-type('+i+')').clone().appendTo($('#mv .mv_img'));
					}
					mvCount = 6;
				}
				$('#mv .mv_img').clone().insertAfter($('#mv .mv_img'));
				$('#mv>ul').wrapAll('<div class="mv_imgs"></div>');
				$('#mv .mv_imgs').css({animationDuration: mvSpd*mvCount+'ms'});
				$('#mv .mv_imgs li img').css({animationDuration: mvSpd*mvCount+'ms'});
				for(var i=1; i<=mvCount; i++){
					$('#mv .mv_imgs ul li:nth-of-type('+i+'n) img').css({animationDelay: mvSpd*(i-mvCount)+'ms'});
				}
				if(navigator.userAgent.indexOf('trident') != -1 || navigator.userAgent.indexOf('Trident') != -1){/*IE11*/
					$('#mv .mv_imgs').css({animationName: 'slide08', animationDuration: mvSpd*mvCount+'ms', animationTimingFunction: 'linear', animationIterationCount: 'infinite'});
					function ResizeIE(){
						$('#mv .mv_img').css({width: $('#mv .mv_img li').width()*mvCount});
						$('#mv .mv_imgs').css({width: $('#mv .mv_img li').width()*mvCount*2});
					}
					$(window).on('resize', ResizeIE);
					ResizeIE();
				}
			}else{
				$('#mv.slide08 .mv_img li img').attr('style', '');
			}
		}

		/*------#mv.slide09 10-----*/

		if($('#mv.slide09').length || $('#mv.slide10').length){
			$("#mv .mv_img li").css({animationDuration: mvSpd+'ms'});
		}

		/*------setting-----*/

		if(mvCount > 1){
			if($('#mv.slide06').length || $('#mv.slide07').length){
				if(window.innerWidth >= 768){
					if(mvCount > 2){
						clearInterval(mvChangeTimer);
						StartMVTimer();
					}
				}else{
					clearInterval(mvChangeTimer);
					StartMVTimer();
				}
			}else{
				clearInterval(mvChangeTimer);
				StartMVTimer();
			}
		}else{
			$('#mv .mv_arrow, #mv .mv_pointer').css({display: "none"});
			$('#mv .mv_img img').css({opacity: 1});
		}
		mvChange(mvNum);//初回

		function mvChange(n){
			if($('#mv.slide08').length){
			}else{
				z ++;
				if(mvNum === mvCount){
					mvNum = 1;
				}else{
					mvNum ++;
				}
				if(!n){
					n = mvNum;
				}
				var $tgtImg = $('#mv .mv_img li:nth-of-type('+n+')');
				$tgtImg.removeClass('show r');
				setTimeout(function(){
					$tgtImg.addClass('show').css({zIndex: z});
				},50);

				if($('#mv.slide06').length || $('#mv.slide07').length){
					if(z%2 == 0 && z > 2){//偶数
						$tgtImg.addClass('r');
					}
				}
			}

			$('#mv .mv_pointer li').removeClass('current');
			$('#mv .mv_pointer li:nth-of-type('+mvNum+')').addClass('current');

			flg = 0;
			function noEventInt(){
				flg = 1;
				clearInterval(noEventIntTimer);
				if(z > 2){
					$('#mv .mv_img li:nth-of-type(1) img').removeClass('no_animation');
				}
			}
			function noEventIntST(){
				noEventIntTimer = setInterval(noEventInt, mvSpd*0.25);
			}
			noEventIntST();
		}
		var mvChangeTimer;
		function StartMVTimer(){
			if(mvSpd === 0) {
				return;
			}
			if($('#mv.slide06').length || $('#mv.slide07').length){
				if(window.innerWidth >= 768){
					mvChangeTimer = setInterval(mvChange, mvSpd*0.7);
				}else{
					mvChangeTimer = setInterval(mvChange, mvSpd*0.7*2);
				}
			}else if($('#mv.slide08').length){
				//mvChangeTimer = setInterval(mvChange, mvSpd);
			}else{
				mvChangeTimer = setInterval(mvChange, mvSpd*0.7);
			}
		}

		/*------mv pointer-----*/
		$('#mv .mv_pointer').html('')
		for(var i = 0; i < mvCount; i++){
			$('#mv .mv_pointer').append('<li></li>');
		}
		$('#mv .mv_pointer li:eq(0)').addClass('current');
		$('#mv .mv_pointer li').click(function(){
			var pointerIndex = $('#mv .mv_pointer li').index(this);
			if(mvNum !== pointerIndex+1){
				clearInterval(mvChangeTimer);
				mvNum = pointerIndex;
				mvChange(pointerIndex + 1);
				StartMVTimer();
			}
			return false;
		});
		function ResizeArrow(){
			let hh = $('header').height();
			if($('header').length > 1) {
				hh = hh + $('header.header_class').last().height();
			}
			$('.over+#mv_outer .mv_arrow').css({marginTop: hh/2});
		}
		$(window).on('resize', ResizeArrow);
		ResizeArrow();

		/*------mv nav-----*/

		$('#mv .mv_arrow_next span').click(function(){
			if(flg === 1){
				clearInterval(mvChangeTimer);
				mvChange();
				StartMVTimer();
			}
			return false;
		});
		$('#mv .mv_arrow_prev span').click(function(){
			if(flg === 1){
				clearInterval(mvChangeTimer);
				if(mvNum === 1){
					mvNum = mvCount - 1;
					mvChange(mvCount);
				}else{
					mvNum = mvNum - 2;
					mvChange(mvNum + 1);
				}
				StartMVTimer();
			}
			return false;
		});

	}

	/*------mv p-----*/

	/*.none .static .move*/
	var MvP = $('#mv .mv_text p').html()
	function ResizeMvP(){
		if(MvP !== '' && $('#mv .mv_text p').css('display') == 'none' && $('#mv .mv_text p').hasClass('move')){
			if($('.MvP').length == 0){
				$('#main').prepend('<section class="MvP width_fixed contents_box01 align-center block_text_1"><div class="content_wrapper"><div class="wrapper_item"><div class="inner_item_txt"><p>'+MvP+'</p></div></div></div></section>');
			}
		}else if(MvP !== '' && $('#mv .mv_text p').css('display') == 'none' && !$('#mv .mv_text p').hasClass('none')){
			if($('.MvP').length == 0){
				$('#main').prepend('<section class="MvP width_fixed contents_box01 align-center block_text_1"><div class="content_wrapper"><div class="wrapper_item"><div class="inner_item_txt"><p>'+MvP+'</p></div></div></div></section>');
			}
		}else{
			$('.MvP').remove();
		}
	}
	$(window).on('resize', ResizeMvP);
	ResizeMvP();

	/*------mv h2-----*/

	var h2longest = 0;
	var h2shortest = 24;
	var h2str = $('#mv .mv_text h2').html();
	if(typeof h2str !== 'undefined'){
		h2str = h2str.replace(/\s+/g, "");
		var h2array = h2str.split('<br>');
		for(var i = 0; i < h2array.length; i++){
			if(h2longest < h2array[i].length){
				h2longest = h2array[i].length;
			}
		}
	}

	function ResizeFS(){
		if($('#mv .mv_text:not(.wmode_horizontal)').length){
			var maxW = $('#mv .mv_text:not(.wmode_horizontal) h2').width();
			if(h2longest >= 24){//一行最大24文字
				$('#mv .mv_text:not(.wmode_horizontal) h2').css({fontSize: maxW / 24});
			}else{
				if(maxW < h2fs*(h2longest + 0.1)){
					$('#mv .mv_text:not(.wmode_horizontal) h2').css({fontSize: maxW / (h2longest + 0.1)});
				}else{
					$('#mv .mv_text:not(.wmode_horizontal) h2').css({fontSize: h2fs + 'px'});
				}
			}
		}
		if($('#mv .mv_text.wmode_horizontal').length){
			var maxH = $('#mv .mv_text.wmode_horizontal').height() - parseInt($('#mv .mv_text.wmode_horizontal').css('padding-top'), 10) - parseInt($('#mv .mv_text.wmode_horizontal').css('padding-bottom'), 10);
			if(h2longest >= 24){//一行最大24文字
				$('#mv .mv_text.wmode_horizontal h2').css({fontSize: maxH / 24});
			}else{
				if(maxH < h2fs*(h2longest + 0.1)){
					if(maxH / (h2longest + 0.1) <= 15.5){
						$('#mv .mv_text.wmode_horizontal h2').css({fontSize: 24});
					}else{
						$('#mv .mv_text.wmode_horizontal h2').css({fontSize: maxH / (h2longest + 0.1)});
					}
				}else{
					$('#mv .mv_text.wmode_horizontal h2').css({fontSize: h2fs + 'px'});
				}
			}
			var mh = $('#mv .mv_text>div').height() + parseInt($('#mv .mv_text>div').css('padding-top'), 10) + parseInt($('#mv .mv_text>div').css('padding-bottom'), 10) - 10;
			$('#mv .mv_text.wmode_horizontal').css({alignItems: 'stretch', paddingBottom: 50});
			if(mh < $('.mv_text').height()){
				$('#mv .mv_text.wmode_horizontal').css({alignItems: 'center', paddingBottom: 50, boxSizing: 'border-box'});
			}
		}
	}
	$(window).on('resize', ResizeFS);
	ResizeFS();

	/*------mv minH-----*/

	function ResizeMvminH(){
		if($('#mv .mv_text:not(.wmode_horizontal)').length){
			$('#mv').css({minHeight: $('#mv .mv_text:not(.wmode_horizontal)>div').height() + 150});
		}
		if($('#mv .mv_text.wmode_horizontal').length){
			if($('#mv .mv_text.wmode_horizontal').width() < $('#mv .mv_text.wmode_horizontal>div').width()){
				var sa = $('#mv .mv_text.wmode_horizontal>div').width() - $('#mv .mv_text.wmode_horizontal').width();
				$('#mv').css({minHeight: $('#mv .mv_text.wmode_horizontal>div').height() + sa + 150});
			}
		}
	}
	$(window).on('resize', ResizeMvminH);
	ResizeMvminH();

}
