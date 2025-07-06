import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-grafico',
  imports: [],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent {
  @ViewChild('userChartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private usuarioService: UsuarioService) {}

  ngAfterViewInit(): void {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    /*this.usuarioService.getUsuariosPorMes().subscribe(result => {
  
      const dataPorMes = new Array(12).fill(0);
  
      result.forEach((item: { mes: string, cantidad: number }) => {
        const index = meses.indexOf(item.mes);
        if (index !== -1) {
          dataPorMes[index] = item.cantidad;
        }
      });
  
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: meses,
          datasets: [{
            label: 'Usuarios registrados',
            data: dataPorMes,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      }); */
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: meses,
          datasets: [{
            label: 'Usuarios registrados',
            data: [100, 150, 200, 250, 300, 250, 300, 350, 400, 400, 500, 450],
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
    });
  }
}
