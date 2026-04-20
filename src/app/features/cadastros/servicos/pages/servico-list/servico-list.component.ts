import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { ServicoService } from '../../servico.service';
import { ServicoExpandido } from '../../servico.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { EmpresaService } from '../../../empresas/empresa.service';
import { MotoristaService } from '../../../motoristas/motorista.service';
import { Empresa } from '../../../empresas/empresa.model';
import { Motorista } from '../../../motoristas/motorista.model';






@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.scss']
})
export class ServicoListComponent implements OnInit {
  servicos: ServicoExpandido[] = [];
  empresas: Empresa[] = [];
  motoristas: Motorista[] = [];
  displayedColumns: string[] = ['empresa','motorista','produto','tipo','data','peso','acoes'];


  loading = false;

  constructor(
    private service: ServicoService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog,
    private empresaService: EmpresaService,
    private motoristaService: MotoristaService,

  ) { }

  ngOnInit(): void {
    this.empresaService.list().subscribe({
      next: (emp) => (this.empresas = emp),
      error: () => this.toast.error('Erro ao carregar empresas'),
    });

    this.motoristaService.list().subscribe({
      next: (mot) => (this.motoristas = mot),
      error: () => this.toast.error('Erro ao carregar motoristas'),
    });

    this.load();
  }

  load() {
    this.loading = true;
    this.service.listExpandido().subscribe({
      next: (data) => {
        this.servicos = data;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Erro ao carregar serviços');
        this.loading = false;
      },
    });
  }

  novo() {
    this.router.navigate(['/app/cadastros/servicos/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/app/cadastros/servicos', id, 'editar']);
  }

  excluir(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Excluir serviço',
        message: 'Deseja realmente excluir esta OS?',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    ref.afterClosed().subscribe((confirmou: boolean) => {
      if (!confirmou) return;

      this.service.delete(id).subscribe({
        next: () => {
          this.toast.success('OS excluída');
          this.load();
        },
        error: () => this.toast.error('Erro ao excluir'),
      });
    });
  }

  getEmpresaNome(id: number | null | undefined): string {
    if (!id) return '-';
    return this.empresas.find(e => e.id === id)?.nome ?? '-';
  }

  getMotoristaNome(id: number | null | undefined): string {
    if (!id) return '-';
    return this.motoristas.find(m => m.id === id)?.nome ?? '-';
  }

  getCargaNome(servico: any): string {
    // se no back for string "carga"
    return servico.carga ?? '-';
  }


}
