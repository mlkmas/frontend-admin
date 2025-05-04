import { Component, ViewChild  } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { SystemStatistics } from '../../models/statistics.model';
import { CommonModule } from '@angular/common';
import { IgxCategoryChartModule, IgxCategoryChartComponent } from 'igniteui-angular-charts';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule,IgxCategoryChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})


export class StatisticsComponent {

  stats: SystemStatistics | null = null;
  isLoading = true;
  error: string | null = null;
  chartData: any[] = [];
  chartColors: string[] = [];

  @ViewChild('chart', { static: true }) chart!: IgxCategoryChartComponent;

  constructor(private partnersService: PartnersService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.isLoading = true;
    this.error = null;
    
    this.partnersService.getSystemStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.prepareChartData();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        this.isLoading = false;
      }
    });
  }

prepareChartData(): void {
  if (!this.stats) return;
  
  this.chartData = [
    { Label: 'Customers', Value: this.stats.customersNumber },
    { Label: 'Partners', Value: this.stats.partnersNumber },
    { Label: 'Cars', Value: this.stats.carsNumber },
    { Label: 'Total Reserv', Value: this.stats.totalReservations },
    { Label: 'Problematic', Value: this.stats.problematicReservations },
    { Label: 'Closed', Value: this.stats.closedReservations }
  ];

  // Fixed color array - must match data order
  this.chartColors = ['#5A8DEE', '#FDAC41', '#39DA8A', '#FF5B5B', '#FFC107', '#28A745'];
  
  // Force chart refresh
  setTimeout(() => {
    if (this.chart) {
      this.chart.notifyInsertItem(this.chartData, 0, this.chartData.length);
    }
  });
}
  refresh(): void {
    this.loadStatistics();
  }
}
