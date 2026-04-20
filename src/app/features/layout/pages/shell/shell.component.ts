import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  showCadastros = false;
  showConsultas = false;

  toggleCadastros() {
    this.showCadastros = !this.showCadastros;
  }

  toggleConsultas(){
    this.showConsultas = !this.showConsultas;
  }

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
