import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisService } from '../../core/services/analysis.service';

@Component({
    selector: 'app-analyzer',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './analyzer.component.html',
    styleUrl: './analyzer.component.scss',
})
export class AnalyzerComponent {
    selectedFile: File | null = null;
    jobDescription: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private analysisService: AnalysisService,
        private router: Router
    ) { }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    onSubmit(): void {
        if (!this.selectedFile || !this.jobDescription.trim()) {
            this.errorMessage = 'Please upload a resume and enter a job description.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.analysisService.analyzeResume(this.selectedFile, this.jobDescription).subscribe({
            next: (result) => {
                this.isLoading = false;
                this.router.navigate(['/results', result.analysisId]);
            },
            error: () => {
                this.isLoading = false;
                this.errorMessage = 'Something went wrong. Please try again.';
            },
        });
    }
}