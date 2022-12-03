class Claculator {
    complex(re, im) {
        return new Complex(re, im)
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        if (str.includes('[')) return this.getMatrix(str);
        if (str.includes('(')) return this.getVector(str);
        if (str.includes('i')) return this.getComplex(str);
        return str - 0;
    }

    get(elem) {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator;
        }
        return new RealCalculator;
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    prod(a, p) {
        return this.get(a).prod(a, p);
    }

    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;

        switch (type) {
            case 'Complex':
                return this.get(this.complex()).zero();
            case 'Vector':
                return this.get(this.vector()).zero();
            case 'Matrix':
                return this.get(this.matrix()).zero();
            default:
                this.get().zero();
        }
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;

        switch (type) {
            case 'Complex':
                return this.get(this.complex()).one();
            case 'Vector':
                return this.get(this.vector()).one();
            case 'Matrix':
                return this.get(this.matrix()).one();
            default:
                this.get().one();
        }
    }
}