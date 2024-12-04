import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Corrigido

// Importando funções do Firebase SDK 9+ (módulo)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

import { environment } from 'src/environments/environment';

// Suas Páginas
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { DetailsPage } from './details/details.page';
import { HomeDeferPage } from './home-defer/home-defer.page';
import { SettingsPage } from './settings/settings.page';
import { CriarPage } from './criar/criar.page';
import { ContaPage } from './conta/conta.page';

// Inicialize o Firebase aqui
const firebaseApp = initializeApp(environment.firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home-defer',
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then(m => m.DetailsPage)
  },
  {
    path: 'home-defer',
    loadComponent: () => import('./home-defer/home-defer.page').then(m => m.HomeDeferPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'criar',
    loadComponent: () => import('./criar/criar.page').then(m => m.CriarPage)
  },
  {
    path: 'conta',
    loadComponent: () => import('./conta/conta.page').then(m => m.ContaPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Adicionado
    AngularFireAuthModule // Adicionado
  ],
  exports: [RouterModule],
  providers: [
    // Fornecer as instâncias do Firebase para o resto da aplicação
    { provide: 'firebaseApp', useValue: firebaseApp },
    { provide: 'auth', useValue: auth },
    { provide: 'firestore', useValue: firestore },
    { provide: 'analytics', useValue: analytics },
  ]
})
export class AppRoutes {}
