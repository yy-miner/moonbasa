//商品小图列表效果
; !function ($) {
    function setcookie(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
    }

    function getcookie(key) {
        let arr = decodeURI(document.cookie).split('; ');
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    }

    function delcookie(key) {
        setcookie(key, '', -1);
    }


    let sid = location.search.split('=')[1];
    const $spic = $('.movelist .spic');
    const $bpic = $('.movelist .bpic');
    const $sf = $('.movelist .sf');
    const $bf = $('.movelist .bf');
    const $title = $('.movelist .title');
    const $price = $('.movelist .price');
    const $movelistul = $('.movelist ul');
    const $details = $('.movelist .details');
    const $left = $('.icoleft');
    const $right = $('.icoright');
    const $btn = $('.spanAddCart');



    /* 图片列表 */
    $.ajax({
        url: 'http://10.31.158.50/moonbasa/php/details.php',
        dataType: 'json',
        data: {
            picid: sid
        }
    }).done(function (oplist) {
        $spic.find('img').attr('src', oplist.url);
        $bpic.find('img').attr('src', oplist.url);
        $spic.attr('sid', oplist.sid);
        $title.html(oplist.titile);
        $price.html(oplist.price);
        var arr = oplist.imgurls.split(',');
        var str = '';
        $.each(arr, function (index, value) {
            str += '<li><img src="' + value + '"/></li>';
        });
        $movelistul.html(str);
    });

    //鼠标经过图片列表的图片时将对应的图片显示到小图上
    $movelistul.hover(function (ev) {
        var ev = ev || window.event;
        let ele = ev.target || ev.srcElement;

        if (ele.parentNode.nodeName == 'LI') {
            let imgurl = ele.parentNode.querySelector('img').src;
            $spic.find('img').attr("src", "imgurl");
            $bpic.attr("src", "imgurl");
        }
    });

    //点击图片列表的左右箭头
    let num = 5;
    $right.on('click', function () {
        let icolist = $movelistul.find('li');
        let liwidth = icolist.offsetWidth + 5;
        if (icolist.length > num) {
            num++;
            buffermove($movelistul, { left: -(num - 5) * liwidth });
        }
    });

    $left.on('click', function () {
        let icolist = $movelistul.find('li');
        let liwidth = icolist.offsetWidth + 5;
        if (num > 5) {
            num--;
            buffermove($movelistUl, { left: -(num - 5) * liwidth });
        }
    })
    //放大镜效果
    const $tp = $('#mediumContainer')
    const $xli = $('#img_x li');
    const $magnifier = $('#magnifier');
    const $zz = $('#zhezhao');
    const $u = $('#img_u');
    const $uimg = $('#img_u img');

    $tp.on('mousemove', function (e) {
        $u.show();
        $magnifier.show();
        var left = e.offsetX - parseInt($magnifier.width()) / 2;
        var top = e.offsetY - parseInt($magnifier.height()) / 2;
        left = left < 0 ? 0 : left;
        left = left > (parseInt($zz.outerWidth()) - parseInt($magnifier.outerWidth())) ? (parseInt($zz.outerWidth()) - parseInt($magnifier.outerWidth())) : left;
        top = top < 0 ? 0 : top;
        top = top > (parseInt($zz.outerHeight()) - parseInt($magnifier.outerHeight())) ? (parseInt($zz.outerHeight()) - parseInt($magnifier.outerHeight())) : top;

        $magnifier.css('left', left + 'px');
        $magnifier.css('top', top + 'px');

        var leftRate = left / parseInt($zz.outerWidth());
        var bigLeft = leftRate * parseInt($uimg.outerWidth());
        $uimg.css('margin-left', -bigLeft + 'px');

        var topRate = top / parseInt($zz.outerHeight());
        var bigTop = topRate * parseInt($uimg.outerHeight());
        $uimg.css('margin-top', -bigTop + 'px');
    })
    $zz.on('mouseout', function () {
        $u.hide();
        $magnifier.hide();
    })

    $xli.hover(function () {
        $(this).css('border', '2px solid coral').siblings().css('border', '2px solid transparent');
        $('#mediumContainer img').eq(0).attr('src', 'http://img3m3.ddimg.cn/2/21/22628333-' + ($(this).index() + 1) + '_w_2.jpg');
        $uimg.eq(0).attr('src', 'http://img3m3.ddimg.cn/2/21/22628333-' + ($(this).index() + 1) + '_u_2.jpg');
    })
}(jQuery);

//放大镜效果
; !function ($) {


}(jQuery);