
; !function () {
    let $i = 0;
    let Timer;
    $(function () {
        //自动轮播
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




; !function ($) {
    //梦芭莎优选区块  商品渲染

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

