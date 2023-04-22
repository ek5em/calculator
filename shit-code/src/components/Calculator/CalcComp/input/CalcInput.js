import './CalcInput.css';

const CalcInput = () => {
    return (
        <div className='calc-input'>
            <textarea className="inputA" placeholder='a'></textarea>
            <textarea className="inputB" placeholder='b'></textarea>
        </div>
    )
}

export default CalcInput;