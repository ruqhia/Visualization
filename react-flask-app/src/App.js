import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Scatter} from './Scatter';
import {Radar} from './Radar';
import {HeatmapWithSlider} from './HeatmapWithSlider';
import {HeatmapWithWeightSlider} from './HeatmapWithWeightSlider';

// import Loss from './loss'
// import rewardLoss from './rewardLoss'
import { Chart } from '@antv/g2';



// function App() {

//   fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
//   .then((res) => res.json())
//   .then((data) => {
//     const heatmapPlot = new Heatmap(document.getElementById('container'), {
//       width: 1200,
//       height: 575,
//       autoFit: false,
//       data,
//       xField: 'Month of Year',
//       yField: 'District',
//       colorField: 'AQHI',
//       color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
//       meta: {
//         'Month of Year': {
//           type: 'cat',
//         },
//       },
//     });
//     heatmapPlot.render();
//   });
// return null;
// }

// export default App;


function App() {
  
  return (
    <div className="App">


    {/* <Loss display-text="hello"/> */}
    {/* <p>Reward</p>
    <p>Loss</p>
    <p>Reward and Loss</p> */}
    </div>
  );
}

export default App;





// function App() {
  // const [placeholder, setPlaceholder] = useState('Hi');

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/hello').then(res => res.json()).then(data => {
  //     console.log(data.result);
  //     setPlaceholder(data.result);
  //   });
  // }, []);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <p>Flask says {placeholder}</p>
  //     </header>
  //   </div>
  // );
// }

