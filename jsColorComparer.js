/*Constants*/
/*******************************/
var hexLength = 7;
var colorRange = {min: 0, max: 255};

/*Color types*/
/*******************************/
function RGB(red, green, blue) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.toString = function() {
        return 'RGB (' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
}

function HSL(hue, saturation, lightness) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;
    this.toString = function() {
        return 'HSL (' + Math.round(this.h * 60) + '%, ' + Math.round(this.s * 100) + '%, ' + Math.round(this.l * 100) + '%)';
    };
}

function Hex(hex) {
    this.r = hex[1] + hex[2];
    this.g = hex[3] + hex[4];
    this.b = hex[5] + hex[6];
    this.toString = function() {
        return 'Hex (' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
}

/*Color types conversions*/
/******************************/

function hexToRgb(hex) {
    if (isHexFormat(hex)) {
        var hexObj = new Hex(hex);
        return new RGB(hexToDec(hexObj.r), hexToDec(hexObj.g), hexToDec(hexObj.b));
    }
}

function rgbToHsl(rgb) {
    if (rgb instanceof RGB) {
        var h, s, l;
        var newR = rgb.r / colorRange.max;
        var newG = rgb.g / colorRange.max;
        var newB = rgb.b / colorRange.max;
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
        return new HSL(h, s, l);
    }
}

function toHsl(color) {
    if (isHexFormat(color)) {
        return rgbToHsl(hexToRgb(color));
    } else if (isRgbFormat(color)) {
        return rgbToHsl(color);
    }
}

/*Additional methods*/
/******************************/
function hexToDec(hex) {
    return parseInt(hex, 16);
}

function isHexFormat(color) {
    return /#([0-9]|[A-F]){6}/gi.test(color);
}

function isRgbFormat(color) {
    return color.r != null && color.g != null && color.b != null;
}

/*jsColorComparer*/
/******************************/
var jsColorComparer = {

    whichIsDarker: function(colorArray) {

        var darker = colorArray[0];
        var lightness = 0;
        var currentHsl;

        for(var i = 0; i < colorArray.length; i++) {
            currentHsl = toHsl(colorArray[i]);
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
            currentHsl = toHsl(colorArray[i]);
            if (currentHsl.l < lightness) {
                lighter = colorArray[i];
                lightness = 0;
            }
        }

        return lighter;
     }

}

console.log(jsColorComparer.whichIsDarker(new Array("#123456", "#222222", "#111211")));
console.log(jsColorComparer.whichIsLighter(new Array("#123456", "#222222", "#111211")));
