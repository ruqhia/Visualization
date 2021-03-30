"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@antv/util");
var constant_1 = require("../../constant");
var dependents_1 = require("../../dependents");
var bbox_1 = require("../../util/bbox");
var direction_1 = require("../../util/direction");
var helper_1 = require("../../util/helper");
var base_1 = require("./base");
/**
 * @ignore
 * slider Controller
 */
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(view) {
        var _this = _super.call(this, view) || this;
        /**
         * 滑块滑动的时候出发
         * @param v
         */
        _this.onValueChanged = function (v) {
            var min = v[0], max = v[1];
            _this.updateMinMaxText(min, max);
            _this.view.render(true);
        };
        _this.container = _this.view.getLayer(constant_1.LAYER.FORE).addGroup();
        return _this;
    }
    Object.defineProperty(Slider.prototype, "name", {
        get: function () {
            return 'slider';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化
     */
    Slider.prototype.init = function () { };
    /**
     * 渲染
     */
    Slider.prototype.render = function () {
        this.option = this.view.getOptions().slider;
        if (this.option) {
            if (this.slider) {
                // exist, update
                this.slider = this.updateSlider();
            }
            else {
                // not exist, create
                this.slider = this.createSlider();
                // 监听事件，绑定交互
                this.slider.component.on('sliderchange', this.onValueChanged);
            }
            // changeData 的时候同样需要更新
            // 设置初始的 text
            var min = this.slider.component.get('start') || 0;
            var max = this.slider.component.get('end') || 1;
            this.updateMinMaxText(min, max);
        }
        else {
            if (this.slider) {
                // exist, destroy
                this.slider.component.destroy();
                this.slider = undefined;
            }
            else {
                // do nothing
            }
        }
    };
    /**
     * 布局
     */
    Slider.prototype.layout = function () {
        if (this.slider) {
            var width = this.view.coordinateBBox.width;
            // 获取组件的 layout bbox
            var bboxObject = this.slider.component.getLayoutBBox();
            var bbox = new bbox_1.BBox(bboxObject.x, bboxObject.y, Math.min(bboxObject.width, width), bboxObject.height);
            var _a = direction_1.directionToPosition(this.view.viewBBox, bbox, constant_1.DIRECTION.BOTTOM), x1 = _a[0], y1 = _a[1];
            var _b = direction_1.directionToPosition(this.view.coordinateBBox, bbox, constant_1.DIRECTION.BOTTOM), x2 = _b[0], y2 = _b[1];
            // 默认放在 bottom
            this.slider.component.update({
                x: x2,
                y: y1,
                width: width,
            });
        }
    };
    /**
     * 更新
     */
    Slider.prototype.update = function () {
        // 逻辑和 render 保持一致
        this.render();
    };
    /**
     * 创建 slider 组件
     */
    Slider.prototype.createSlider = function () {
        var cfg = this.getSliderCfg();
        // 添加 slider 组件
        var component = new dependents_1.Slider(__assign({ container: this.container }, cfg));
        component.init();
        return {
            component: component,
            layer: constant_1.LAYER.FORE,
            direction: constant_1.DIRECTION.BOTTOM,
            type: constant_1.COMPONENT_TYPE.OTHER,
        };
    };
    /**
     * 更新配置
     */
    Slider.prototype.updateSlider = function () {
        var cfg = this.getSliderCfg();
        helper_1.omit(cfg, ['x', 'y', 'width', 'start', 'end', 'minText', 'maxText']);
        this.slider.component.update(cfg);
        return this.slider;
    };
    /**
     * 生成 slider 配置
     */
    Slider.prototype.getSliderCfg = function () {
        if (util_1.isObject(this.option)) {
            // 用户配置的数据，优先级更高
            var trendCfg = __assign({ data: this.getData() }, util_1.get(this.option, 'trendCfg', {}));
            // 初始的位置大小信息
            var x = 0;
            var y = 0;
            var width = this.view.coordinateBBox.width;
            // 因为有样式，所以深层覆盖
            var cfg = util_1.deepMix({}, { x: x, y: y, width: width }, this.option);
            // trendCfg 因为有数据数组，所以使用浅替换
            return __assign(__assign({}, cfg), { trendCfg: trendCfg });
        }
        return {};
    };
    /**
     * 从 view 中获取数据，缩略轴使用全量的数据
     */
    Slider.prototype.getData = function () {
        var data = this.view.getOptions().data;
        var yScale = this.view.getYScales()[0];
        return data.map(function (datum) { return datum[yScale.field] || 0; });
    };
    Slider.prototype.updateMinMaxText = function (min, max) {
        var data = this.view.getOptions().data;
        var dataSize = util_1.size(data);
        var xScale = this.view.getXScale();
        if (!xScale || !dataSize) {
            return;
        }
        var x = xScale.field;
        // x 轴数据
        var xData = data.map(function (datum) { return datum[x] || ''; });
        var minIndex = Math.floor(min * (dataSize - 1));
        var maxIndex = Math.floor(max * (dataSize - 1));
        var minText = util_1.get(xData, [minIndex]);
        var maxText = util_1.get(xData, [maxIndex]);
        var formatter = this.getSliderCfg().formatter;
        if (formatter) {
            minText = formatter(minText, data[minIndex], minIndex);
            maxText = formatter(maxText, data[maxIndex], maxIndex);
        }
        // 更新文本
        this.slider.component.update({
            minText: minText,
            maxText: maxText,
            start: min,
            end: max,
        });
        // 增加 x 轴的过滤器
        this.view.filter(xScale.field, function (value, datum, idx) { return helper_1.isBetween(idx, minIndex, maxIndex); });
    };
    /**
     * 覆写父类方法
     */
    Slider.prototype.getComponents = function () {
        return this.slider ? [this.slider] : [];
    };
    return Slider;
}(base_1.Controller));
exports.default = Slider;
