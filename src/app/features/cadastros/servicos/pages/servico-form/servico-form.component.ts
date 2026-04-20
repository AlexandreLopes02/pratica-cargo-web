import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

import { EmpresaService } from '../../../empresas/empresa.service';
import { MotoristaService } from '../../../motoristas/motorista.service';
import { Empresa } from '../../../empresas/empresa.model';
import { Motorista } from '../../../motoristas/motorista.model';

import { ServicoService } from '../../servico.service';
import { TipoServico } from '../../servico.model';


import { minTodayDateValidator } from 'src/app/shared/min-date.validator';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss'],
})
export class ServicoFormComponent implements OnInit {

  minDate = new Date().toISOString().split('T')[0];

  form: FormGroup;
  id?: number;

  empresas: Empresa[] = [];
  motoristas: Motorista[] = [];
  cargas = [
    { id: 1, nome: 'Arroz' },
    { id: 2, nome: 'Trigo' },
    { id: 3, nome: 'Semente' },
    { id: 4, nome: 'Adubo' },
  ];


  loading = false;
  bloqueadoPorDependencia = false;

  tipos: TipoServico[] = ['carga', 'descarga'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private toast: ToastService,
    private servicoService: ServicoService,
    private empresaService: EmpresaService,
    private motoristaService: MotoristaService,
  ) {
    this.form = this.fb.group({
      empresaId: [null, [Validators.required]],
      motoristaId: [null, [Validators.required]],
      carga: [null, [Validators.required]],
      peso: [null],
      quemRetira: [{ value: '', disabled: true }], // ✅ NÃO EDITÁVEL + CINZA
      data: ['', [Validators.required, minTodayDateValidator()]],
      tipo: ['carga', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ 1) Escuta mudanças no motoristaId e atualiza "Quem vai retirar"
    this.form.get('motoristaId')?.valueChanges.subscribe((motoristaId) => {
      this.atualizarQuemRetira(motoristaId);
    });


    // ✅ 2) Carregar dependências (empresas e motoristas)
    this.loading = true;

    this.empresaService.list().subscribe({
      next: (emp) => {
        this.empresas = emp;
        this.checkDependencias();
      },
      error: () => this.toast.error('Erro ao carregar empresas'),
    });

    this.motoristaService.list().subscribe({
      next: (mot) => {
        this.motoristas = mot;
        this.checkDependencias();

        // ✅ Se já tiver motorista selecionado (em edição), garante preenchimento
        const motoristaIdAtual = this.form.get('motoristaId')?.value;
        if (motoristaIdAtual) {
          this.atualizarQuemRetira(motoristaIdAtual);
        }
      },
      error: () => this.toast.error('Erro ao carregar motoristas'),
    });

    // ✅ 3) Se for edição, carrega o serviço e preenche o form
    if (this.id) {
      this.servicoService.getById(this.id).subscribe({
        next: (s) => {
          this.form.patchValue(s);
          this.atualizarQuemRetira(s.motoristaId); // ✅ garante preencher no editar
          this.loading = false;
        },
        error: () => {
          this.toast.error('Erro ao carregar serviço');
          this.router.navigate(['/app/cadastros/servicos']);
        },
      });
    } else {
      this.loading = false;
    }
  }

  private atualizarQuemRetira(motoristaId: any) {
    const id = Number(motoristaId);
    const motorista = this.motoristas.find((m) => m.id === id);

    if (motorista) {
      this.form.get('quemRetira')?.setValue(motorista.nome, { emitEvent: false });
    } else {
      this.form.get('quemRetira')?.setValue('', { emitEvent: false });
    }
  }

  checkDependencias() {
    this.bloqueadoPorDependencia =
      this.empresas.length === 0 || this.motoristas.length === 0;
  }

  submit() {
    if (this.bloqueadoPorDependencia) {
      this.toast.error('Cadastre empresa e motorista antes de criar uma OS');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    // ✅ getRawValue pega valores inclusive de campo disabled (quemRetira)
    const payload = this.form.getRawValue();

    if (this.id) {
      payload.id = this.id; // ✅ garante body com id no PUT
    }


    const action = this.id
      ? this.servicoService.update(this.id, payload)
      : this.servicoService.create(payload);

    action.subscribe({
      next: () => {
        this.toast.success('OS salva com sucesso');
        this.router.navigate(['/app/cadastros/servicos']);
      },
      error: () => {
        this.toast.error('Erro ao salvar OS');
        this.loading = false;
      },
    });
  }

  cancelar() {
    this.router.navigate(['/app/cadastros/servicos']);
  }
}
