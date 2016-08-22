//微信JSSDK加载 Ver:1.1
var _hmt = _hmt || [];
var url = encodeURIComponent(location.href.split('#')[0]);
(function () {
    var s = document.getElementsByTagName("script")[0];
    ////百度
    //var hm = document.createElement("script");
    //hm.src = "//hm.baidu.com/hm.js?12fcce98c7347fcbde16912a914ee283";
    //s.parentNode.insertBefore(hm, s);

    //WX
    var wxjs = document.createElement("script");
    wxjs.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
    s.parentNode.insertBefore(wxjs, s);

    window.wxconfig = {};
    window.wxshareData = {
        title: "面试指南",
        desc: "原来传说中的面试套路指南是真的!",
        link: "http://campaign.maestro.com.cn/interview_teaser_t/index.html",
        imgUrl: "http://campaign.maestro.com.cn/interview_teaser_t/images/show.png",
        success: function () {            
            _hmt.push(['_trackPageview', '/WxShare']);
        }
    };
    
    $.ajax({
        type: "Get",
        url: "http://dev.maestro.com.cn/campaign/api/wechat/share.php?url="+url,
        dataType: "JSONP",
        data: {},
        timeout: 20000,
        success: function (data, textStatus) {
            wxconfig = eval(data);
                wx.config({
                    debug: true,
                    appId: wxconfig.appId,
                    timestamp: wxconfig.timestamp,
                    nonceStr: wxconfig.nonceStr,
                    signature: wxconfig.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });

                wx.ready(function () {
                    wx.onMenuShareTimeline(wxshareData);
                    wx.onMenuShareAppMessage(wxshareData);
                });
                wx.error(function (res) {

                });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            mError(status + textStatus + "；" + errorThrown);
        }
    });
})();