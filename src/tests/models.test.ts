import { expect } from "chai";
import { Cook2002, Cook2006, Cook2009, Sethares1993, Vassilakis2001 } from "../models";

describe('models', function () {
    it('can create a Sethares1993', () => {
        let sethares1993 = new Sethares1993();
        expect(sethares1993.a).to.be.equal(3.5);
    });
    it('Sethares1993 can calculate the dissonance pair', () => {
        let sethares1993 = new Sethares1993();
        let res = sethares1993.dissonance_pair(440, 880, .88, .88);
        expect(res !== undefined).to.be.true;
    });

    it('can create a Vassilakis2001', () => {
        let model = new Vassilakis2001();
        expect(model.a).to.be.equal(3.5);
    });
    it('Vassilakis2001 can calculate the dissonance pair', () => {
        let model = new Vassilakis2001();
        let res = model.dissonance_pair(440, 880, .88, .88);
        expect(res !== undefined).to.be.true;
    });

    it('can create a Cook2002', () => {
        let model = new Cook2002();
        expect(model.a).to.be.equal(1.2);
    });
    it('Cook2002 can calculate the dissonance pair', () => {
        let model = new Cook2002();
        let res = model.dissonance_pair(440, 880, .88, .88);
        expect(res !== undefined).to.be.true;
    });

    it('can create a Cook2006', () => {
        let model = new Cook2006();
        expect(model.beta_1).to.be.equal(-0.8);
    });
    it('Cook2006 can calculate the dissonance pair', () => {
        let model = new Cook2006();
        let res = model.dissonance_pair(440, 880, .88, .88);
        expect(res !== undefined).to.be.true;
    });

    it('can create a Cook2009', () => {
        let model = new Cook2009();
        expect(model.beta_1).to.be.equal(-0.8);
    });
    it('Cook2009 can calculate the dissonance pair', () => {
        let model = new Cook2009();
        let res = model.dissonance_pair(440, 880, .88, .88);
        expect(res !== undefined).to.be.true;
    });
});