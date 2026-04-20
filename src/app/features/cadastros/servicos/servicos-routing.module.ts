import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoListComponent } from './pages/servico-list/servico-list.component';
import { ServicoFormComponent } from './pages/servico-form/servico-form.component';

const routes: Routes = [
  { path: '', component: ServicoListComponent},
  { path: 'novo', component: ServicoFormComponent},
  { path: ':id/editar', component: ServicoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
