var network;
(function (network) {
    /**
     * 进行动画显示的画布对象
    */
    var uCanvas = document.createElement("canvas");
    var uContext = uCanvas.getContext("2d");
    var f = {
        x: null, y: null, max: 20000
    };
    /**
     * ``[width, height]``
    */
    var size = [0, 0];
    var dots = [];
    var setting;
    var frameRender;
    function getTag(tagName) {
        return document.getElementsByTagName(tagName)[0];
    }
    function getById(id) {
        return document.getElementById(id);
    }
    /**
     * 当窗口大小发生改变的时候，画布的事件
    */
    function canvasResize() {
        uCanvas.width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        uCanvas.height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        size = [uCanvas.width, uCanvas.height];
    }
    /**
     * 更新画布上面的一帧动画
    */
    function update() {
        var w = [f].concat(dots);
        uContext.clearRect(0, 0, size[0], size[1]);
        for (var _i = 0, dots_1 = dots; _i < dots_1.length; _i++) {
            var i = dots_1[_i];
            var x;
            var v, A, B, z, y;
            i.x += i.xa;
            i.y += i.ya;
            i.xa *= i.x > size[0] || i.x < 0 ? -1 : 1;
            i.ya *= i.y > size[1] || i.y < 0 ? -1 : 1;
            uContext.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x;
                    z = i.y - x.y;
                    y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z),
                        A = (x.max - y) / x.max,
                        uContext.beginPath(),
                        uContext.lineWidth = A / 2,
                        uContext.strokeStyle = "rgba(" + setting.color + ", " + (A + 0.2) + ")",
                        uContext.moveTo(i.x, i.y),
                        uContext.lineTo(x.x, x.y),
                        uContext.stroke());
                }
            }
            ;
            w.splice(w.indexOf(i), 1);
        }
        frameRender(update);
    }
    function defaultCallback(callback) {
        window.setTimeout(callback, 1000 / 45);
        return 0;
    }
    /**
     * 注册鼠标设备以及画布更新事件
    */
    function registerDevice() {
        frameRender = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            defaultCallback;
        window.onresize = canvasResize;
        window.onmousemove = function (evt) {
            evt = evt || window.event;
            f.x = evt.clientX;
            f.y = evt.clientY;
        };
        window.onmouseout = function () {
            f.x = null;
            f.y = null;
        };
    }
    /**
     * 运行这个网络画布
     *
     * @param containerId Canvas所进行显示的目标div的id编号，如果这个编号为空值，则默认显示在整个body上面
     * @param settings 配置参数
    */
    function run(containerId, settings) {
        if (containerId === void 0) { containerId = null; }
        if (settings === void 0) { settings = {
            canvasId: "canvas-network-display",
            zIndex: -1,
            opacity: 1,
            color: "0,104,183",
            n: 100
        }; }
        // 初始化画布对象以及鼠标设备
        setting = settings;
        uCanvas.id = "canvas_" + settings.canvasId;
        uCanvas.style.cssText = "position:fixed; top:0; left:0; z-index: " + settings.zIndex + "; opacity: " + settings.opacity;
        if (!containerId) {
            getTag("body").appendChild(uCanvas);
        }
        else {
            getById(containerId).appendChild(uCanvas);
        }
        canvasResize();
        registerDevice();
        // 创建指定数量的点对象
        // 位置为随机位置
        for (var p = 0; settings.n > p; p++) {
            var w = Math.random() * size[0];
            var h = Math.random() * size[1];
            var q = 2 * Math.random() - 1;
            var d = 2 * Math.random() - 1;
            dots.push({
                x: w,
                y: h,
                xa: q,
                ya: d,
                max: 10000
            });
        }
        // 启动动画的更新线程
        setTimeout(update, 100);
    }
    network.run = run;
})(network || (network = {}));
//# sourceMappingURL=dot-network.js.map