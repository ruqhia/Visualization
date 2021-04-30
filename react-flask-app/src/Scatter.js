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

    const chart = new Chart({
      container: 'c3',
      autoFit: false,
      height: 400,
      width:400,
      padding:[30, 20, 70, 60]
    });
    chart.data(data);
    chart.scale({
      x: { nice: true },
      y: { nice: true },
    });
    chart.axis("Reward", {
      title: {}
    });
    chart.axis("Risk", {
      title: {}
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
      .position('Reward*Risk')
      .color('plotType')
      .shape('circle')
      .size({values: [4]})
      .tooltip('plotType*Reward*Risk', (plotType,Reward,Loss) => {
        return { 
          name: plotType,
          value:'Reward:    '+ Reward +',    Loss:    '+ Loss
        };
      })
      .style({
        fillOpacity: 1
      });
    chart.interaction('legend-active');
    chart.interaction('brush');
    chart.render();
  });
