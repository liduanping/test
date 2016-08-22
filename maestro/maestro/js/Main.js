var gameLayer, uiLayer, bgLayer, gmocbg, stage;
var cWidth = 640, cHeight = 1028;
var allImages = {};
var spriteSheet = null;
var p_s, r1_s, r2_s, r3_s, r4_s = null;

var sourceurl = "";
var worning = null;
var bgm;

initGame = function () {
    stage = new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);

    gameLayer = new createjs.Container();
    uiLayer = new createjs.Container();
    bgLayer = new createjs.Container();

    worning = new createjs.Text("数据请求中，请稍后....", "35px 黑体", "#fffa11");
    worning.x = (cWidth - strlen(worning.text) * 16) * 0.5;
    worning.y = cHeight * 0.5;

    gmocbg = new createjs.Shape();
    gmocbg.graphics.beginFill('#000000').rect(0, 0, cWidth, cHeight).endFill();
    gmocbg.alpha = 0.85;

    var loadingLayer = new createjs.Container();
    stage.addChild(loadingLayer, bgLayer, gameLayer, uiLayer);
    var mf = [
        //{id:"music", src: "music.mp3"}
    ];
    createjs.Sound.alternateExtensions = ["mp3"];
    var soundload = new createjs.LoadQueue(true, sourceurl + "audio/");
    soundload.installPlugin(createjs.Sound);
    soundload.loadManifest(mf);
    soundload.addEventListener("complete", function (e) {
        console.log("声音加载完成");
        //bgm = createjs.Sound.play("music", {loop: -1, volume: 0.8});
    });
    var manifest = [
        {src: "p.json", id: "3", name: "p_s", type: "spritesheet"},
        {src: "r1.json", id: "3", name: "r1_s", type: "spritesheet"},
        {src: "r2.json", id: "3", name: "r2_s", type: "spritesheet"},
        {src: "r3.json", id: "3", name: "r3_s", type: "spritesheet"},
        {src: "r4.json", id: "3", name: "r4_s", type: "spritesheet"},
        {src: "menu_bg.png", id: "3", name: "menu_bg"},
        {src: "menu_tip.png", id: "3", name: "menu_tip"},
        {src: "game_bg.jpg", id: "3", name: "game_bg"},
        {src: "end_bg.jpg", id: "3", name: "end_bg"},
        {src: "p.png", id: "3", name: "p_p"},
        {src: "menu_biaoti.png", id: "3", name: "menu_biaoti"},

        {src: "offer_bg1.png", id: "3", name: "offer_bg1"},
        {src: "offer_bg2.png", id: "3", name: "offer_bg2"},
        {src: "offer_btn.png", id: "3", name: "offer_btn"},
        {src: "end_btn.png", id: "3", name: "end_btn"},
        {src: "end_guang_down.png", id: "3", name: "end_guang_down"},
        {src: "end_guang_up.png", id: "3", name: "end_guang_up"},
        {src: "offer_bg_tile.png", id: "3", name: "offer_bg_tile"},
        {src: "menu_bt.png", id: "3", name: "menu_bt"}

    ];
    var loandinManifest = [
        {src: "loading_bg.png", id: "5", name: "loading_bg"},
        {src: "loading_text.png", id: "5", name: "loading_text"},
        {src: "l.png", id: "5", name: "sprite_l"}
    ];
    var loadingLoad = new createjs.LoadQueue(true);
    loadingLoad.loadManifest(loandinManifest, true, sourceurl + "images/");
    var loading_text,loadingBg = null;
    var fanshu, tt;
    tt = new createjs.Text("0%", "28px 黑体", "#fff");
    /////////////////// loading加载完成后开始进行相关资源下载
    loadingLoad.on("complete", function (e) {
        window.setTimeout(function () {
            preload.loadManifest(manifest, true, sourceurl + "images/");
        }, 100);
        loading_text.x = (cWidth - loading_text.getBounds().width) * 0.5 -30;
        loading_text.y = tt.y;
        loadingLayer.addChild(loadingBg, fanshu, tt,loading_text);

    });
    loadingLoad.on("fileload", function (e) {
        if (e.item.name == "loading_text") {
            loading_text = new createjs.Bitmap(e.result);
        } else if (e.item.name == "loading_bg") {
            loadingBg = new createjs.Bitmap(e.result);
        } else if (e.item.name == "sprite_l") {
            var lSheet = new createjs.SpriteSheet({
                framerate: 6,
                "images": [e.result],
                "frames": [
                    [2, 2, 119, 98],
                    [123, 2, 119, 98],
                    [244, 2, 119, 98],
                    [365, 2, 119, 98],
                    [486, 2, 119, 98],
                    [607, 2, 119, 98],
                    [728, 2, 119, 98]
                ],
                "animations": {
                    "run": [0, 6, "run"]
                }
            });
            fanshu = new createjs.Sprite(lSheet, "run");
            fanshu.x = (cWidth - fanshu.getBounds().width ) * 0.5;
            fanshu.y = cHeight * 0.5 - fanshu.getBounds().height * 0.8;
            tt.x = (cWidth - strlen(tt.text) * 14 * tt.scaleX ) * 0.5;
            tt.y = fanshu.y + fanshu.getBounds().height + 30;
        }
    });

    //加载图片资源文件
    var preload = new createjs.LoadQueue(true);
    preload.on("fileload", handleFileLoad);
    preload.on("complete", handleComplete);
    preload.on("progress", handleProgress);
    function handleFileLoad(event) {
        var o = {name: event.item.name, src: event.result, id: event.item.id, w: event.width, h: event.height};
        if (o.name == "p_s") {
            p_s = event.result;
        } else if (o.name == "r1_s") {
            r1_s = event.result;
        }
        else if (o.name == "r2_s") {
            r2_s = event.result;
        }
        else if (o.name == "r3_s") {
            r3_s = event.result;
        }
        else if (o.name == "r4_s") {
            r4_s = event.result;
        } else {
            allImages[event.item.name] = o;
        }

    }

    function handleProgress(event) {
        var p = Math.floor(event.loaded * 100);
        tt.text = "" + p + "%";
        tt.x = loading_text.x +loading_text.getBounds().width + 15;
        tt.y = fanshu.y + fanshu.getBounds().height + 30;
    }

    function handleComplete(event) {
        stage.removeChild(loadingLayer);
        game();
        createjs.Ticker.removeEventListener("tick", tick);
    }

    createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
        stage.update(event);
    }
};

game = function () {
    gameLayer.removeAllChildren();
    uiLayer.removeAllChildren();
    bgLayer.removeAllChildren();
    var menu_bg = new createjs.Bitmap(allImages["menu_bg"].src);
    var game_bg = new createjs.Bitmap(allImages["game_bg"].src);
    var menu_biaoti = new createjs.Bitmap(allImages["menu_biaoti"].src);
    menu_biaoti.x = (cWidth - menu_biaoti.getBounds().width) * 0.5;
    menu_biaoti.y = 50;//(cHeight - menu_biaoti.getBounds().height) * 0.5;
    var menu_tip = new createjs.Bitmap(allImages["menu_tip"].src);
    menu_tip.x = (cWidth - menu_tip.getBounds().width) * 0.5;
    menu_tip.y = cHeight*0.65 ;
    var menu_bt = new createjs.Bitmap(allImages["menu_bt"].src);
    menu_bt.x = (cWidth - menu_bt.getBounds().width) * 0.5;
    menu_bt.y = menu_tip.y + menu_tip.getBounds().height * 1.1;
    menu_bt.id=5;

    var bt_arr2 = [];
    var menu_panel = new createjs.Container();
    var bt1 = createPPBt("p_1_s", "p_1", p_s);
    var bt2 = createPPBt("p_2_s", "p_2", p_s);
    var bt3 = createPPBt("p_3_s", "p_3", p_s);
    var bt4 = createPPBt("p_4_s", "p_4", p_s);

    bt1.bt.x = cWidth - (bt1.bt.getBounds().width) * .8;
    bt1.bt.y = cHeight - bt1.bt.getBounds().height * 0.29;
    bt1.bt.id = 2;
    bt2.bt.x = cWidth - bt2.bt.getBounds().width * 0.3;
    bt2.bt.y = cHeight - bt2.bt.getBounds().height * 0.28;
    bt2.bt.id=1;
    bt3.bt.x = bt3.bt.getBounds().width * .35;
    bt3.bt.y = cHeight - bt3.bt.getBounds().height * 0.25;
    bt3.bt.id=3;
    bt4.bt.x = cWidth * 0.45;
    bt4.bt.y = cHeight - bt4.bt.getBounds().height * 0.3;
    bt4.bt.id = 0;
    bt_arr2.push( bt2, bt1,bt4, bt3);
    menu_panel.addChild(bt1.bt, bt2.bt, bt3.bt, bt4.bt);
    bt1.bt.addEventListener("pressup", moveUp);
    bt2.bt.addEventListener("pressup", moveUp);
    bt3.bt.addEventListener("pressup", moveUp);
    bt4.bt.addEventListener("pressup", moveUp);
    menu_bt.addEventListener("pressup", moveUp);
    gameLayer.addChild(menu_bg, menu_panel, menu_biaoti, menu_bt,menu_tip);
    ga('set', 'page', 'home');
    ga('send', 'pageview');
    var m = 0;
    var currentS=0;
    var in_id = window.setInterval(function () {
        currentS = m;
        bt_arr2[m - 1 < 0 ? 3 : m - 1].hideShardow();
        bt_arr2[m].showShardow();
        menu_panel.addChild(bt_arr2[m].bt);
        m = m >= 3 ? 0 : (m + 1);
        //console.log(m);
    }, 1000);

    function createPPBt(showdowN, btN, sheetN) {
        var o = {
            showShardow: function () {
                s.alpha = 1;
                ns.alpha = 0;
            },
            hideShardow: function () {
                s.alpha = 0;
                ns.alpha = 1;
            }
        }
        var bt = new createjs.Container();
        var s = new createjs.Sprite(sheetN, showdowN);
        s.regX = s.getBounds().width * 0.5;
        s.regY = s.getBounds().height * 0.5;
        s.alpha = 0;
        var ns = new createjs.Sprite(sheetN, btN);
        ns.regX = ns.getBounds().width * 0.5;
        ns.regY = ns.getBounds().height * 0.5;
        bt.addEventListener("mousedown", function () {
            s.alpha = 1;
            ns.alpha = 0;
        })
        bt.addEventListener("pressup", function () {
            s.alpha = 0;
            ns.alpha = 1;
        })
        bt.addChild(s, ns);
        o["bt"] = bt;
        return o;
    }

    function moveUp(e) {
        clearInterval(in_id);
        gameLayer.removeAllChildren();
        gameLayer.addChild(game_bg);
        gameLayer.addChild(Ct);
        //showOffer();
        //endPanel();
        //return;

        var id = e.currentTarget.id;
        if(id==5)
        {
            ga('send', 'event', 'button', 'click', 'startgame');
        }
        id = id!=5 ? id:(currentS);
        switch (id)
        {
            case 0:
                ga('set', 'page', 'animation_man1');
                showPepol1();
                break;
            case 1:
                ga('set', 'page', 'animation_woman3');
                showPepol3();
                break;
            case 2:
                ga('set', 'page', 'animation_women4');
                showPepol2();
                break;
            case 3:
                ga('set', 'page', 'animation_man2');
                showPepol4();
                break;
        }
        ga('send', 'pageview');
        ga('send', 'event', 'button', 'slide', 'homepage_select');
    }

    function createS(str, s_sheet) {
        return new createjs.Sprite(s_sheet, str);
    }

    function createB(str) {
        return new createjs.Bitmap(allImages[str].src);
    }

    var Ct = new createjs.Container();

    function showPepol1() {
        var r1_p1x = createS("r1_p1x", r1_s);
        var r1_p1p = createS("r1_p1p", r1_s);
        r1_p1x.x = 150;
        r1_p1x.y = 384;
        createjs.Tween.get(r1_p1x, {loop: true, override: true})
            .to({alpha: 0}, 600, createjs.Ease.backOut)
            .to({alpha: 1}, 600, createjs.Ease.backOut);
        step1();
        function step1() {
            var r1_p1p = createS("r1_p1p", r1_s);
            r1_p1p.x = 436
            r1_p1p.y = 120;
            r1_p1p.alpha = 0;
            var r1_p1d = createS("r1_p1d", r1_s);
            r1_p1d.regX = r1_p1d.getBounds().width *0.5;
            r1_p1d.regY = r1_p1d.getBounds().height *0.5;
            r1_p1d.x = 120;
            r1_p1d.y = 220;
            createjs.Tween.get(r1_p1d, {override: true})
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 5}, 800, createjs.Ease.linear)
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 0}, 800, createjs.Ease.linear);
            var r1_p1r = createS("r1_p1r", r1_s);
            r1_p1r.y = cHeight - r1_p1r.getBounds().height;
            r1_p1r.alpha = 0;
            createjs.Tween.get(r1_p1r, {override: true})
                .to({alpha: 1}, 2000, createjs.Ease.linear)
                .wait(800)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step2();
                });
            var r1_p1s = createS("r1_p1s", r1_s);
            r1_p1s.x = 526;
            r1_p1s.y = cHeight;
            createjs.Tween.get(r1_p1s, {override: true})
                .to({y: 546}, 1000, createjs.Ease.backOut);
            var r1_p1t = createS("r1_p1t", r1_s);
            r1_p1t.x = cWidth + r1_p1t.getBounds().width;
            r1_p1t.y = 50;
            createjs.Tween.get(r1_p1t, {override: true})
                .to({x: 246}, 1000, createjs.Ease.linear)
                .call(function()
                {
                    createjs.Tween.get(r1_p1p, {override: true})
                        .to({alpha: 1}, 800, createjs.Ease.linear)
                });

            r1_p1x.x = 150;
            r1_p1x.y = 384;
            createjs.Tween.get(r1_p1x, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);

            var r1_p1y1 = createS("r1_p1y1", r1_s);
            r1_p1y1.x = cWidth + r1_p1y1.getBounds().width;
            r1_p1y1.y = 300;
            var r1_p1y2 = createS("r1_p1y2", r1_s);
            r1_p1y2.x = -r1_p1y2.getBounds().width;
            r1_p1y2.y = 436;
            createjs.Tween.get(r1_p1y2, {override: true})
                .to({x: 10}, 1000, createjs.Ease.backOut);
            Ct.addChild(r1_p1p, r1_p1d, r1_p1r, r1_p1s, r1_p1t, r1_p1x, r1_p1y1, r1_p1y2);
        }

        function step2() {
            Ct.removeAllChildren();
            var r1_p2p = createS("r1_p2p", r1_s);
            r1_p2p.x = 522;
            r1_p2p.y = 12;
            var r1_p2t = createS("r1_p2t", r1_s);
            r1_p2t.x = 228;
            r1_p2t.y = -120;
            createjs.Tween.get(r1_p2t, {override: true})
                .to({y: 36}, 1000, createjs.Ease.backOut);
            var r1_p2c = createS("r1_p2c", r1_s);
            r1_p2c.regX = r1_p2c.getBounds().width * 0.5;
            r1_p2c.regY = r1_p2c.getBounds().height * 0.5;
            r1_p2c.x = 70;
            r1_p2c.y = 600;
            r1_p2c.rotation = 45;
            createjs.Tween.get(r1_p2c, {override: true})
                .to({rotation: 0}, 600, createjs.Ease.linear);
            var r1_p2d = createS("r1_p2d", r1_s);
            r1_p2d.x =-138;
            r1_p2d.y =100;
            createjs.Tween.get(r1_p2d, {override: true})
                .to({x: 15}, 800, createjs.Ease.linear)
            var r1_p2e = createS("r1_p2e", r1_s);
            r1_p2e.x = cWidth + r1_p2e.getBounds().width;
            r1_p2e.y = 864;
            createjs.Tween.get(r1_p2e, {override: true})
                .to({x: 480}, 1000, createjs.Ease.backOut);
            var r1_p2f = createS("r1_p2f", r1_s);
            r1_p2f.x = cWidth + r1_p2f.getBounds().width;
            r1_p2f.y = 270;
            createjs.Tween.get(r1_p2f, {override: true})
                .to({x: 514}, 1000, createjs.Ease.backOut);

            var r1_p2r = createS("r1_p2r", r1_s);
            r1_p2r.y = cHeight - r1_p2r.getBounds().height;
            r1_p2r.alpha = 0;
            createjs.Tween.get(r1_p2r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear)
                .wait(1500)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step3();
                });

            Ct.addChild(r1_p2c, r1_p2d, r1_p2p, r1_p2e, r1_p2f, r1_p2r, r1_p2t, r1_p1x);
        }

        function step3() {
            Ct.removeAllChildren();
            r1_p1p.x = 488;
            r1_p1p.y = 106;
            r1_p1p.alpha =0;
            createjs.Tween.get(r1_p1p, { override: true})
                .to({alpha:1}, 1500, createjs.Ease.linear);
            var r1_p3$ = createS("r1_p3$", r1_s);
            r1_p3$.x = 520;
            r1_p3$.y = 750;
            r1_p3$.scaleX = r1_p3$.scaleY = 0;
            createjs.Tween.get(r1_p3$, {override: true})
                .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.backOut);
            var r1_p3d = createS("r1_p3d", r1_s);
            r1_p3d.x =  162;
            r1_p3d.regX = r1_p3d.getBounds().width *0.5;
            r1_p3d.regY = r1_p3d.getBounds().height *0.5;
            r1_p3d.y = 210;
            r1_p3d.scaleX = r1_p3d.scaleY = 0.6;
            createjs.Tween.get(r1_p3d, {override: true})
                .to({scaleX: 1,scaleY:1,rotation:30}, 1000, createjs.Ease.linear)
                .to({scaleX: 0.7,scaleY:0.5,rotation:0}, 1000, createjs.Ease.linear)
                .to({scaleX: .6,scaleY:.7,rotation:10}, 1000, createjs.Ease.linear)
                .to({scaleX: .8,scaleY:.8,rotation:0}, 1000, createjs.Ease.linear);
            var r1_p3f = createS("r1_p3f", r1_s);
            r1_p3f.x = -r1_p3f.getBounds().width;
            r1_p3f.y = 360;
            createjs.Tween.get(r1_p3f, {override: true})
                .to({x: 0}, 1000, createjs.Ease.backOut);

            var r1_p3n = createS("r1_p3n", r1_s);
            r1_p3n.x = 10;
            r1_p3n.y = 885;
            r1_p3n.alpha = 0;
            createjs.Tween.get(r1_p3n, {loop: true, override: true})
                .to({alpha: 1}, 1000, createjs.Ease.backOut)
                .to({alpha: 0}, 1000, createjs.Ease.backOut);
            var r1_p3r = createS("r1_p3r", r1_s);
            r1_p3r.y = cHeight - r1_p3r.getBounds().height;
            r1_p3r.alpha = 0;
            createjs.Tween.get(r1_p3r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.backOut)
                .wait(2300)
                .call(function()
                {
                    Ct.removeAllChildren();
                    showOffer();
                });
            var r1_p3t = createS("r1_p3t", r1_s);
            r1_p3t.x = cWidth +264;
            r1_p3t.y = 55;
            createjs.Tween.get(r1_p3t, {override: true})
                .to({x: 264}, 1000, createjs.Ease.backOut);
            Ct.addChild(r1_p3$, r1_p3d, r1_p3f, r1_p3n, r1_p3r, r1_p3t, r1_p1x, r1_p1p)
        }
    }

    function showPepol2() {
        step1();
        function step1() {
            var r2_p1d = createS("r2_p1d", r2_s);
            r2_p1d.regX = r2_p1d.getBounds().width *0.5;
            r2_p1d.regY = r2_p1d.getBounds().height *0.5;
            r2_p1d.x = 120;
            r2_p1d.y = 220;
            createjs.Tween.get(r2_p1d, {override: true})
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 5}, 800, createjs.Ease.linear)
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 0}, 800, createjs.Ease.linear);
            var r2_p1f = createS("r2_p1f", r2_s);
            r2_p1f.x = 526;
            r2_p1f.y = 524;
            r2_p1f.alpha = 0;
            createjs.Tween.get(r2_p1f, {override: true})
                .to({alpha: 1}, 1500, createjs.Ease.linear);
            var r2_p1m = createS("r2_p1m", r2_s);
            r2_p1m.x =358;
            r2_p1m.y = 288;
            r2_p1m.scaleX = r2_p1m.scaleY=0.8;
            createjs.Tween.get(r2_p1m, {loop:true,override: true})
                .to({scaleX: 1,scaleY:1}, 1000, createjs.Ease.backOut)
                .to({scaleX: 0.8,scaleY:0.8}, 1000, createjs.Ease.backOut);
            var r2_p1n = createS("r2_p1n", r2_s);
            r2_p1n.x = -500;
            r2_p1n.y = 812;
            createjs.Tween.get(r2_p1n, {override: true})
                .to({x: 5}, 800, createjs.Ease.backOut)
            var r2_p1p = createS("r2_p1p", r2_s);
            r2_p1p.x = 488;
            r2_p1p.y = 188;
            r2_p1p.alpha = 0;
            var r2_p1r = createS("r2_p1r", r2_s);
            r2_p1r.y = cHeight - r2_p1r.getBounds().height;
            r2_p1r.alpha = 0;
            createjs.Tween.get(r2_p1r, {override: true})
                .to({alpha: 1}, 2000, createjs.Ease.linear)
                .wait(800)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step2();
                });
            var r2_p1s = createS("r2_p1s", r2_s);
            r2_p1s.x = 182;
            r2_p1s.y = 476;
            createjs.Tween.get(r2_p1s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r2_p1t = createS("r2_p1t", r2_s);
            r2_p1t.x = cWidth + r2_p1t.getBounds().width;
            r2_p1t.y = 46;
            createjs.Tween.get(r2_p1t, {override: true})
                .to({x: 230}, 1000, createjs.Ease.linear)
                .call(function()
                {
                    createjs.Tween.get(r2_p1p, {override: true})
                        .to({alpha: 1}, 800, createjs.Ease.linear)
                });
            Ct.addChild(r2_p1d,r2_p1f,r2_p1m,r2_p1n,r2_p1p,r2_p1r,r2_p1s,r2_p1t);
        }

        function step2() {
            var r2_p2c = createS("r2_p2c", r2_s);
            r2_p2c.x = 18;
            r2_p2c.y = 955;
            r2_p2c.regY = r2_p2c.getBounds().height;
            r2_p2c.rotation = 45;
            r2_p2c.alpha = 0;
            createjs.Tween.get(r2_p2c, {override: true})
                .to({rotation: 0,alpha:1}, 1000, createjs.Ease.backInOut);
            var r2_p2d = createS("r2_p2d", r2_s);
            r2_p2d.x =-138;
            r2_p2d.y =104;
            createjs.Tween.get(r2_p2d, {override: true})
                .to({x: 38}, 800, createjs.Ease.linear)
            var r2_p2j = createS("r2_p2j", r2_s);
            r2_p2j.x=520;
            r2_p2j.y=406;
            r2_p2j.alpha = 0;
            createjs.Tween.get(r2_p2j, {override: true})
                .to({alpha:1,y:506}, 1500, createjs.Ease.linear);
            var r2_p2o = createS("r2_p2o", r2_s);
            r2_p2o.x = 412;
            r2_p2o.y = 298;
            r2_p2o.alpha = 0;
            createjs.Tween.get(r2_p2o, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear);
            var r2_p2p = createS("r2_p2p", r2_s);
            r2_p2p.x = cWidth + r2_p2p.getBounds().width;
            r2_p2p.y =118;
            createjs.Tween.get(r2_p2p, {override: true})
                .to({x: 502}, 600, createjs.Ease.backOut)
            var r2_p2r = createS("r2_p2r", r2_s);
            r2_p2r.y = cHeight - r2_p2r.getBounds().height;
            r2_p2r.alpha = 0;
            createjs.Tween.get(r2_p2r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear)
                .wait(1500)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step3();
                });
            var r2_p2s = createS("r2_p2s", r2_s);
            r2_p2s.x = 134;
            r2_p2s.y =433;
            createjs.Tween.get(r2_p2s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r2_p2t = createS("r2_p2t", r2_s);
            r2_p2t.x = 262;
            r2_p2t.y = -138;
            createjs.Tween.get(r2_p2t, { override: true})
                .to({y: 38}, 1000, createjs.Ease.backOut);
            Ct.addChild(r2_p2c,r2_p2d,r2_p2j,r2_p2o,r2_p2p,r2_p2r,r2_p2s,r2_p2t);
        }

        function step3() {
            var r2_p3d = createS("r2_p3d", r2_s);
            r2_p3d.x =  162;
            r2_p3d.regX = r2_p3d.getBounds().width *0.5;
            r2_p3d.regY = r2_p3d.getBounds().height *0.5;
            r2_p3d.y = 210;
            r2_p3d.scaleX = r2_p3d.scaleY = 0.6;
            createjs.Tween.get(r2_p3d, {override: true})
                .to({scaleX: 1,scaleY:1,rotation:30}, 1000, createjs.Ease.linear)
                .to({scaleX: 0.7,scaleY:0.5,rotation:0}, 1000, createjs.Ease.linear)
                .to({scaleX: .6,scaleY:.7,rotation:10}, 1000, createjs.Ease.linear)
                .to({scaleX: .8,scaleY:.8,rotation:0}, 1000, createjs.Ease.linear);
            var r2_p3f = createS("r2_p3f", r2_s);
            r2_p3f.x = cWidth - r2_p3f.getBounds().width;
            r2_p3f.y =294;
            r2_p3f.alpha = 0;
            createjs.Tween.get(r2_p3f, { override: true})
                .to({alpha:1}, 1000, createjs.Ease.linear)
                .to({alpha:0.5}, 1000, createjs.Ease.linear)
                .to({alpha:0}, 1000, createjs.Ease.linear)
                .to({alpha:1}, 1000, createjs.Ease.linear);
            var r2_p3j = createS("r2_p3j", r2_s);
            r2_p3j.x = 32;
            r2_p3j.y = 818;
            r2_p3j.regY = r2_p3j.getBounds().height;
            r2_p3j.alpha=0;
            createjs.Tween.get(r2_p3j, { override: true})
                .to({y: 918,alpha:1}, 1000, createjs.Ease.linear);
            var r2_p3o = createS("r2_p3o", r2_s);
            r2_p3o.x = cWidth +438;
            r2_p3o.y = 646;
            r2_p3o.alpha = 0;
            createjs.Tween.get(r2_p3o, { override: true})
                .to({x: 438,alpha:1}, 1000, createjs.Ease.backOut);
            var r2_p3p = createS("r2_p3p", r2_s);
            r2_p3p.x = 524;
            r2_p3p.y = 12;
            r2_p3p.alpha =0;
            createjs.Tween.get(r2_p3p, { override: true})
                .to({alpha:1}, 1500, createjs.Ease.linear);
            var r2_p3r = createS("r2_p3r", r2_s);
            r2_p3r.y = cHeight - r2_p3r.getBounds().height;
            r2_p3r.alpha = 0;
            createjs.Tween.get(r2_p3r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.backOut)
                .wait(2300)
                .call(function()
                {
                    Ct.removeAllChildren();
                    showOffer();
                });

            var r2_p3s = createS("r2_p3s", r2_s);
            r2_p3s.x = 126;
            r2_p3s.y =312;
            createjs.Tween.get(r2_p3s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r2_p3t = createS("r2_p3t", r2_s);
            r2_p3t.x = cWidth + 236;
            r2_p3t.y = 34;
            createjs.Tween.get(r2_p3t, {override: true})
                .to({x: 236}, 1000, createjs.Ease.backOut);
            Ct.addChild(r2_p3d, r2_p3f, r2_p3j, r2_p3o, r2_p3p, r2_p3r, r2_p3s, r2_p3t)
        }
    }

    function showPepol3() {
        step1();
        function step1() {
            var r3_p1b = createS("r3_p1b", r3_s);
            r3_p1b.x =40;
            r3_p1b.y = 370;
            r3_p1b.alpha = 0;
            createjs.Tween.get(r3_p1b, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear)
            var r3_p1d = createS("r3_p1d", r3_s);
            r3_p1d.regX = r3_p1d.getBounds().width *0.5;
            r3_p1d.regY = r3_p1d.getBounds().height *0.5;
            r3_p1d.x = 120;
            r3_p1d.y = 220;
            createjs.Tween.get(r3_p1d, {override: true})
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 5}, 800, createjs.Ease.linear)
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 0}, 800, createjs.Ease.linear);
            var r3_p1e = createS("r3_p1e", r3_s);
            r3_p1e.x = -100;
            r3_p1e.y = 818;
            createjs.Tween.get(r3_p1e, {override: true})
                .to({x: 36}, 1000, createjs.Ease.backOut);
            var r3_p1g = createS("r3_p1g", r3_s);
            r3_p1g.x =422;
            r3_p1g.y = 392;
            r3_p1g.alpha = 0;
            createjs.Tween.get(r3_p1g, {override: true})
                .to({y: 292,alpha:1}, 1000, createjs.Ease.linear);

            var r3_p1i = createS("r3_p1i", r3_s);
            r3_p1i.x = 516;
            r3_p1i.y = 24;
            r3_p1i.alpha = 0;
            var r3_p1r = createS("r3_p1r", r3_s);
            r3_p1r.y = cHeight - r3_p1r.getBounds().height;
            r3_p1r.alpha = 0;
            createjs.Tween.get(r3_p1r, {override: true})
                .to({alpha: 1}, 2000, createjs.Ease.linear)
                .wait(800)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step2();
                });
            var r3_p1s = createS("r3_p1s", r3_s);
            r3_p1s.x = 104;
            r3_p1s.y = 410;
            createjs.Tween.get(r3_p1s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r3_p1t = createS("r3_p1t", r3_s);
            r3_p1t.x = cWidth + r3_p1t.getBounds().width;
            r3_p1t.y = 46;
            createjs.Tween.get(r3_p1t, {override: true})
                .to({x: 230}, 1000, createjs.Ease.linear)
                .call(function()
                {
                    createjs.Tween.get(r3_p1i, {override: true})
                        .to({alpha: 1}, 800, createjs.Ease.linear)
                });
            Ct.addChild(r3_p1b,r3_p1d,r3_p1e, r3_p1g, r3_p1i, r3_p1r, r3_p1s, r3_p1t )

        }

        function step2() {
            var r3_p2a = createS("r3_p2a", r3_s);
            r3_p2a.x = 468;
            r3_p2a.y = 232;
            r3_p2a.alpha = 0;
            createjs.Tween.get(r3_p2a, {override: true})
                .to({y: 332,alpha:1}, 800, createjs.Ease.linear)
                .to({alpha:0.5}, 800, createjs.Ease.linear)
                .to({alpha:1}, 800, createjs.Ease.linear)
            var r3_p2d = createS("r3_p2d", r3_s);
            r3_p2d.x =-138;
            r3_p2d.y =104;
            createjs.Tween.get(r3_p2d, {override: true})
                .to({x: 10}, 800, createjs.Ease.linear)
            var r3_p2i = createS("r3_p2i", r3_s);
            r3_p2i.x = cWidth + r3_p2i.getBounds().width;
            r3_p2i.y =14;
            createjs.Tween.get(r3_p2i, {override: true})
                .to({x: 522}, 600, createjs.Ease.backOut);

            var r3_p2j = createS("r3_p2j", r3_s);
            r3_p2j.x = 90;
            r3_p2j.y = 670;
            var r3_p2r = createS("r3_p2r", r3_s);
            r3_p2r.y = cHeight - r3_p2r.getBounds().height;
            r3_p2r.alpha = 0;
            createjs.Tween.get(r3_p2r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear)
                .wait(1500)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step3();
                });
            var r3_p2s = createS("r3_p2s", r3_s);
            r3_p2s.x = 190;
            r3_p2s.y = 462;
            createjs.Tween.get(r3_p2s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r3_p2t = createS("r3_p2t", r3_s);
            r3_p2t.x = 234;
            r3_p2t.y = -138;
            createjs.Tween.get(r3_p2t, { override: true})
                .to({y: 38}, 1000, createjs.Ease.backOut);
            var r3_p2w = createS("r3_p2w", r3_s);
            r3_p2w.x = -220;
            r3_p2w.y = 290;
            createjs.Tween.get(r3_p2w, { override: true})
                .to({x: 20}, 800, createjs.Ease.backOut)
                .to({alpha: 0.5}, 800, createjs.Ease.linear)
                .to({alpha: 1}, 800, createjs.Ease.linear);
            Ct.addChild(r3_p2a, r3_p2d, r3_p2i, r3_p2r, r3_p2s, r3_p2t, r3_p2w,r3_p2j )
        }

        function step3() {
            var r3_p3d = createS("r3_p3d", r3_s);
            r3_p3d.x =  132;
            r3_p3d.regX = r3_p3d.getBounds().width *0.5;
            r3_p3d.regY = r3_p3d.getBounds().height *0.5;
            r3_p3d.y = 218;
            r3_p3d.scaleX = r3_p3d.scaleY = 0.6;
            createjs.Tween.get(r3_p3d, {override: true})
                .to({scaleX: 1,scaleY:1,rotation:30}, 1000, createjs.Ease.linear)
                .to({scaleX: 0.7,scaleY:0.5,rotation:0}, 1000, createjs.Ease.linear)
                .to({scaleX: .6,scaleY:.7,rotation:10}, 1000, createjs.Ease.linear)
                .to({scaleX: .8,scaleY:.8,rotation:0}, 1000, createjs.Ease.linear);
            var r3_p3f = createS("r3_p3f", r3_s);
            r3_p3f.x = cWidth - r3_p3f.getBounds().width;
            r3_p3f.y =294;
            r3_p3f.alpha = 0;
            createjs.Tween.get(r3_p3f, { override: true})
                .to({alpha:1}, 1000, createjs.Ease.linear)
                .to({alpha:0.5}, 1000, createjs.Ease.linear)
                .to({alpha:0}, 1000, createjs.Ease.linear)
                .to({alpha:1}, 1000, createjs.Ease.linear);
            var r3_p3g = createS("r3_p3g", r3_s);
            r3_p3g.x = 512;
            r3_p3g.y = 484;
            r3_p3g.regY = r3_p3g.getBounds().height;
            r3_p3g.alpha=0;
            createjs.Tween.get(r3_p3g, { override: true})
                .to({y: 674,alpha:1}, 1000, createjs.Ease.linear);
            var r3_p3i = createS("r3_p3i", r3_s);
            r3_p3i.x = 538;
            r3_p3i.y = 32;
            r3_p3i.alpha =0;
            createjs.Tween.get(r3_p3i, { override: true})
                .to({alpha:1}, 1500, createjs.Ease.linear);
            var r3_p3n = createS("r3_p3n", r3_s);
            r3_p3n.x = 60;
            r3_p3n.y = 858;
            r3_p3n.alpha =0;
            createjs.Tween.get(r3_p3n, { override: true})
                .to({alpha:1}, 1500, createjs.Ease.linear);
            var r3_p3r = createS("r3_p3r", r3_s);
            r3_p3r.y = cHeight - r3_p3r.getBounds().height;
            r3_p3r.alpha = 0;
            createjs.Tween.get(r3_p3r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.backOut)
                .wait(2300)
                .call(function()
                {
                    Ct.removeAllChildren();
                    showOffer();
                });
            var r3_p3s = createS("r3_p3s", r3_s);
            r3_p3s.x = 100;
            r3_p3s.y =440;
            createjs.Tween.get(r3_p3s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r3_p3t = createS("r3_p3t", r3_s);
            r3_p3t.x = cWidth + 236;
            r3_p3t.y = 50;
            createjs.Tween.get(r3_p3t, {override: true})
                .to({x: 210}, 1000, createjs.Ease.backOut);
            Ct.addChild(r3_p3d, r3_p3f, r3_p3g, r3_p3i, r3_p3n, r3_p3r, r3_p3s, r3_p3t)
        }
    }

    function showPepol4() {
        step1();
        function step1() {
            var r4_p1$ = createS("r4_p1$", r4_s);
            r4_p1$.x = -500;
            r4_p1$.y = 882;
            createjs.Tween.get(r4_p1$, {override: true})
                .to({x: 20}, 800, createjs.Ease.backOut)
            var r4_p1b = createS("r4_p1b", r4_s);
            r4_p1b.x = -32;
            r4_p1b.y = 422;
            createjs.Tween.get(r4_p1b, {override: true})
                .to({x: 32}, 800, createjs.Ease.backOut)
            var r4_p1d = createS("r4_p1d", r4_s);
            r4_p1d.regX = r4_p1d.getBounds().width *0.5;
            r4_p1d.regY = r4_p1d.getBounds().height *0.5;
            r4_p1d.x = 120;
            r4_p1d.y = 220;
            createjs.Tween.get(r4_p1d, {override: true})
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 5}, 800, createjs.Ease.linear)
                .to({rotation: 10}, 800, createjs.Ease.linear)
                .to({rotation: 0}, 800, createjs.Ease.linear);
            var r4_p1p = createS("r4_p1p", r4_s);
            r4_p1p.x = 502;
            r4_p1p.y = 114;
            r4_p1p.alpha = 0;
            var r4_p1r = createS("r4_p1r", r4_s);
            r4_p1r.y = cHeight - r4_p1r.getBounds().height;
            r4_p1r.alpha = 0;
            createjs.Tween.get(r4_p1r, {override: true})
                .to({alpha: 1}, 2000, createjs.Ease.linear)
                .wait(800)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step2();
                });
            var r4_p2s = createS("r4_p2s", r4_s);
            r4_p2s.x = 164;
            r4_p2s.y =394;
            createjs.Tween.get(r4_p2s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r4_p1t = createS("r4_p1t", r4_s);
            r4_p1t.x = cWidth + r4_p1t.getBounds().width;
            r4_p1t.y = 44;
            createjs.Tween.get(r4_p1t, {override: true})
                .to({x: 236}, 1000, createjs.Ease.linear)
                .call(function()
                {
                    createjs.Tween.get(r4_p1p, {override: true})
                        .to({alpha: 1}, 800, createjs.Ease.linear)
                });
            var r4_p1w = createS("r4_p1w", r4_s);
            r4_p1w.x =cWidth-r4_p1w.getBounds().width;
            r4_p1w.y = 288;
            r4_p1w.scaleX = r4_p1w.scaleY=0.8;
            createjs.Tween.get(r4_p1w, {override: true})
                .to({scaleX: 1,scaleY:1}, 1000, createjs.Ease.backOut)
                .to({scaleX: 0.8,scaleY:0.8}, 1000, createjs.Ease.backOut)
                .to({scaleX: 1,scaleY:1}, 1000, createjs.Ease.backOut);
            Ct.addChild( r4_p1$, r4_p1b, r4_p1d, r4_p1p, r4_p1r, r4_p1t,r4_p2s, r4_p1w)
        }

        function step2() {
            var r4_p2b = createS("r4_p2b", r4_s);
            r4_p2b.x = 402;
            r4_p2b.y = 1000;
            r4_p2b.regY = r4_p2b.getBounds().height;
            //r4_p2b.rotation = 45;
            r4_p2b.alpha = 0;
            createjs.Tween.get(r4_p2b, {override: true})
                .to({alpha:1}, 1000, createjs.Ease.backInOut);
            var r4_p2d = createS("r4_p2d", r4_s);
            r4_p2d.x =-138;
            r4_p2d.y =104;
            createjs.Tween.get(r4_p2d, {override: true})
                .to({x: 10}, 800, createjs.Ease.linear)
            var r4_p2e = createS("r4_p2e", r4_s);
            r4_p2e.x = 18;
            r4_p2e.y = 508;
            r4_p2e.regY = r4_p2e.getBounds().height;
            r4_p2e.rotation = 45;
            r4_p2e.alpha = 0;
            createjs.Tween.get(r4_p2e, {override: true})
                .to({rotation: 0,alpha:1}, 1000, createjs.Ease.backInOut);
            var r4_p2l = createS("r4_p2l", r4_s);
            r4_p2l.x = 360;
            r4_p2l.y = 284;
            r4_p2l.alpha = 0;
            createjs.Tween.get(r4_p2l, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear);
            var r4_p2p = createS("r4_p2p", r4_s);
            r4_p2p.x = cWidth + r4_p2p.getBounds().width;
            r4_p2p.y =112;
            createjs.Tween.get(r4_p2p, {override: true})
                .to({x: 522}, 600, createjs.Ease.backOut)
            var r4_p2r = createS("r4_p2r", r4_s);
            r4_p2r.y = cHeight - r4_p2r.getBounds().height;
            r4_p2r.alpha = 0;
            createjs.Tween.get(r4_p2r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.linear)
                .wait(1500)
                .call(function()
                {
                    Ct.removeAllChildren();
                    step3();
                });
            var r4_p2s = createS("r4_p2s", r4_s);
            r4_p2s.x = 138;
            r4_p2s.y =386;
            createjs.Tween.get(r4_p2s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r4_p2t = createS("r4_p2t", r4_s);
            r4_p2t.x = 240;
            r4_p2t.y = -138;
            createjs.Tween.get(r4_p2t, { override: true})
                .to({y: 50}, 1000, createjs.Ease.backOut);
            Ct.addChild(r4_p2b, r4_p2d, r4_p2e, r4_p2l, r4_p2p, r4_p2r, r4_p2s, r4_p2t)
        }

        function step3() {
            var r4_p3c = createS("r4_p3c", r4_s);
            r4_p3c.x = -438;
            r4_p3c.y = 468;
            r4_p3c.alpha = 0;
            createjs.Tween.get(r4_p3c, { override: true})
                .to({x: 0,alpha:1}, 1000, createjs.Ease.backOut);
            var r4_p3d = createS("r4_p3d", r4_s);
            r4_p3d.x =  162;
            r4_p3d.regX = r4_p3d.getBounds().width *0.5;
            r4_p3d.regY = r4_p3d.getBounds().height *0.5;
            r4_p3d.y = 210;
            r4_p3d.scaleX = r4_p3d.scaleY = 0.6;
            createjs.Tween.get(r4_p3d, {override: true})
                .to({scaleX: 1,scaleY:1,rotation:30}, 1000, createjs.Ease.linear)
                .to({scaleX: 0.7,scaleY:0.5,rotation:0}, 1000, createjs.Ease.linear)
                .to({scaleX: .6,scaleY:.7,rotation:10}, 1000, createjs.Ease.linear)
                .to({scaleX: .8,scaleY:.8,rotation:0}, 1000, createjs.Ease.linear);
            var r4_p3j = createS("r4_p3j", r4_s);
            r4_p3j.x = 450;
            r4_p3j.y = 918;
            r4_p3j.regY = r4_p3j.getBounds().height;
            r4_p3j.alpha=0;
            createjs.Tween.get(r4_p3j, { override: true})
                .to({y: 992,alpha:1}, 600, createjs.Ease.linear);
            var r4_p3p = createS("r4_p3p", r4_s);
            r4_p3p.x = 526;
            r4_p3p.y = 34;
            r4_p3p.alpha =0;
            createjs.Tween.get(r4_p3p, { override: true})
                .to({alpha:1}, 1500, createjs.Ease.linear);
            var r4_p3r = createS("r4_p3r", r4_s);
            r4_p3r.y = cHeight - r4_p3r.getBounds().height;
            r4_p3r.x = cWidth - r4_p3r.getBounds().width;
            r4_p3r.alpha = 0;
            createjs.Tween.get(r4_p3r, {override: true})
                .to({alpha: 1}, 1000, createjs.Ease.backOut)
                .wait(2300)
                .call(function()
                {
                    Ct.removeAllChildren();
                    showOffer();
                });
            var r4_p2s = createS("r4_p2s", r4_s);
            r4_p2s.x = 158;
            r4_p2s.y =410;
            createjs.Tween.get(r4_p2s, {loop: true, override: true})
                .to({alpha: 0}, 600, createjs.Ease.backOut)
                .to({alpha: 1}, 600, createjs.Ease.backOut);
            var r4_p3t = createS("r4_p3t", r4_s);
            r4_p3t.x = cWidth + 236;
            r4_p3t.y = 50;
            createjs.Tween.get(r4_p3t, {override: true})
                .to({x: 240}, 1000, createjs.Ease.backOut);
            Ct.addChild(r4_p3c, r4_p3d, r4_p3j, r4_p3p, r4_p3r, r4_p3t,r4_p2s)
        }
    }

    function showOffer() {
        ga('set', 'page', 'offer');
        ga('send', 'pageview');
        //gameLayer.removeAllChildren();
        var offer_bg_tile = createB("offer_bg_tile");
        offer_bg_tile.x = (cWidth - offer_bg_tile.getBounds().width) *0.5;
        offer_bg_tile.alpha = 1;
        var offer_bg1 = createB("offer_bg1");
        offer_bg1.alpha = 0.5;

        offer_bg1.x = (cWidth - offer_bg1.getBounds().width) * 0.5;
        offer_bg1.y = offer_bg_tile.getBounds().height + 30;
        createjs.Tween.get(offer_bg1, {override: true})
            .to({alpha: 1}, 100, createjs.Ease.linear)
            .call(function(){
                callbackq();
            });
        var offer_bg2 = createB("offer_bg2");
        offer_bg2.x = (cWidth - offer_bg2.getBounds().width) * 0.5;
        offer_bg2.y = offer_bg_tile.getBounds().height +30;
        offer_bg2.alpha = 0;
        var offer_btn = createB("offer_btn");
        offer_btn.x = -offer_btn.getBounds().width;
        offer_btn.y = cHeight - offer_btn.getBounds().height * 1.5;
        offer_btn.addEventListener("mousedown", function () {
            Ct.removeAllChildren();

            ga('send', 'event', 'button', 'slide', 'goto_end');

            endPanel();
        })
        function callbackq()
        {
            createjs.Tween.get(offer_bg1, {override: true})
                .wait(300)
                .to({y: cHeight*.5,alpha:0}, 800, createjs.Ease.linear);
            createjs.Tween.get(offer_bg2, {override: true})
                .wait(1000)
                .to({alpha: 1}, 800, createjs.Ease.linear)
                .call(function () {
                    createjs.Tween.get(offer_btn, {override: true})
                        .to({x: (cWidth - offer_btn.getBounds().width ) * 0.5}, 1000, createjs.Ease.backOut);
                });
        }


        Ct.addChild(offer_bg1, offer_bg2, offer_btn,offer_bg_tile);
    }

    function endPanel() {
        ga('set', 'page', 'end');
        ga('send', 'pageview');
        var end_bg = createB("end_bg");
        var end_btn = createB("end_btn");
        end_btn.x = (cWidth - end_btn.getBounds().width) * 0.5;
        end_btn.y = cHeight - end_btn.getBounds().height * 1.5;
        end_btn.addEventListener("mousedown", function () {
            ga('send', 'event', 'button', 'click', 'ecommerce_weipinhui');
            window.location.href = "http://sale.jd.com/m/act/Y1tvfLTKpQnSc8z.html";
        })
        var end_guang_down = createB("end_guang_down");
        end_guang_down.regY = 133;
        end_guang_down.regX =232;
        end_guang_down.x = 0;
        end_guang_down.y = end_btn.y + end_btn.getBounds().height - 5;
        var end_guang_up = createB("end_guang_up");
        end_guang_up.y = end_btn.y + 5;
        end_guang_up.x = cWidth;
        end_guang_up.regY = 190;
        end_guang_up.regX = end_guang_up.getBounds().width*0.5;

        createjs.Tween.get(end_guang_up, {loop: true, override: true})
            .to({x: 0}, 2000, createjs.Ease.linear)
            .to({x: cWidth}, 2000, createjs.Ease.linear);
        createjs.Tween.get(end_guang_down, {loop: true, override: true})
            .to({x: cWidth}, 2000, createjs.Ease.linear)
            .to({x: 0}, 2000, createjs.Ease.linear);
        Ct.addChild(end_bg, end_btn, end_guang_down, end_guang_up);
    }

    createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
        stage.update(event);
    }
};

var swapItems = function (arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};
function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function getAngle(px1, py1, px2, py2) {

    var diff_x = px2 - px1;
    var diff_y = py2 - py1;
    //返回角度,不是弧度
    return 180 / Math.PI * Math.atan2((diff_y), (diff_x)) + 90;
}
isMobile = function (str) {
    return RegExp(/^1[3|4|5|8]\d{9}$/).test(str);
};
isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
function strlen(str) {
    if (!str) {
        return;
    }
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString());
}
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}
function onResize() {
    var scale = window.innerHeight / cHeight;
    var scaleX = window.innerWidth / cWidth;
    $("#panel").css({
        transform: 'scale(' + scaleX + ',' + scale + ')'
    }).css({marginLeft: (window.innerWidth - cWidth) * 0.5});
    $('body,html').css({
        'height': cHeight * scale + 'px',
        'overflow': 'hidden'
    });
}
