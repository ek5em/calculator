import useFiguresNames from '../../../hooks/useFiguresNames';

import './FiguresList.css';

const FiguresList = ({ onClick }) => {
    return (
        <div className='figures-list'>
            <div>
                {useFiguresNames().map((figure, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => onClick(figure.text)}
                            className='figure-button'>
                            {figure.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FiguresList;