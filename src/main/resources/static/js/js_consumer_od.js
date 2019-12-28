function initOrderItems(oid) {
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Orderdetail/?Orderdetail.order_id="+oid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            for(var i=0;i<result.Orderdetail.length;i++){
                var trHTML = '<tr>'+
                    '<td>'+ result.Orderdetail[i].order_id+ '</td>'+
                    '<td>'+ result.Orderdetail[i].commodity_name+ '</td>'+
                    '<td>'+ result.Orderdetail[i].number+ '</td>'+
                    '<td>'+ result.Orderdetail[i].commodity_price+ '</td>'+
                    '</tr>';
                $("#tbody").append(trHTML);
            }
        }
    });
}

function getOrderInfo(oid) {
    var o2u;
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/"+oid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            o2u=result;
            $("#ownerName").val(result.owner_name);
            $("#orderId").val(result.id);
            $("#phonenumber").val(result.owner_phonenumber);
            $("#userAddress").val(result.owner_address);
            $("#totalPrice").val(result.total_price);
            $("#storeName").val(result.store_name);
        }
    });
    return o2u;
}