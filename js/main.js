window.onload = function () {

    const inputA = document.querySelector('.inputA');
    const inputB = document.querySelector('.inputB');

    function getEntity(str) {
        if (str) {
            str = str.replace(/\s/g, '');
            //если вещественное
            if (!isNaN(str - 0)) {
                return (str - 0);
            }
            //если комлпекс
            const arr = str.split('i');
            if (arr.length === 2) {
                const ch = arr[0].substr(arr[0].length - 1)
                arr[0] = arr[0].slice(0, -1);
                if (ch === '-') {
                    arr[1] = ch + arr[1];
                }
                if (arr[0]) {
                    return new Complex(arr[0] - 0, arr[1] - 0);
                }
                return new Complex(0, arr[1] - 0)
            }
            //если вектор
            if (str[0] === '(') {
                const arr = str.slice(1, -1).split(',');
                return new Vector(arr.map(elem => elem - 0));
            }
            //если матрица

            if (str[0] === '[') {
                const arr = []
                str.slice(1, -1).split('|').forEach((elem) =>
                    arr.push(elem.split(';').map(value => value - 0)));
                return new Matrix(arr);

            }
        }
        return null;
    }

    function operandHandler(event) {
        const a = getEntity(inputA.value);
        const b = getEntity(inputB.value);
        let calc = new RealCalculator;
        if (a instanceof Complex) {
            calc = new ComplexCalculator;
        }

        if (a instanceof Vector) {
            calc = new VectorCalculator;
        }

        if (a instanceof Matrix) {
            calc = new MatrixCalculator;
        }

        const c = calc[event.target.dataset.operand](a, b)

        if (c) document.querySelector('.result').innerHTML = c.toString();

    }

    document.querySelectorAll('.operand')
        .forEach(button => button.addEventListener('click', operandHandler))
}