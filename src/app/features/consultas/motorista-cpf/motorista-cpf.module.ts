import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristaCpfRoutingModule } from './motorista-cpf-routing.module';
import { ConsultaMotoristaComponent } from './pages/consulta-motorista/consulta-motorista.component';
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
    ConsultaMotoristaComponent
  ],
  imports: [
    CommonModule,
    MotoristaCpfRoutingModule,
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
export class MotoristaCpfModule { }
