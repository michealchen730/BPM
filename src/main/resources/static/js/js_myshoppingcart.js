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
        }
    });
    $("#shoppingCart").modal('show');
}

//购物车的结算
function settleAccounts(){
    var sender_id=$("p#p_userid").html();
    var address="";
    var phonenumber="";
    var totalprice=$("p#p_totalprice").text();
    var date=new Date();
    var starttime=String(date);



    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/User/?User_id="+sender_id,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            address=result.User[0].user_address;
            phonenumber=result.User[0].phonenumber;
        }
    });
    var order={
        sender_id:sender_id,
        address:address,
        total_price:totalprice,
        order_state:"0",
        order_starttime:starttime
    };
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/",
        contentType: "application/json",
        type: "POST",
        async:false,
        data: JSON.stringify(order),
        success: function (result) {
            var orderdetail_id=result.id;
            console.log("orderdetailid:"+orderdetail_id);
            console.log("senderid:"+result.sender_id);
            $.ajax({
                url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Shoppingcart/?owner_id="+result.sender_id,
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