import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'motoristas', pathMatch: 'full' },
  { path: 'motoristas', loadChildren: () => import('./motoristas/motoristas.module').then(m => m.MotoristasModule) },
  { path: 'empresas', loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule) },
  { path: 'servicos', loadChildren: () => import('./servicos/servicos.module').then((m) => m.ServicosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule { }
