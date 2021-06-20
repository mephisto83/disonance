"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var dissonance_1 = require("../dissonance");
var tuning_1 = require("../tuning");
describe('dissonance', function () {
    it('can calculate the dissonance', function () {
        var _a = tuning_1.HarmonicTone(tuning_1.pitch_to_freq([0, 4, 7, 12]), 10), freqs = _a.freqs, amplitudes = _a.amplitudes;
        var d = dissonance_1.dissonance(freqs, amplitudes, 'sethares1993');
        chai_1.expect(!!d).to.be.true;
        console.log(d);
    });
    it('can calculate the dissonance', function () {
        var _a = tuning_1.HarmonicTone(tuning_1.pitch_to_freq([0, 4, 7]), 10), freqs = _a.freqs, amplitudes = _a.amplitudes;
        var d = dissonance_1.dissonance(freqs, amplitudes, 'sethares1993');
        chai_1.expect(!!d).to.be.true;
        console.log(d);
    });
    it('can calculate the dissonance', function () {
        var _a = tuning_1.HarmonicTone(tuning_1.pitch_to_freq([0, 12]), 10), freqs = _a.freqs, amplitudes = _a.amplitudes;
        var d = dissonance_1.dissonance(freqs, amplitudes, 'sethares1993');
        chai_1.expect(!!d).to.be.true;
        console.log(d);
    });
});
