$(function () {

    const $carbtn = $(".carbtn"); //单选
    const $checkall = $(".checkall"); //全选
    const $more = $(".more");
    const $minus = $(".minus");
    const $delete = $(".delete");
    const $priceall = $(".priceall");


    const $itemlist = $('.buygoods');
    // const $ = $('');
    // const $ = $('');
    // const $ = $('');
    // const $ = $('');

    //购物车商品渲染
    $.ajax({
        url: 'http://10.31.158.50/moonbasa/php/details.php',
        dataType: 'json',
        data: {
            picid: sid
        }
    }).done(function (oplist) {
        let $goodshtml = '';
        let sid = getcookie('cookiesid').split(',');
        let num = getcookie('cookienum').split(',');
        $.each(function () {
            $.each(oplist, function (index, value) {
                if (oplist.picid == sid) {
                    goodshtml += `
                    <div class="nr ">
                        <dl class="top">
                            <dt>
                                <input class="chkalls carbtn" name="J_checkboxs" type="checkbox" checked="checked">
                            </dt>
                            <dd class="sp">
                                <span class="left">
                                    <a href=""><img src="${oplist.url}"  width="39" height="53"></a>
                                </span>
                                <span class="right">
                                    <span class="spmc">
                                        <a href="" class="goods-link" target="_blank">${oplist.title}</a>
                                    </span>
                                </span>
                            </dd>
                            <dd class="dj">
                                <p class="danjia">
                                    ￥<span class="price-icon price">${oplist.price}</span>
                                </p>
                            </dd>
                            <dd class="sl clearfix">
                                <a href="javascript:void(0)" class="J_minus minus">-</a>
                                <input class="J_num num mytext" type="text" value="${num}" data-qty="1">
                                <a href="javascript:void(0)" class="J_add add more">+</a>
                            </dd>
                            <dd class="jexj"> ￥<span class="price-icon price">131</span></dd>
                            <dd class="cz">
                                <span class="J_del operation delete"> × </span>
                            </dd>
                        </dl>
                    </div>
                    `;
                }
            });
        })
        $itemlist.html(goodshtml);//追加数据
    })

});








//点击商品选项
$carbtn.on('click', function () {
    if ($(this).is(":checked")) { //选中
        $(this).attr("checked", true);
        let checked_length = $("$carbtn:checked").size();
        let catbtn_length = $carbtn.size();
        if (catbtn_length == checked_length) {
            $checkall.find("input").prop("checked", true);
            setprice();
        }
        setprice();
    } else {  //没选中
        $(this).attr("checked", false);
        $checkall.find("input").prop("checked", false);
        setprice();
    }
});
//点击全选
$checkall.on('click', function () {
    if ($(this).find("input").is(":checked")) {
        $("input").prop("checked", true);
        setprice();
    } else {
        $("input").prop("checked", false);
        setprice();
    }
});

//点击数量的＋号
$more.on('click', function () {
    let newval = $(this).parent().find(".mytext").val();
    newval++;
    $(this).parent().find(".mytext").val(newval);
    $(this).parent().find(".carbtn").prop("checked", true);
    danjia = $(this).parent().siblings(".dj").find(".price").text();

    //定义单个商品总价
    let int = newval * danjia;
    $(this).parent().siblings(".jexj").find(".price").text(int);
    let checked_length = $("input[class='carbtn']:checked").size();
    let catbtn_length = $carbtn.size();
    if (catbtn_length == checked_length) {
        $checkall.find("input").prop("checked", true);
    }
    setprice();
});

//点击数量的－号
$minus.on('click', function () {
    let newval = $(this).parent().find(".mytext").val();
    newval--;
    if (newval < 1) { return false; }

    newprice = newval * danjia;
    $(this).parent().find(".mytext").val(newval);
    $(this).parent().siblings(".jexj").find(".price").text(newprice);
    setprice();
});

//点击移除按钮
$delete.on('click', function () {
    $(this).parent().parent().hide();
    if ($(this).parent().find("input").is(":checked")) {
        let price = $(this).siblings(".price").text();
        let allprice = $priceall.text();
        $priceall.text(allprice - price);
    }
});


function setprice() {
    let chushiint = 0;
    $carbtn.each(function () {
        if ($(this).is(":checked")) {
            let xzprice = parseInt($(this).parent().siblings(".jexj").find(".price").text());
            chushiint += xzprice;
        }
    });
    $priceall.text(chushiint);
};
})