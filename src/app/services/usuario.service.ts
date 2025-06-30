import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { Cliente } from '../models/usuario.model';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class UsuarioService { 
 
  hostBase: string; 
 
  constructor(private _http:HttpClient) {  
    this.hostBase = "http://localhost:3000/api/usuarios/"; 
  } 
 
  public login(username: string, password: string):Observable<any> { 
    const httpOption = { 
      headers: new HttpHeaders({ 
        'Content-Type':  'application/json' 
      })  
    }  
    let body = JSON.stringify({ username: username, password: password }); 
    return this._http.post(this.hostBase + 'login', body, httpOption); 
  } 
 
  public logout() { 
    sessionStorage.removeItem("user"); 
    sessionStorage.removeItem("userid"); 
  } 

  public userLoggedIn(){ 
    var resultado = false; 
    var usuario = sessionStorage.getItem("user"); 
    if(usuario!=null){ 
      resultado = true; 
    } 
    return resultado; 
  } 
 
  public userLogged(){ 
    var usuario = sessionStorage.getItem("user"); 
    return usuario; 
  } 
 
  public idLogged(){ 
    var id = sessionStorage.getItem("userid"); 
    return id; 
  }
  
  public guardarUsuario(cliente: Cliente): Observable<any> {
    const httpOption = { 
      headers: new HttpHeaders({  
        'Content-Type':  'application/json' 
      })  
    }  
    let body = JSON.stringify(cliente); 
    return this._http.post(this.hostBase, body, httpOption); 
  }
 
  public getRepartidores(): Observable<any> {
    return this._http.get(this.hostBase + 'repartidores');
  }

  public aceptarSolicitud(id: string): Observable<any> {
    return this._http.get(this.hostBase + 'aprobarSolicitud/' + id);
  }

  public rechazarSolicitud(id: string): Observable<any> {
    return this._http.get(this.hostBase + 'rechazarSolicitud/' + id);
  }
}   

