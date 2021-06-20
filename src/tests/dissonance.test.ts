import { expect } from "chai";
import { dissonance } from "../dissonance";
import { HarmonicTone, pitch_to_freq } from "../tuning";


describe('dissonance', function () {
    it('can calculate the dissonance', () => {
        let { freqs, amplitudes } = HarmonicTone(pitch_to_freq([0, 4, 7, 12]), 10)
        let d = dissonance(freqs, amplitudes, 'sethares1993');

        expect(!!d).to.be.true;
        console.log(d)
    });
    it('can calculate the dissonance', () => {
        let { freqs, amplitudes } = HarmonicTone(pitch_to_freq([0, 4, 7]), 10)
        let d = dissonance(freqs, amplitudes, 'sethares1993');

        expect(!!d).to.be.true;
        console.log(d)
    });
    it('can calculate the dissonance', () => {
        let { freqs, amplitudes } = HarmonicTone(pitch_to_freq([0, 12]), 10)
        let d = dissonance(freqs, amplitudes, 'sethares1993');

        expect(!!d).to.be.true;
        console.log(d)
    });
});