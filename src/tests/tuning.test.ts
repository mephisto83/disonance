import { expect } from "chai";
import { HarmonicTone } from "../tuning";


describe('tuning', function () {
    it('can create frequences and amplitudes', function () {
        let { freqs, amplitudes } = HarmonicTone([440], 4);

        expect(!!freqs).to.be.true;
        expect(!!amplitudes).to.be.true;
    });

    it('can create frequences and amplitudes for multiple notes', function () {
        let { freqs, amplitudes } = HarmonicTone([440, 880], 6);

        expect(!!freqs).to.be.true;
        expect(freqs.length === 2).to.be.true;
        expect(freqs[0].length === 6).to.be.true;
        expect(!!amplitudes).to.be.true;
        expect(amplitudes.length === 2).to.be.true;
        expect(amplitudes[1].length === 6).to.be.true;
    });

    it('HarmonicTone([440], 1)  ', () => {
        let { freqs, amplitudes } = HarmonicTone([440], 1);
        console.log(freqs);
        console.log(amplitudes);

        expect(freqs[0][0] === 440).to.be.true;
        expect(amplitudes[0][0] === 0.88).to.be.true;
    })
    it('HarmonicTone([440], 5)', () => {
        let { freqs, amplitudes } = HarmonicTone([440], 5);
        console.log(freqs);
        console.log(amplitudes);

        expect(freqs[0][0] === 440).to.be.true;
        expect(freqs[0][4] === 2200).to.be.true;
    })
});