import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from '@antv/g2';
import ReactDOM from 'react-dom';
import { Interaction, registerInteraction} from '@antv/g2';
import G2 from '@antv/g-canvas';

fetch('http://localhost:5000/api/scatter', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then(data => {
    console.log('Success:', data);
  const source = data.map((arr) => {
    return {
      reward: arr[0],
      loss: arr[1],
    };
  });
  
  const chart = new Chart({
    container: 'c3',
    width: 400,
    height: 400,

    padding:[20, 20, 50, 80],
  });
  chart.data(source);
  chart.scale({
    height: { nice: true },
    weight: { nice: true },
  });

  chart.axis('loss', {
    label: {
      formatter: text => {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    },
    title: {
      offset: 40,
      style: {
        fill: '#aaaaaa'
      },
    }
  });
  chart.axis('reward', {
    label: {
      formatter: text => {
        return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    },
    title: {
      offset: 40,
      style: {
        fill: '#aaaaaa'
      },
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    showContent: false,
    crosshairs: {
      type: 'xy',
      text: (type, defaultText, items) => {
        const color = items[0].color;
        if (type === 'x') {
          return {
            offset: 5,
            position: 'end',
            content: defaultText,
            style: {
              textAlign: 'center',
              textBaseline: 'top',
              fontSize: 14,
              fontWeight: 'bold',
            },
          };
        }
        return {
          offset: 5,
          content: defaultText ,
          style: {
            textAlign: 'end',
            fontSize: 14,
            fontWeight: 'bold',
          },
        };
      },
      textBackground: null,
    },
  });
  chart
  .point()
  .position('reward*loss')
  .color('#460659-#25828E-#3BBB75-#EBE51B')
  .size({values: [2]})
  .shape('circle')

  registerInteraction('drag-move', {
    start: [{ trigger: 'plot:mousedown', action: 'scale-translate:start' }],
    processing: [{ trigger: 'plot:mousemove', action: 'scale-translate:translate', throttle: {wait: 100, leading: true, trailing: false} }],
    end: [{ trigger: 'plot:mouseup', action: 'scale-translate:end' }],
  });
  chart.interaction('drag-move');
  chart.render();
});
