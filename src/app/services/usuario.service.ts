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
    this.hostBase = "https://grupo09.onrender.com/api/usuarios/"; 
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
    sessionStorage.removeItem("token");
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

  public tipoUsuario(): string {
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");
    if (!tipoUsuario) return '';
    
    const tipoNormalizado = tipoUsuario.toLowerCase();
    
    if (tipoNormalizado === 'cliente' || tipoNormalizado === 'client') {
      return 'Cliente';
    } else if (tipoNormalizado === 'administrador' || tipoNormalizado === 'admin' || tipoNormalizado === 'administrator') {
      return 'Administrador';
    } else if (tipoNormalizado === 'repartidor' || tipoNormalizado === 'delivery' || tipoNormalizado === 'driver') {
      return 'Repartidor';
    }
    
    return tipoUsuario;
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

  public getpermisos(): number {
    const permisos = sessionStorage.getItem("permisos");
    return Number(permisos);
  }

 
  public getRepartidores(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'repartidores', httpOptions);
  }

  public aceptarSolicitud(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'aprobarSolicitud/' + id, httpOptions);
  }

  public rechazarSolicitud(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'rechazarSolicitud/' + id, httpOptions);
  }

  public obtenerUsuarios(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get<any[]>(this.hostBase, httpOptions);
  }

  public eliminarUsuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.delete(this.hostBase + id, httpOptions);
  }

  public modificarUsuario(id: string, datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.put(this.hostBase + id, JSON.stringify(datos), httpOptions);
  }

  public getCliente(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'cliente/' + id, httpOptions);
  }


  public getAdministrador(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'administrador/' + id, httpOptions);
  }

  public getRepartidor(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get(this.hostBase + 'repartidor/' + id, httpOptions);
  }

  public getUsuariosPorMes(): Observable<any> {
    return this._http.get(this.hostBase + 'usuariosPorMes');
  }

  public getToken(){
    if (sessionStorage.getItem("token")!= null){ 
      return sessionStorage.getItem("token")!; 
    }
    else return "";      
  }
}   

