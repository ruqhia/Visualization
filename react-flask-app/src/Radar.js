import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { Interaction, registerInteraction} from '@antv/g2';
import G2 from '@antv/g-canvas';

const { DataView } = DataSet;
fetch('http://localhost:5000/api/radar', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then(data => {
    console.log(data)
    const { DataView } = DataSet;
    const chart = new Chart({
      container: 'c4',
      autoFit: true,
      height: 500,
    });    
    const dv = new DataView().source(data[3]);
    dv.transform({
      type: 'fold',
      fields: ['Mean+Deviation'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });
    const v1 = chart.createView({
    
    });
      
    v1.scale('score', {
      min: data[0],
      max: data[1],
    });
    v1.coordinate('polar', {
      radius: 0.8,
    });
    v1.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    });
    v1.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    });
    v1.data(dv.rows);
    v1
      .line()
      .position('item*score')
      .color('user')
      .size(2);
    v1
      .point()
      .position('item*score')
      .color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
      });
    v1
        .area({
            startOnZero: false
        })
      .position('item*score')
      .color('user')
      const dv3 = new DataView().source(data[2]);
      dv3.transform({
        type: 'fold',
        fields: ['Mean'], // 展开字段集
        key: 'user3', // key字段
        value: 'score3', // value字段
      });
      const v3 = chart.createView({
      
      });
        
      v3.scale('score3', {
        min: data[0],
        max: data[1],
      });
      v3.coordinate('polar', {
        radius: 0.8,
      });
      v3.axis('item', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      v3.axis('score3', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null,
            },
          },
        },
      });
      v3.data(dv3.rows);
      v3
        .line()
        .position('item*score3')
        .color('user3')
        .size(2);
      v3
        .point()
        .position('item*score3')
        .color('user3')
        .shape('circle')
        .size(4)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1,
        });
      v3
        .area({
            startOnZero: false
          })
        .position('item*score3')
        .color('user3')   

const dv2 = new DataView().source(data[4]);
dv2.transform({
  type: 'fold',
  fields: ['Mean-Deviation'], // 展开字段集
  key: 'user2', // key字段
  value: 'score2', // value字段
});
const v2 = chart.createView({

});

v2.scale('score2', {
  min: data[0],
  max: data[1],
});
v2.coordinate('polar', {
  radius: 0.8,
});
v2.axis('item', {
  line: null,
  tickLine: null,
  grid: {
    line: {
      style: {
        lineDash: null,
      },
    },
  },
});
v2.axis('score2', {
  line: null,
  tickLine: null,
  grid: {
    line: {
      type: 'line',
      style: {
        lineDash: null,
      },
    },
  },
});
v2.data(dv2.rows);
v2
.area({
    startOnZero: false
  })
  .position('item*score2')
  .color('#fff')
.style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: .9,
  });
v2
  .line()
  .position('item*score2')
  .color('user2')
  .size(2);
v2
  .point()
  .position('item*score2')
  .color('user2')
  .shape('circle')
  .size(4)
  .style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: 1,
  });
 

  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: '#333'
        }
      }
    }
  });
  
    
    chart.render();
});


