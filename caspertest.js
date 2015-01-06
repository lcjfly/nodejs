var casper = require('casper').create();
var password = casper.cli.args[0];

casper.start('http://svw/', function() {
    this.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
});

//captureScreen('svw_login.png');

// 登陆页面
casper.then(function() {
    this.sendKeys('input#username', '');
    this.sendKeys('input#password', password);
});
//captureScreen('svw_index_filled.png');
mouseClick(556, 332);

// 主页
casper.waitForSelector('#id_td_menu_homepage');
//captureScreen('svw_index.png');
mouseClick(622, 77);

// 应用中心
casper.waitForSelector('.layoutColumn');
//captureScreen('svw_app.png');
mouseClick(930, 370);

// 考勤系统弹出页
casper.waitForPopup('http://svw.csvw.com/skqjct/skq/jsp/index.jsp', function() {
    //this.test.assertEquals(this.popups.length, 1);
});
casper.withPopup('http://svw.csvw.com/skqjct/skq/jsp/index.jsp', function() {
    this.viewport(1366, 768);
    //captureScreen('svw_kaoqin.png');

    // 截屏考勤信息
    mouseClick(63, 169);
    
    captureScreen('svw_kaoqin_menu.png');
    mouseClick(58, 190);
    casper.withFrame(2, function() {
        this.waitForSelector('input[name="Submit"]');
        //captureScreen('svw_kaoqin_menu2.png');
        mouseClick(170, 295);
        this.waitForText('Excel');
        captureScreen('svw_kaoqin_result.png');
         //this.echo(this.getHTML());
    });
   
});

// ========截屏========
function captureScreen(filename) {
    casper.then(function() {
        this.capture(filename, {
            top: 0,
            left: 0,
            width: 1366,
            height: 768
        });
    });
}

// ========鼠标点击========
function mouseClick(x, y) {
    casper.then(function() {
        this.mouse.click(x, y); 
    });
}

casper.run();
casper.viewport(1366, 768);
