import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnersService } from '../../services/partners.service';

@Component({
  selector: 'app-partner-details',
  imports: [],
  templateUrl: './partner-details.component.html',
  styleUrl: './partner-details.component.css'
})

export class PartnerDetailsComponent implements OnInit {
  partner: any = null;

  constructor(
    private route: ActivatedRoute,
    private partnersService: PartnersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['partnerId'];
      if (id) {
        this.getPartnerDetails(id);
      }
    });
  }

  getPartnerDetails(id: string): void {
    this.partnersService.getPartnerDetails(id).subscribe({
      next: (data) => this.partner = data,
      error: () => alert('Failed to load partner details')
    });
  }
}
