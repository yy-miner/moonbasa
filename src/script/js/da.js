; !function () {

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
    //1.获取商品列表页传来的id
    let sid = location.search.substring(1).split('=')[1];
    const spic = document.querySelector('.spic');
    const bpic = document.querySelector('.bpic');
    const sf = document.querySelector('.sf');
    const bf = document.querySelector('.bf');
    const title = document.querySelector('.title');
    const price = document.querySelector('.price');
    const movelistUl = document.querySelector('.movelist ul');
    const details = document.querySelector('.details');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    const btn = document.querySelector('.goodsnum button');
    const goodsnumcount = document.querySelector('.goodsnum input');
    const linkbox = document.querySelector('.linkbox');
    const close = document.querySelector('.linkbox span');
    const closeA = document.querySelectorAll('.linkbox a');

    close.onclick = closeA[1].onclick = function () {
        linkbox.style.display = 'none';
    }

    ajax({
        url: 'http://localhost/JS-NO.2/YY/shoppingcar/php/details.php',
        data: {
            picid: sid
        },
        dataType: 'json',
        success: function (objdata) {
            //1.拼接放大镜图片等信息
            spic.querySelector('img').src = objdata.url;
            spic.querySelector('img').setAttribute('sid', objdata.picid);
            bpic.src = objdata.url;
            title.innerHTML = objdata.title;
            price.innerHTML = objdata.price;
            //拼接小图列表。
            let ullist = objdata.imgurls.split(',');
            let lihtml = '';
            for (let i = 0; i < ullist.length; i++) {
                lihtml += '<li><img src="' + ullist[i] + '"></li>';
            }
            movelistUl.innerHTML = lihtml;
            console.log(ullist);
        }
    });
    //实现放大镜效果
    spic.onmouseover = function () {
        sf.style.visibility = 'visible';
        bf.style.visibility = 'visible';
        //求宽高。
        sf.style.width = spic.offsetWidth * bf.offsetWidth / bpic.offsetWidth + 'px';
        sf.style.height = spic.offsetHeight * bf.offsetHeight / bpic.offsetHeight + 'px';

        //求比例
        let bili = bpic.offsetWidth / spic.offsetWidth;

        this.onmousemove = function (ev) {
            var ev = ev || window.event;
            let l = ev.clientX - details.offsetLeft - sf.offsetWidth / 2;
            let t = ev.clientY - details.offsetTop - sf.offsetHeight / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= spic.offsetWidth - sf.offsetWidth - 2) {
                l = spic.offsetWidth - sf.offsetWidth - 2;
            }

            if (t < 0) {
                t = 0;
            } else if (t >= spic.offsetHeight - sf.offsetHeight - 2) {
                t = spic.offsetHeight - sf.offsetHeight - 2;
            }


            sf.style.left = l + 'px';
            sf.style.top = t + 'px';

            bpic.style.left = -l * bili + 'px';
            bpic.style.top = -t * bili + 'px';
        }
    };
    spic.onmouseout = function () {
        sf.style.visibility = 'hidden';
        bf.style.visibility = 'hidden';
    };
    //事件委托给li添加事件
    movelistUl.onmouseover = function (ev) {
        var ev = ev || window.event;
        let ele = ev.target || ev.srcElement;

        if (ele.parentNode.nodeName == 'LI') {
            let imgurl = ele.parentNode.querySelector('img').src;
            spic.querySelector('img').src = imgurl;
            bpic.src = imgurl;
        }
    }
    //给ullist左右箭头添加点击事件。
    let num = 5;//默认显示小图的张数。
    right.onclick = function () {
        let icolist = movelistUl.querySelectorAll('li');//li的长度
        let liwidth = icolist[0].offsetWidth + 5;//1个li的宽度
        if (icolist.length > num) {//如果当前li列表的长度>5,后面还有图片。
            num++;
            left.style.color = '#333';

            if (num == icolist.length) {
                right.style.color = '#fff';
            }

            buffermove(movelistUl, { left: -(num - 5) * liwidth });
        }

    };
    left.onclick = function () {
        let icolist = movelistUl.querySelectorAll('li');//li的长度
        let liwidth = icolist[0].offsetWidth + 5;//1个li的宽度
        if (num > 5) {
            num--;
            right.style.color = '#333';
            if (num == 5) {
                left.style.color = '#fff';
            }
            buffermove(movelistUl, { left: -(num - 5) * liwidth });
        }

    }

    //购物车的操作
    let arrsid = [];  //商品的编号sid [1,3,5]
    let arrnum = [];  //商品的数量 [12,24,36]

    //如果cookie存在，获取cookie的值，并转换成数组。
    function cookievalue() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');//将获取的cookie转换成数组
            arrnum = getcookie('cookienum').split(',');
        }
    }




    btn.onclick = function () {
        //确定按钮是第一次还是多次。
        //先获取cookie的值,而且是一个数组。
        cookievalue();
        //当前按钮对应得sid，如果当前按钮对应得sid存在arrsid中，存在
        let sid = spic.querySelector('img').getAttribute('sid');//当前页面的sid
        if (arrsid.indexOf(sid) === -1) {//不存在
            arrsid.push(sid);
            arrnum.push(goodsnumcount.value);
            setcookie('cookiesid', arrsid.toString(), 10);
            setcookie('cookienum', arrnum.toString(), 10);
        } else {//存在，数量累计
            let sum = Number(arrnum[arrsid.indexOf(sid)]) + Number(goodsnumcount.value);//获取累加的值
            arrnum[arrsid.indexOf(sid)] = sum;
            setcookie('cookienum', arrnum.toString(), 10);
        }

        linkbox.style.display = 'block';
    };
}();