import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastrosRoutingModule } from './cadastros-routing.module';

import { MotoristaListComponent } from './motoristas/pages/motorista-list/motorista-list.component';
import { MotoristaFormComponent } from './motoristas/pages/motorista-form/motorista-form.component';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule
  ]
})
export class CadastrosModule { }
