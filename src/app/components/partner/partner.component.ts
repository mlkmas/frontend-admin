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
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule, DefaultImgDirective,MatIconModule],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';
  actionInProgress: string | null = null;
  searchControl = new FormControl('');
  originalPartners: Partner[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private partnersService: PartnersService ,private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPartners();
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.applyFilters());
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
        this.originalPartners = [...this.partners];
        this.applyFilters();
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

  
  applyFilters(): void {
    let filtered = [...this.originalPartners];
    
    // Apply search
    if (this.searchControl.value) {
      const term = this.searchControl.value.toLowerCase();
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(term) ||
        partner.email.toLowerCase().includes(term) ||
        (!partner.isApproved ? 'pending' : partner.isSuspended ? 'suspended' : 'active').includes(term)
      );
    }

    // Apply sorting
    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof Partner]?.toString().toLowerCase() || '';
        const bValue = b[this.sortColumn as keyof Partner]?.toString().toLowerCase() || '';
        const compare = aValue.localeCompare(bValue);
        return this.sortDirection === 'asc' ? compare : -compare;
      });
    }

    this.partners = filtered;
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.partners = [...this.originalPartners];
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  
  
}