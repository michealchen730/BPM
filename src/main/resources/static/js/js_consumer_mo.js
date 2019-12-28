function initOrder(uid) {
    $("#tbody").html("");
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.order_state=0&Order.owner_id="+uid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            for (var i=0;i<result.Order.length;i++) {
                var trHTML = '<tr>'+
                    '<td>'+ result.Order[i].id+ '</td>'+
                    '<td>'+ result.Order[i].store_name+ '</td>'+
                    '<td>'+ result.Order[i].total_price+"元"+ '</td>'+
                    '<td>'+ result.Order[i].owner_name+ '</td>'+
                    '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                    '<td>'+ result.Order[i].owner_address+ '</td>'+
                    '<td>'+ '发布中'+ '</td>'+
                    '<td>'+ result.Order[i].order_starttime+ '</td>'+
                    '<td>'+ '订单发布中'+ '</td>'+
                    '<td>'+ '<a href="/user/cod?id='+result.Order[i].id+'\"'+'>订单修改</a>'+ '</td>'+
                    '<td>'+ '<a href="#" class="a_deleteorder"><span hidden>'+result.Order[i].id+'</span>取消</a>'+ '</td>'+
                    '</tr>';
                $("#tbody").append(trHTML);
            }
        }
    });
}

function cancelOrder(DOM,uid) {
    var oid=$(DOM).children("span").text();
    var order2cancel;
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/"+oid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            order2cancel=result;
        }
    });
    order2cancel.order_state="3";
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/"+oid,
        contentType: "application/json",
        type: "PUT",
        async:false,
        data: JSON.stringify(order2cancel),
        success: function (result) {
            alert("订单取消成功");
            initOrder(uid);
        }
    });

}


function changeOrderState(DOM,uid){
    var state=$(DOM).children('option:selected').val();
    if(state==="发布中"){
        initOrder(uid);
    }else if (state==="已接单"){
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.order_state=1&Order.owner_id="+uid,
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].store_name+ '</td>'+
                        '<td>'+ result.Order[i].total_price+"元"+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '已接单'+ '</td>'+
                        '<td>'+ result.Order[i].order_starttime+ '</td>'+
                        '<td>'+ '订单进行中'+ '</td>'+
                        '<td>'+ '<a href="#">确认收货</a>'+ '</td>'+
                        '<td>'+ '<a href="#">取消</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });
    }else if(state==="已完成"){
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.sender_id="+uid+"&Order.order_state=2",
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].store_name+ '</td>'+
                        '<td>'+ result.Order[i].total_price+"元"+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '已接单'+ '</td>'+
                        '<td>'+ result.Order[i].order_starttime+ '</td>'+
                        '<td>'+ '订单进行中'+ '</td>'+
                        '<td>'+ '<a href="#">操作</a>'+ '</td>'+
                        '<td>'+ '<a href="#">取消</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });

    }else{
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.owner_id="+uid+"&Order.order_state=3",
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].store_name+ '</td>'+
                        '<td>'+ result.Order[i].total_price+"元"+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '已取消'+ '</td>'+
                        '<td>'+ result.Order[i].order_starttime+ '</td>'+
                        '<td>'+ '订单已取消'+ '</td>'+
                        '<td>'+ '<a href="#">操作</a>'+ '</td>'+
                        '<td>'+ '<a href="#">取消</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });
    }
}