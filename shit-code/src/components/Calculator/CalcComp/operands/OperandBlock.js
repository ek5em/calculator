import CalcButton from '../../../components/calculatorButton/CalcButton';

import './OperandBlock.css';

const OperandBlock = ({ operandButtons, onClick }) => {
    return (
        <div className='operands-block'>
            {operandButtons.map((button) => {
                return (
                    <>
                        <CalcButton
                            onClick={() => onClick(button.operand)}
                            text={button.text}
                        />
                    </>
                )
            })}
        </div>
    )
}

export default OperandBlock;