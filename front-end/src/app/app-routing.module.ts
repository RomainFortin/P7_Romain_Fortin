import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  LoginComponent
} from './auth/login/login.component';
import {
  SignupComponent
} from './auth/signup/signup.component';
import {
  HomeComponent
} from './home/home.component';
import {
  ForumComponent
} from './forum/forum.component';
import {
  ProfileComponent
} from './profile/profile.component';
import {
  SettingsComponent
} from './profile/settings/settings.component';
import {
  NotfoundComponent
} from './notfound/notfound.component';
import {
  ProfileSettingsComponent
} from './profile/settings/profile-settings/profile-settings.component';
import {
  DeactivateComponent
} from './profile/settings/deactivate/deactivate.component';
import {
  TopicViewComponent
} from './forum/topicView/topicView.component';
import { TermsComponent } from './terms/terms.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './services/auth-guard.service';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [{
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Groupomania - Inscription'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Groupomania - Connexion'
    }
  },
  {
    path: 'terms',
    component: TermsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - CGU'
    }
  },{
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - A propos'
    }
  },

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - Accueil'
    }
  },
  {
    path: 'forum',
    component: ForumComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - Forum'
    }
  },
  {
    path: 'forum/topic/:id',
    component: TopicViewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - Forum'
    }
  },

  {
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Groupomania - Profil'
    },
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Groupomania - Profil'
        }, children: [
          {
            path: 'profile-settings',
            component: ProfileSettingsComponent
          },
          {
            path: 'deactivate',
            component: DeactivateComponent
          }
        ]
      }
    ]
  },
  {
    path: '404',
    component: NotfoundComponent,
    data: {
      title: 'Groupomania - 404'
    }
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
