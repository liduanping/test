function mAlert(Msg, url) {
    layer.closeAll();
    if (url != null && url != 'undefined' && url.length > 0) {
        layer.open({
            content: Msg,
            btn: ['确认'],
            shadeClose: false,
            yes: function () {
                location.href = url;
            }
        });
    }
    else {
        layer.open({ content: Msg, time: 5 });
    }
}

function mAlertClose(Msg) {
    layer.closeAll();
    layer.open({
        content: Msg,
        btn: ['关闭'],
        shadeClose: false,
        yes: function () {
            location.href = location.href;
        }
    });

}


function mError(Msg) {

    layer.closeAll();
    layer.open({
        content: Msg,
        style: 'background-color:#F05133; color:#fff;',
        time: 5
    });
}
function mLoading() {
    layer.closeAll();
    layer.open({ type: 2, shadeClose: false });
}

function mClose(){
    layer.closeAll();
}

