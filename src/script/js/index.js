; !function ($) {
	//梦芭莎优选区块  商品渲染
	const optimization = document.querySelector('.optimization');
	ajax({
		url: 'http://localhost/moonbasa/php/optimization.php',
		dataType: 'json',
		success: function (oplist) {
			let htmlstr = '<ul>';
			for (let i = 0; i < oplist.length; i++) {
				htmlstr += `
                    <li>
                       <a href="details.html?sid=${oplist[i].picid}">
						<img src="${oplist[i].url}"/>
						<i>NEW</i>
                        <p>${oplist[i].title}</p>
                        <span>￥${oplist[i].price}</span>
                       </a> 
                    </li>
                `;
			}
			htmlstr += '</ul>';
			optimization.innerHTML = htmlstr;
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
// !function () {
// 	//banner效果

// }(jQuery);

// !function () {
// 	//lunbo效果

// }(jQuery);

// !function () {
// 	//小效果

// }(jQuery);
