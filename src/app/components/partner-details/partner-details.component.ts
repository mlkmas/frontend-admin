import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnersService } from '../../services/partners.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PartnerDetails } from '../../models/partner-details.model';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-partner-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule 
  ],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {
  partner: PartnerDetails | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partnerId: string },
    private partnersService: PartnersService
  ) {
    this.loadPartnerDetails();
  }
  loadPartnerDetails(): void {
    this.isLoading = true;
    this.error = null;
  
    this.partnersService.getPartnerDetails(this.data.partnerId).subscribe({
      next: (data) => {
        console.log('Received data:', data); // Debug log
        this.partner = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Full error chain:', err);
        this.error = typeof err === 'string' ? err : 
          'Failed to load details. Check console for details.';
        this.isLoading = false;
      }
    });
  }

  retry(): void {
    this.loadPartnerDetails();
  }
}