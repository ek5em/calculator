import { useRef, useEffect } from 'react';

import useFiguresCallbacks from '../../../../hooks/useFiguresCallbacks';
import Cube from './Figures/CubeSettings';
import Sphere from './Figures/SphereSettings';
import Cone from './Figures/ConeSettings';
import Cylinder from './Figures/CylinderSettings';
import DoubleCavityHyperboloid from './Figures/DoubleCavityHyperboloidSettings';
import Ellipsoid from './Figures/EllipsoidSettings';
import EllipticalParaboloid from './Figures/EllipticalParaboloidSettings';
import HyperbolicCylinder from './Figures/HyperbolicCylinderSettings';
import HyperbolicParaboloid from './Figures/HyperbolicParaboloidSettings';
import ParabolicCylinder from './Figures/ParabolicCylinderSettings';
import SingleCavityHyperboloid from './Figures/SingleCavityHyperboloidSettings';
import Tor from './Figures/TorSettings';

import './FigureBlock.css';

const FigureBlock = ({ figure, deleteFigureHandler }) => {

    const callbacks = useFiguresCallbacks();

    const refX = useRef(null);
    const refY = useRef(null);
    const refZ = useRef(null);
    const refColor = useRef(null);

    useEffect(() => {
        refX.current.value = figure.centre.x ? figure.centre.x : '';
        refY.current.value = figure.centre.y ? figure.centre.y : '';
        refZ.current.value = figure.centre.z ? figure.centre.z : '';
        refColor.current.value = figure.color;
    })

    return (
        <>
            <span>{figure.name}</span>
            <div className='figure-centre'>
                <input
                    ref={refX}
                    className='input-centre'
                    type='number'
                    placeholder='x'
                    onChange={() => callbacks.changeX(figure, refX.current.value - 0)}
                />
                <input
                    ref={refY}
                    className='input-centre'
                    type='number'
                    placeholder='y'
                    onChange={() => callbacks.changeY(figure, refY.current.value - 0)}
                />
                <input
                    ref={refZ}
                    className='input-centre'
                    type='number'
                    placeholder='z'
                    onChange={() => callbacks.changeZ(figure, refZ.current.value - 0)}
                />

                <input
                    ref={refColor}
                    className='input-color'
                    type='color'
                    onChange={() => callbacks.changeColor(figure, refColor.current.value)}
                />
            </div>
            <div className='figure-options'>
                {
                    figure.name === 'Куб' ? <Cube callbacks={callbacks} figure={figure} /> :
                        figure.name === 'Сфера' ? <Sphere callbacks={callbacks} figure={figure} /> :
                            figure.name === 'Конус' ? <Cone callbacks={callbacks} figure={figure} /> :
                                figure.name === 'Цилиндр' ? <Cylinder callbacks={callbacks} figure={figure} /> :
                                    figure.name === 'Двуполостный гиперболоид' ? <DoubleCavityHyperboloid callbacks={callbacks} figure={figure} /> :
                                        figure.name === 'Эллипсоид' ? <Ellipsoid callbacks={callbacks} figure={figure} /> :
                                            figure.name === 'Эллиптический параболоид' ? <EllipticalParaboloid callbacks={callbacks} figure={figure} /> :
                                                figure.name === 'Гиперболический цилиндр' ? <HyperbolicCylinder callbacks={callbacks} figure={figure} /> :
                                                    figure.name === 'Гиперболический параболоид' ? <HyperbolicParaboloid callbacks={callbacks} figure={figure} /> :
                                                        figure.name === 'Параболический цилиндр' ? <ParabolicCylinder callbacks={callbacks} figure={figure} /> :
                                                            figure.name === 'Однополостный гиперболоид' ? <SingleCavityHyperboloid callbacks={callbacks} figure={figure} /> :
                                                                figure.name === 'Тор' ? <Tor callbacks={callbacks} figure={figure} /> :
                                                                    <></>
                }
            </div>
            <div
                className='delete-figure-button'
                onClick={() => deleteFigureHandler(figure.index)}
            >Удалить</div>
        </>
    )
}

export default FigureBlock;