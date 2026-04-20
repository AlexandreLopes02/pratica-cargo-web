import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotoristaListComponent } from './pages/motorista-list/motorista-list.component';
import { MotoristaFormComponent } from './pages/motorista-form/motorista-form.component';

const routes: Routes = [
  { path: '', component: MotoristaListComponent },
  { path: 'novo', component: MotoristaFormComponent },
  { path: ':id/editar', component: MotoristaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristasRoutingModule { }
