import { Routes } from '@angular/router';
import { AnalyzerComponent } from './features/analyzer/analyzer.component';
import { ResultsComponent } from './features/results/results.component';

export const routes: Routes = [
    { path: '', component: AnalyzerComponent },
    { path: 'results/:id', component: ResultsComponent },
    { path: '**', redirectTo: '' },
];