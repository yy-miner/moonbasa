; !function ($) {
	//梦芭莎优选区块  商品渲染
	const $optimization = $('.optimization');
	ajax({
		url: '../php/optimization.php',
		dataType: 'json',
		success: function (oplist) {
			// let htmlstr = '<ul>';
			// for (let i = 0; i < oplist.length; i++) {
			// 	htmlstr += `
			//         <li>
			//            <a href="details.html?sid=${oplist[i].picid}">
			// 			<img src="${oplist[i].url}"/>
			// 			<i>NEW</i>
			//             <p>${oplist[i].title}</p>
			//             <span>￥${oplist[i].price}</span>
			//            </a> 
			//         </li>
			//     `;
			// }
			// htmlstr += '</ul>';
			$optimization.innerHTML = htmlstr;
		}
	});




	//banner数据
	// 	$.ajax({
	// 		url: 'php/banner.php',
	// 		dataType: 'json'
	// 	}).done(function (bannerdata) {
	// 		$.each(bannerdata, function (index, value) {
	// 			var $bannerstr = '<ul>';
	// 		});
	// 	});

	// 	//lunbo数据
	// 	$.ajax({
	// 		url: 'php/banner.php',
	// 		dataType: 'json'
	// 	}).done(function (bannerdata) {
	// 		$.each(bannerdata, function (index, value) {
	// 			var $bannerstr = '<ul>';

	// 		});
	// 	});
	// 	//tab切换数据
	// 	$.ajax({
	// 		url: 'php/banner.php',
	// 		dataType: 'json'
	// 	}).done(function (bannerdata) {
	// 		$.each(bannerdata, function (index, value) {
	// 			var $bannerstr = '<ul>';

	// 		});
	// 	});

	// }(jQuery);
}
	; !function () {//登录
		const $username = $('.log .username');
		const $password = $('.log .password');
		const $btn = $('.log .button');
		const $phpurl = 'http://10.31.158.50/moonbasa/php/';

		$btn.on('click', function () {
			ajax({
				type: 'post',
				url: phpurl + 'login.php',
				data: {
					user: $username.value,
					pass: $password.value
				}
			}).then(function (d) {
				if (!d) {
					alert('用户名或者密码错误');
					$password.value = '';
				} else {
					location.href = 'index.html';
					localStorage.setItem('successname', $username.value);
				}
			});
		});

	}(jQuery);




// !function () {
// 	//小效果

// }(jQuery);
