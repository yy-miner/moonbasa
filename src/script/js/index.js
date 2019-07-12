//轮播
; !function () {
    let $i = 0;
    let Timer;
    $(function () {
        //自动
        $(".picImg").eq(0).show().siblings().hide();
        TimerBanner();

        $(".tabs li").hover(function () {
            $i = $(this).index();
            clearInterval(Timer);
            showPic();
        }, function () {
            TimerBanner();
        });
    });

    function TimerBanner() {
        Timer = setInterval(function () {
            $i++;
            if ($i == 5) {
                $i = 0;
            }
            showPic()
        }, 3000);
    }
    //显示图片
    function showPic() {
        $(".picImg").eq($i).show().siblings().hide();
        $(".tabs li").eq($i).addClass("bg").siblings().removeClass("bg");
    }
}();



//商品渲染 :梦芭莎优选区块
; !function ($) {
    $.ajax({
        url: 'http://10.31.158.50/moonbasa/php/optimization.php',
        dataType: 'json'
    }).done(function (oplist) {
        const $optimization = $('.optimization ul');
        let htmlstr = '';
        $.each(oplist, function (ind, val) {
            htmlstr += `
			        <li>
			           <a href="details.html?sid=${val.picid}">
						<img src="${val.url}"/>
						<i>NEW</i>
			            <p>${val.title}</p>
			            <span>￥${val.price}</span>
			           </a> 
                    </li>
                    `;
        });
        $optimization.html(htmlstr);
    });
}(jQuery);



//楼梯效果
; !function () {
    const $loutinav = $('#louti');
    const $louti = $('#loutinav a div');
    const $louceng = $('.louceng');

    $(window).on('scroll', function () {
        let $scrollTop = $(window).scrollTop();
        if ($scrollTop > 700) {
            $loutinav.show();
        } else {
            $loutinav.hide();
        }
    });
    $louti.not('.last').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        let $lctop = $louceng.eq($(this).index()).offset().top;
        $('html, body').animate({
            scrollTop: $lctop
        });
    });

    $('.last').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        });
    });
}