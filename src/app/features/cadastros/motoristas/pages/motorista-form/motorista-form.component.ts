import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoristaService } from '../../motorista.service';
import { ToastService } from 'src/app/shared/toast.service';

function onlyDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

function formatCpf(digits: string): string {
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

@Component({
  selector: 'app-motorista-form',
  templateUrl: './motorista-form.component.html',
})
export class MotoristaFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: MotoristaService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;

    if (this.id) {
      this.loading = true;
      this.service.getById(this.id).subscribe({
        next: (m) => {
          this.form.patchValue(m);
          this.loading = false;
        },
        error: () => {
          this.toast.error('Erro ao carregar motorista');
          this.router.navigate(['/app/cadastros/motoristas']);
        },
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.loading) return;
    this.loading = true;

    // 1) normaliza o cpf para sempre salvar igual
    const cpfDigits = onlyDigits(this.form.value.cpf);

    if (cpfDigits.length !== 11) {
      this.toast.error('CPF precisa ter 11 dígitos');
      this.loading = false;
      return;
    }

    const cpfPadrao = formatCpf(cpfDigits);

    // atualiza o form com cpf padronizado
    this.form.patchValue({ cpf: cpfPadrao });

    // 2) checar duplicidade via API (200 existe / 404 não existe)
    const cpf = this.form.value.cpf as string;

    this.service.findByCpf(cpf).subscribe({
      next: (motorista) => {
        // se encontrou e é outro registro, é duplicado
        const existeOutro = !this.id || motorista.id !== this.id;

        if (existeOutro) {
          this.toast.error('CPF já cadastrado');
          this.loading = false;
          return;
        }

        // é o mesmo registro (edit), pode salvar
        this.salvar();
      },
      error: (err) => {
        // 404 = não existe -> pode salvar
        if (err.status === 404) {
          this.salvar();
          return;
        }

        this.toast.error('Erro ao validar CPF');
        this.loading = false;
      },
    });
  }

  private salvar() {
    const payload = this.form.value;

    if (this.id) {
      this.service.update(this.id, payload).subscribe({
        next: () => {
          this.toast.success('Motorista atualizado com sucesso');
          this.loading = false;
          this.router.navigate(['/app/cadastros/motoristas']);
        },
        error: (err) => {
          // se o back bloquear por CPF duplicado, vai cair aqui também
          const msg = err?.error || 'Erro ao atualizar motorista';
          this.toast.error(msg);
          this.loading = false;
        },
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
          this.toast.success('Motorista cadastrado com sucesso');
          this.loading = false;
          this.router.navigate(['/app/cadastros/motoristas']);
        },
        error: (err) => {
          const msg = err?.error || 'Erro ao cadastrar motorista';
          this.toast.error(msg);
          this.loading = false;
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/app/cadastros/motoristas']);
  }
}
