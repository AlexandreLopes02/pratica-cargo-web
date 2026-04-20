import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 1) rotas mais específicas primeiro
  { path: 'app', loadChildren: () => import('./features/layout/layout.module').then(m => m.LayoutModule) },

  // 2) depois o auth no vazio
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },

  // 3) wildcard por último
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
