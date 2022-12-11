class Member {
    constructor(value = 0, power = 0) {
        this.value = value;
        this.power = power;
    }

    toString() {
        if (this.value === 0) return '0';
        if (this.value === 1) {
            return (this.power === 0) ? '1' :
                (this.power === 1) ? 'x' :
                    `x^${this.power}`;
        }
        return (this.power === 0) ? `${this.value}` :
            (this.power === 1) ? `${this.value}*x` :
                `${this.value}*x^${this.power}`;
    }
}