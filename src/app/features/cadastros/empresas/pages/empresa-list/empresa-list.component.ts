import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../empresa.model';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

  empresas: Empresa[] = [];
  loading = false;

  constructor(
    private service: EmpresaService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.list().subscribe({
      next: (data) => {
        this.empresas = data;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Erro ao carregar empresas');
        this.loading = false;
      }
    });
  }

  novo() {
    this.router.navigate(['/app/cadastros/empresas/novo']);
  }

  // forma mais "padrão Angular" (evita erros de string)
  editar(id: number) {
    this.router.navigate(['/app/cadastros/empresas', id, 'editar']);
  }

  excluir(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Excluir empresa',
        message: 'Deseja realmente excluir esta empresa?',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    ref.afterClosed().subscribe((confirmou: boolean) => {
      if (!confirmou) return;

      this.service.delete(id).subscribe({
        next: () => {
          this.toast.success('Empresa excluída');
          this.load();
        },
        error: () => this.toast.error('Erro ao excluir'),
      });
    });
  }

}
