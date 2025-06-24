import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.authForm = this.createForm();
  }

  ngOnInit() {
    this.loadGoogleScript();
    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  switchMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.updateFormValidators();
    // Reinicializar Google Sign-In con el nuevo modo
    setTimeout(() => {
      this.initializeGoogleSignIn();
    }, 100);
  }

  updateFormValidators() {
    const firstNameControl = this.authForm.get('firstName');
    const lastNameControl = this.authForm.get('lastName');
    const addressControl = this.authForm.get('address');

    if (this.isLoginMode) {
      // Modo login: remover validadores para campos de registro
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      addressControl?.clearValidators();
    } else {
      // Modo registro: agregar validadores
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);
    }

    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      
      const formData = this.authForm.value;
      
      // Simular llamada a API
      setTimeout(() => {
        if (this.isLoginMode) {
          console.log('Login data:', {
            email: formData.email,
            password: formData.password
          });
          alert('Login exitoso!');
        } else {
          console.log('Register data:', formData);
          alert('Registro exitoso!');
        }
        this.isLoading = false;
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  private loadGoogleScript(): void {
    // Verificar si Google ya está cargado
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Esperar un momento para que Google se inicialice completamente
      setTimeout(() => {
        this.initializeGoogleSignIn();
      }, 100);
    };
    document.head.appendChild(script);
  }

  initializeGoogleSignIn() {
    if (typeof google === 'undefined') {
      console.error('Google Sign-In library not loaded');
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: '774452338062-5dnfov657dj7q9evl9vc1mobaoh4o13p.apps.googleusercontent.com', 
        callback: this.handleCredentialResponse.bind(this),
        context: this.isLoginMode ? 'signin' : 'signup',
        ux_mode: 'popup',
        auto_prompt: false
      });

      // Limpiar el contenedor antes de renderizar
      const buttonContainer = document.getElementById('google-signin-button');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
      }

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          width: 300, // Usar número en lugar de porcentaje
          text: this.isLoginMode ? 'signin_with' : 'signup_with',
          shape: 'rectangular',
          type: 'standard',
          logo_alignment: 'left'
        }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  /**
   * @param response El objeto de respuesta de credenciales de Google.
   */
  handleCredentialResponse(response: any): void {
    // 'ngZone.run' asegura que los cambios y actualizaciones de Angular se detecten
    this.ngZone.run(() => {
      console.log('Token JWT ID codificado:', response.credential);
      
      // Decodifica el token JWT para obtener la información del usuario
      const decodedToken = this.decodeJwtResponse(response.credential);
      console.log('Información de usuario decodificada (JSON):', decodedToken);
      
      if (decodedToken) {
        this.authForm.patchValue({
          firstName: decodedToken.given_name || '',
          lastName: decodedToken.family_name || '',
          email: decodedToken.email || ''
        });

        alert(`¡Bienvenido, ${decodedToken.name || decodedToken.email}!`);
        
        // Consultar por los privilegios y roles del usuario en tu BD
        this.processGoogleUser(decodedToken);
      }
    });
  }

  /**
   * Decodifica un token JWT para extraer su payload 
   */
  private decodeJwtResponse(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  /**
   * Procesa la información del usuario de Google
   * Aquí consultarías los privilegios y roles del usuario en tu BD
   */
  private processGoogleUser(userInfo: any): void {
    console.log('Procesando usuario de Google:', userInfo);
    
    // Simular consulta a la BD para verificar roles y permisos
    const userData = {
      googleId: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      picture: userInfo.picture,
      emailVerified: userInfo.email_verified
    };
  }
}