# Resume Analyzer — Frontend

Angular frontend for the Resume Analyzer application. Allows users to upload a resume PDF and paste a job description to receive an AI-powered fit analysis.

## Live Demo

[https://resume-analyzer-frontend.netlify.app](https://resume-analyzer-frontend.netlify.app)

## Tech Stack

- **Framework:** Angular 17 (standalone components)
- **Language:** TypeScript
- **Styling:** SCSS
- **Deployment:** Netlify

## Features

- PDF resume upload with client-side validation
- Job description text input
- Loading overlay with spinner during AI processing
- Results dashboard with:
  - Fit score gauge (color-coded: green/amber/red)
  - Matched skills chips
  - Missing skills chips
  - Per-section feedback (Experience, Education, Skills)
  - AI summary
- "AI powered by Gemini" badge for transparency
- Retrieval of past analyses by ID from DynamoDB

## Project Structure
src/app/
core/
models/         # TypeScript interfaces (AnalysisResult)
services/       # HTTP service (AnalysisService)
features/
analyzer/       # Upload form component
results/        # Results dashboard component
shared/
components/     # Reusable UI components
environments/     # API URL configuration per environment

## Local Setup

### Prerequisites

- Node.js 18+
- Angular CLI 17+
- Backend running locally on port 3000

### Steps

```bash
git clone https://github.com/alfonsoleonm/resume-analyzer-frontend.git
cd resume-analyzer-frontend
npm install
ng serve
```

App runs at `http://localhost:4200`.

### Environment Configuration

The API URL is configured in `src/environments/`:

- `environment.ts` — production (points to Render backend)
- `environment.development.ts` — local development (points to localhost:3000)

## Deployment

Deployed on [Netlify](https://netlify.com) free tier with automatic deploys on every push to `main`.

Build command: `ng build`
Publish directory: `dist/resume-analyzer-frontend/browser`

## Related Repositories

- Backend: [resume-analyzer-backend](https://github.com/alfonsoleonm/resume-analyzer-backend)

## Planned Enhancements

- **Async polling** — Poll for results while Lambda processes the AI analysis in the background.
- **Analysis history** — Display a list of past analyses per user session.
- **Authentication** — Login with AWS Cognito for persistent user history.
- **PDF drag and drop** — Improved file upload UX.
- **Export results** — Download analysis as PDF report.
