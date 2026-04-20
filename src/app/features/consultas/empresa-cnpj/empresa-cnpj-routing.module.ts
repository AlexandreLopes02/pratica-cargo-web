import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaEmpresaComponent } from './pages/consulta-empresa/consulta-empresa.component';

const routes: Routes = [{ path: '', component: ConsultaEmpresaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaCnpjRoutingModule { }
