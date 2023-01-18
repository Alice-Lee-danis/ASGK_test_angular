import { Component, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import IAPIKey from 'src/app/interfaces/IAPIKey';
import IAuthorization from 'src/app/interfaces/IAuthorization';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  template:`{{data$ | async}}`
})

export class LoginComponent {

  autorization:IAuthorization = {
    login: '',
    password: ''
  }
  
  private logIn:Boolean = true
  private token:string = ""
  private apikey:string = ""
  constructor(private autorizationData:AuthorizationService, private router:Router){}
  
  inputData(){
    this.autorizationData.getAPIKey(this.autorization).subscribe(
      data => {
      this.apikey = data.auth_token
        this.autorizationData.getToken(data.auth_token).subscribe(data => {
        this.token = data.tokens[0].token
      },
    error => console.log('oops', error.message))},
    error => console.log('oops', error.message))

    
    this.autorizationData.setToken(this.token, this.apikey)
    this.autorization = {
      login:"",
      password:""
    }
   
    this.autorizationData.Token$.subscribe(e=>{
      if(e[0]!="" || undefined) {
        this.router.navigate(['/users'])
      }
      else{
        alert("введите правильные данные")
      }
    }
    )

  }
}
