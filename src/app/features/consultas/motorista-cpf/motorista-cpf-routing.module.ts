import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaMotoristaComponent } from './pages/consulta-motorista/consulta-motorista.component';

const routes: Routes = [{ path: '', component: ConsultaMotoristaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristaCpfRoutingModule { }
