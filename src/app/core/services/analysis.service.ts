import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResult } from '../models/analysis.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  analyzeResume(file: File, jobDescription: string): Observable<AnalysisResult> {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analyze`, formData);
  }

  getAnalysis(id: string): Observable<AnalysisResult> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });
    return this.http.get<AnalysisResult>(`${this.apiUrl}/analysis/${id}`, { headers });
  }
}