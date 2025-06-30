import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Administrador } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
    constructor(private usuarioService: UsuarioService) {}

    crearAdministrador(admin: Administrador): Observable<any> {
        admin.tipoUsuario = 'Administrador';
        return this.usuarioService.guardarUsuario(admin);
    }
}
