; !function () {//注册
    const $username = $('.reg .username');
    const $password = $('.password');
    const $spana = $('.explaina');
    const $submit = $('.reg .submit');
    let $usernameflag = true;

    //用户名失去焦点时，将数据传给后端进行匹配
    $username.on('blur', function () {
        $.ajax({
            type: 'post',
            datatype: 'json',
            url: 'http://10.31.158.50/moonbasa/php/register.php',
            data: {
                name: $username.val()
            }
        }).done(function (d) {
            if (d) {  //存在 提示已存在 阻止提交 
                $spana.html('已存在！');
                $spana.css("color ", "red");
                $usernameflag = false;
            } else {   //不存在 提示√
                $spana.html('√');
                $spana.css({ "color ": "green" });
                $usernameflag = true;
            }
        });
    });

    //点击注册按钮  阻止提交时用户名获得焦点
    $submit.on('click', function () {
        alert(11);
        if (!$usernameflag) {
            $username.focus();
            return false;
        }
    });
}(jQuery);