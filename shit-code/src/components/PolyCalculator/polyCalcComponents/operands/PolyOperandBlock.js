import CalcButton from '../../../components/calculatorButton/CalcButton';

import './PolyOperandBlock.css';

const PolyOperandBlock = ({ operandButtons, onClick }) => {
    return (
        <div className='poly-operands-block'>
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

export default PolyOperandBlock;