import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/features/cadastros/empresas/empresa.service';
import { ServicoService } from 'src/app/features/cadastros/servicos/servico.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Empresa } from 'src/app/features/cadastros/empresas/empresa.model';

@Component({
  selector: 'app-consulta-empresa',
  templateUrl: './consulta-empresa.component.html',
  styleUrls: ['./consulta-empresa.component.scss'],
})

export class ConsultaEmpresaComponent {
  form = this.fb.group({
    cnpj: ['', [Validators.required]],
  });

  loading = false;
  empresa?: Empresa;
  servicos: any[] = [];
  buscou = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private servicoService: ServicoService,
    private toast: ToastService
  ) { }

  buscar() {
    this.loading = true;
    this.buscou = true;
    this.empresa = undefined;
    this.servicos = [];
    const cnpjDigitado = this.onlyDigits(this.form.value.cnpj!);

    this.empresaService.list().subscribe({
      next: (empresas) => {
        const empresa = empresas.find(e => this.onlyDigits(e.cnpj) === cnpjDigitado);

        if (!empresa) {
          this.toast.error('Empresa não encontrada');
          this.loading = false;
          return;
        }

        this.empresa = empresa;

        this.servicoService.listPorEmpresa(empresa.id!).subscribe({
          next: (servs) => {
            this.servicos = servs;
            this.loading = false;
          },
          error: () => {
            this.toast.error('Erro ao buscar serviços da empresa');
            this.loading = false;
          },
        });
      },
      error: () => {
        this.toast.error('Erro ao buscar empresas');
        this.loading = false;
      }
    });
  }

  // ===== Helpers visuais (para OS) =====
  formatDateBR(value?: string): string {
  if (!value) return '-';

  // pega só a parte da data antes do "T"
  const datePart = value.split('T')[0]; // "2026-01-30"
  const parts = datePart.split('-');

  if (parts.length !== 3) return value;

  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}


  getPesoTotal(): number {
    return (this.servicos || []).reduce((acc, s) => acc + (Number(s?.peso) || 0), 0);
  }

  getProximaData(): string {
    const datas = (this.servicos || [])
      .map((s) => s?.data)
      .filter(Boolean)
      .sort();
    return datas.length ? this.formatDateBR(datas[0]) : '-';
  }

  private onlyDigits(value: string) {
    return value.replace(/\D/g, '');
  }

}
