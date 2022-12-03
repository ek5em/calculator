class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    toString() {
        if (this.re === 0 && this.im === 0) return '0';

        if (this.re === 0) return `${this.im}i`;
        if (this.im === 0) return `${this.re}`;
        if (this.im > 0) return `${this.re} + ${this.im}i`;
        if (this.im < 0) return `${this.re} - ${Math.abs(this.im)}i`;
    }

    module(a) {
        return (Math.sqrt(Math.pow(a.re, 2) + Math.pow(a.im, 2)));
    }
}