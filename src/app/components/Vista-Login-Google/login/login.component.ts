import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare const google: any;

interface UserRegistrationData {
  userType: 'client' | 'delivery';
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  dni?: string; 
  vehicle?: string; 
  licenseNumber?: string; 
  googleId?: string; 
}

interface LoginData {
  email: string;
  password: string;
  googleId?: string; // Para login con Google
}

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
  selectedUserType: 'client' | 'delivery' | '' = '';
  selectedVehicle: string = '';

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.authForm = this.createForm();
  }

  ngOnInit() {
    // Asegurar que el formulario esté inicializado
    if (!this.authForm) {
      this.authForm = this.createForm();
    }
    
    // Configurar validadores iniciales
    this.updateFormValidators();
    
    this.loadGoogleScript();
    (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }

  createForm(): FormGroup {
    return this.fb.group({
      userType: [''], // Cliente o repartidor
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      dni: [''], 
      vehicle: [''], 
      licenseNumber: [''], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para verificar si el formulario está inicializado
  get isFormReady(): boolean {
    return !!this.authForm;
  }

  // Método para verificar si el vehículo seleccionado requiere licencia
  get requiresLicense(): boolean {
    return this.selectedVehicle !== 'bicycle' && this.selectedVehicle !== '';
  }

  switchMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.selectedUserType = '';
    this.selectedVehicle = '';
    this.authForm.get('userType')?.setValue('');
    this.authForm.get('vehicle')?.setValue('');
    this.updateFormValidators();
    
    // Reinicializar Google Sign-In con el nuevo modo
    setTimeout(() => {
      this.initializeGoogleSignIn();
    }, 100);
  }

  onUserTypeChange() {
    // Verificar que el formulario esté inicializado
    if (!this.authForm) return;
    
    const userTypeValue = this.authForm.get('userType')?.value;
    this.selectedUserType = userTypeValue;
    this.selectedVehicle = '';
    this.authForm.get('vehicle')?.setValue('');
    this.updateFormValidators();
    console.log('Tipo de usuario seleccionado:', this.selectedUserType);
  }

  onVehicleChange() {
    // Verificar que el formulario esté inicializado
    if (!this.authForm) return;
    
    const vehicleValue = this.authForm.get('vehicle')?.value;
    this.selectedVehicle = vehicleValue;
    
    // Si es bicicleta, limpiar el campo de licencia
    if (vehicleValue === 'bicycle') {
      this.authForm.get('licenseNumber')?.setValue('');
    }
    
    this.updateFormValidators();
    console.log('Vehículo seleccionado:', this.selectedVehicle);
  }

  updateFormValidators() {
    // Verificar que el formulario esté inicializado
    if (!this.authForm) return;

    // Obtener controles del formulario
    const userTypeControl = this.authForm.get('userType');
    const firstNameControl = this.authForm.get('firstName');
    const lastNameControl = this.authForm.get('lastName');
    const addressControl = this.authForm.get('address');
    const dniControl = this.authForm.get('dni');
    const vehicleControl = this.authForm.get('vehicle');
    const licenseNumberControl = this.authForm.get('licenseNumber');

    if (this.isLoginMode) {
      // Modo login: remover todos los validadores excepto email y password
      userTypeControl?.clearValidators();
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      addressControl?.clearValidators();
      dniControl?.clearValidators();
      vehicleControl?.clearValidators();
      licenseNumberControl?.clearValidators();
      
      // Limpiar valores también
      userTypeControl?.setValue('');
      firstNameControl?.setValue('');
      lastNameControl?.setValue('');
      addressControl?.setValue('');
      dniControl?.setValue('');
      vehicleControl?.setValue('');
      licenseNumberControl?.setValue('');
      
    } else {
      // Modo registro: agregar validadores básicos
      userTypeControl?.setValidators([Validators.required]);
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);

      // Validadores específicos para repartidores
      if (this.selectedUserType === 'delivery') {
        dniControl?.setValidators([Validators.required, Validators.pattern(/^\d{7,8}$/)]);
        vehicleControl?.setValidators([Validators.required]);
        
        // Solo requerir licencia si no es bicicleta
        if (this.selectedVehicle === 'bicycle') {
          licenseNumberControl?.clearValidators();
          licenseNumberControl?.setValue(''); // Limpiar valor si existe
        } else if (this.selectedVehicle && this.selectedVehicle !== '') {
          licenseNumberControl?.setValidators([Validators.required]);
        } else {
          // Si no hay vehículo seleccionado, no agregar validadores aún
          licenseNumberControl?.clearValidators();
        }
      } else {
        // Limpiar validadores para campos de repartidor si es cliente
        dniControl?.clearValidators();
        vehicleControl?.clearValidators();
        licenseNumberControl?.clearValidators();
        
        // Limpiar valores también
        dniControl?.setValue('');
        vehicleControl?.setValue('');
        licenseNumberControl?.setValue('');
      }
    }

    // Actualizar validaciones
    userTypeControl?.updateValueAndValidity();
    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
    dniControl?.updateValueAndValidity();
    vehicleControl?.updateValueAndValidity();
    licenseNumberControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.isLoading = true;
      
      const formData = this.authForm.value;
      
      if (this.isLoginMode) {
        this.handleLogin(formData);
      } else {
        this.handleRegistration(formData);
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  private handleLogin(formData: any) {
    const loginData: LoginData = {
      email: formData.email,
      password: formData.password
    };

    // Simular llamada a API de login
    setTimeout(() => {
      console.log('Login data:', loginData);
      
      // Simular respuesta JWT del servidor
      const mockJwtToken = this.generateMockJwtToken(loginData.email, 'client');
      
      // Guardar token en memoria (no localStorage en artifacts)
      this.storeAuthToken(mockJwtToken);
      
      alert('Login exitoso!');
      this.isLoading = false;
      
      // Aquí rediriges según el rol del usuario
      this.redirectUserBasedOnRole('client');
    }, 2000);
  }

  private handleRegistration(formData: any) {
    const registrationData: UserRegistrationData = {
      userType: formData.userType,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      password: formData.password
    };

    // Agregar campos específicos de repartidor si aplica
    if (formData.userType === 'delivery') {
      registrationData.dni = formData.dni;
      registrationData.vehicle = formData.vehicle;
      // Solo agregar licencia si no es bicicleta
      if (formData.vehicle !== 'bicycle') {
        registrationData.licenseNumber = formData.licenseNumber;
      }
    }

    // Simular llamada a API de registro
    setTimeout(() => {
      console.log('Registration data:', registrationData);
      
      // Simular respuesta JWT del servidor
      const mockJwtToken = this.generateMockJwtToken(registrationData.email, registrationData.userType);
      
      // Guardar token en memoria
      this.storeAuthToken(mockJwtToken);
      
      alert(`Registro exitoso como ${registrationData.userType === 'client' ? 'Cliente' : 'Repartidor'}!`);
      this.isLoading = false;
      
      // Redirigir según el rol
      this.redirectUserBasedOnRole(registrationData.userType);
    }, 2000);
  }

  private loadGoogleScript(): void {
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
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
      // Usar un client_id de desarrollo/ejemplo válido
      google.accounts.id.initialize({
        client_id: '774452338062-5dnfov657dj7q9evl9vc1mobaoh4o13p.apps.googleusercontent.com', // Client ID de ejemplo
        callback: this.handleCredentialResponse.bind(this),
        context: this.isLoginMode ? 'signin' : 'signup',
        ux_mode: 'popup',
        auto_prompt: false,
        cancel_on_tap_outside: true
      });

      const buttonContainer = document.getElementById('google-signin-button');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
        
        google.accounts.id.renderButton(
          buttonContainer,
          {
            theme: 'outline',
            size: 'large',
            width: 300,
            text: this.isLoginMode ? 'signin_with' : 'signup_with',
            shape: 'rectangular',
            type: 'standard',
            logo_alignment: 'left'
          }
        );
      }
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      // Fallback: mostrar mensaje si Google Sign-In no está disponible
      const buttonContainer = document.getElementById('google-signin-button');
      if (buttonContainer) {
        buttonContainer.innerHTML = '<p class="text-muted">Google Sign-In no disponible en este entorno</p>';
      }
    }
  }

  handleCredentialResponse(response: any): void {
    this.ngZone.run(() => {
      console.log('Token JWT ID de Google:', response.credential);
      
      const decodedToken = this.decodeJwtResponse(response.credential);
      console.log('Información de usuario decodificada:', decodedToken);
      
      if (decodedToken) {
        if (this.isLoginMode) {
          // Proceso de login con Google
          this.handleGoogleLogin(decodedToken);
        } else {
          // Proceso de registro con Google - necesita selección de tipo de usuario
          this.handleGoogleRegistration(decodedToken);
        }
      }
    });
  }

  private handleGoogleLogin(googleUser: any) {
    this.isLoading = true;
    
    // Simular verificación en BD si el usuario existe
    setTimeout(() => {
      console.log('Iniciando sesión con Google:', googleUser.email);
      
      // Simular JWT del servidor para usuario existente
      const mockJwtToken = this.generateMockJwtToken(googleUser.email, 'client', googleUser.sub);
      this.storeAuthToken(mockJwtToken);
      
      alert(`¡Bienvenido de vuelta, ${googleUser.name}!`);
      this.isLoading = false;
      
      // Redirigir según rol almacenado en BD
      this.redirectUserBasedOnRole('client');
    }, 1500);
  }

  private handleGoogleRegistration(googleUser: any) {
    // Llenar el formulario con datos de Google
    this.authForm.patchValue({
      firstName: googleUser.given_name || '',
      lastName: googleUser.family_name || '',
      email: googleUser.email || ''
    });

    // Si no hay tipo de usuario seleccionado, mostrar mensaje
    if (!this.selectedUserType) {
      alert(`Datos cargados desde Google. Por favor selecciona si te registras como Cliente o Repartidor.`);
      return;
    }

    // Proceder con registro automático
    this.isLoading = true;
    
    const registrationData: UserRegistrationData = {
      userType: this.selectedUserType,
      firstName: googleUser.given_name || '',
      lastName: googleUser.family_name || '',
      email: googleUser.email || '',
      address: this.authForm.get('address')?.value || '',
      password: '', // Password vacío para registro con Google
      googleId: googleUser.sub
    };

    // Agregar campos de repartidor si aplica
    if (this.selectedUserType === 'delivery') {
      registrationData.dni = this.authForm.get('dni')?.value || '';
      registrationData.vehicle = this.authForm.get('vehicle')?.value || '';
      // Solo agregar licencia si no es bicicleta
      if (this.authForm.get('vehicle')?.value !== 'bicycle') {
        registrationData.licenseNumber = this.authForm.get('licenseNumber')?.value || '';
      }
    }

    setTimeout(() => {
      console.log('Registro con Google:', registrationData);
      
      const mockJwtToken = this.generateMockJwtToken(registrationData.email, registrationData.userType, googleUser.sub);
      this.storeAuthToken(mockJwtToken);
      
      alert(`¡Registro exitoso con Google como ${this.selectedUserType === 'client' ? 'Cliente' : 'Repartidor'}!`);
      this.isLoading = false;
      
      this.redirectUserBasedOnRole(registrationData.userType);
    }, 1500);
  }

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

  private generateMockJwtToken(email: string, userType: 'client' | 'delivery', googleId?: string): string {
    // Simular generación de JWT (en producción esto lo hace el servidor)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      email: email,
      userType: userType,
      googleId: googleId || null,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 horas
    }));
    const signature = btoa('mock-signature'); // En producción sería una firma real
    
    return `${header}.${payload}.${signature}`;
  }

  private storeAuthToken(token: string): void {
    // En artifacts no podemos usar localStorage, así que usamos una variable global
    (window as any).authToken = token;
    
    // También puedes almacenarlo en una propiedad del componente o servicio
    console.log('Token almacenado:', token);
    
    // Decodificar para mostrar información
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Payload del token:', payload);
  }

  private redirectUserBasedOnRole(userType: 'client' | 'delivery'): void {
    // Simular redirección basada en el rol
    if (userType === 'client') {
      console.log('Redirigiendo a dashboard de cliente...');
      // this.router.navigate(['/client-dashboard']);
    } else if (userType === 'delivery') {
      console.log('Redirigiendo a dashboard de repartidor...');
      // this.router.navigate(['/delivery-dashboard']);
    }
  }

  // Método helper para obtener el token actual
  getCurrentAuthToken(): string | null {
    return (window as any).authToken || null;
  }

  // Método helper para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getCurrentAuthToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  // Método helper para obtener información del usuario actual
  getCurrentUser(): any {
    const token = this.getCurrentAuthToken();
    if (!token) return null;
    
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}