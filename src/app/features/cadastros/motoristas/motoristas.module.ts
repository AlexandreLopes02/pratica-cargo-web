import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoristasRoutingModule } from './motoristas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MotoristaFormComponent } from './pages/motorista-form/motorista-form.component';
import { MotoristaListComponent } from './pages/motorista-list/motorista-list.component';

// ANGULAR MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MotoristaFormComponent, MotoristaListComponent
  ],
  imports: [
    CommonModule,
    MotoristasRoutingModule,
    ReactiveFormsModule,
    SharedModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MotoristasModule { }
