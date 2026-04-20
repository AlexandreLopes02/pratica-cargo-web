import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
  loading = false;
  user: any | null = null;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''], // opcional
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getLoggedUser();

    if (!this.user) {
      this.toast.error('Nenhum usuário logado');
      return;
    }

    this.form.patchValue({
      name: this.user.name,
      email: this.user.email,
    });
  }

  salvar() {
    if (!this.user) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.value;

    // payload básico
    const payload: any = {
      id: this.user.id,
      name,
      email,
    };

    // só manda senha se digitou
    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        this.toast.error('Senha deve ter no mínimo 6 caracteres');
        return;
      }
      payload.password = password;
    }

    this.loading = true;

    this.auth.updateUser(this.user.id, payload).subscribe({
      next: (updated) => {
        // AuthService já atualizou localStorage no tap()
        this.user = updated;

        // limpa senha
        this.form.patchValue({ password: '' });

        this.toast.success('Dados atualizados com sucesso');
        this.loading = false;
      },
      error: () => {
        this.toast.error('Erro ao salvar alterações');
        this.loading = false;
      },
    });
  }
}
