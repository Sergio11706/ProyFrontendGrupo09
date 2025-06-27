import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userform: Usuario = new Usuario();  
  returnUrl!: string; 
  msglogin!: string;
 
  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private userService:UsuarioService){ 
    } 
 
  ngOnInit() { 
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
}
