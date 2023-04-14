import React from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import PolyCalculator from './components/PolyCalculator';
import Graph2D from './components/Graph2D';
import Graph3D from './components/Graph3D';
import './App.css'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showComponent: 'graph3D' };
  }

  render() {
    return (<div className='App'>
      <Header showComponent={name => this.showComponent(name)} />
      {
        this.state.showComponent === 'calculator' ? <Calculator /> :
          this.state.showComponent === 'polyCalculator' ? <PolyCalculator /> :
            this.state.showComponent === 'graph2D' ? <Graph2D /> :
              this.state.showComponent === 'graph3D' ? <Graph3D /> :
                <></>
      }
    </div>)
  }

  showComponent(name) {
    this.setState({ showComponent: name });
  }
}