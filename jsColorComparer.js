jsColorComparerTypes = {

    RGB: function (red, green, blue) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.toString = function() {
            return 'RGB (' + this.r + ', ' + this.g + ', ' + this.b + ')';
        };
    },

    HSL: function (hue, saturation, lightness) {
        this.h = hue;
        this.s = saturation;
        this.l = lightness;
        this.getHueColor = function() {
            var rangeHue = this.h * 60;
            if ((rangeHue >= 0 && rangeHue <= 18) || (rangeHue >= 306 && rangeHue <= 360)) {
                return jsColorComparerColors.red;
            } else if (rangeHue >= 19 && rangeHue <= 41) {
                return jsColorComparerColors.orange;
            } else if (rangeHue >= 42 && rangeHue <= 69) {
                return jsColorComparerColors.yellow;
            } else if (rangeHue >= 70 && rangeHue <= 169) {
                return jsColorComparerColors.green;
            } else if (rangeHue <= 170 && rangeHue <= 251) {
                return jsColorComparerColors.blue;
            } else {
                return jsColorComparerColors.purple;
            }
        };
        this.toString = function() {
            return 'HSL (' + Math.round(this.h * 60) + '%, ' + Math.round(this.s * 100) + '%, ' + Math.round(this.l * 100) + '%)';
        };
    },

    Hex: function (hex) {
        this.r = hex[1] + hex[2];
        this.g = hex[3] + hex[4];
        this.b = hex[5] + hex[6];
        this.toString = function() {
            return 'Hex (' + this.r + ', ' + this.g + ', ' + this.b + ')';
        };
    }
};

jsColorComparerColors = {
    red: {name: "red", rgb: new jsColorComparerTypes.RGB(255, 0, 0)},
    green: {name: "green", rgb: new jsColorComparerTypes.RGB(0, 255, 0)},
    blue: {name: "blue", rgb: new jsColorComparerTypes.RGB(0, 0, 255)},
    orange: {name: "orange", rgb: new jsColorComparerTypes.RGB(255, 128, 0)},
    yellow: {name: "yellow", rgb: new jsColorComparerTypes.RGB(255, 255, 0)},
    purple: {name: "purple", rgb: new jsColorComparerTypes.RGB(255, 0, 255)},
    black: {name: "purple", rgb: new jsColorComparerTypes.RGB(0, 0, 0)},
    grey: {name: "grey", rgb: new jsColorComparerTypes.RGB(96, 96, 96)},
    white: {name: "white", rgb: new jsColorComparerTypes.RGB(255, 255, 255)},
    brown: {name: "brown", rgb: new jsColorComparerTypes.RGB(153, 76, 0)},
    pink: {name: "pink", rgb: new jsColorComparerTypes.RGB(255, 51, 153)}
};

var jsColorComparerTools = {

    /*Constants*/
    /*******************************/
    hexLength: 7,
    colorRange: {min: 0, max: 255},

    /*Color types conversions*/
    /******************************/

    hexToRgb: function (hex) {
        if (this.isHexFormat(hex)) {
            var hexObj = new jsColorComparerTypes.Hex(hex);
            return new jsColorComparerTypes.RGB(this.hexToDec(hexObj.r), this.hexToDec(hexObj.g), this.hexToDec(hexObj.b));
        }
    },

    rgbToHsl: function (rgb) {
        if (rgb instanceof jsColorComparerTypes.RGB) {
            var h, s, l;
            var newR = rgb.r / this.colorRange.max;
            var newG = rgb.g / this.colorRange.max;
            var newB = rgb.b / this.colorRange.max;
            var max = Math.max(newR, newG, newB);
            var min = Math.min(newR, newG, newB);
            var delta = max - min;

            l = (max + min) / 2;

            if (delta == 0) {
                h = s = 0;
            } else {
                s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
                switch (max) {
                    case newR:
                        h = ((newG - newB) / delta) % 6;
                        break;
                    case newG:
                        h = (newB - newR) / delta + 2;
                        break;
                    case newB:
                        h = (newR - newG) / delta + 4;
                     default:
                        break;
                }
            }
            return new jsColorComparerTypes.HSL(h, s, l);
        }
    },

    toHsl: function (color) {
        if (this.isHexFormat(color)) {
            return this.rgbToHsl(this.hexToRgb(color));
        } else if (this.isRgbFormat(color)) {
            return this.rgbToHsl(new jsColorComparerTypes.RGB(color.r, color.g, color.b));
        }
    },

    /*Additional methods*/
    /******************************/
    hexToDec: function (hex) {
        return parseInt(hex, 16);
    },

    isHexFormat: function (color) {
        return /#([0-9]|[A-F]){6}/gi.test(color);
    },

    isRgbFormat: function (color) {
        return color.r != null && color.g != null && color.b != null;
    },

    isHslFormat: function (color) {
        return color.h != null && color.s != null && color.l != null;
    }

};

/*jsColorComparer*/
/******************************/
var jsColorComparer = {

    whichIsDarker: function(colorArray) {

        var darker = colorArray[0];
        var lightness = 0;
        var currentHsl;

        for(var i = 0; i < colorArray.length; i++) {
            currentHsl = jsColorComparerTools.toHsl(colorArray[i]);
            if (currentHsl.l > lightness) {
                darker = colorArray[i];
                lightness = 0;
            }
        }

        return darker;
    },

     whichIsLighter: function(colorArray) {

        var lighter = colorArray[0];
        var lightness = 0;
        var currentHsl;

        for(var i = 0; i < colorArray.length; i++) {
            currentHsl = jsColorComparerTools.toHsl(colorArray[i]);
            if (currentHsl.l < lightness) {
                lighter = colorArray[i];
                lightness = 0;
            }
        }

        return lighter;
     },

     whatColorIs: function(color) {
        var hsl = jsColorComparerTools.toHsl(color);
        console.log(hsl.h);
        return hsl.getHueColor().name;
     }

};

var c1 = "#12fe31";
var c2 = "#123bf2";

$(".color1").css("background-color", c1);
$(".color2").css("background-color", c2);

console.log(jsColorComparer.whatColorIs(c1));
console.log(jsColorComparer.whatColorIs(c2));

