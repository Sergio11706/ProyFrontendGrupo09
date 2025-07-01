import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';    
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [ ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UsuarioService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true 
    },
  ],
})
export class AppModule { }