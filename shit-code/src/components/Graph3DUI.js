import React from "react";
import './Styles/Graph3DUI.css';

export default class Graph3DUI extends React.Component {
    constructor(props) {
        super(props);

        this.num = 0;
        this.showHidePoints = props.showHidePoints;
        this.showHideEdges = props.showHideEdges;
        this.showHidePolygons = props.showHidePolygons;
        this.showHideAnimation = props.showHideAnimation;
        this.showHideShadows = props.showHideShadows;
        this.addFigure = props.addFigure;

        this.state = { showPanel: false, showAddList: false }
    }

    showHidePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    showHideAddList() {
        this.setState({ showAddList: !this.state.showAddList });
    }

    addFigureHandler(event) {
        this.addFigure(event.target.dataset.figure, this.num);
        this.num++;
    }

    render() {
        return (<div className="graph3DUI">
            {this.state.showPanel && <div className="figures-menu">
                <div className="checkboxes">
                    <div>
                        <input id='points-checkbox' type="checkbox" onClick={(event) => {
                            this.showHidePoints(event.target.checked)
                        }} />
                        <label htmlFor="points-checkbox">Точки</label>
                    </div>
                    <div>
                        <input id='edges-checkbox' type="checkbox" onClick={(event) => {
                            this.showHideEdges(event.target.checked)
                        }} />
                        <label htmlFor="edges-checkbox">Рёбра</label>
                    </div>
                    <div>
                        <input id='polygons-checkbox' defaultChecked type="checkbox" onClick={(event) => {
                            this.showHidePolygons(event.target.checked)
                        }} />
                        <label htmlFor="polygons-checkbox">Полигоны</label>
                    </div>
                    <div>
                        <input id='animation-checkbox' type="checkbox" onClick={(event) => {
                            this.showHideAnimation(event.target.checked)
                        }} />
                        <label htmlFor="animation-checkbox">Анимация</label>
                    </div>
                    <div>
                        <input id='shadows-checkbox' type="checkbox" onClick={(event) => {
                            this.showHideShadows(event.target.checked)
                        }} />
                        <label htmlFor="shadows-checkbox">Тени</label>
                    </div>
                </div>
                <div className="add-button">
                    {this.state.showAddList ? <div onClick={() => this.showHideAddList()}>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Cube" className="figure-button">Куб</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Sphere" className="figure-button">Сфера</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Cone" className="figure-button">Конус</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Ellipsoid" className="figure-button">Эллипсоид</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Cylinder" className="figure-button">Цилиндр</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="ParabolicCylinder" className="figure-button">Параболический цилиндр</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="HyperbolicCylinder" className="figure-button">Гиперболический цилиндр</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="SingleCavityHyperboloid" className="figure-button">Однополостный гиперболоид</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="DoubleCavityHyperboloid" className="figure-button">Двуполостный гиперболоид</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="EllipticalParaboloid" className="figure-button">Эллиптический параболоид</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="HyperbolicParaboloid" className="figure-button">Гиперболический параболоид</div>
                        <div onClick={(event) => this.addFigureHandler(event)} data-figure="Tor" className="figure-button">Тор</div>
                    </div> :
                        <button onClick={() => this.showHideAddList()}>Добавить</button>
                    }
                </div>
            </div>}
            <button onClick={() => this.showHidePanel()}>
                {this.state.showPanel ? '<-' : '->'}
            </button>
            <div>

            </div>
        </div>)
    }
}