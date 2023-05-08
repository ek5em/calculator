import { useState, useCallback } from 'react';

import Function from '../../../modules/Graph2D/Function';

import AddButton from './AddButton/AddButton';
import FunctionList from './FunctionList/FunctionList';


import './Graph2DUI.css';

const Graph2DUI = ({ funcsList, delFunc }) => {

    const [showPanel, setShowPanel] = useState(false);
    const [functionsCount, setFunctionsCount] = useState(0);
    const [deleteFunction, setDeleteFunction] = useState(0);

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    const addFunction = useCallback(() => {
        funcsList[functionsCount] = new Function({ index: functionsCount });
        setFunctionsCount(functionsCount + 1);
    }, [setFunctionsCount, functionsCount, funcsList])

    const deleteFunctionHandler = useCallback((index) => {
        delFunc(index);
        setDeleteFunction(deleteFunction + 1);
    }, [delFunc, setDeleteFunction, deleteFunction]);


    return (
        <div className='graph2DUI'>
            {showPanel && <div className='funcs-menu'>
                <AddButton onClick={addFunction} />
                <FunctionList
                    list={funcsList.filter(func => func)}
                    delFunc={deleteFunctionHandler}
                />
            </div>
            }
            <button onClick={showHidePanel}>
                {showPanel ? '⇐' : '⇒'}
            </button>
        </div>
    )
}

export default Graph2DUI;