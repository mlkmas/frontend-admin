import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models/partner.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner',
  imports: [CommonModule],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.css'
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private partnersService: PartnersService) {}

  ngOnInit() {
    this.getAllPartners();
  }

  getAllPartners() {
    this.partnersService.getAllPartners().subscribe(
      (data: Partner[]) => {
        this.partners = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load partners.';
        this.isLoading = false;
      }
    );
  }
}


