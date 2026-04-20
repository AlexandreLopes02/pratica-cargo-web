import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ { path: '', redirectTo: 'empresa', pathMatch: 'full' },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./empresa-cnpj/empresa-cnpj.module').then(m => m.EmpresaCnpjModule),
  },
  {
    path: 'motorista',
    loadChildren: () =>
      import('./motorista-cpf/motorista-cpf.module').then(m => m.MotoristaCpfModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
