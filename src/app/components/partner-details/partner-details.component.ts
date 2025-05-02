import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnersService } from '../../services/partners.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Partner } from '../../models/partner.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { PartnerDetails } from '../../models/partner-details.model';
@Component({
  selector: 'app-partner-details',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {
  partner: Partner; // Changed from basicPartner to just partner
  extraDetails: PartnerDetails | null = null;
  isLoading = false; // Since we're passing data directly, no initial loading needed
  isLoadingExtra = false;
  error: string | null = null;
  showExtraDetails = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partner: Partner },
    private partnersService: PartnersService
  ) {
    this.partner = data.partner;
  }

  loadExtraDetails(): void {
    if (this.extraDetails) {
      this.showExtraDetails = !this.showExtraDetails;
      return;
    }

    this.isLoadingExtra = true;
    this.error = null;
    
    this.partnersService.getPartnerExtraDetails(this.partner.id).subscribe({
      next: (data) => {
        this.extraDetails = data;
        this.showExtraDetails = true;
        this.isLoadingExtra = false;
      },
      error: (err) => {
        console.error('Error loading extra details:', err);
        this.error = 'Failed to load extra details. Please try again.';
        this.isLoadingExtra = false;
      }
    });
  }

  retry(): void {
    this.loadExtraDetails();
  }
}