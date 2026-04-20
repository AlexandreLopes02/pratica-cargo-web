import { Component, OnInit } from '@angular/core';
import { Motorista } from '../../motorista.model';
import { MotoristaService } from '../../motorista.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-motorista-list',
  templateUrl: './motorista-list.component.html',
  styleUrls: ['./motorista-list.component.scss'],
})
export class MotoristaListComponent implements OnInit {
  motoristas: Motorista[] = [];
  loading = false;

  constructor(
    private service: MotoristaService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.list().subscribe({
      next: (data) => {
        this.motoristas = data;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Erro ao carregar motoristas');
        this.loading = false;
      },
    });
  }

  novo() {
    this.router.navigate(['/app/cadastros/motoristas/novo']);
  }

  // forma mais "padrão Angular" (evita erros de string)
  editar(id: number) {
    this.router.navigate(['/app/cadastros/motoristas', id, 'editar']);
  }

  excluir(id: number) {
  const ref = this.dialog.open(ConfirmDialogComponent, {
    width: '360px',
    data: {
      title: 'Excluir motorista',
      message: 'Deseja realmente excluir este motorista?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
    },
  });

  ref.afterClosed().subscribe((confirmou: boolean) => {
    if (!confirmou) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.toast.success('Motorista excluído');
        this.load();
      },
      error: () => this.toast.error('Erro ao excluir'),
    });
  });
}
}
