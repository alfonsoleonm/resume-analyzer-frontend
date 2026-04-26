import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from '../../core/services/analysis.service';
import { AnalysisResult } from '../../core/models/analysis.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  result: AnalysisResult | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: AnalysisService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.analysisService.getAnalysis(id).subscribe({
      next: (data) => {
        this.result = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'Could not load analysis. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  getScoreColor(): string {
    if (!this.result) return '#6b7280';
    if (this.result.fitScore >= 75) return '#22c55e';
    if (this.result.fitScore >= 50) return '#f59e0b';
    return '#ef4444';
  }

  getScoreLabel(): string {
    if (!this.result) return '';
    if (this.result.fitScore >= 75) return 'Strong fit';
    if (this.result.fitScore >= 50) return 'Moderate fit';
    return 'Low fit';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}