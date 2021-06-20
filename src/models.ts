export interface DisonanceModel {
    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number): number;
}

export interface TensionModel {
    triad_tension(f_1: number, f_2: number, f_3: number, a_1: number, a_2: number, a_3: number): number;
}

export class Sethares1993 implements DisonanceModel {
    a: number = 3.5;
    b: number = 5.75;
    d_max: number = .24;
    s_1: number = .0207;
    s_2: number = 18.96;

    constructor() { }
    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number) {
        let self = this;
        let s = self.d_max / (self.s_1 * f_1 + self.s_2);
        let x = s * (f_2 - f_1);
        let spl = a_1 * a_2;
        let d = Math.exp(-self.a * x) - Math.exp(-self.b * x);
        return spl * d
    }
}

export class Vassilakis2001 implements DisonanceModel {
    //     """
    //     Fixes compared to the paper:
    //     - the 0.5 term removed compared to the original formula
    //       since we counts pairs of partials only once, not twice
    //     """
    a: number = 3.5
    b: number = 5.75
    d_max: number = 0.24
    s_1: number = 0.0207
    s_2: number = 18.96
    spl_exponent: number = 0.1
    afd_exponent: number = 3.11

    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number) {
        let self = this;
        let spl = a_1 * a_2
        let af_degree = (2 * a_2) / (a_1 + a_2)
        let s = self.d_max / (self.s_1 * f_1 + self.s_2)
        let x = s * (f_2 - f_1)
        let d = Math.exp(-self.a * x) - Math.exp(-self.b * x)
        return Math.pow(spl, self.spl_exponent) * Math.pow(af_degree, self.afd_exponent) * d
    }

}

export class Cook2002 implements DisonanceModel {
    //     """
    //     Dissonance at semitone 1.0 normalized to 1.0.

    //     Fixes compared to the paper:
    //     - `c` is defined exactly, not with limited precision
    //     - logarithm should be of base 2
    //     - log2(f_2 / f_1) needs to be multiplied by 12 to get the 12-TET semitone
    //       interval
    //     """
    a: number = 1.2
    b: number = 4.0
    // # c ~= 3.5350857058976985 (3.53 in the paper which is not precise)
    c: number = 1;
    constructor() {
        this.c = 1 / (Math.exp(-this.a) - Math.exp(-this.b))
    }
    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number) {
        let self = this;
        // # difference of tones in 12 - TET semitone intervals
        let x = 12 * log2(f_2 / f_1)
        return self.c * (Math.exp(-self.a * x) - Math.exp(-self.b * x))
    }
}
export function log2(x: number) {
    return Math.log(x) * Math.LOG2E;
}
export class Cook2006 implements DisonanceModel {
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
    beta_1: number = -0.8
    beta_2: number = -1.6
    beta_3: number = 4.0
    gamma: number = 1.25

    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number) {
        let self = this;
        let spl = a_1 * a_2
        //        # frequency ratio -> 12 - TET semitone interval
        let x = 12 * log2(f_2 / f_1)
        let x_to_gamma = x ** self.gamma
        let d = Math.exp(self.beta_1 * x_to_gamma) - Math.exp(self.beta_2 * x_to_gamma)
        return spl * self.beta_3 * d
    }
}
export class Cook2009 implements DisonanceModel, TensionModel {
    //     """
    //     Maximum dissonance normalized to 1.0.

    //     Fixes compared to the paper:
    //     - there's one more minus sign when applying beta_1, beta_2
    //     - logarithm should be of base 2
    //     - log2(f_2 / f_1) needs to be multiplied by 12 to get the 12-TET semitone
    //       interval

    //     It also contains a model of tension of a triad.
    //     """
    beta_1: number = -0.8
    beta_2: number = -1.6
    beta_3: number = 4.0
    alpha: number = 0.6

    dissonance_pair(f_1: number, f_2: number, a_1: number, a_2: number) {
        let self = this;
        let spl: number = a_1 * a_2
        // # frequency ratio -> 12-TET semitone interval
        let x: number = 12 * log2(f_2 / f_1)
        let d: number = Math.exp(self.beta_1 * x) - Math.exp(self.beta_2 * x)
        return spl * self.beta_3 * d
    }
    triad_tension(f_1: number, f_2: number, f_3: number, a_1: number, a_2: number, a_3: number): number {
        let self = this;
        let x = log2(f_2 / f_1)
        let y = log2(f_3 / f_2)
        // # originally named v(greek nu)
        let spl = a_1 * a_2 * a_3
        return spl * Math.exp(-Math.pow(((y - x) / self.alpha), 2));
    }
}
let models: { [key: string]: DisonanceModel } = {
    'sethares1993': new Sethares1993(),
    'vassilakis2001': new Vassilakis2001(),
    'cook2002': new Cook2002(),
    'cook2006': new Cook2006(),
    'cook2009': new Cook2009(),
}

export function model_by_name(name: string): DisonanceModel {
    return models[name];
}