import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaCnpjRoutingModule } from './empresa-cnpj-routing.module';
import { ConsultaEmpresaComponent } from './pages/consulta-empresa/consulta-empresa.component';
import { ReactiveFormsModule } from '@angular/forms';


// ANGULAR MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ConsultaEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaCnpjRoutingModule,
    ReactiveFormsModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class EmpresaCnpjModule { }
