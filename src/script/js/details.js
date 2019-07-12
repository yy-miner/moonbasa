//商品小图列表效果
; !function ($) {

    let sid = location.search.split('=')[1];

    const $title = $('.movelist .title');
    const $price = $('.movelist .price');
    const $movelistul = $('.movelist ul');

    const $details = $('.details');
    const $left = $('.icoleft');
    const $right = $('.icoright');


    const $tp = $('#mediumContainer');//小图  
    const $sff = $('#magnifier');//小放
    const $uimg = $('#img_u img');//大图
    const $imgr = $('#imgright');//大放

    const $xli = $('#img_x li');
    const $zz = $('#zhezhao');
    const $u = $('#img_u');


    const $goodsnumcount = $('.goodsnum input');
    const $linkbox = $('.linkbox');
    const $btn = $('.spanAddCart');
    const $close = $('.linkbox span');

    /* 图片列表 */
    $.ajax({
        url: 'http://10.31.158.50/moonbasa/php/details.php',
        dataType: 'json',
        data: {
            picid: sid
        }
    }).done(function (oplist) {
        $tp.find('img').attr('src', oplist.url);
        $imgr.find('img').attr('src', oplist.url);
        $tp.attr('sid', oplist.sid);
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
    const $ulli = $('.movelist ul li');

    $movelistul.on('click', 'img', function (ev) {
        var ev = ev || window.event;
        let ele = ev.target || ev.srcElement;

        let imgurl = ele.parentNode.querySelector('img').src;

        $tp.find('img').attr("src", imgurl);
        $uimg.attr("src", imgurl);

    });


    //放大镜效果
    // const $tp = $('#mediumContainer');//小图  
    // const $sff = $('#magnifier');//小放
    // const $uimg = $('#img_u img');//大图
    // const $imgr = $('#imgright');//大放

    //鼠标经过小图
    $tp.hover(function () {
        $sff.show(); //sf 显示
        $imgr.show(); //bf 显示

        $(this).on('mousemove', function (ev) {
            var ev = ev || window.event;
            $sff.width($imgr.width() * $tp.width() / $uimg.width());
            $sff.height($imgr.height() * $tp.height() / $uimg.height());

            let l = ev.clientX - $details.offset().left - $sff.width() / 2;
            let t = ev.clientY - $details.offset().top - $sff.height() / 2;

            if (l < 0) {
                l = 0;
            } else if (l >= $tp.width() - $sff.width()) {
                l = $tp.width() - $sff.width();
            }

            if (t < 0) {
                t = 0;
            } else if (t >= $tp.height() - $sff.height()) {
                t = $tp.height() - $sff.height() - 8;
            }

            $sff.css('left', l);
            $sff.css('top', t);

            let bili = $uimg.width() / $tp.width();//比例=大图/小图
            $uimg.css('left', -l * bili);
            $uimg.css('top', -t * bili);
        });

    }, function () {//鼠标移出图片位置，放大镜效果消失
        $imgr.hide();
        $sff.hide();
    });


    function cookievalue() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');
            arrnum = getcookie('cookienum').split(',');
        }
    };
    // const $goodsnumcount = $('.goodsnum input');
    // const $linkbox = $('.linkbox');
    // const $btn = $('.spanAddCart');
    // const $close = $('.linkbox span');

    // 点击添加购物车按钮效果
    let arrsid = [];
    let arrnum = [];
    $btn.on('click', function () {
        cookievalue();
        let sid = window.location.search.slice(5);
        // console.log(arrsid.indexOf(sid));

        console.log($goodsnumcount.val());
        if (arrsid.indexOf(sid) === -1) {//不存在的话就存到cookie


            arrsid.push(sid);
            arrnum.push($goodsnumcount.val());
            setcookie('cookiesid', arrsid.toString(), 10);
            setcookie('cookienum', arrnum.toString(), 10);
        } else {//存在的话就把数量累计
            let sum = Number(arrnum[arrsid.indexOf(sid)]) + Number($goodsnumcount.val());
            arrnum[arrsid.indexOf(sid)] = sum;
            setcookie('cookienum', arrnum.toString(), 10);
        }

        $linkbox.show();
    });

    $close.on('click ', function () {
        $linkbox.hide();
    })
}(jQuery);

