import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, password } = this.form.value;

    this.authService.login(name, password).subscribe({
      next: () => this.router.navigate(['/app']),
      error: () => (this.error = 'Usuário ou senha inválidos'),
    });

  }

  hasError(field: string, error: string) {
    return (
      this.form.get(field)?.touched &&
      this.form.get(field)?.hasError(error)
    );
  }
}
