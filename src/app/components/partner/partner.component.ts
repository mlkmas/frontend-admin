// partner.component.ts
import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models/partner.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultImgDirective } from '../../directives/default-img.directive';
import { PartnerDetailsComponent } from './../partner-details/partner-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultImgDirective],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';

  constructor(private partnersService: PartnersService ,private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPartners();
  }

  getAllPartners() {
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

  showPartnerDetails(partnerId: string) {
    this.dialog.open(PartnerDetailsComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: { partnerId }, 
      panelClass: 'custom-dialog-container',
      disableClose: false // Allows closing by clicking outside
    });
  }

}