import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './pages/shell/shell.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'cadastros',
        loadChildren: () => import('../cadastros/cadastros.module').then(m => m.CadastrosModule)
      },
      {
        path: 'consultas',
        loadChildren: () => import('../consultas/consultas.module').then(m => m.ConsultasModule)
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('../relatorios/relatorios.module').then(m => m.RelatoriosModule),
      },
      {
        path: 'configuracoes',
        loadChildren: () =>
          import('../configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
