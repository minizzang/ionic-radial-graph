import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import result from './result_sample.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  radarChart: any;
  result = result;
  
  constructor() {}

  ngAfterViewInit(): void {
    this.drawRadarChart();
  }

  drawRadarChart() {
    const userData = Object.keys(result.resultData)
      .filter(key => key !== 'sebum')
      .map(key => result.resultData[key as keyof typeof result.resultData]);
    const meanData = Object.keys(result.averageData)
      .filter(key => key !== 'sebum')
      .map(key => result.averageData[key as keyof typeof result.averageData]);

    const data = {
      labels: ['수분˙탄력', '모공', '주름', '피부톤', '민감도'],
      datasets: [{
        // user data
        data: userData,
        borderWidth: 1,
        backgroundColor: 'rgba(50, 224, 172, 0.2)',
        borderColor: 'rgba(50, 224, 172, 1)',
        pointBackgroundColor: 'rgba(50, 224, 172, 1)',
      },
      {
        // mean data
        data: meanData,
        borderWidth: 1,
        backgroundColor: 'rgba(106, 52, 255, 0.2)',
        borderColor: 'rgba(106, 52, 255, 1)',
        pointBackgroundColor: 'rgba(106, 52, 255, 1)',
      }]
    };
    this.radarChart = new Chart( this.chartCanvas.nativeElement, {
      type: 'radar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          }
        },
        scales: {
          r: {
            ticks : {
              display: false,
              stepSize: 25,
            },
            max: 100,
            min: 0,
            grid: {
              color: 'rgba(154, 154, 154, 1)',
              lineWidth: 0.3,
            },
            angleLines: {
              color: 'rgba(154, 154, 154, 1)',
              lineWidth: 0.3,
            },
            pointLabels: {
              display: false
            }
          }
        }
      }
    })
  }
}
