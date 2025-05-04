import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnersService } from '../../services/partners.service';
import { Package, Question } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-package-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css']
})
export class PackageManagementComponent {
  packages: Package[] = [];
  displayedColumns: string[] = ['name', 'price', 'actions'];
  questionsDisplayedColumns: string[] = ['text', 'type', 'actions'];
  isLoading = false;
  error: string | null = null;
  newQuestionText = '';
  selectedPackage: Package | null = null;
  newPackage: Partial<Package> = {
    packageName: '',
    currency: 'USD',
    active: true,
    questions: [],
    serviceProducts: [],
    stockProducts: [],
    regionDTOs: []
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partnerId: string },
    private partnersService: PartnersService,
    private dialogRef: MatDialogRef<PackageManagementComponent>
  ) {
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.partnersService.getPartnerPackages(this.data.partnerId).subscribe({
      next: (data) => {
        this.packages = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load packages';
        this.isLoading = false;
      }
    });
  }

  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
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
    this.newQuestionText = '';
  }

  removeQuestion(questionId: string): void {
    if (!this.selectedPackage) return;
    this.selectedPackage.questions = this.selectedPackage.questions.filter(q => q.id !== questionId);
  }

  saveQuestions(): void {
    if (!this.selectedPackage) return;
    
    this.isLoading = true;
    this.partnersService.updatePackageQuestions(
      this.data.partnerId,
      this.selectedPackage.id,
      this.selectedPackage.questions
    ).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to save questions';
        this.isLoading = false;
      }
    });
  }

  addNewPackage(): void {
    this.isLoading = true;
    this.partnersService.addPartnerPackage(this.data.partnerId, this.newPackage as Package)
      .subscribe({
        next: () => {
          this.loadPackages();
          this.newPackage = {
            packageName: '',
            currency: 'USD',
            active: true,
            questions: [],
            serviceProducts: [],
            stockProducts: [],
            regionDTOs: []
          };
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to add package';
          this.isLoading = false;
        }
      });
  }

  removePackage(packageId: string): void {
    this.isLoading = true;
    this.partnersService.removePackage(this.data.partnerId, packageId)
      .subscribe({
        next: () => {
          this.loadPackages();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to remove package';
          this.isLoading = false;
        }
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