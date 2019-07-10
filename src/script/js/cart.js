$(function () {
    const $carbtn = $(".carbtn");
    const $checkall = $(".checkall");
    const $more = $(".more");
    const $minus = $(".minus");
    const $delete = $(".delete");
    const $priceall = $(".priceall");
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