class MatrixCalculator extends RealCalculator {
    add(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => elem + b.values[i][j])));
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => elem - b.values[i][j])))
    }

    mult(a, b) {
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let sum = 0;
                for (let k = 0; k < a.values[i].length; k++) {
                    sum = sum + a.values[k][j] * b.values[j][k];
                }
                values[i][j] = sum;
            }
        }
        return new Matrix(values);
    }

    prod(a, p) {
        return new Matrix(a.values.map(arr =>
            arr.map(elem => elem * p)))
    }

    pow(a, p) {
        let c = this.one(a.values.length);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = 0;
            }
        }
        return new Matrix(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = (i === j) ? 1 : 0;
            }
        }
        return new Matrix(values);
    }
}