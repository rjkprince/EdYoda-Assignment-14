import React, { Component } from 'react';
import classes from './Charts.module.css';
import { Line, HorizontalBar, Pie } from 'react-chartjs-2';
export default class Charts extends Component {
  returnChartData = () => {
    let datasets = this.props.label.map((item, pos) => {
      return {
        label: this.props.label[pos],
        data: this.props.data[pos],
        backgroundColor: this.props.colors,
        borderColor: this.props.colors[pos],
        fill: false,
        pointRadius: 0,
        hoverRadius: 4,
        barThickness: 4,
        hoverBackgroundColor: this.props.colors,
      };
    });
    return {
      labels: this.props.labels,
      datasets: datasets,
    };
  };
  returnChart = () => {
    switch (this.props.type) {
      case 'Line':
        return (
          <Line
            data={this.returnChartData()}
            options={{
              legend: {
                labels: {
                  fontColor: '#fff',
                },
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Hits',
                      fontColor: '#fff',
                    },
                    ticks: {
                      fontColor: 'fff',
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: 'fff',
                    },
                  },
                ],
              },
            }}
          />
        );

      case 'HBar':
        return (
          <HorizontalBar
            data={this.returnChartData()}
            options={{
              legend: {
                labels: {
                  fontColor: '#fff',
                },
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Hits',
                      fontColor: '#fff',
                    },
                    ticks: {
                      fontColor: 'fff',
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: 'fff',
                    },
                  },
                ],
              },
            }}
          />
        );

      case 'Pie':
        return (
          <Pie
            data={this.returnChartData()}
            options={{
              legend: {
                labels: {
                  fontColor: '#fff',
                },
              },
            }}
          />
        );
    }
  };
  render() {
    return <div className={classes.Charts}>{this.returnChart()}</div>;
  }
}
