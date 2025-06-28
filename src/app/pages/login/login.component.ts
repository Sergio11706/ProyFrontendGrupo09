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
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario();  
  returnUrl!: string; 
  msglogin!: string;
  showLogin: boolean = false;

  userRegister: Cliente = new Cliente();

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
          console.log(result);
              var user = result; 
              if (user.status == 1){ 
                //guardamos el user en cookies en el cliente 
                sessionStorage.setItem("user", user.username); 
                sessionStorage.setItem("userid", user.userid); 
 
                //redirigimos a home o a pagina que llamo 
                this.router.navigateByUrl(this.returnUrl); 
              } else { 
                //usuario no encontrado  muestro mensaje en la vista 
                this.msglogin="Credenciales incorrectas.."; 
              } 
        }, 
        error => { 
          alert("Error de conexion"); 
          console.log("error en conexion"); 
          console.log(error); 
      }); 
  } 

  private loadGoogleScript(): void { 
    // Verificar si ya está cargado
    if ((window as any).google?.accounts) {
      this.initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script'); 
    script.src = 'https://accounts.google.com/gsi/client'; 
    script.async = true; 
    script.defer = true; 
    script.onload = () => {
      // Pequeño retraso para asegurar que la API esté disponible
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

    // Renderizar botón si está en la página
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
      console.log('Token JWT ID codificado:', response.credential); 
 
      const decodedToken = this.decodeJwtResponse(response.credential); 
      console.log('Información de usuario decodificada (JSON):', decodedToken); 
 
      alert(`¡Bienvenido, ${decodedToken.name || decodedToken.email}!`); 
 
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
    // Forzar la re-renderización del botón de Google
    setTimeout(() => this.initializeGoogleSignIn(), 100);
  }

  guardarUsuario(): void {
    this.userRegister.estado = true;
    this.userRegister.activo = true;
    this.userRegister.tipoUsuario = 'Cliente';
    this.userService.guardarUsuario(this.userRegister)
      .subscribe((result: any) => {
        console.log(result);
        this.msglogin = "Usuario guardado exitosamente.";
      },
      error => {
        alert("Error de conexion");
        console.log("error en conexion");
        console.log(error);
      });
  }

}
