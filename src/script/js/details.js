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


}(jQuery);