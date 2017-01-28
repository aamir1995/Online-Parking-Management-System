import { Routes } from '@angular/router';

import { Containers, HomeContainer, SigninContainer, RootContainer, ResumeContainer, JobsContainer, CandidatesContainer, BookingsContainer, FeedbackContainer } from '../containers';
import { Components } from "../components";

// import AuthGuard service which will help to prevent users from entering homepage without authentication
import { AuthGuardService } from '../providers/index';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  , { path: "home", component: HomeContainer, canActivate: [AuthGuardService] }
  , { path: "signin", component: SigninContainer }
  , { path: "myBookings", component: BookingsContainer }
  , { path: "jobposting", component: JobsContainer }
  , { path: "feedback", component: FeedbackContainer }
  , { path: "appliedCandidates/:id", component: CandidatesContainer }
];

export const ApplicationComponents: any[] = [
  Containers
  , Components
];