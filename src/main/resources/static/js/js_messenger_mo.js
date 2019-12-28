function getMyOrder(uid) {
    $("#tbody").html("");
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.order_state=1&Order.sender_id="+uid,
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            for (var i=0;i<result.Order.length;i++) {
                var trHTML = '<tr>'+
                    '<td><div class="checkbox"><label><input type="checkbox"></label></div></td>'+
                    '<td>'+ result.Order[i].id+ '</td>'+
                    '<td>'+ result.Order[i].total_price+ '</td>'+
                    '<td>'+ result.Order[i].owner_name+ '</td>'+
                    '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                    '<td>'+ result.Order[i].store_address+ '</td>'+
                    '<td>'+ result.Order[i].owner_address+ '</td>'+
                    '<td>'+ '<a href="#">详情</a>'+ '</td>'+
                    '<td>'+ '<a class="jiedan" ><span hidden>'+result.Order[i].id+'</span>接单</a>'+ '</td>'+
                    '</tr>';
                $("#tbody").append(trHTML);
            }
        }
    });
}
function changeOrderState(DOM){
    var state=$(DOM).children('option:selected').val();
    if(state==="未接单"){
        $("#lujingguihua").attr("style", "display:none;");
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.order_state=0",
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                console.log(result);
                for (var i=0;i<result.Order.length;i++) {
                    if (result.Order[i].owner_id===$("#p_userid").text()){
                    }else{
                        var trHTML = '<tr><td><div class="checkbox"><label><input type="checkbox"></label></div></td>'+
                            '<td>'+ result.Order[i].id+ '</td>'+
                            '<td>'+ result.Order[i].total_price+ '</td>'+
                            '<td>'+ result.Order[i].owner_name+ '</td>'+
                            '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                            '<td>'+ result.Order[i].store_address+ '</td>'+
                            '<td>'+ result.Order[i].owner_address+ '</td>'+
                            '<td>'+ '<a href="#">详情</a>'+ '</td>'+
                            '<td>'+ '<a class="jiedan" href="#"><span hidden>'+result.Order[i].id+'</span>接单</a>'+ '</td>'+
                            '</tr>';
                        $("#tbody").append(trHTML);
                    }
                }
            }
        });
    }else if (state==="已接单"){
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.order_state=1&Order.sender_id="+uid,
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td><div class="checkbox"><label><input type="checkbox"></div></td>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].total_price+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].store_address+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '<a href="#">详情</a>'+ '</td>'+
                        '<td>'+ '<a class="jiedan" href="#" disabled><span hidden>'+result.Order[i].id+'</span>接单</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });
    }else if(state==="已完成"){
        $("#lujingguihua").attr("style", "display:none;");
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.sender_id="+uid+"&Order.order_state=2",
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].total_price+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].store_address+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '<a href="#">详情</a>'+ '</td>'+
                        '<td>'+ '<a class="jiedan" href="/user/mmo"><span hidden>'+result.Order[i].id+'</span>接单</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });

    }else{
        $("#lujingguihua").attr("style", "display:none;");
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/?Order.sender_id="+uid+"&Order.order_state=3",
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                for (var i=0;i<result.Order.length;i++) {
                    var trHTML = '<tr>'+
                        '<td>'+ result.Order[i].id+ '</td>'+
                        '<td>'+ result.Order[i].total_price+ '</td>'+
                        '<td>'+ result.Order[i].owner_name+ '</td>'+
                        '<td>'+ result.Order[i].owner_phonenumber+ '</td>'+
                        '<td>'+ result.Order[i].store_address+ '</td>'+
                        '<td>'+ result.Order[i].owner_address+ '</td>'+
                        '<td>'+ '<a href="#">详情</a>'+ '</td>'+
                        '<td>'+ '<a class="jiedan" href="#"><span hidden>'+result.Order[i].id+'</span>接单</a>'+ '</td>'+
                        '</tr>';
                    $("#tbody").append(trHTML);
                }
            }
        });
    }
}
function acceptOrder(DOM,uid) {
    var a_class=$(DOM).attr("class");
    var jiedan_id=$(DOM).children("span").text();
    var sendername=$("p#p_username").text();
    if(a_class==="jiedan") {
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/"+jiedan_id,
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                result.order_state="1";
                result.sender_id=uid;
                result.sender_name=sendername;
                $.ajax({
                    url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Order/"+jiedan_id,
                    contentType: "application/json",
                    type: "PUT",
                    async:false,
                    data: JSON.stringify(result),
                    success: function (result) {
                        alert("接单成功");
                    }
                })
            }
        })
    }

}