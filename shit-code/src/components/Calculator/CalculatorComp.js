import Calculator from '../../modules/Calculator/Calculator';

import CalcInput from './CalcComp/input/CalcInput';
import CalcResult from './CalcComp/result/CalcResult';
import OperandBlock from './CalcComp/operands/OperandBlock';

import './CalculatorComp.css';


const CalculatorComp = () => {

    const calc = new Calculator();

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
        {
            operand: 'div',
            text: 'a / b',
        },
        {
            operand: 'prod',
            text: 'a * b',
        },
        {
            operand: 'pow',
            text: 'a ^ b',
        },
    ]

    const onClickOperandHandler = (operand) => {
        const inputA = document.querySelector('.inputA');
        const inputB = document.querySelector('.inputB');
        const a = calc.getEntity(inputA.value);
        const b = calc.getEntity(inputB.value);
        const c = calc[operand](a, b);
        document.querySelector('.calc-result').innerHTML = c.toString();
    }

    return (
        <div className='calculator'>
            <CalcInput />
            <CalcResult />
            <OperandBlock
                onClick={onClickOperandHandler}
                operandButtons={operandButtons}
            />
        </div>
    );
}

export default CalculatorComp;