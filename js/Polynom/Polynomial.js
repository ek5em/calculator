class Polynomial {
    constructor(poly = []) {
        poly.sort((a, b) => b.power - a.power);
        this.poly = [poly[0]];
        if (poly.length > 1) {
            for (let i = 1; i < poly.length; i++) {
                let lastEl = this.poly.length - 1;
                if (poly[i].power === this.poly[lastEl].power) {
                    this.poly[lastEl].value += poly[i].value;
                } else {
                    this.poly.push(poly[i]);
                }
            }
            this.poly = this.poly.filter(member => member.value);
            if (this.poly.length === 0) this.poly.push(new Member);
        }
    }

    getValue(x) {
        const calc = new Calculator;
        return this.poly.reduce((s, elem) =>
            s = calc.add(s, calc.prod(elem.value, calc.pow(x, elem.power))), calc.zero(null, x));
    }

    toString() {
        return (this.poly.map(member =>
            member.toString())).join(' + ').replaceAll('+ -', '- ');
    }
}