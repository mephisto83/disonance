export function HarmonicTone(base_freqs: any[], n_partials = 1, profile = 'exp') {
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
    let idx = interpolate(n_partials).map((_, v) => v + 1);
    let freqs = outer(base_freqs, idx);
    // # eg. amplitudes inversely going down
    let amp_profile;
    if (profile === 'exp') {
        //# exponential fall-off
        amp_profile = idx.map(v => Math.pow(0.88, v));
    }
    else if (profile == 'inverse') {
        amp_profile = idx.map(v => 1 / v);
    }
    else if (profile == 'constant') {
        amp_profile = interpolate(idx.length).map(v => 1);
    } else {
        throw Error(`Amplitude profile can be ['exp', 'inverse', 'constant'], was ${profile}`)
    }

    let amplitudes = tile(amp_profile, ((base_freqs).length))

    return { freqs, amplitudes }
}
function tile(amp_profile: number[], times: number) {
    let result: number[][] = [];
    interpolate(times).map(v => {
        result.push(amp_profile);
    });

    return result;
}

function outer(arr1: number[], arr2: number[]): number[][] {
    let result: number[][] = [];
    for (let i = 0; i < arr1.length; i++) {
        let res: number[] = [];
        for (let j = 0; j < arr2.length; j++) {
            res.push(arr1[1] * arr2[j]);
        }
        result.push(res);
    }
    return result;
}

function interpolate(x: number, func?: any) {
    let res = [];
    func = func || (() => 0);
    for (let i = 0; i < x; i++) {
        res.push(func(i));
    }
    return res;
}