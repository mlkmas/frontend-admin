import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnersService } from '../../services/partners.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { Partner } from '../../models/partner.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { PartnerDetails } from '../../models/partner-details.model';
import { Package, Question } from '../../models/package.model';
import { DefaultImgDirective } from '../../directives/default-img.directive';
import { MatDialog } from '@angular/material/dialog';
import { PackageManagementComponent } from '../package-management/package-management.component';

@Component({
  selector: 'app-partner-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule, 
    DefaultImgDirective
  ],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent {
  partner: Partner; 
  extraDetails: PartnerDetails | null = null;
  isLoading = false;
  isLoadingExtra = false;
  error: string | null = null;
  showExtraDetails = false;
  showPackages = false;
  packages: Package[] = [];
  packageLoading = false;
  packageError: string | null = null;
  selectedPackage: Package | null = null;
  newQuestionText = '';
  defaultImage: string = 'assets/defaultImg.jpg';
  questionAdded = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partner: Partner },
    private partnersService: PartnersService,
    private dialog: MatDialog  // Add this
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
  loadPackages(): void {
    this.isLoading = true;
    this.partnersService.getPartnerPackages(this.partner.id).subscribe({
      next: (data) => {
        this.packages = data; // This will now be PackageModel[]
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load packages';
        this.isLoading = false;
      }
    });
  }
  
  togglePackageView(): void {
    this.showPackages = !this.showPackages;
    if (this.showPackages && this.packages.length === 0) {
      this.loadPackages();
    }
  }
  
  addQuestion(): void {
    if (!this.selectedPackage || !this.newQuestionText) return;
  
    const newQuestion: Question = {
      id: this.generateGuid(),
      text: this.newQuestionText,
      type: 0,
      expectedAnswer: '',
      mandatory: true
    };
  
    this.selectedPackage.questions.push(newQuestion);
  
    this.partnersService.updatePackageQuestions(
      this.partner.id,
      this.selectedPackage.id,
      this.selectedPackage.questions
    ).subscribe({
      next: () => {
        this.newQuestionText = '';
        alert('Question added successfully!');
      },
      error: () => {
        alert('Failed to save question. Please try again.');
      }
    });
  }
  
  removeQuestion(pkg: Package, id: string): void {
    pkg.questions = pkg.questions.filter(q => q.id !== id);
    this.partnersService.updatePackageQuestions(this.partner.id, pkg.id, pkg.questions).subscribe();
  }

  openPackageManagement(): void {
    this.dialog.open(PackageManagementComponent, {
      width: '800px',
      data: { partnerId: this.partner.id }
    });
  }
  
  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}