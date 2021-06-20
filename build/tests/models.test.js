"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var models_1 = require("../models");
describe('models', function () {
    it('can create a Sethares1993', function () {
        var sethares1993 = new models_1.Sethares1993();
        chai_1.expect(sethares1993.a).to.be.equal(3.5);
    });
    it('Sethares1993 can calculate the dissonance pair', function () {
        var sethares1993 = new models_1.Sethares1993();
        var res = sethares1993.dissonance_pair(440, 880, .88, .88);
        chai_1.expect(res !== undefined).to.be.true;
    });
    it('can create a Vassilakis2001', function () {
        var model = new models_1.Vassilakis2001();
        chai_1.expect(model.a).to.be.equal(3.5);
    });
    it('Vassilakis2001 can calculate the dissonance pair', function () {
        var model = new models_1.Vassilakis2001();
        var res = model.dissonance_pair(440, 880, .88, .88);
        chai_1.expect(res !== undefined).to.be.true;
    });
    it('can create a Cook2002', function () {
        var model = new models_1.Cook2002();
        chai_1.expect(model.a).to.be.equal(1.2);
    });
    it('Cook2002 can calculate the dissonance pair', function () {
        var model = new models_1.Cook2002();
        var res = model.dissonance_pair(440, 880, .88, .88);
        chai_1.expect(res !== undefined).to.be.true;
    });
    it('can create a Cook2006', function () {
        var model = new models_1.Cook2006();
        chai_1.expect(model.beta_1).to.be.equal(-0.8);
    });
    it('Cook2006 can calculate the dissonance pair', function () {
        var model = new models_1.Cook2006();
        var res = model.dissonance_pair(440, 880, .88, .88);
        chai_1.expect(res !== undefined).to.be.true;
    });
    it('can create a Cook2009', function () {
        var model = new models_1.Cook2009();
        chai_1.expect(model.beta_1).to.be.equal(-0.8);
    });
    it('Cook2009 can calculate the dissonance pair', function () {
        var model = new models_1.Cook2009();
        var res = model.dissonance_pair(440, 880, .88, .88);
        chai_1.expect(res !== undefined).to.be.true;
    });
});
