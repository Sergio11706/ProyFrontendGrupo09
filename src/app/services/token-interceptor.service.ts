import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { UsuarioService } from './usuario.service'; 
@Injectable({ 
  providedIn: 'root' 
}) 
export class TokenInterceptorService implements HttpInterceptor { 
  constructor(private userService:UsuarioService) { } 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  { 
    const tokenizeReq = req.clone({ 
      setHeaders:{ 
        Authorization: `Bearer ${this.userService.getToken()}` 
      } 
    }); 
    return next.handle(tokenizeReq); 
  } 
} 