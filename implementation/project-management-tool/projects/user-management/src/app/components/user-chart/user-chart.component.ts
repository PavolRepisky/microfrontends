import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'user-chart',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.scss',
})
export class UserChartComponent {
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

    const labels = this.getLastMonths(12);

    const dataPoints = [22, 24, 25, 23, 27, 30, 28, 29, 31, 34, 36, 32];

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
              maxRotation: 45,
              minRotation: 45,
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
          mode: 'nearest',
          axis: 'x',
        },
      },
    });
  }

  private getLastMonths(count: number): string[] {
    const months = [];
    const now = new Date();

    for (let i = count - 1; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = monthDate.toLocaleString('default', { month: 'short' });
      months.push(`${monthStr}`);
    }

    return months;
  }
}
