import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Motorista } from 'src/app/features/cadastros/motoristas/motorista.model';
import { MotoristaService } from 'src/app/features/cadastros/motoristas/motorista.service';
import { ServicoService } from 'src/app/features/cadastros/servicos/servico.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-consulta-motorista',
  templateUrl: './consulta-motorista.component.html',
  styleUrls: ['./consulta-motorista.component.scss']
})
export class ConsultaMotoristaComponent {

  form = this.fb.group({
    cpf: ['', [Validators.required]],
  });

  loading = false;
  motorista?: Motorista;
  servicos: any[] = [];
  buscou = false;

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private servicoService: ServicoService,
    private toast: ToastService
  ) { }

  buscar() {
    this.loading = true;
    this.buscou = true;
    this.motorista = undefined;
    this.servicos = [];
    
    const cpfDigitado = this.onlyDigits(this.form.value.cpf!);

    this.motoristaService.list().subscribe({
      next: (motoristas) => {
        const motorista = motoristas.find(m => this.onlyDigits(m.cpf) === cpfDigitado);

        if (!motorista) {
          this.toast.error('Motorista não encontrado');
          this.loading = false;
          return;
        }

        this.motorista = motorista;

        this.servicoService.listPorMotorista(motorista.id!).subscribe({
          next: (servs) => {
            this.servicos = servs;
            this.loading = false;
          },
          error: () => {
            this.toast.error('Erro ao buscar serviços do motorista');
            this.loading = false;
          },
        });
      },
      error: () => {
        this.toast.error('Erro ao buscar motoristas');
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
      .sort(); // yyyy-mm-dd ordena certo como string
    return datas.length ? this.formatDateBR(datas[0]) : '-';
  }

  private onlyDigits(value: string) {
    return value.replace(/\D/g, '');
  }

}
