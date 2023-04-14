import React from "react";
import './Styles/Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showComponent = props.showComponent;
    }
    render() {
        return (<div className="header">
            <div className="menu-button" onClick={() => this.showComponent('graph2D')}>Графики</div>
            <div className="menu-button" onClick={() => this.showComponent('calculator')}>Калькулятор</div>
            <div className="menu-button" onClick={() => this.showComponent('polyCalculator')}>Полиномы</div>
            <div className="menu-button" onClick={() => this.showComponent('graph3D')}>3D Графика</div>
        </div>)
    }
}