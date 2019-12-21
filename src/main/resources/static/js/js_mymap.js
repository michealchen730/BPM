//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    initStoreLocation();//将所有商店的位置都标注在地图上
    addMapControl();//向地图添加控件
}


//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(121.448583, 31.028823);//定义一个中心点坐标

    map.centerAndZoom(point, 18);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

function initStoreLocation() {
    $.ajax({
        url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Store/",
        contentType: "application/json",
        type: "GET",
        async:false,
        success: function (result) {
            for(var i=0;i<result.Store.length;i++){
                var lon= parseFloat(result.Store[i].longitude);
                var lat= parseFloat(result.Store[i].latitude);
                var str= String(result.Store[i].id);
                addMarker(lon,lat,str);
            }
        }
    });
}

function addMarker(lon,lat,str) {
    var marker = new BMap.Marker(new BMap.Point(lon, lat));
    marker.setTitle(str);
    marker.addEventListener("click", function(){
        var sid=marker.getTitle();
        $.ajax({
            url: "http://118.31.76.154:8080/Entity/U338ffb3af9551/BPM_H2H/Store/"+sid,
            contentType: "application/json",
            type: "GET",
            async:false,
            success: function (result) {
                $("#myModalLabel").html(result.store_name);
                $("#p_address").html(result.store_address);
                $("#p_store_desc").html(result.description);
                $("#2GoodsBrowse").attr("href","/user/consumer_cb?id="+result.id);
            }
        });
        $('#myModal').modal('show');
    });
    map.addOverlay(marker);
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
    var marker = new BMap.Marker(new BMap.Point(121.448583, 31.028823));
    marker.addEventListener("click", function(){
        alert("点击标注");
    });
    map.addOverlay(marker);
}



