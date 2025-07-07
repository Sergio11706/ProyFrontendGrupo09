import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZone } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario();  
  returnUrl!: string; 
  msglogin!: string;
  showLogin: boolean = true; 
  userRegister: Cliente = new Cliente();
  decodedToken: any;

  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService:UsuarioService,
    private ngZone: NgZone){ 
    } 
 
  ngOnInit() { 
    this.loadGoogleScript(); 
    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this); 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'; 
  } 
 
  login() {
    this.userService.login(this.userform.username!, this.userform.password!)
      .subscribe((result: any) => {
        if (result.status === 1) {
          if (result.estado === undefined || result.estado === 'aprobado') {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.username);
            sessionStorage.setItem("userid", result._id);
            sessionStorage.setItem("tipoUsuario", result.tipoUsuario || '');
            sessionStorage.setItem("permisos", result.permisos || '');
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.msglogin = result.estado === 'pendiente'
              ? "Tu solicitud está pendiente de aprobación."
              : "Tu solicitud ha sido rechazada.";
          }
        } else {
          this.msglogin = "Credenciales incorrectas.";
        }
      },
      error => {
        alert("Error de conexión");
        console.log("Error en conexión", error);
      });
  }

  private loadGoogleScript(): void { 
    if ((window as any).google?.accounts) {
      this.initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script'); 
    script.src = 'https://accounts.google.com/gsi/client'; 
    script.async = true; 
    script.defer = true; 
    script.onload = () => {
      setTimeout(() => this.initializeGoogleSignIn(), 100);
    };
    document.head.appendChild(script); 
  } 

  private initializeGoogleSignIn(): void {
    if (!(window as any).google?.accounts) {
      console.error('Google Sign-In API no está disponible');
      return;
    }

    (window as any).google.accounts.id.initialize({
      client_id: '774452338062-5dnfov657dj7q9evl9vc1mobaoh4o13p.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });

    const button = document.querySelector('.g_id_signin');
    if (button) {
      (window as any).google.accounts.id.renderButton(button, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left'
      });
    }
  }

  handleCredentialResponse(response: any): void { 
    this.ngZone.run(() => { 
 
      this.decodedToken = this.decodeJwtResponse(response.credential); 

      if (this.showLogin) {
        alert(`¡Bienvenido, ${this.decodedToken.name || this.decodedToken.email}!`);
      } else {
        this.userRegister.nombre = this.decodedToken.given_name || '';
        this.userRegister.apellido = this.decodedToken.family_name || '';
        this.userRegister.email = this.decodedToken.email || '';
        
        this.msglogin = 'Datos de Google cargados. Por favor complete los campos restantes.';
      }
    }); 
  } 

  private decodeJwtResponse(token: string): any { 
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) { 
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); 
    }).join('')); 
 
    return JSON.parse(jsonPayload); 
  } 

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.msglogin = '';
  
    if (!this.showLogin) {
      setTimeout(() => this.initializeGoogleSignIn(), 200);
    }
  }

  guardarUsuario(): void {
    this.userRegister.tipoUsuario = 'Cliente';
    this.userRegister.descuento = 0;
    this.userService.guardarUsuario(this.userRegister)
      .subscribe((result: any) => {
        this.msglogin = "Usuario guardado exitosamente.";
        this.showLogin = true;
      },
      error => {
        alert("Error de conexion");
        console.log(error);
      });
  }

}
