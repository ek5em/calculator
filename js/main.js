window.onload = function () {
    function operandHandler(event) {
        const inputA = document.querySelector('.inputA');
        const inputB = document.querySelector('.inputB');
        const calc = new Calculator;
        const a = calc.getEntity(inputA.value);
        const b = calc.getEntity(inputB.value);
        const operand = event.target.dataset.operand;
        const c = calc[operand](a, b);
        document.querySelector('.result').innerHTML = c.toString();
    }

    function polyOperandHandler(event) {
        const inputA = document.querySelector('.polyInputA');
        const inputB = document.querySelector('.polyInputB');

        const calc = new PolinomialCalculator;
        const a = calc.getPolynomial(inputA.value);
        const b = calc.getPolynomial(inputB.value);
        const operand = event.target.dataset.operand;
        const c = calc[operand](a, b);
        document.querySelector('.newPoly').innerHTML = c.toString();
    }

    function resultHandler() {
        const calc = new PolinomialCalculator;
        const inputX = document.querySelector('.polyInputX');
        const x = (new Calculator).getEntity(inputX.value);
        const c = calc.getPolynomial(document.querySelector('.newPoly').value);
        if (c) {
            document.querySelector('.polyResult').innerHTML = (c.getValue(x)).toString();
        }
    }

    document.querySelectorAll('.operand')
        .forEach(button => button.addEventListener('click', operandHandler));

    document.querySelectorAll('.polyOperand')
        .forEach(button => button.addEventListener('click', polyOperandHandler));

    document.querySelector('.resultButton').addEventListener('click', resultHandler);
}