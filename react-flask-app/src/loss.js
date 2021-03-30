import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from '@antv/g2';
import ReactDOM from 'react-dom';
import { Interaction, registerInteraction} from '@antv/g2';
import G2 from '@antv/g-canvas';

 
  const data = { weight:.1 };
  fetch('http://localhost:5000/api/hello', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .then(data => {
    console.log('Success:', data);
  const source = data.map((arr) => {
    return {
      name: arr[0],
      day: arr[1],
      value: arr[2],
      xVal: arr[3],
      yVal:arr[4],
      target:arr[5]
    };
  });
  
  const chart = new Chart({
    container: 'c1',
    width: 400,
    height: 400,

    padding:[20, 20, 50, 20],
  });
  chart.data(source);


  chart.scale('name', {
    type: 'cat',
      min: 0,
      max: 1,
    values:  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  });
  chart.scale('day', {
    type: 'cat',
        min: 0,
      max: 1,
    values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  });
  chart.scale('value', {
    nice: true,
  });
  
  chart.axis('name', {
    tickLine: null,
    grid: {
      alignTick: false,
      line: {
        style: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
      },
    },
  });
  
  chart.axis('day', {
    title: null,
    grid: {
      alignTick: false,
      line: {
        style: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
      },
    },
  });


  chart.removeInteraction('continuous-visible-filter');
  chart.removeInteraction('continuous-filter');

  chart
    .polygon()
    .position('name*day')
    .color('value', '#460659-#25828E-#3BBB75-#EBE51B')

  
    chart.legend({
      min:0,
      max:1,
    });


  registerInteraction('slider', {
    start: [{ trigger: 'legend:valuechanged', 
    
    action: context => {
      console.log("he");
    },
    }],
    end:[{trigger: 'legend:dragend',
    action: context => {
      console.log("Hi")
      var weight=((context.getCurrentPoint()).x-150)/100;
      console.log(weight);
      if(weight>1)
        weight=1;
      if(weight<0)
        weight=0;
      const data2 = {weight:weight};
      fetch('http://localhost:5000/api/hello', {
        method: 'POST', // or 'PUT'
    
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
      .then((res) => res.json())
      .then(data => {

        const source2 = data.map((arr) => {
          return {
            name: arr[0],
            day: arr[1],
            value: arr[2],
            xVal: arr[3],
            yVal:arr[4],
            target:arr[5]
          };
        });
        chart.changeData(source2);

      });

    }
  
  
  }]

  });

  registerInteraction('slider2', {
    start: [{ trigger: 'plot:click', 
    
    action: context => {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
      .then(res => res.json())
      .then(data => {
        const chart = new Chart({
          container: 'c1',
          autoFit: false,
          height: 500,
          width: 500
        });
        // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
        chart.data(data);
        chart.scale({
          height: { nice: true },
          weight: { nice: true },
        });
        chart.tooltip({
          showTitle: false,
          showCrosshairs: true,
          crosshairs: {
            type: 'xy',
          },
          itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
            + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
            + '{name}<br/>'
            + '{value}'
            + '</li>'
        });
        chart
          .point()
          .position('height*weight')
          .color('gender')
          .shape('circle')
          .tooltip('gender*height*weight', (gender, height, weight) => {
            return {
              name: gender,
              value: height + '(cm), ' + weight + '(kg)'
            };
          })
          .style({
            fillOpacity: 0.85
          });
        chart.interaction('legend-highlight');
        chart.render();
      });
      
    },
    }],

  });
  chart.tooltip({
    showMarkers: true,
  });
  chart.interaction('slider');
  chart.interaction('slider2');
  chart
  .point()
  .position('xVal*yVal')
  .color('#460659-#25828E-#3BBB75-#EBE51B')
  .size({values: [3]})
  .shape('circle')

  chart.axis('target',false);
  chart.axis('xVal',false);
  chart.axis('yVal',false);

  chart.interaction('element-active');
  chart.render();
});

///register action
//look at file for datafilter
///register interaction