class Matrix {
    constructor(values) {
        this.values = [];
        values.forEach((arr, i) => {
            this.values[i] = [];
            arr.forEach(elem => {
                this.values[i].push(elem);
            })
        });
    }

    toString() {
        const arr = [];
        this.values.map((elem) => arr.push(elem.join('; ')));
        return `[${arr.join('|<br></br> &nbsp;')}]`;
    }
}
