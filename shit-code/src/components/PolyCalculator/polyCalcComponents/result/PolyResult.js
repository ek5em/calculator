import CalcButton from '../../../components/calculatorButton/CalcButton';

import './PolyResult.css';

const PolyResult = ({ onClick }) => {
    return (
        <div className='poly-result-container'>
            <textarea placeholder='X'></textarea>
            <CalcButton
                onClick={onClick}
                text={'Подставить X'}
            />
            <textarea
                className='poly-result'
                disabled></textarea>
        </div>
    )
}

export default PolyResult;