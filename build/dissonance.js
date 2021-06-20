"use strict";
// import numpy as np
Object.defineProperty(exports, "__esModule", { value: true });
exports.dissonance = void 0;
var models_1 = require("./models");
// from . import models
// __all__ = ['dissonance', 'dissonance_pair']
function dissonance(freqs, amps, model, aggregation) {
    if (model === void 0) { model = 'sethares1993'; }
    if (aggregation === void 0) { aggregation = null; }
    aggregation = aggregation || (function (d) { return d.reduce(function (p, c) { return p + c; }); });
    //     """
    //     Computes dissonance score for chord composed of muliple frequences,
    //     each possible with different amplitudes using a given dissonance model.
    //     """
    //     # Get rid of practically zero terms:
    //     nonzero_amps = amps >= 1e-6
    var dissonances = [];
    for (var i = 0; i < freqs.length; i++) {
        for (var j = 0; j < i; j++) {
            for (var k = 0; k < freqs[i].length; k++) {
                for (var m = 0; m < freqs[j].length; m++) {
                    var temp_dissonance = dissonance_pair(Math.min(freqs[i][k], freqs[j][m]), Math.max(freqs[i][k], freqs[j][m]), freqs[i][k] < freqs[j][m] ? amps[i][k] : amps[j][m], freqs[i][k] >= freqs[j][m] ? amps[i][k] : amps[j][m], model);
                    dissonances.push(temp_dissonance);
                }
            }
        }
    }
    //     # The frequencies are sorted in order to generate pairs where f_1 <= f_2.
    //     # Otherwise bad things happen.
    // freqs = freqs.flatten()
    // freq_idx = freqs.argsort()
    // freqs = freqs[freq_idx]
    // amps = amps.flatten()[freq_idx]
    // n = len(freqs)
    // idx_pairs = np.array([(i, j) for i in range(n) for j in range(n) if i < j])
    // idx_1 = idx_pairs[:, 0]
    // idx_2 = idx_pairs[:, 1]
    // dissonances = dissonance_pair(
    //     freqs[idx_1], freqs[idx_2],
    //     amps[idx_1], amps[idx_2],
    //     model)
    return aggregation(dissonances);
}
exports.dissonance = dissonance;
// def dissonance(freqs, amps, model='sethares1993', aggregation=lambda d: d.sum()):
//     """
//     Computes dissonance score for chord composed of muliple frequences,
//     each possible with different amplitudes using a given dissonance model.
//     """
//     # Get rid of practically zero terms:
//     nonzero_amps = amps >= 1e-6
//     freqs, amps = freqs[nonzero_amps], amps[nonzero_amps]
//     # The frequencies are sorted in order to generate pairs where f_1 <= f_2.
//     # Otherwise bad things happen.
//     freqs = freqs.flatten()
//     freq_idx = freqs.argsort()
//     freqs = freqs[freq_idx]
//     amps = amps.flatten()[freq_idx]
//     n = len(freqs)
//     idx_pairs = np.array([(i, j) for i in range(n) for j in range(n) if i < j])
//     idx_1 = idx_pairs[:, 0]
//     idx_2 = idx_pairs[:, 1]
//     dissonances = dissonance_pair(
//         freqs[idx_1], freqs[idx_2],
//         amps[idx_1], amps[idx_2],
//         model)
//     return aggregation(dissonances)
function dissonance_pair(f_1, f_2, a_1, a_2, model) {
    assert_nonnegative(([f_1, f_2, a_1, a_2]));
    var dissonanceModel = null;
    if (typeof (model) == 'string') {
        dissonanceModel = models_1.model_by_name(model);
    }
    if (dissonanceModel) {
        return dissonanceModel.dissonance_pair(f_1, f_2, a_1, a_2);
    }
    throw new Error('no dissonance model specified');
}
// def dissonance_pair(f_1, f_2, a_1, a_2, model):
//     """
//     Computes the dissonance metric for a pair(s) of sinusoidal tones with given
//     frequency and amplitude using the specified model.
//     The parameters can be either a single value or a numpy array. In the latter
//     case the computation is vectorized for the whole array.
//     Parameters:
//     f_1 - lower frequencies
//     f_2 - upper frequencies
//     a_1 - amplitudes for f_1
//     a_2 - amplitudes for f_2
//     model - known model name (see list_models())
//     Returns:
//     dissonance - a single value or array
//     """
//     assert_nonnegative((f_1, f_2, a_1, a_2))
//     if type(model) == str:
//         model = models.models[model]
//     return model.dissonance_pair(f_1, f_2, a_1, a_2)
function assert_nonnegative(values) {
    values.map(function (v) {
        if (v < 0) {
            throw new Error('value should be greater than 1');
        }
    });
}
// def assert_nonnegative(values):
//     for v in values:
//         assert np.all(v >= 0)
