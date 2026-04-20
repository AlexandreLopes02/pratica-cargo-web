import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EmpresaService } from 'src/app/features/cadastros/empresas/empresa.service';
import { MotoristaService } from 'src/app/features/cadastros/motoristas/motorista.service';
import { ServicoService } from 'src/app/features/cadastros/servicos/servico.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  
  loading = false;

  totalEmpresas = 0;
  totalMotoristas = 0;
  totalServicos = 0;

  constructor(
    private empresaService: EmpresaService,
    private motoristaService: MotoristaService,
    private servicoService: ServicoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;

    forkJoin({
      empresas: this.empresaService.list(),
      motoristas: this.motoristaService.list(),
      servicos: this.servicoService.list(),
    }).subscribe({
      next: ({ empresas, motoristas, servicos }) => {
        this.totalEmpresas = empresas.length;
        this.totalMotoristas = motoristas.length;
        this.totalServicos = servicos.length;
        this.loading = false;
      },
      error: () => {
        this.toast.error('Erro ao carregar relatórios');
        this.loading = false;
      },
    });
  }
}
