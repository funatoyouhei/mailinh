$(function(){
	$('nav').css({overflow: 'hidden'});

	$( ".block_comparison_4 .inner_item .after" ).each(function(){
		let h = $(this).siblings('.before').height();
		$(this).css('min-height', h);
	})

	/*---pagelink---*/

	var hash = location.hash;
	if(hash){
		$('body,html').stop().scrollTop(0);
		$(window).load(function(){
			pageScroll(hash);
		});
	}
	// $('a[href*=#][href!=#]:not(.no):not([target="_blank"])').click(function(){
	// 	var url = location.pathname;
	// 	var href = $(this).attr("href");
	// 	var path = href.split('#');//path[0]
	// 	//if(url.indexOf(path[0]) != -1){
	// 	if(url == path[0] || path[0] == ''){
	// 		pageScroll('#'+path[1]);
	// 		return false;
	// 	}
	// });
	function pageScroll(i){
		var target = $(i === "#" || i === "" ? 'html' : i);
		var position = target.offset().top;
		if(position == 0){
			var offset = 0;
			if($('#mv').length){
				offset = parseInt($('#mv').css('margin-top'), 10);
			}else if($('#lv').length){
				offset = parseInt($('#lv').css('margin-top'), 10);
			}
			position = position - offset;
		}else if(window.innerWidth < 900){
			position = position - find_header_height();
		}
		$('body,html').animate({scrollTop: position}, 1000, 'easeInOutCubic');
	}

	/*---delay---*/

	$('.delay').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			$(this).stop().addClass('delayActive');
		}
	});
	$('.delay1').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			$(this).stop().addClass('delay1Active');
		}
	});
	$('.delay2').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			$(this).stop().addClass('delay2Active');
		}
	});
	$('.delay3').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			$(this).stop().addClass('delay3Active');
		}
	});
	$('.delay4').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
			$(this).stop().addClass('delay4Active');
		}
	});
	$(window).load(function(){
		$('.delay5 .content_wrapper>*').append('<i class="dl5"></i>');
		$('.delay5').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
				$(this).stop().addClass('delay5Active');
			}
		});
	});

	/*----spnav----*/

	var sp_nav = 0;
	$('.header_inner #menu').on(
		'click', function(){
			if(sp_nav === 0){
				sp_nav = 1;
				$('.header_inner nav').addClass('open');
			}else{
				sp_nav = 0;
				$('.header_inner nav').removeClass('open');
			}
			return false;
		}
	);

	/*----custom popup----*/

	var selectorLink = '';
	var dataS3Url = $('body').data('s3-url');

	if(dataS3Url !== undefined && dataS3Url !== '') {
		selectorLink = dataS3Url
	}

	var parentSectionClass = "aaaa";
	var $parent;
	var popCount;
	var popIndex;
	var popTxt;
	var popTxt0;

	var $popA = `a[href^="${selectorLink}"], a[href^="http://"][href*="no_image"][href$=".jpg"], a[href^="https://"][href*="no_image"][href$=".jpg"]`;
  var $popB = `a[href^="http://"][href*="no_image"][href$=".jpg"], a[href^="https://"][href*="no_image"][href$=".jpg"], a[href^="${selectorLink}"]`;

	setTimeout(function() {
		$('body:not(.nopop) .pop').find($popA).on(
			'click', function(){
				if ($(this).attr('target') == '_blank' || $(this).parent().is('p')) {
					window.open($(this).attr("href"), '_blank');
					return;
				}
	
				var img = new Image();
				img.src = $(this).attr("href");
				if($(this).find(".infotxt").length){
					popTxt = $(this).find(".infotxt").html();
				}
				parentSectionClass = $(this).parents('#main>*, #common_footer>*').attr('class');
				$parent = $(this).parents('.pop');
				popCount = $parent.find($popA).length;
				popIndex = $parent.find($popA).index(this);
				if(parentSectionClass.indexOf('gallery_archive') !== -1){
					if(parentSectionClass.indexOf('add_design2') == -1 && parentSectionClass.indexOf('add_design3') == -1 && $(this).find(".infotxt").length){
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""><div class="poptxt">'+popTxt+'</div></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}else{
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}
				}else{
					if($(this).find(".infotxt").length){
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""><div class="poptxt">'+popTxt+'</div></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}else{
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}
				}
				if(popCount === 1){
					$('.popnext').css({marginRight: -50});
					$('.popprev').css({marginLeft: -50});
				}else{
					if(popIndex === 0){
						$('.popnext').stop().animate({marginRight: 10}, 200, 'easeOutCubic');
						$('.popprev').css({marginLeft: -50});
					}else if(popIndex === popCount - 1){
						$('.popnext').css({marginRight: -50});
						$('.popprev').stop().animate({marginLeft: 10}, 200, 'easeOutCubic');
					}
				}
				$('.popup').css({opacity: 0}).stop().animate({opacity: 1}, 400, 'easeInOutCubic');
				img.onload = function(){
					$('.popimgwrap').stop().animate({opacity: 1}, 400, 'easeInOutCubic');
				}
				$('.poptxt').stop().animate({bottom: 0}, 5000, 'easeInOutCubic', function(){
					$('.poptxt').addClass("timelimit");
				});
				return false;
			}
		);
	}, 2000);

	//var myhost = location.host;
	//$('a[href^="/common/"][href$=".jpeg"], a[href^="/common/"][href$=".jpg"], a[href^="/common/"][href$=".gif"], a[href^="/common/"][href$=".png"], a[href^="/common/"][href$=".JPEG"], a[href^="/common/"][href$=".JPG"], a[href^="/common/"][href$=".GIF"], a[href^="/common/"][href$=".PNG"], a[href*="'+myhost+'"][href$=".jpeg"], a[href*="'+myhost+'"][href$=".jpg"], a[href*="'+myhost+'"][href$=".gif"], a[href*="'+myhost+'"][href$=".png"], a[href*="'+myhost+'"][href$=".JPEG"], a[href*="'+myhost+'"][href$=".JPG"], a[href*="'+myhost+'"][href$=".GIF"], a[href*="'+myhost+'"][href$=".PNG"]').on(
	setTimeout(function() {
		$(`body:not(.nopop) a[href^="http://"][href*="no_image"][href$=".jpg"], body:not(.nopop) a[href^="https://"][href*="no_image"][href$=".jpg"], body:not(.nopop) a[href^="${selectorLink}"]`).on(
			'click', function(e) {
				e.preventDefault();
				var self = this;
				if ($(self).closest('.pop').length === 1) return;
				
				if ($(self).data('is-image')) {
					var img = new Image();
					img.src = $(self).attr("href");
					if($(self).next('.heading').find('p').length){
						popTxt0 = $(self).next('.heading').find('.h').text();
						popTxt = $(self).next('.heading').find('p').text();
					}
					parentSectionClass = $(self).parents('#main>*, #common_footer>*').attr('class');
					$parent = $(self).parents('.content_wrapper');
					popCount = $parent.find($popB).length;
					popIndex = $parent.find($popB).index(self);
					if($(self).next('.heading').find('p').length){
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""><div class="poptxt"><p><strong>'+popTxt0+'</strong><br>'+popTxt+'</p></div></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}else{
						$('body').append('<div class="popup"><div class="popimg"><div><div class="popimgwrap"><img src="'+img.src+'" alt=""></div><div class="loader"></div></div></div><div class="popclose">×</div><ul class="popnav"><li class="popprev"></li><li class="popnext"></li></ul></div>');
					}
					if(popCount === 1){
						$('.popnext').css({marginRight: -50});
						$('.popprev').css({marginLeft: -50});
					}else{
						if(popIndex === 0){
							$('.popnext').stop().animate({marginRight: 10}, 200, 'easeOutCubic');
							$('.popprev').css({marginLeft: -50});
						}else if(popIndex === popCount - 1){
							$('.popnext').css({marginRight: -50});
							$('.popprev').stop().animate({marginLeft: 10}, 200, 'easeOutCubic');
						}
					}
					$('.popup').css({opacity: 0}).stop().animate({opacity: 1}, 400, 'easeInOutCubic');
					img.onload = function(){
						$('.popimgwrap').stop().animate({opacity: 1}, 400, 'easeInOutCubic');
					}
					$('.poptxt').stop().animate({bottom: 0}, 5000, 'easeInOutCubic', function(){
						$('.poptxt').addClass("timelimit");
					});
					return false;
				} else {
					setTimeout(function() {
						window.open($(self).attr("href"), '_blank');
					});
				}
		});
	}, 2000);

	$(document).on("click", ".popimg, .popclose, .poppayclose", function(){
		$('.popup').stop().animate({opacity: 0}, 400, 'easeInOutCubic', function(){
			$('.popup').remove();
			popTxt = '';
		});
	});
	$(document).on("click", ".popup img:not(.no)", function(){
		return false;
	});
	function popNav(){
		$('.popimgwrap').stop().animate({opacity: 0}, 400, 'easeInOutCubic', function(){
			$('.poptxt').removeClass("timelimit");
			$('.popup img').remove();
			popTxt = '';
			var img = new Image();
			img.src = $parent.find($popA).eq(popIndex).attr("href");
			popTxt = $parent.find($popA).eq(popIndex).find(".infotxt").html();
			$('.popimgwrap').prepend('<img src="'+img.src+'" alt="">');
			$('.poptxt').html(popTxt);
			img.onload = function(){
				$('.popimgwrap').stop().animate({opacity: 1}, 400, 'easeInOutCubic');
			}
		});
		$('.poptxt').stop().animate({bottom: 0}, 5000, 'easeInOutCubic', function(){
			$('.poptxt').addClass("timelimit");
		});
	}
	$(document).on("click", ".popnext", function(){
		popIndex ++;
		if(popIndex == popCount - 1){
			$('.popnext').stop().animate({marginRight: -50}, 200, 'easeInCubic');
			$('.popprev').stop().animate({marginLeft: 10}, 200, 'easeOutCubic');
		}else{
			$('.popprev').stop().animate({marginLeft: 10}, 200, 'easeOutCubic');
		}
		popNav();
		return false;
	});
	$(document).on("click", ".popprev", function(){
		popIndex --;
		if(popIndex == 0){
			$('.popprev').stop().animate({marginLeft: -50}, 200, 'easeInCubic');
			$('.popnext').stop().animate({marginRight: 10}, 200, 'easeOutCubic');
		}else{
			$('.popnext').stop().animate({marginRight: 10}, 200, 'easeOutCubic');
		}
		popNav();
		return false;
	});

	$(`body.nopop a[href^="http://"][href*="no_image"][href$=".jpg"], body.nopop a[href^="https://"][href*="no_image"][href$=".jpg"], body.nopop a[href^="${selectorLink}"]`).each(function(){
		$(this).css({pointerEvents: 'none'});
	});
	$(`body.nopop a[href^="http://"][href*="no_image"][href$=".jpg"], body.nopop a[href^="https://"][href*="no_image"][href$=".jpg"], body.nopop a[href^="${selectorLink}"]`).on(
		'click', function(){
			return false;
		}
	);

	/*----payment pop----*/

	$('a[href="#mypayment"]').on(
		'click', function(){
			$('body').append('<div class="popup"><div class="poppay"><span class="poppayclose"></span><div class="tgt"><div class="loader"></div></div></div><div class="popclose">×</div></div>');
			$('.mypayment').clone().prependTo('.poppay .tgt');
			$('.poppay .mypayment').css({display: 'block'});
			$('.popup').css({opacity: 0}).stop().animate({opacity: 1}, 400, 'easeInOutCubic');
			return false;
		}
	);
	if(navigator.userAgent.indexOf('iPhone') > 0){//iphone
		$('#pay_paypay a').attr('href', 'https://apps.apple.com/jp/app/paypay-%E3%83%9A%E3%82%A4%E3%83%9A%E3%82%A4-%E7%B0%A1%E5%8D%98-%E3%81%8A%E5%BE%97%E3%81%AA%E3%82%B9%E3%83%9E%E3%83%9B%E6%B1%BA%E6%B8%88%E3%82%A2%E3%83%97%E3%83%AA/id1435783608?mt=8');
		$('#pay_aupay a').attr('href', 'https://apps.apple.com/jp/app/au-wallet-au-pay%E3%82%82%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%B9%E3%83%9E%E3%83%9B%E6%B1%BA%E6%B8%88%E3%82%A2%E3%83%97%E3%83%AA/id862800897?mt=8')
		$('#pay_merpay a').attr('href', 'https://apps.apple.com/jp/app/%E3%83%A1%E3%83%AB%E3%82%AB%E3%83%AA-%E3%83%95%E3%83%AA%E3%83%9E%E3%82%A2%E3%83%97%E3%83%AA-%E3%82%B9%E3%83%9E%E3%83%9B%E6%B1%BA%E6%B8%88%E3%83%A1%E3%83%AB%E3%83%9A%E3%82%A4/id667861049?mt=8')
		$('#pay_dpay a').attr('href', 'https://apps.apple.com/jp/app/d%E6%89%95%E3%81%84-%E3%82%B9%E3%83%9E%E3%83%9B%E6%B1%BA%E6%B8%88%E3%82%A2%E3%83%97%E3%83%AA-%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E3%83%AC%E3%82%B9%E3%81%A7%E3%81%8A%E6%94%AF%E6%89%95%E3%81%84/id1328132872?mt=8')
	}else if(navigator.userAgent.indexOf('Android') > 0){//Android
		$('#pay_paypay a').attr('href', 'https://play.google.com/store/apps/details?id=jp.ne.paypay.android.app&hl=ja');
		$('#pay_aupay a').attr('href', 'https://play.google.com/store/apps/details?id=jp.auone.wallet&hl=ja')
		$('#pay_merpay a').attr('href', 'https://play.google.com/store/apps/details?id=com.kouzoh.mercari&hl=ja')
		$('#pay_dpay a').attr('href', 'https://play.google.com/store/apps/details?id=com.nttdocomo.keitai.payment')
	}else{
		$('.sp_payment, .mypayment').remove();
	}

	/*-#load img-*/

	$('#load img').one('load', function(){
		$(this).addClass('loaded');
	}).load();

	/*----text > a-----*/

	$('main a').each(function(){
		var color = $(this).css('color');
		color = 'rgba(' + color.slice(4,-1) + ' ,0.3)';
		$(this).css({textDecorationColor: color});
	});

	/*---gallery 2column---*/

	function lay_column2(){
		$('.gallery_archive.lay_column2 .content_wrapper>.wrapper_item').wrap('<div id="primary"></div>');

		//カテゴリー上
		$('.gallery_archive.lay_column2 ul.category1:first-child').wrap('<div id="sidebar" class="align-left"><section></section></div>').removeClass('category1').addClass('sidebar_list pos_top');
		//カテゴリー下
		$('.gallery_archive.lay_column2~ul.category1').insertAfter('#primary').wrap('<div id="sidebar" class="align-left"><section></section></div>').removeClass('category1').addClass('sidebar_list pos_bottom');

		$('.gallery_archive.lay_column2 #sidebar section .sidebar_list:first-child').before('<div class="heading block_header_5"><h4 class="h">カテゴリー</h4><p>Categories</p></div>');
		$('.gallery_archive.lay_column2+.pager').appendTo('#primary');
	}
	lay_column2();
	$(window).on('resize', lay_column2);

	/*----composite_box01-----*/

	$('.composite_box01.block_images_3 .heading, .composite_box01.block_images_6 .heading').each(function(){
		var $tt = $(this).parents('.inner_item');
		$(this).prependTo($tt);
	});
	$('.composite_box01:not(.block_images_8):not(.block_images_10)').each(function(){
		$(this).find('.inner_item_img img').each(function(){
			var src = $(this).attr('src');
			if(src.indexOf('no_image') !== -1){
				$(this).parents('.inner_item_img').remove();
			}
		});
	});
	$('.composite_box01 .inner_item').each(function(){
		if(!($(this).find('.inner_item_img').length) || $(this).find('.inner_item_img img').attr('src').indexOf('no_image') !== -1){
			if(!($(this).find('.inner_item_txt heading').length)){
				var str = $(this).find('.inner_item_txt').text();
				if(str.trim() == ''){
					$(this).addClass('empty')
				}
			}
		}
	});
	$('.composite_box01.block_images_13 .empty').remove();

	/*----header-----*/
  if (window.outerWidth < 900) {
		$("#menu_head").hide();
		$("#header_contents > .inner").append($("ul.nav_1st").parent("nav"));
	}
	$("ul.nav_1st").parent("nav").show();

	$('header .sp_menu a').on('click', function() {
		$("#menu_head").show();
		$(this).parents('header').toggleClass('open');
		return false;
	});
})

$(function(){

	//admin_edit_window

	$('.admin_edit_window .desktop_windows').click(function(event){
		admin_edit_window();
		$(this).addClass('selected');
		$('body').addClass('desktop_windows');
	});
	$('.admin_edit_window .tablet_android').click(function(event){
		admin_edit_window();
		$(this).addClass('selected');
		$('body').addClass('tablet_android');
	});
	$('.admin_edit_window .phone_android').click(function(event){
		admin_edit_window();
		$(this).addClass('selected');
		$('body').addClass('phone_android');
	});
	function admin_edit_window(){
		$('.admin_edit_window i').each(function(){
			$(this).removeClass('selected');
		});
		$('body').removeClass('desktop_windows');
		$('body').removeClass('tablet_android');
		$('body').removeClass('phone_android');
	}

	//menutoggle

	$('#menutoggle').click(function(event){
		$('body').toggleClass('open');
	});

	//save

	$('.admin_edit_window .save').click(function(event){
		$('#save_modal').addClass('active');
	});
	$('#save_modal .ok').click(function(event){
		//
		var display_flag = $('#save_modal').find('input[name="Newpages[display_flag]"]:checked').val();
		var template_flag = $('#save_modal').find('input[name="TmpPages[template_flag]"]:checked').val();
		var release_date = $('#save_modal').find('input[name="Newpages[release_date]"]').val();
		var facebook_flag = $('#save_modal').find('input[name="TmpPages[facebook_flag]"]:checked').val();
		var ameblo_flag = $('#save_modal').find('input[name="TmpPages[ameblo_flag]"]:checked').val();
		var twitter_flag = $('#save_modal').find('input[name="TmpPages[twitter_flag]"]:checked').val();
		var blog_category = $('#save_modal').find('input[name="newpages_blog_categories"]:checked').map(function(){
			return $(this).val();
		}).get();
		var news_category = $('#save_modal').find('input[name="newpages_news_categories"]:checked').map(function(){
			return $(this).val();
		}).get();
		//
		const elem = document.getElementById('add_edit_area');
		const blockarea = elem.contentWindow.document.querySelectorAll('.blockarea');
		var newblock_id_array = [];
		for(var i=0;i<blockarea.length;i++){
			newblock_id_array[i] = blockarea[i].id;
		}
		if(newblock_id_array != ''){
			$.ajax({
				type: 'POST',
				url: '/newpages/save/',
				data: {
					newpage_id: newpage_id,
					pagetype: pagetype,
					pagetype_kind: pagetype_kind,
					newblock_id_array: newblock_id_array,
					display_flag: display_flag,
					template_flag: template_flag,
					release_date: release_date,
					facebook_flag: facebook_flag,
					ameblo_flag: ameblo_flag,
					twitter_flag: twitter_flag,
					blog_category: blog_category,
					news_category: news_category,
					edit_mode: edit_mode,
				},
				cache: false,
				beforeSend: function(xhr){
					xhr.setRequestHeader('X-CSRF-Token', csrf);
				},
			success: function(data){
				var sns_parameter = '';
				if(facebook_flag == 1){
					sns_parameter += 'facebook_post=true&';
				}else{
					sns_parameter += 'facebook_post=&';
				}
				if(twitter_flag == 1){
					sns_parameter += 'twitter_post=true';
				}else{
					sns_parameter += 'twitter_post=';
				}
				//かんたんブログの場合
				if(edit_mode == 'simple_blog'){
					location.href = '/newpages/simple-edit/'+data.id+'/?'+sns_parameter;
				//
				}else if(pagetype && pagetype != '' && pagetype != 'template'){
					//
					if(pagetype == 'blog_template'){
						pagetype = 'blog';
					}
					//
					if(pagetype_kind && pagetype_kind != ''){
						location.href = '/newpages/edit/'+data.id+'/'+pagetype+'/'+pagetype_kind+'/?'+sns_parameter;
					}else{
						location.href = '/newpages/edit/'+data.id+'/'+pagetype+'/?'+sns_parameter;
					}
				}else{
					location.href = '/newpages/edit/'+data.id+'/?'+sns_parameter;
				}
			}
			});
		}else{
			alert('コンテンツが未作成です');
		}
		//
		$('#save_modal').removeClass('active');
	});
	$('#save_modal .cancel').click(function(event){
		$('#save_modal').removeClass('active');
	});
	$('input[name="Newpages[display_flag]"]').change(function(){
		display_flag();
	});
	function display_flag(){
		if($('input#display_flag0').is(':checked')){
			$('.snsselect .caution').css({display: 'block'});
			$('.snsselect label').css({display: 'none'});
		}
		if($('input#display_flag1').is(':checked')){
			$('.snsselect .caution').css({display: 'none'});
			$('.snsselect label').css({display: 'inline-block'});
		}
	}
	$(window).load(function(){
		display_flag();
	})
})

$(window).load(function(){
	$(document).on('click', '#setting_modal .bm', function(){
		$(this).prev().slideToggle(400, 'easeInOutCubic');
		return false;
	});

	$(document).on('click', '.admin_edit_menu .bm', function(event){
		if($(this).parent().attr('class').indexOf('active') != -1){
			$(this).parent().removeClass('active');
		}else{
			$('.admin_edit_menu').each(function(){
				$(this).removeClass('active');
			});
			$(this).parent().addClass('active');
		}
	});

	$(window).scroll(function(){
		$('.admin_edit_menu.active').removeClass('active');
	});
	/*---ini---*/
	// var objectFitImages = (function () {
	// 	'use strict';
	//
	// 	var OFI = 'bfred-it:object-fit-images';
	// 	var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
	// 	var testImg = typeof Image === 'undefined' ? {style: {'object-position': 1}} : new Image();
	// 	var supportsObjectFit = 'object-fit' in testImg.style;
	// 	var supportsObjectPosition = 'object-position' in testImg.style;
	// 	var supportsOFI = 'background-size' in testImg.style;
	// 	var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
	// 	var nativeGetAttribute = testImg.getAttribute;
	// 	var nativeSetAttribute = testImg.setAttribute;
	// 	var autoModeEnabled = false;
	//
	// 	function createPlaceholder(w, h) {
	// 		return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
	// 	}
	//
	// 	function polyfillCurrentSrc(el) {
	// 		if (el.srcset && !supportsCurrentSrc && window.picturefill) {
	// 			var pf = window.picturefill._;
	// 			// parse srcset with picturefill where currentSrc isn't available
	// 			if (!el[pf.ns] || !el[pf.ns].evaled) {
	// 				// force synchronous srcset parsing
	// 				pf.fillImg(el, {reselect: true});
	// 			}
	//
	// 			if (!el[pf.ns].curSrc) {
	// 				// force picturefill to parse srcset
	// 				el[pf.ns].supported = false;
	// 				pf.fillImg(el, {reselect: true});
	// 			}
	//
	// 			// retrieve parsed currentSrc, if any
	// 			el.currentSrc = el[pf.ns].curSrc || el.src;
	// 		}
	// 	}
	//
	// 	function getStyle(el) {
	// 		var style = getComputedStyle(el).fontFamily;
	// 		var parsed;
	// 		var props = {};
	// 		while ((parsed = propRegex.exec(style)) !== null) {
	// 			props[parsed[1]] = parsed[2];
	// 		}
	// 		return props;
	// 	}
	//
	// 	function setPlaceholder(img, width, height) {
	// 		// Default: fill width, no height
	// 		var placeholder = createPlaceholder(width || 1, height || 0);
	//
	// 		// Only set placeholder if it's different
	// 		if (nativeGetAttribute.call(img, 'src') !== placeholder) {
	// 			nativeSetAttribute.call(img, 'src', placeholder);
	// 		}
	// 	}
	//
	// 	function onImageReady(img, callback) {
	// 		// naturalWidth is only available when the image headers are loaded,
	// 		// this loop will poll it every 100ms.
	// 		if (img.naturalWidth) {
	// 			callback(img);
	// 		} else {
	// 			setTimeout(onImageReady, 100, img, callback);
	// 		}
	// 	}
	//
	// 	function fixOne(el) {
	// 		var style = getStyle(el);
	// 		var ofi = el[OFI];
	// 		style['object-fit'] = style['object-fit'] || 'fill'; // default value
	//
	// 		// Avoid running where unnecessary, unless OFI had already done its deed
	// 		if (!ofi.img) {
	// 			// fill is the default behavior so no action is necessary
	// 			if (style['object-fit'] === 'fill') {
	// 				return;
	// 			}
	//
	// 			// Where object-fit is supported and object-position isn't (Safari < 10)
	// 			if (
	// 				!ofi.skipTest && // unless user wants to apply regardless of browser support
	// 				supportsObjectFit && // if browser already supports object-fit
	// 				!style['object-position'] // unless object-position is used
	// 			) {
	// 				return;
	// 			}
	// 		}
	//
	// 		// keep a clone in memory while resetting the original to a blank
	// 		if (!ofi.img) {
	// 			ofi.img = new Image(el.width, el.height);
	// 			ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
	// 			ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;
	//
	// 			// preserve for any future cloneNode calls
	// 			// https://github.com/bfred-it/object-fit-images/issues/53
	// 			nativeSetAttribute.call(el, "data-ofi-src", el.src);
	// 			if (el.srcset) {
	// 				nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
	// 			}
	//
	// 			setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);
	//
	// 			// remove srcset because it overrides src
	// 			if (el.srcset) {
	// 				el.srcset = '';
	// 			}
	// 			try {
	// 				keepSrcUsable(el);
	// 			} catch (err) {
	// 				if (window.console) {
	// 					console.warn('https://bit.ly/ofi-old-browser');
	// 				}
	// 			}
	// 		}
	//
	// 		polyfillCurrentSrc(ofi.img);
	//
	// 		el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
	// 		el.style.backgroundPosition = style['object-position'] || 'center';
	// 		el.style.backgroundRepeat = 'no-repeat';
	// 		el.style.backgroundOrigin = 'content-box';
	//
	// 		if (/scale-down/.test(style['object-fit'])) {
	// 			onImageReady(ofi.img, function () {
	// 				if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
	// 					el.style.backgroundSize = 'contain';
	// 				} else {
	// 					el.style.backgroundSize = 'auto';
	// 				}
	// 			});
	// 		} else {
	// 			el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
	// 		}
	//
	// 		onImageReady(ofi.img, function (img) {
	// 			setPlaceholder(el, img.naturalWidth, img.naturalHeight);
	// 		});
	// 	}
	//
	// 	function keepSrcUsable(el) {
	// 		var descriptors = {
	// 			get: function get(prop) {
	// 				return el[OFI].img[prop ? prop : 'src'];
	// 			},
	// 			set: function set(value, prop) {
	// 				el[OFI].img[prop ? prop : 'src'] = value;
	// 				nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
	// 				fixOne(el);
	// 				return value;
	// 			}
	// 		};
	// 		Object.defineProperty(el, 'src', descriptors);
	// 		Object.defineProperty(el, 'currentSrc', {
	// 			get: function () { return descriptors.get('currentSrc'); }
	// 		});
	// 		Object.defineProperty(el, 'srcset', {
	// 			get: function () { return descriptors.get('srcset'); },
	// 			set: function (ss) { return descriptors.set(ss, 'srcset'); }
	// 		});
	// 	}
	//
	// 	function hijackAttributes() {
	// 		function getOfiImageMaybe(el, name) {
	// 			return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
	// 		}
	// 		if (!supportsObjectPosition) {
	// 			HTMLImageElement.prototype.getAttribute = function (name) {
	// 				return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
	// 			};
	//
	// 			HTMLImageElement.prototype.setAttribute = function (name, value) {
	// 				return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
	// 			};
	// 		}
	// 	}
	//
	// 	function fix(imgs, opts) {
	// 		var startAutoMode = !autoModeEnabled && !imgs;
	// 		opts = opts || {};
	// 		imgs = imgs || 'img';
	//
	// 		if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
	// 			return false;
	// 		}
	//
	// 		// use imgs as a selector or just select all images
	// 		if (imgs === 'img') {
	// 			imgs = document.getElementsByTagName('img');
	// 		} else if (typeof imgs === 'string') {
	// 			imgs = document.querySelectorAll(imgs);
	// 		} else if (!('length' in imgs)) {
	// 			imgs = [imgs];
	// 		}
	//
	// 		// apply fix to all
	// 		for (var i = 0; i < imgs.length; i++) {
	// 			imgs[i][OFI] = imgs[i][OFI] || {
	// 				skipTest: opts.skipTest
	// 			};
	// 			fixOne(imgs[i]);
	// 		}
	//
	// 		if (startAutoMode) {
	// 			document.body.addEventListener('load', function (e) {
	// 				if (e.target.tagName === 'IMG') {
	// 					fix(e.target, {
	// 						skipTest: opts.skipTest
	// 					});
	// 				}
	// 			}, true);
	// 			autoModeEnabled = true;
	// 			imgs = 'img'; // reset to a generic selector for watchMQ
	// 		}
	//
	// 		// if requested, watch media queries for object-fit change
	// 		if (opts.watchMQ) {
	// 			window.addEventListener('resize', fix.bind(null, imgs, {
	// 				skipTest: opts.skipTest
	// 			}));
	// 		}
	// 	}
	//
	// 	fix.supportsObjectFit = supportsObjectFit;
	// 	fix.supportsObjectPosition = supportsObjectPosition;
	//
	// 	hijackAttributes();
	//
	// 	return fix;
	//
	// }());
	//
	// objectFitImages();

	$('body:not(.edit_view) p:empty').remove();

	var myVer = 3;//無印のverは3
	if($('body').data('ver')){
		myVer = $('body').data('ver');
	}
	var myVerRes = new String(myVer).split('.');
	function verChekck(v){
		var ver = new String(v);
		var res = ver.split('.');
		var lim = res.length;
		if(lim < myVerRes.length){
			lim = myVerRes.length;
		}
		for(var i = 0; i < lim; i++){
			if(!myVerRes[i]){
				myVerRes.push('0');
			}
			if(!res[i]){
				res.push('0');
			}
			if(myVerRes[i] > res[i]){
				return true;
				break;
			}
			if(myVerRes[i] < res[i]){
				return false;
				break;
			}
		}
		return true;
	}
	//verChekck('*.*.*.*')//引数と比較して対象のverが新しいまたは同じならtrue、古ければfalse
	//if(!verChekck('3.1.2')){}//対象のverが3.1.2より古い場合

	/*---loading---*/

	if($('#load').length){
		$("#load .loader").stop().animate({opacity: 0}, 300, 'easeInOutCubic');
		$("#load").addClass('complete').stop().animate({opacity: 0}, 800, 'easeInOutCubic', function(){
			$("#load").css({display: "none"});
			$('nav').css({overflow: 'visible'});
		});
	}else{
		$('nav').css({overflow: 'visible'});
	}

	/*----pcnav-----*/

	function ResizeNav(){
		$('.nav_2nd').each(function(){
			var pos = $(this).parents('li').offset().left + $(this).width();
			if(pos > $(window).width()){
				$(this).css({left: $(window).width() - pos - 20});
			}else{
				$(this).css({left: 0});
			}
		});
	}

	setTimeout(function() {
		// $(window).on('resize', ResizeNav);
		// ResizeNav();
		$('.nav_1st>li:has(li)>a').after('<i></i>');
		$('.nav_1st>li i').on('click', function(){
			$(this).next().slideToggle();
			$(this).toggleClass('open');
		});
	}, 2000);

	/*----fixbtn-----*/
	if(($('footer').length)) {
		var fHeight = $('#fixbtn .fixbtnwrap').height();
		if (!($('#fixbtn .fixbtntel').length) && !($('#fixbtn .contents_btn01').length)) {
			$('#fixbtn').addClass('no');
		}

		function funcFixFooter() {
			fHeight = $('#fixbtn .fixbtnwrap').height();
			$('#fixbtn').css({height: fHeight});
			if ($('#fixbtn').offset() && $('#fixbtn').offset().top > window.innerHeight * 2) {
				var page_scroll = $(this).scrollTop();

				//▼100vh以上スクロールすると下から出てくる
				if (page_scroll >= window.innerHeight) {
					$('#fixbtn').addClass("scrolled");
					//▼#fixbtnの位置までスクロールするとボタンが固定される
					if (page_scroll + window.innerHeight >= $('#fixbtn').offset().top + $('#fixbtn').height()) {
						$('#fixbtn').css({position: 'relative'});
						$('#fixbtn .fixbtnwrap').css({position: 'absolute', bottom: 'auto', top: 0});
					} else {
						$('#fixbtn').css({position: 'inherit'});
						$('#fixbtn .fixbtnwrap').css({position: 'fixed', bottom: 0, top: 'auto'});
					}
				} else {
					$('#fixbtn').removeClass("scrolled");
					$('#fixbtn .fixbtnwrap').css({bottom: fHeight * -1});
				}
			} else {
				$('#fixbtn').css({position: 'relative'});
				$('#fixbtn .fixbtnwrap').css({position: 'absolute', bottom: 'auto', top: 0});
			}
		};
		funcFixFooter();
		$(window).scroll(function () {
			funcFixFooter();
		});

		function ResizeFixbtn() {
			fheight = $('#fixbtn .fixbtnwrap').height();
			if (window.innerWidth < 700) {
				if ($('.fixbtntel span').length || $('.fixbtntel a').length) {
				} else {
					$('#fixbtn .fixbtntel').css({display: "none"});
				}
			} else {
				$('#fixbtn .fixbtntel').css({display: "inherit"});
			}
		}

		ResizeFixbtn();
		$(window).on('resize', ResizeFixbtn);
	}
	/*----parallax----*/

	var parallax_spd = 2.5;//スピード設定（1=スクロール等速）
	function parallaxScroll(){
		var parallax_scroll = $(this).scrollTop();
		$('.parallax').each(function(){
			var parallax_pos = $(this).offset().top;
			var parallax_h = $(this).height() + parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
			var parallax_ratio = (parallax_pos - parallax_scroll + parallax_h) / ($(window).height() + parallax_h);
			var parallax_A1 = parallax_h * parallax_spd;
			var parallax_A2 = parallax_A1 * parallax_ratio * -1 + parallax_h * parallax_ratio;
			$(this).find('.parallax_img').css({
				height: parallax_A1,
				transform: 'translateY(' + parallax_A2 + 'px)',
			});
		});
	}
	if((navigator.userAgent.indexOf('iPhone') == -1 && navigator.userAgent.indexOf('iPad') == -1) && navigator.userAgent.indexOf('iPod') == -1 && navigator.userAgent.indexOf('Android') == -1){
		$(window).scroll(function(){
			parallaxScroll();
		});
	}else{
		$('.parallax').each(function(){
			var parallax_h = $(this).height() + parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
			$(this).find('.parallax_img').addClass('sp').css({
				height: parallax_h,
				top: 0,
			});
		});
	}

	/*----contents_box01-----*/

	function ResizeContentsBox(){
		if(window.innerWidth <= 900){
			var ContentsBoxM;
			ContentsBoxM = parseInt($('#main>section.mb .content_wrapper>*:last-child').css('margin-bottom'), 10);
			$('.contents_box01 .content_wrapper>*:last-child').each(function(){
				if(parseInt($(this).css('margin-bottom'), 10) == 0){
					$(this).css({paddingBottom: ContentsBoxM});
				}
			});
		}else{
			$('.contents_box01 .content_wrapper>*:last-child').each(function(){
				$(this).css({paddingBottom: 0});
			});
		}
	}
	ResizeContentsBox();
	$(window).on('resize', ResizeContentsBox);

	/*---tooltip---*/

	var tip_num = 0;
	$('main a[data-tooltip]').hover(function(e){
		if((navigator.userAgent.indexOf('iPhone') === -1 && navigator.userAgent.indexOf('iPad') === -1) && navigator.userAgent.indexOf('iPod') === -1 && navigator.userAgent.indexOf('Android') === -1){
			var wrd = $(this).text();
			var rel = $(this).attr('data-tooltip');
			var n = tip_num;
			if(!rel){
				rel = $(this).attr('title');
			}
			$('body').append('<div class="tip tipnum'+tip_num+'"><p>'+wrd+'</p><p>'+rel+'</p><span></span></div>');
			var a_y = $(this).offset().top;
			var a_h = $(this).height();
			var a_w = $(this).width();
			var a_lh = parseInt($(this).css('line-height'), 10);
			var tip_w = $('.tipnum'+tip_num).width();
			var tip_h = $('.tipnum'+tip_num).height();
			var tip_x = e.pageX;
			var tip_y = a_y - tip_h;
			if(e.pageY - a_y >= a_lh){
				tip_y += a_lh;
			}
			var spanOff = 0;
			if(tip_x >= window.innerWidth - tip_w){
				spanOff = tip_x + tip_w - window.innerWidth + 20;
				tip_x = window.innerWidth - tip_w - 20;
			}else if(tip_x < 40){
				tip_x = 30;
			}
			$('.tipnum'+tip_num).find('span').css({left: parseInt($('.tipnum'+tip_num).find('span').css('left'), 10) + spanOff});
			$('.tipnum'+tip_num).css({top: tip_y - 20, left: tip_x - 20}).delay(10).queue(function(){
				if(n === tip_num){
					$(this).css({transform: 'translate(0,0)', opacity: 1}).dequeue();
				}
			});
		}
	}, function(){
		tip_num ++;
		$('.tip:nth-last-of-type(1)').css({transform: 'translate(0,-20px)', opacity: 0});
		$('.tip:nth-last-of-type(n+3)').remove();
	});
	function ResizeTip(){
		$('.tip').remove();
	}
	$(window).on('resize', ResizeTip);
	ResizeTip();

	/*----tel link-----*/

	if((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
		$('span[data-tel^=tel]').each(function(){
			var html = $(this).html();
			var tel = $(this).attr('data-tel');
			$(this).replaceWith('<a href="'+ tel +'">'+ html +'</a>');
		});
	}else{
		$('span[data-tel^=tel]').each(function(){
			if($(this).closest('.contents_btn01').length > 0){
				var html = $(this).html();
				var tel = $(this).attr('data-tel');
				$(this).replaceWith('<a href="'+ tel +'">'+ html +'</a>');
			}
		});
		$('header a[href^=tel], footer a[href^=tel]').each(function(){
			var html = $(this).html();
			var tel = $(this).attr('href');
			$(this).replaceWith('<span data-tel="'+ tel +'">'+ html +'</span>');
		});
	}

	/*----composite_box01-----*/

	ResizeComposite();
	$(window).on('resize', ResizeComposite());


	if($('body:not(.edit_view) .composite_box01.block_images_13').length){
		$('body:not(.edit_view) .composite_box01.block_images_13 .wrapper_item:not(.slick-slider)').each(function(){
			$(this).slick({
				accessibility: false,
				autoplay: true,
				autoplaySpeed: 4000,
				speed: 700,
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				cssEase: 'ease-in-out',
				centerMode: false,
				centerPadding: '0',
				draggable: false,
				pauseOnHover: true,
				draggable: true,
				swipe: true,
				infinite: true,
				responsive:[
					{
						breakpoint: 600,
						settings:{
							slidesToShow: 1,
						}
					},
				]
			});
		});
	}

	/*----staff-----*/

	if('.widget_staff01'){
		function staffResizeS1(){
			var hArray = [];
			var maxH = 0;
			$('.widget_staff01 .inner_item').each(function(){
				hArray.push($(this).find('.inner_item_img img').height());
			});
			maxH = Math.max.apply(null, hArray);
			$('.widget_staff01 .inner_item_img').each(function(){
				$(this).css({height: maxH});
			});
		}
		staffResizeS1();
		$(window).on('resize', staffResizeS1);
	}

	/*----gallery-----*/

	/*
	$('.widget_gallery01.add_design1:not(.block_slider), .gallery_archive.add_design1:not(.block_slider)').each(function(){//未使用
		var portrait = 0;
		var landscape = 0;
		$(this).find('.inner_item img').each(function(){
			var img = new Image();
			img.src = $(this).attr('src');
			var width = img.width;
			var height = img.height;
			if(height/width > 1){
				portrait ++;
			}else{
				landscape ++;
			}
		});
		if(portrait > landscape){
			$(this).addClass("view_portrait");
		}else if(portrait < landscape){
			$(this).addClass("view_landscape");
		}else{
			$(this).addClass("view_square");
		}
	});
	*/

	$('.gallery_archive.add_design3 .inner_item img').each(function(){
		var img = new Image();
		img.src = $(this).attr('src');
		var h = img.height;
		if(window.innerHeight*0.5 < h){
			h = window.innerHeight*0.5;
		}
		$(this).css({maxHeight: h});
	});

	/*----news-----*/

	$('.news_archive.add_design3 article .entry_header').each(function(){
		$(this).insertAfter($(this).parent('article').find('.entry_body .inner_item_img'));
	});

	$('#sidebar ul.sidebar_list.archive>li>a.open').next('ul').slideToggle(500, 'easeInOutCubic');
	$('#sidebar ul.sidebar_list.archive>li>a').on('click', function(){
		$(this).toggleClass('open').next('ul').slideToggle(500, 'easeInOutCubic');
		$('#sidebar ul.sidebar_list.archive>li>a').not($(this)).removeClass('open').next().slideUp(500, 'easeInOutCubic');
		return false;
	});

	$('#sidebar ul.sidebar_list:not(.archive)>li').has('ul').addClass('open acco');
	$('#sidebar ul.sidebar_list:not(.archive)>li').has('ul').children('a').append('<span class="toggle">-</span>');
	$('#sidebar ul.sidebar_list:not(.archive) .toggle').on('click', function(){
		$(this).parents('.acco').toggleClass('open').children('ul').slideToggle(500, 'easeInOutCubic');
		$('#sidebar ul.sidebar_list:not(.archive) .acco').not($(this).parents('.acco')).removeClass('open').children('ul').slideUp(500, 'easeInOutCubic');
		$('#sidebar ul.sidebar_list:not(.archive) .acco .toggle').html('+');
		$('#sidebar ul.sidebar_list:not(.archive) .acco.open .toggle').html('-');
		return false;
	});

	if($('body:not(.edit_view) .block_news_1.add_design12').length){
		$('body:not(.edit_view) .block_news_1.add_design12').each(function(){
			$(this).find('.content_wrapper>ul, .content_wrapper>div:not(".heading")').wrapAll('<div class="inner">');
		});
		$('body:not(.edit_view) .block_news_1.add_design12 ul:not(.slick-slider)').slick({
			accessibility: false,
			autoplay: true,
			autoplaySpeed: 2500,
			speed: 500,
			arrows: false,
			cssEase: 'ease-in-out',
			draggable: false,
			pauseOnHover: true,
			swipe: false,
			vertical: true,
		});
	}

	/*----block_header fontsize-----*/

	function Resizeheading(){
		$('#lv p span, .block_header_1 .h, .block_header_1 p, .block_header_2 .h, .block_header_3 .h, .block_header_4 .h, .block_header_6 .h, .block_header_6 p, .contents_btn01 a span').each(function(){
			var h_default = '';
			var h_dis;
			var h_ls;
			var h_w;
			var h_w2;
			var h_num;
			var h_fs;
			var h_ov;
			var h_ls2;
			function HF1st(j){
				var d = new $.Deferred;
				if(j.attr('style') != undefined){
					h_default = j.attr('style');
				}
				h_dis = j.css('display');
				h_ls = parseInt(j.css('letter-spacing'), 10);
				d.resolve();
				return d.promise();
			}
			function HF2nd(j){
				j.css({'cssText': 'display: block !important;'});
				h_w = parseInt(j.css('width'), 10);
			}
			function HF3rd(j){
				j.css({'cssText': 'display: inline-block !important; white-space: nowrap; !important'});
				h_w2 = parseInt(j.css('width'), 10);
			}
			function HF4th(j){
				j.removeAttr('style').css({'cssText': h_default});
			}
			function HF5th(j){
				h_num = j.text().replace(/^\s+|\s+$/g, "").length;
				h_fs = h_w2 / h_num - 0.0001;
			}
			function HF6th(j){
				h_ov = (h_w2 - h_w)/h_fs;
				h_ov = Math.ceil(h_ov);
			}
			function HF7th(j){
				h_ls2 = (h_fs*h_ov)/(h_num)*-1 + Number(h_ls);
				if(0 < h_ov && h_ov < 3){//1-2文字落ち防止
					if(h_ls2 > 0){
						h_ls2 = 0;
					}
					j.css({'cssText': h_default + 'letter-spacing: '+h_ls2+'px !important;'});
				}
			}
			HF1st($(this)).then(HF2nd($(this))).then(HF3rd($(this))).then(HF4th($(this))).then(HF5th($(this))).then(HF6th($(this))).then(HF7th($(this)));
		});
	}
	//$(window).on('resize', Resizeheading);
	Resizeheading();

	/*----body resize-----*/

	// var userAgent = window.navigator.userAgent.toLowerCase();
	// if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1){
	// }else if(userAgent.indexOf('edge') != -1){
	// }else if(userAgent.indexOf('chrome') != -1){
	// 	$('body').css({width: "calc(100% - 100px)"}).delay(100).queue(function() {
	// 		$(this).css({width: "100%"});
	// 	});
	// }else if(userAgent.indexOf('safari') != -1){
	// }else if(userAgent.indexOf('firefox') != -1){
	// }else if(userAgent.indexOf('opera') != -1){
	// }else{
	// }

	/*----main min-height-----*/

	// function mainHeightResize(){
	// 	var fh = $('footer').height();
	// 	var mp = $('main').offset().top;
	// }
	// mainHeightResize();
	// $(window).on('resize', mainHeightResize);

	/*---sp_payment color---*/

	var sp_menuColor = $('header .sp_menu a div span').css('background-color');
	var sp_menuColor2 = $('header .burger li.sp_payment a svg').css('fill');
	var sp_menuColor3 = $('header .burger li.sp_translate a svg').css('fill');
	if(sp_menuColor2 == 'rgb(0, 0, 0)' || sp_menuColor2 == 'rgb(0,0,0)' || sp_menuColor2 == 'black'){
		$('header .burger li.sp_payment a svg').css({'fill': sp_menuColor});
	}

	/*---youtube iframe---*/

	// $('*:not(.youtube_block)>iframe[src^="https://www.youtube.com/"]').each(function(){
	// 	$(this).wrap("<div class='youtube_block'></div>");
	// });

	/*---cotents_hide---*/

	$('body').on('click', '.hidetgl a, .hidetgl span', function(){
		$(this).parent().parent().toggleClass('c_show');
		contentsHIde();
		return false;
	});

	if($('.widget_menu01.cotents_hide, .widget_menu01.cotents_hide_sp').length){
		$('.widget_menu01.cotents_hide .mbx, .widget_menu01.cotents_hide_sp .mbx').each(function(){
			$(this).wrapInner('<span></span>').append('<p class="hidetgl"><span>もっと見る</span></p>');
		});
	}
	function contentsMenuHIdeResize(){
		$('.widget_menu01.cotents_hide .mbx>span, .widget_menu01.cotents_hide_sp .mbx>span').each(function(){
			if($(this).width() < $(this).parent('.mbx').width() - 95 && $(this).height() <= $(this).parent('.mbx').height()){
				$(this).next('.hidetgl').hide();
			}else{
				$(this).next('.hidetgl').show();
			}
		});
	}
	$(window).on('resize', contentsMenuHIdeResize);
	contentsMenuHIdeResize();

	if($('.beforeafter_archive.cotents_hide, .beforeafter_archive.cotents_hide_sp').length){
		$('.beforeafter_archive.cotents_hide .inner_item_txt p:not(.title), .beforeafter_archive.cotents_hide_sp .inner_item_txt p:not(.title)').each(function(){
			$(this).wrapInner('<span></span>').append('<p class="hidetgl"><span>もっと見る</span></p>');
		});
	}
	function contentsBAHIdeResize(){
		$('.beforeafter_archive.cotents_hide .inner_item_txt p:not(.title)>span, .beforeafter_archive.cotents_hide_sp .inner_item_txt p:not(.title)>span').each(function(){
			if($(this).width() < $(this).parent('p').width() - 74 && $(this).height() < $(this).parent('p').height()){
				$(this).next('.hidetgl').hide();
			}else{
				$(this).next('.hidetgl').show();
			}
		});
	}
	$(window).on('resize', contentsBAHIdeResize);
	contentsBAHIdeResize();

	function contentsHIde(){
		$('.hidetgl a, .hidetgl span').text('もっと見る');
		$('.c_show .hidetgl a, .c_show .hidetgl span').text('閉じる');
	}
	contentsHIde();

	/*---header---*/
	$('.nav_1st').css({flexWrap: 'no-wrap'});
	$('.nav_1st>li').css({flexGrow: '1'});
	$('.nav_1st>li>a').css({paddingLeft: 0, paddingRight: 0});

	var hh = find_header_height()
	var liw = 0;
	$('.nav_1st>li>a>span').each(function(){
		liw += $(this).width();
	});
	function ResizeNavs() {
		if($('header nav').width() > liw - 10){
			$('.nav_1st').css({flexWrap: 'no-wrap'});
			$('.nav_1st>li').css({flexGrow: '1'});
			$('.nav_1st>li>a').css({paddingLeft: 0, paddingRight: 0});
		} else {
			$('.nav_1st').css({flexWrap: 'wrap'});
			$('.nav_1st>li').css({flexGrow: '0'});
			$('.nav_1st>li>a').css({paddingLeft: '1vw', paddingRight: '1vw'});
		}
		hh = find_header_height()
	}
	// $(window).on('resize', ResizeNavs);

	function HH(){
		$('header#pattern2').css({minHeight: $('header#pattern2 .logo img').height() + parseInt($('header#pattern2 .logo').css('padding-top'), 10) + parseInt($('header#pattern2 .logo').css('padding-bottom'), 10)});
		$('header#pattern2 nav ul.nav_1st').css({minHeight: $('header#pattern2').height()*0.8 - $('header#pattern2 .wraper').height()*0.8});
		if(window.innerWidth > 900){
			$('header#pattern2 .logo').css({minHeight: $('header#pattern2').height()});
		} else {
			$('header#pattern2 .logo').css({minHeight: "inherit"});
		}
	};
	function ResizeHead(){
		// ResizeNavs();
		HH();

		if(window.innerWidth <= 900) {
			$('header.header_class:not(#pattern4)>#menu_head').appendTo('header.header_class .header_contents .inner');
			$('header.header_class:not(#pattern4) .header_contents').css({height: window.innerHeight - $('header').height()});
			if($('.translate').length){
				$('#google_translate_element').appendTo('.burger .sp_translate');
			}
		} else {
			$('header.header_class:not(#pattern4) .header_contents .inner #menu_head').appendTo('header.header_class');
			$('header.header_class:not(#pattern4) .header_contents').css({height: 'auto'});
			if($('.translate').length){
				$('#google_translate_element').appendTo('.header_col1 .translate');
			}
		}
		$('header#pattern4>#menu_head').appendTo('header.header_class .header_contents .inner');
		$('header#pattern4 .header_contents').css({height: window.innerHeight - $('header').height()});
		$('header#pattern4 #google_translate_element').appendTo('.burger .sp_translate');
		$('body').removeClass('scrolled');
		$('body').removeClass('scrolledHide');
		hh = find_header_height();

		$('header.header_class:not(.over)~#mv_outer, header.header_class:not(.over)~#lv_outer, header.header_class+#main, header.header_class+#pan').css({borderTop: 'transparent solid', borderTopWidth: hh});
		$('header.over~#mv_outer #mv .mv_text').css({paddingTop: hh});
		$('header.over~#lv_outer #lv').css({paddingTop: hh});
		$('header.over~#mv_outer #lv').css({paddingTop: hh});

		if ($('body#comparison_setting_page').length > 0) {
			var lvContentHeight = $('body#comparison_setting_page header.over~#lv_outer #lv p').height();
			$('body#comparison_setting_page header.over~#lv_outer #lv').css({height: hh + lvContentHeight});
		}

		if(window.innerWidth > 900 && $('header .header_contents .header_col1').css('flex-direction') == 'row'){
			$('body.scrolled header .header_col1 .tel').css({display: 'block'});
		}
	}

	var anchor = window.location.hash;
	window.location.hash = '';
	setTimeout(function() {
		$(window).on('resize', ResizeHead);
		ResizeHead()
		$('body').children('header, main, footer, #mv_outer, #pan, #lv_outer').css('visibility', 'visible');
		hide_loading();
		if (anchor !== '') window.location.hash = anchor;
	}, 1000);

	function ResizeHeadTel(){
		if(window.innerWidth > 900 && $('header .header_contents .header_col1').css('flex-direction') == 'row'){
			$('body.scrolled header .header_col1 .tel').css({display: 'block'});
		}
	}
	$(window).on('resize', ResizeHeadTel);
	$(window).scroll(function(){
		ResizeHeadTel();
	});
	ResizeHeadTel();

	if(!$('body').hasClass('edit_view')){
		if(!($('header#pattern4>.wraper>.inner>.btn').length)){
			$('header#pattern4 .header_contents .btn').clone().insertBefore('.burger');
		}
		if(!($('header#pattern4>.wraper>.inner>.header_sns').length)){
			$('header#pattern4 .header_contents .header_sns').clone().insertBefore('.burger');
		}
	}
	$('header#pattern4 .header_contents a').on(
		'click', function(){
			$('header#pattern4').removeClass('open');
	});

	/*---scroll---*/

	var start_pos = 0;
	var main_pos;
	if($('main').length > 0) {
		main_pos = $('main').offset().top;
	} else {
		main_pos = 0;
	}
	$('body').removeClass('scrolled');
	$('body').removeClass('scrolledHide');
	$(window).scroll(function(e){
		if(!($('header.header_class.nofixed').length)){
			var current_pos = $(this).scrollTop();
			if(current_pos >= hh){
				$('body').addClass('scrolled');
				$('body').addClass('hHide');
				if(current_pos >= (main_pos + hh)*1.2 && current_pos < start_pos){//scrollup
					$('body').removeClass('hHide');
				}
			}else{
				$('body').removeClass('scrolled');
				$('body').removeClass('hHide');
			}
			start_pos = current_pos;
		}
		$('header#pattern4 .header_contents').css({height: window.innerHeight - $('header').height()});
		HH();
	});

});

/*----cmnFunc-----*/

function ResizeComposite(){
	$('.composite_box01:not(.on_favorite_page)').each(function(){
		var $tgtBox = $(this);
		var rate = 1.6;
		var wwidth = $(this).find('.inner_item').width();
		$(this).find('.inner_item_img source').each(function(){
			var source = new Image();
			source.src = $(this).attr('srcset');
			source.onload = function(){
				var width = source.width;
				var height = source.height;
				var thisrate = height/width;
				if(rate > thisrate && width > 0 && height > 0){
					rate = thisrate;
				}
				$tgtBox.find('.inner_item_img img').each(function(){
					$(this).css({width: '100%'});
					$(this).css({height: wwidth*rate});
				});
			}
		});
		$(this).find('.inner_item_img img').each(function(){
			var img = new Image();
			img.src = $(this).attr('src');
			img.onload = function(){
				var width = img.width;
				var height = img.height;
				var thisrate = height/width;
				if(rate > thisrate && width > 0 && height > 0){
					rate = thisrate;
				}
				$tgtBox.find('.inner_item_img img').each(function(){
					$(this).css({width: '100%'});
					$(this).css({height: wwidth*rate});
				});
			}
		});
	});
}

function find_header_height() {
	return $('header').last().height();
}

$(function(){

	/*--block_table_2 組み換え---*/

	function tableResize02(){
		$('.block_table_2 table').each(function(){
			var itemContent2 = '<tbody class="block_table_2_item">';
			var array2 =[];
			var cols2 = $(this).find('thead tr th, thead tr td').size();
			var rows2 = $(this).find('tr').size();
			for(var i = 0; i < cols2; i++){
				itemContent2 += '<tr>';
				array2[i] = [];
				for(var j = 0; j < rows2; j++){
					array2[i][j] = $(this).find('tr:eq('+j+') > *:eq('+i+')').html();
					if(j == 0){
						itemContent2 += '<th>'+array2[i][j]+'</th>';
					}else{
						itemContent2 += '<td>'+array2[i][j]+'</td>';
					}
				}
				itemContent2 += '</tr>';
			}
			itemContent2 += '</tbody>';
			if(window.innerWidth < 500){
				if(!$(this).children().is('tbody.block_table_2_item')){
					$(this).find('tbody').after(itemContent2);
				}
			}else{
				if($(this).children().is('tbody.block_table_2_item')){
					$(this).find('tbody.block_table_2_item').remove();
				}
			}
		});
	}
	tableResize02();
	$(window).on('resize', tableResize02);
});

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function(){if("undefined"!==typeof window&&window.addEventListener){var e=Object.create(null),l,d=function(){clearTimeout(l);l=setTimeout(n,100)},m=function(){},t=function(){window.addEventListener("resize",d,!1);window.addEventListener("orientationchange",d,!1);if(window.MutationObserver){var k=new MutationObserver(d);k.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0});m=function(){try{k.disconnect(),window.removeEventListener("resize",d,!1),window.removeEventListener("orientationchange",
d,!1)}catch(v){}}}else document.documentElement.addEventListener("DOMSubtreeModified",d,!1),m=function(){document.documentElement.removeEventListener("DOMSubtreeModified",d,!1);window.removeEventListener("resize",d,!1);window.removeEventListener("orientationchange",d,!1)}},u=function(k){function e(a){if(void 0!==a.protocol)var b=a;else b=document.createElement("a"),b.href=a;return b.protocol.replace(/:/g,"")+b.host}if(window.XMLHttpRequest){var d=new XMLHttpRequest;var m=e(location);k=e(k);d=void 0===
d.withCredentials&&""!==k&&k!==m?XDomainRequest||void 0:XMLHttpRequest}return d};var n=function(){function d(){--q;0===q&&(m(),t())}function l(a){return function(){!0!==e[a.base]&&(a.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+a.hash),a.useEl.hasAttribute("href")&&a.useEl.setAttribute("href","#"+a.hash))}}function p(a){return function(){var c=document.body,b=document.createElement("x");a.onload=null;b.innerHTML=a.responseText;if(b=b.getElementsByTagName("svg")[0])b.setAttribute("aria-hidden",
"true"),b.style.position="absolute",b.style.width=0,b.style.height=0,b.style.overflow="hidden",c.insertBefore(b,c.firstChild);d()}}function n(a){return function(){a.onerror=null;a.ontimeout=null;d()}}var a,b,q=0;m();var f=document.getElementsByTagName("use");for(b=0;b<f.length;b+=1){try{var h=f[b].getBoundingClientRect()}catch(w){h=!1}var g=(a=f[b].getAttribute("href")||f[b].getAttributeNS("http://www.w3.org/1999/xlink","href")||f[b].getAttribute("xlink:href"))&&a.split?a.split("#"):["",""];var c=
g[0];g=g[1];var r=h&&0===h.left&&0===h.right&&0===h.top&&0===h.bottom;h&&0===h.width&&0===h.height&&!r?(c.length||!g||document.getElementById(g)||(c=""),f[b].hasAttribute("href")&&f[b].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a),c.length&&(a=e[c],!0!==a&&setTimeout(l({useEl:f[b],base:c,hash:g}),0),void 0===a&&(g=u(c),void 0!==g&&(a=new g,e[c]=a,a.onload=p(a),a.onerror=n(a),a.ontimeout=n(a),a.open("GET",c),a.send(),q+=1)))):r?c.length&&e[c]&&setTimeout(l({useEl:f[b],base:c,
hash:g}),0):void 0===e[c]?e[c]=!0:e[c].onload&&(e[c].abort(),delete e[c].onload,e[c]=!0)}f="";q+=1;d()};var p=function(){window.removeEventListener("load",p,!1);l=setTimeout(n,0)};"complete"!==document.readyState?window.addEventListener("load",p,!1):p()}})();
