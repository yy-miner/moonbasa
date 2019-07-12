$(function () {

    const $itemlist = $('.buygoods');
    // const $ = $('');
    // const $ = $('');
    // const $ = $('');
    // const $ = $('');

    //购物车商品渲染
    $.ajax({
        url: 'http://10.31.158.50/moonbasa/php/optimization.php',
        dataType: 'json',

    }).done(function (oplist) {
        let goodshtml = '';
        let arrsid = getcookie('cookiesid').split(',');
        let arrnum = getcookie('cookienum').split(',');

        $.each(arrsid, function (i, v) {

            $.each(oplist, function (index, value) {

                if (value.picid == v) {
                    goodshtml += `
                    <div class="nr ">
                        <dl class="top">
                            <dt>
                                <input class="chkalls carbtn selector" name="J_checkboxs" type="checkbox" checked="checked">
                            </dt>
                            <dd class="sp">
                                <span class="left">
                                    <a href=""><img src="${value.url}"  width="39" height="53"></a>
                                </span>
                                <span class="right">
                                    <span class="spmc">
                                        <a href="" class="goods-link" target="_blank">${value.title}</a>
                                    </span>
                                </span>
                            </dd>
                            <dd class="dj">
                                <p class="danjia">
                                    ￥<span class="price-icon price">${value.price}</span>
                                </p>
                            </dd>
                            <dd class="sl clearfix">
                                <a href="" class="J_minus minus">-</a>
                                <input class="J_num num mytext" type="text" value="${arrnum[i]}">
                                <a href="" class="J_add add more">+</a>
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
        $itemlist.html(goodshtml);



        const $carbtn = $("dt .carbtn"); //单选
        const $checkall = $(".checkall"); //全选
        const $more = $(".more");
        const $minus = $(".minus");
        const $delete = $(".delete");
        const $priceall = $(".priceall");


        //点击商品选项

        $carbtn.on('click', function () {
            if ($(this).is(":checked")) { //选中
                $(this).attr("checked", true);
                let checked_l = $carbtn.prop("checked", true).size();
                let catbtn_l = $carbtn.size();

                if (catbtn_l == checked_l) {
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
            //let $numtext = $('$(this).parent().find(".mytext")')
            //let newval = $numtext.val();

            let newval = $(this).parent().find(".mytext").val();
            newval++;

            console.log()
            getcookie(cookienum)



            $(this).parent().find(".mytext").val(newval);
            // $(this).parent().find(".carbtn").prop("checked", true);

            //定义单个商品总价
            danjia = $(this).parent().siblings(".dj").find(".price").text();
            let int = newval * danjia;
            $(this).parent().siblings(".jexj").find(".price").text(int);



            let checked_l = $carbtn.prop("checked", true).size();
            let catbtn_l = $carbtn.size();
            if (catbtn_l == checked_l) {
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
});