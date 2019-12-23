//拿到购物车并且展示
function getShoppingCart() {
    $("#shoppingcart_tbody").html("");
    var userid=$("#p_userid").text();
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Shoppingcart/?owner_id="+userid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            if(result.Shoppingcart.length!=0){
                var firstcommodityid=result.Shoppingcart[0].commodity_id;
                $("#p_shoppingcart_storeid").text(firstcommodityid);
            }

            var totalprice=0;
            for(var i=0;i<result.Shoppingcart.length;i++){
                var tprice=parseInt(result.Shoppingcart[i].item_price)*parseInt(result.Shoppingcart[i].number);
                totalprice=totalprice+tprice;
                var trHTML = '<tr>'+
                    '<td>'+ result.Shoppingcart[i].commodity_id+ '</td>'+
                    '<td>'+ result.Shoppingcart[i].commodity_name+ '</td>'+
                    '<td>'+ result.Shoppingcart[i].item_price+'元'+ '</td>'+
                    '<td>'+ result.Shoppingcart[i].number+ '</td>'+
                    '<td>'+ String(tprice)+ '</td>'+
                    '<td>'+ '<a class="shoppingcart_commodity_delete" href="#"><span hidden>'+result.Shoppingcart[i].id+'</span>删除</a>'+ '</td>'+
                    '</tr>';
                $("#shoppingcart_tbody").append(trHTML);
            }
            $("#p_totalprice").text(String(totalprice));
            $("#p_totalprice").append(" 元");
        }
    });
    $("#shoppingCart").modal('show');
}

//购物车的结算
function settleAccounts(){
    var tempcommodity_id=$("#p_shoppingcart_storeid").text();
    var tempstoreid="#";
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Commodity/"+tempcommodity_id,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            tempstoreid=result.owner_id;
        }
    });
    var owner_id=$("p#p_userid").html();
    var owner_name="#";
    var phonenumber="#";
    var address="#";
    var totalprice=$("p#p_totalprice").text();
    totalprice=totalprice.slice(0,-2);
    var date=new Date();
    var starttime=String(date);
    var storename="#";
    var storeaddress="#";
    var storelon="#";
    var storelat="#";
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Store/"+tempstoreid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            storename=result.store_name;
            storeaddress=result.store_address;
            storelon=result.longitude;
            storelat=result.latitude;
        }
    });
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/User/"+owner_id,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            owner_name=result.user_name;
            phonenumber=result.phonenumber;
            address=result.user_address;
        }
    });
    var order={
        owner_id:owner_id,
        owner_name:owner_name,
        owner_phonenumber:phonenumber,
        owner_address:address,
        total_price:totalprice,
        order_state:"0",
        order_starttime:starttime,
        store_address:storeaddress,
        store_add_lon:storelon,
        store_add_lat:storelat,
        store_name:storename,
    };
    console.log(order);
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/",
        contentType: "application/json",
        type: "POST",
        async:false,
        data: JSON.stringify(order),
        success: function (result) {
            var orderdetail_id=result.id;
            var orderdetail_ownerid=result.owner_id;
            $.ajax({
                url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Shoppingcart/?owner_id="+orderdetail_ownerid,
                contentType: "application/json",
                type: "GET",
                async:false,
                success: function (result) {
                    for(var i=0;i<result.Shoppingcart.length;i++){
                        var tprice=parseInt(result.Shoppingcart[i].item_price)*parseInt(result.Shoppingcart[i].number);
                        var cid=result.Shoppingcart[i].commodity_id;
                        var cname=result.Shoppingcart[i].commodity_name;
                        var cnum=result.Shoppingcart[i].number;

                        var orderdetail={
                            order_id:orderdetail_id,
                            commodity_id:cid,
                            commodity_price: tprice,
                            number:cnum,
                            commodity_name:cname
                        };
                        console.log(orderdetail)
                        $.ajax({
                            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Orderdetail/",
                            contentType: "application/json",
                            type: "POST",
                            async:false,
                            data: JSON.stringify(orderdetail),
                            success: function (result) {
                            }
                        });
                        $.ajax({
                            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Shoppingcart/"+String(result.Shoppingcart[i].id),
                            //contentType: "application/json",
                            type: "DELETE",
                            async:false,
                            //data: JSON.stringify(user),
                            success: function (result) {
                            }
                        });
                    }
                }
            });
        }
    });
    alert("订单已发布");
    $("#p_totalprice").html("");
    $("#shoppingCart").modal('hide');
}

function deleteCommodityFromShoppingcart(commodity_id_del) {
    alert($(this).children("span").text());
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Shoppingcart/"+commodity_id_del,
        type: "DELETE",
        async:false,
        success: function (result) {
            getShoppingCart();
        }
    });
}