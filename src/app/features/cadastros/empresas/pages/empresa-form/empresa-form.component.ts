import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../empresa.service';
import { ToastService } from 'src/app/shared/toast.service';

function onlyDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

function formatCnpj(digits: string): string {
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss'],
})
export class EmpresaFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: EmpresaService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
        ],
      ],
      endereco: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;

    if (this.id) {
      this.loading = true;
      this.service.getById(this.id).subscribe({
        next: (empresa) => {
          this.form.patchValue(empresa);
          this.loading = false;
        },
        error: () => {
          this.toast.error('Erro ao carregar empresa');
          this.router.navigate(['/app/cadastros/empresas']);
        },
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.loading) return;
    this.loading = true;

    // 1) normaliza cnpj
    const cnpjDigits = onlyDigits(this.form.value.cnpj);

    if (cnpjDigits.length !== 14) {
      this.toast.error('CNPJ precisa ter 14 dígitos');
      this.loading = false;
      return;
    }

    const cnpjPadrao = formatCnpj(cnpjDigits);
    this.form.patchValue({ cnpj: cnpjPadrao });

    // 2) checa duplicidade (200 existe / 404 não existe)
    const cnpj = this.form.value.cnpj as string;

    this.service.findByCnpj(cnpj).subscribe({
      next: (empresa) => {
        const duplicado = !this.id || empresa.id !== this.id;

        if (duplicado) {
          this.toast.error('CNPJ já cadastrado');
          this.loading = false;
          return;
        }

        // é o mesmo registro (edit), pode salvar
        this.salvar();
      },
      error: (err) => {
        if (err.status === 404) {
          this.salvar();
          return;
        }

        this.toast.error('Erro ao validar CNPJ');
        this.loading = false;
      },
    });
  }

 private salvar(): void {
  // ✅ monta payload SEMPRE a partir do form
  const payload: any = {
    ...this.form.value,
  };

  // ✅ se for edição, garante que o ID vai no body
  if (this.id) {
    payload.id = this.id;
  }

  if (this.id) {
    this.service.update(this.id, payload).subscribe({
      next: () => {
        this.toast.success('Empresa atualizada com sucesso');
        this.loading = false;
        this.router.navigate(['/app/cadastros/empresas']);
      },
      error: (err) => {
        const msg = err?.error || 'Erro ao atualizar empresa';
        this.toast.error(msg);
        this.loading = false;
      },
    });
  } else {
    this.service.create(payload).subscribe({
      next: () => {
        this.toast.success('Empresa cadastrada com sucesso');
        this.loading = false;
        this.router.navigate(['/app/cadastros/empresas']);
      },
      error: (err) => {
        const msg = err?.error || 'Erro ao cadastrar empresa';
        this.toast.error(msg);
        this.loading = false;
      },
    });
  }
}


  cancelar(): void {
    this.router.navigate(['/app/cadastros/empresas']);
  }
}
