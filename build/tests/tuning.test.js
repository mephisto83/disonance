"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var tuning_1 = require("../tuning");
describe('tuning', function () {
    it('can create frequences and amplitudes', function () {
        var _a = tuning_1.HarmonicTone([440], 4), freqs = _a.freqs, amplitudes = _a.amplitudes;
        chai_1.expect(!!freqs).to.be.true;
        chai_1.expect(!!amplitudes).to.be.true;
    });
    it('can create frequences and amplitudes for multiple notes', function () {
        var _a = tuning_1.HarmonicTone([440, 880], 6), freqs = _a.freqs, amplitudes = _a.amplitudes;
        chai_1.expect(!!freqs).to.be.true;
        chai_1.expect(freqs.length === 2).to.be.true;
        chai_1.expect(freqs[0].length === 6).to.be.true;
        chai_1.expect(!!amplitudes).to.be.true;
        chai_1.expect(amplitudes.length === 2).to.be.true;
        chai_1.expect(amplitudes[1].length === 6).to.be.true;
    });
    it('HarmonicTone([440], 1)  ', function () {
        var _a = tuning_1.HarmonicTone([440], 1), freqs = _a.freqs, amplitudes = _a.amplitudes;
        console.log(freqs);
        console.log(amplitudes);
        chai_1.expect(freqs[0][0] === 440).to.be.true;
        chai_1.expect(amplitudes[0][0] === 0.88).to.be.true;
    });
    it('HarmonicTone([440], 5)', function () {
        var _a = tuning_1.HarmonicTone([440], 5), freqs = _a.freqs, amplitudes = _a.amplitudes;
        console.log(freqs);
        console.log(amplitudes);
        chai_1.expect(freqs[0][0] === 440).to.be.true;
        chai_1.expect(freqs[0][4] === 2200).to.be.true;
    });
});
