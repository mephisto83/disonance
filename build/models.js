"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model_by_name = exports.Cook2009 = exports.Cook2006 = exports.log2 = exports.Cook2002 = exports.Vassilakis2001 = exports.Sethares1993 = void 0;
var Sethares1993 = /** @class */ (function () {
    function Sethares1993() {
        this.a = 3.5;
        this.b = 5.75;
        this.d_max = .24;
        this.s_1 = .0207;
        this.s_2 = 18.96;
    }
    Sethares1993.prototype.dissonance_pair = function (f_1, f_2, a_1, a_2) {
        var self = this;
        var s = self.d_max / (self.s_1 * f_1 + self.s_2);
        var x = s * (f_2 - f_1);
        var spl = a_1 * a_2;
        var d = Math.exp(-self.a * x) - Math.exp(-self.b * x);
        return spl * d;
    };
    return Sethares1993;
}());
exports.Sethares1993 = Sethares1993;
var Vassilakis2001 = /** @class */ (function () {
    function Vassilakis2001() {
        //     """
        //     Fixes compared to the paper:
        //     - the 0.5 term removed compared to the original formula
        //       since we counts pairs of partials only once, not twice
        //     """
        this.a = 3.5;
        this.b = 5.75;
        this.d_max = 0.24;
        this.s_1 = 0.0207;
        this.s_2 = 18.96;
        this.spl_exponent = 0.1;
        this.afd_exponent = 3.11;
    }
    Vassilakis2001.prototype.dissonance_pair = function (f_1, f_2, a_1, a_2) {
        var self = this;
        var spl = a_1 * a_2;
        var af_degree = (2 * a_2) / (a_1 + a_2);
        var s = self.d_max / (self.s_1 * f_1 + self.s_2);
        var x = s * (f_2 - f_1);
        var d = Math.exp(-self.a * x) - Math.exp(-self.b * x);
        return Math.pow(spl, self.spl_exponent) * Math.pow(af_degree, self.afd_exponent) * d;
    };
    return Vassilakis2001;
}());
exports.Vassilakis2001 = Vassilakis2001;
var Cook2002 = /** @class */ (function () {
    function Cook2002() {
        //     """
        //     Dissonance at semitone 1.0 normalized to 1.0.
        //     Fixes compared to the paper:
        //     - `c` is defined exactly, not with limited precision
        //     - logarithm should be of base 2
        //     - log2(f_2 / f_1) needs to be multiplied by 12 to get the 12-TET semitone
        //       interval
        //     """
        this.a = 1.2;
        this.b = 4.0;
        // # c ~= 3.5350857058976985 (3.53 in the paper which is not precise)
        this.c = 1;
        this.c = 1 / (Math.exp(-this.a) - Math.exp(-this.b));
    }
    Cook2002.prototype.dissonance_pair = function (f_1, f_2, a_1, a_2) {
        var self = this;
        // # difference of tones in 12 - TET semitone intervals
        var x = 12 * log2(f_2 / f_1);
        return self.c * (Math.exp(-self.a * x) - Math.exp(-self.b * x));
    };
    return Cook2002;
}());
exports.Cook2002 = Cook2002;
function log2(x) {
    return Math.log(x) * Math.LOG2E;
}
exports.log2 = log2;
var Cook2006 = /** @class */ (function () {
    function Cook2006() {
        //     """
        //     Maximum dissonance normalized to 1.0.
        //     Fixes compared to the paper:
        //     - there's one more minus sign when applying beta_1, beta_2
        //     - logarithm should be of base 2
        //     - log2(f_2 / f_1) needs to be multiplied by 12 to get the 12-TET semitone
        //       interval
        //     - there should be bracket, not floor around the difference of exponentials
        //       (probably a printing error)
        //     """
        this.beta_1 = -0.8;
        this.beta_2 = -1.6;
        this.beta_3 = 4.0;
        this.gamma = 1.25;
    }
    Cook2006.prototype.dissonance_pair = function (f_1, f_2, a_1, a_2) {
        var self = this;
        var spl = a_1 * a_2;
        //        # frequency ratio -> 12 - TET semitone interval
        var x = 12 * log2(f_2 / f_1);
        var x_to_gamma = Math.pow(x, self.gamma);
        var d = Math.exp(self.beta_1 * x_to_gamma) - Math.exp(self.beta_2 * x_to_gamma);
        return spl * self.beta_3 * d;
    };
    return Cook2006;
}());
exports.Cook2006 = Cook2006;
var Cook2009 = /** @class */ (function () {
    function Cook2009() {
        //     """
        //     Maximum dissonance normalized to 1.0.
        //     Fixes compared to the paper:
        //     - there's one more minus sign when applying beta_1, beta_2
        //     - logarithm should be of base 2
        //     - log2(f_2 / f_1) needs to be multiplied by 12 to get the 12-TET semitone
        //       interval
        //     It also contains a model of tension of a triad.
        //     """
        this.beta_1 = -0.8;
        this.beta_2 = -1.6;
        this.beta_3 = 4.0;
        this.alpha = 0.6;
    }
    Cook2009.prototype.dissonance_pair = function (f_1, f_2, a_1, a_2) {
        var self = this;
        var spl = a_1 * a_2;
        // # frequency ratio -> 12-TET semitone interval
        var x = 12 * log2(f_2 / f_1);
        var d = Math.exp(self.beta_1 * x) - Math.exp(self.beta_2 * x);
        return spl * self.beta_3 * d;
    };
    Cook2009.prototype.triad_tension = function (f_1, f_2, f_3, a_1, a_2, a_3) {
        var self = this;
        var x = log2(f_2 / f_1);
        var y = log2(f_3 / f_2);
        // # originally named v(greek nu)
        var spl = a_1 * a_2 * a_3;
        return spl * Math.exp(-Math.pow(((y - x) / self.alpha), 2));
    };
    return Cook2009;
}());
exports.Cook2009 = Cook2009;
var models = {
    'sethares1993': new Sethares1993(),
    'vassilakis2001': new Vassilakis2001(),
    'cook2002': new Cook2002(),
    'cook2006': new Cook2006(),
    'cook2009': new Cook2009(),
};
function model_by_name(name) {
    return models[name];
}
exports.model_by_name = model_by_name;
