import { useState } from 'react';

import Header from './components/Header/Header';
import CalculatorComp from './components/Calculator/CalculatorComp';
import PolyCalculatorComp from './components/PolyCalculator/PolyCalculatorComp';
import Graph2D from './components/Graph2D/Graph2D';
import Graph3D from './components/Graph3D/Graph3D';

import './App.css'

const App = () => {
  const [showComponent, setShowComponent] = useState('Graph3D');

  const components = [
    {
      name: 'Graph2D',
      text: 'Графики',
    },
    {
      name: 'Calculator',
      text: 'Калькулятор',
    },
    {
      name: 'PolyCalculator',
      text: 'Полиномы',
    },
    {
      name: 'Graph3D',
      text: '3D Графика',
    }
  ];

  return (
    <div className='App'>
      <Header
        components={components}
        showComponent={setShowComponent}
        selectedComponent={showComponent}
      />
      {
        showComponent === 'Calculator' ? <CalculatorComp /> :
          showComponent === 'PolyCalculator' ? <PolyCalculatorComp /> :
            showComponent === 'Graph2D' ? <Graph2D /> :
              showComponent === 'Graph3D' ? <Graph3D /> :
                <></>
      }
    </div>
  )
}

export default App;