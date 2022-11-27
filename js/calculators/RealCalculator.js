class RealCalculator {
    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }

    div(a, b) {
        return a / b;
    }

    prod(p, a) {
        return p * a;
    }

    pow(a, p) {
        return Math.pow(a, p);
    }

    one() {
        return 1;
    }

    zero() {
        return 0;
    }

    module(a) {
        return Math.abs(a);
    }

    // насрал - надо убрать

    getMethods() {
        return [this.add, this.sub, this.mult, this.div, this.prod, this.pow, this.module]
    }
}