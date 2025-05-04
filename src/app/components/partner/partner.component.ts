// partner.component.ts
import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models/partner.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultImgDirective } from '../../directives/default-img.directive';
import { PartnerDetailsComponent } from './../partner-details/partner-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultImgDirective,MatIconModule],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';
  actionInProgress: string | null = null;
  
  constructor(private partnersService: PartnersService ,private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPartners();
  }

  getAllPartners() {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.partnersService.getAllPartners().subscribe({
      next: (data: Partner[]) => {
        this.partners = data.map(partner => ({
          ...partner,
          name: partner.name || 'No Name',
          email: partner.email || 'No Email',
          phoneNumber: partner.phoneNumber || 'No Phone'
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load partners.';
        this.isLoading = false;
      }
    });
  }

  togglePartnerStatus(partner: Partner) {
    if (this.actionInProgress) return; // Prevent multiple clicks
    
    this.actionInProgress = partner.id;
    
    const operation = !partner.isApproved 
      ? this.partnersService.approvePartner(partner.id, true)
      : this.partnersService.suspendPartner(partner.id, !partner.isSuspended);

    operation.subscribe({
      next: () => {
        if (!partner.isApproved) {
          partner.isApproved = true;
          partner.isSuspended = false;
        } else {
          partner.isSuspended = !partner.isSuspended;
        }
        this.actionInProgress = null;
      },
      error: (error) => {
        console.error('Error updating partner status:', error);
        this.errorMessage = `Failed to ${!partner.isApproved ? 'approve' : partner.isSuspended ? 'reactivate' : 'suspend'} partner.`;
        this.actionInProgress = null;
      }
    });
  }


  getButtonText(partner: Partner): string {
    if (!partner.isApproved) return 'Approve';
    return partner.isSuspended ? 'Reactivate' : 'Suspend';
  }

  getButtonClass(partner: Partner): string {
    if (!partner.isApproved) return 'btn-success';
    return partner.isSuspended ? 'btn-info' : 'btn-warning';
  }
  showPartnerDetails(partner: Partner) {
    const dialogRef = this.dialog.open(PartnerDetailsComponent, {
      width: '900px',
      maxWidth: '900',
      maxHeight: '90vh',
      data: { partner }, // Pass the entire partner object
      panelClass: 'custom-dialog-container',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}