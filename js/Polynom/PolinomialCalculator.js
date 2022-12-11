class PolinomialCalculator {
    polynomial(members) {
        return new Polynomial(members);
    }

    getPolynomial(str) {
        str = str.replace(/\s/g, "");
        let arr = [];
        if (str.includes('-')) {
            str.split('-').map(elem => elem = arr.push('-' + elem));
            arr[0] = arr[0].slice(1);
            arr = (arr.map((elem) => elem.split('+')))
                .reduce((s, elem) => s.concat(elem), []);
        } else {
            arr = str.split('+');
        }

        const members = [];
        arr.map(elem => {
            if (elem.length > 0) {
                if (elem.includes('x')) {
                    if (elem.includes('*x^')) {
                        const member = elem.split('*x^')
                            .map(value => value - 0);
                        members.push(new Member(member[0], member[1]));
                    } else if (elem.includes('*')) {
                        members.push(new Member(elem.split('*x')[0] - 0, 1));
                    } else if (elem.includes('^')) {
                        members.push(new Member(1, elem.split('x^')[1] - 0));
                    }
                    else {
                        members.push(new Member(1, 1));
                    }
                }
                else {
                    members.push(new Member(elem - 0));
                }
            }
        })
        return new Polynomial(members);
    }


    add(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB =>
                elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            }
            else {
                members.push(new Member(elemA.value, elemA.power));
            }
        })

        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        })
        return this.polynomial(members);
    }

    sub(a, b) {
        const calc = new Calculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB =>
                elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            }
            else {
                members.push(new Member(elemA.value, elemA.power));
            }
        })

        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(calc.prod(-1, elemB.value), elemB.power));
            }
        })
        return this.polynomial(members);
    }

    mult(a, b) {
        const calc = new Calculator;
        let polynomial = this.polynomial([new Member]);
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(calc.mult(elemA.value, elemB.value), elemA.power + elemB.power))
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        });
        return polynomial;
    }
}
