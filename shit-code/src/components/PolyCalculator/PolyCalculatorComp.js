import PolynomialCalculator from '../../modules/PolyCalculator/PolynomialCalculator';
import Calculator from '../../modules/Calculator/Calculator';

import PolyCalcInput from './polyCalcComponents/input/PolyCalcInput';
import NewPoly from './polyCalcComponents/newPoly/NewPoly';
import PolyOperandBlock from './polyCalcComponents/operands/PolyOperandBlock';
import PolyResult from './polyCalcComponents/result/PolyResult';

import './PolyCalculatorComp.css';

const PolyCalculatorComp = () => {

    const calc = new PolynomialCalculator();
    let newPoly = '';

    const operandButtons = [
        {
            operand: 'add',
            text: 'a + b',
        },
        {
            operand: 'sub',
            text: 'a - b',
        },
        {
            operand: 'mult',
            text: 'a * b',
        },
    ]

    const onClickOperandHandle = (operand) => {
        const inputA = document.querySelector('.poly-input-a');
        const inputB = document.querySelector('.poly-input-b');
        const a = calc.getPolynomial(inputA.value);
        const b = calc.getPolynomial(inputB.value);

        console.log(a, b);

        const c = calc[operand](a, b);
        newPoly = c.toString();
        document.querySelector('.new-poly').innerHTML = newPoly;
    }

    const onClickResultHandler = () => {
        const inputX = document.querySelector('.poly-result-container>div');
        const x = (new Calculator()).getEntity(inputX.value);
        const c = calc.getPolynomial(newPoly);
        document.querySelector('.poly-result').innerHTML = (c.getValue(x)).toString();
    }

    return (
        <div className='poly-calculactor'>
            <PolyCalcInput />
            <NewPoly />
            <PolyOperandBlock
                operandButtons={operandButtons}
                onClick={onClickOperandHandle}
            />
            <PolyResult
                onClick={onClickResultHandler}
            />
        </div>
    );
}

export default PolyCalculatorComp;