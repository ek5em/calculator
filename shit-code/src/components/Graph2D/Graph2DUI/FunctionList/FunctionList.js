import FunctionBlock from './FunctionBlock/FunctionBlock';

import './FunctionList.css';

const FunctionList = ({ list, delFunc }) => {
    return (
        <div className='function-list'>
            {list.map((func, index) => {
                return (
                    <div key={index} className='function-block'>
                        <FunctionBlock
                            func={func}
                            delFunc={delFunc}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default FunctionList;
