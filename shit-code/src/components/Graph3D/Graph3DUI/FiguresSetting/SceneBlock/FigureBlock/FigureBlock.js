import { useRef, useEffect } from 'react';

import Cube from './Figures/Cube';
import Sphere from './Figures/Sphere';
import Cone from './Figures/Cone';
import Cylinder from './Figures/Cylinder';
import DoubleCavityHyperboloid from './Figures/DoubleCavityHyperboloid';
import Ellipsoid from './Figures/Ellipsoid';
import EllipticalParaboloid from './Figures/EllipticalParaboloid';
import HyperbolicCylinder from './Figures/HyperbolicCylinder';
import HyperbolicParaboloid from './Figures/HyperbolicParaboloid';
import ParabolicCylinder from './Figures/ParabolicCylinder';
import SingleCavityHyperboloid from './Figures/SingleCavityHyperboloid';
import Tor from './Figures/Tor';

import './FigureBlock';

const FigureBlock = ({ figure, callbacks, deleteFigureHandler }) => {

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
            <div className='figure-center'>
                <input
                    ref={refX}
                    type='number'
                    placeholder='x'
                    onChange={() => callbacks.changeX(figure, refX.current.value - 0)}
                />
                <input
                    ref={refY}
                    type='number'
                    placeholder='y'
                    onChange={() => callbacks.changeY(figure, refY.current.value - 0)}
                />
                <input
                    ref={refZ}
                    type='number'
                    placeholder='z'
                    onChange={() => callbacks.changeZ(figure, refZ.current.value - 0)}
                />
                <input
                    ref={refColor}
                    type='color'
                    onChange={() => callbacks.changeColor(figure, refColor.current.value)}
                />
            </div>
            <div className='figure-options'>
                {
                    figure.name === 'Cube' ? <Cube callbacks={callbacks} figure={figure} /> :
                        figure.name === 'Sphere' ? <Sphere callbacks={callbacks} figure={figure} /> :
                            figure.name === 'Cone' ? <Cone callbacks={callbacks} figure={figure} /> :
                                figure.name === 'Cylinder' ? <Cylinder callbacks={callbacks} figure={figure} /> :
                                    figure.name === 'DoubleCavityHyperboloid' ? <DoubleCavityHyperboloid callbacks={callbacks} figure={figure} /> :
                                        figure.name === 'Ellipsoid' ? <Ellipsoid callbacks={callbacks} figure={figure} /> :
                                            figure.name === 'EllipticalParaboloid' ? <EllipticalParaboloid callbacks={callbacks} figure={figure} /> :
                                                figure.name === 'HyperbolicCylinder' ? <HyperbolicCylinder callbacks={callbacks} figure={figure} /> :
                                                    figure.name === 'HyperbolicParaboloid' ? <HyperbolicParaboloid callbacks={callbacks} figure={figure} /> :
                                                        figure.name === 'ParabolicCylinder' ? <ParabolicCylinder callbacks={callbacks} figure={figure} /> :
                                                            figure.name === 'SingleCavityHyperboloid' ? <SingleCavityHyperboloid callbacks={callbacks} figure={figure} /> :
                                                                figure.name === 'Tor' ? <Tor callbacks={callbacks} figure={figure} /> :
                                                                    <></>
                }
            </div>
            <button
                className='delete-figure-button'
                onClick={() => deleteFigureHandler(figure.index)}
            >x</button>
        </>
    )
}

export default FigureBlock;