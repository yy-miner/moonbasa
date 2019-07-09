
; !function () {//登录
	const $username = $('.log .username');
	const $password = $('.log .password');
	const $btn = $('.log .button');

	$btn.on('click', function () {
		$.ajax({
			type: 'post',
			url: 'http://10.31.158.50/moonbasa/php/login.php',
			data: {
				user: $username.val(),
				pass: $password.val()
			}
		}).done(function (d) {
			if (!d) {
				alert('用户名或者密码错误');
				$password.val('');
			} else {
				location.href = 'index.html';
				localStorage.setItem('successname', $username.val());
			}
		});
	});

}(jQuery);



