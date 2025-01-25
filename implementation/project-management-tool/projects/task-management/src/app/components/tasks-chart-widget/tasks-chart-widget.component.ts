import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'tasks-chart-widget',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './tasks-chart-widget.component.html',
  styleUrl: './tasks-chart-widget.component.scss',
})
export class TasksChartWidgetComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart!: Chart;

  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'short' });
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const labels = Array.from(
      { length: daysInMonth },
      (_, i) => `${currentMonth} ${i + 1}`
    );

    const dataPoints = [
      12, 13, 15, 18, 20, 21, 20, 18, 16, 16, 17, 19, 21, 22, 22, 20, 19, 19,
      20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 31, 30,
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: dataPoints,
          fill: true,
          borderColor: 'rgba(13, 110, 253, 1)',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          tension: 0.2,
          pointRadius: 1,
          pointHoverRadius: 6,
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }
}
