"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pitch_to_freq = exports.freq_to_pitch = exports.HarmonicTone = void 0;
var models_1 = require("./models");
function HarmonicTone(base_freqs, n_partials, profile) {
    if (n_partials === void 0) { n_partials = 1; }
    if (profile === void 0) { profile = 'exp'; }
    //    """
    //     Creates a harmonic tone out of one or more base frequencies.
    //     Input:
    //     base_freqs - single value, or an numpy array of base frequencies
    //     n_partials - number of partial in the harmonic tone
    //     Output:
    //     Tuple of (freqs, amplitudes).
    //     Freqs are a 2D array of the frequencies of partials
    //     of shape (len(freqs), n_partials)
    //     Amplitudes are of the same shape.
    //     The amplitude values for a single harmonic tone are going down
    //     inversely in this case.
    //     """
    var idx = interpolate(n_partials).map(function (_, v) { return v + 1; });
    var freqs = outer(base_freqs, idx);
    // # eg. amplitudes inversely going down
    var amp_profile;
    if (profile === 'exp') {
        //# exponential fall-off
        amp_profile = idx.map(function (v) { return Math.pow(0.88, v); });
    }
    else if (profile == 'inverse') {
        amp_profile = idx.map(function (v) { return 1 / v; });
    }
    else if (profile == 'constant') {
        amp_profile = interpolate(idx.length).map(function (v) { return 1; });
    }
    else {
        throw Error("Amplitude profile can be ['exp', 'inverse', 'constant'], was " + profile);
    }
    var amplitudes = tile(amp_profile, ((base_freqs).length));
    return { freqs: freqs, amplitudes: amplitudes };
}
exports.HarmonicTone = HarmonicTone;
function freq_to_pitch(freq, base_freq, steps_per_octave) {
    if (base_freq === void 0) { base_freq = 440.0; }
    if (steps_per_octave === void 0) { steps_per_octave = 12; }
    return freq.map(function (fr) {
        models_1.log2(fr / base_freq) * steps_per_octave;
    });
}
exports.freq_to_pitch = freq_to_pitch;
function pitch_to_freq(pitch, base_freq, steps_per_octave) {
    if (base_freq === void 0) { base_freq = 440.0; }
    if (steps_per_octave === void 0) { steps_per_octave = 12; }
    return pitch.map(function (pitch) {
        return Math.pow(2, ((pitch) / steps_per_octave)) * base_freq;
    });
}
exports.pitch_to_freq = pitch_to_freq;
function tile(amp_profile, times) {
    var result = [];
    interpolate(times).map(function (v) {
        result.push(amp_profile);
    });
    return result;
}
function outer(arr1, arr2) {
    var result = [];
    for (var i = 0; i < arr1.length; i++) {
        var res = [];
        for (var j = 0; j < arr2.length; j++) {
            res.push(arr1[i] * arr2[j]);
        }
        result.push(res);
    }
    return result;
}
function interpolate(x, func) {
    var res = [];
    func = func || (function () { return 0; });
    for (var i = 0; i < x; i++) {
        res.push(func(i));
    }
    return res;
}
