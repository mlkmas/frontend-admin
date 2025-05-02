import { Component } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { SystemStatistics } from '../../models/statistics.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})


export class StatisticsComponent {

  stats: SystemStatistics | null = null;
  isLoading = true;
  error: string | null = null;

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
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics';
        this.isLoading = false;
      }
    });
  }

  
  refresh(): void {
    this.loadStatistics();
  }
}
