import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import IAPIKey from '../interfaces/IAPIKey';
import IAuthorization from '../interfaces/IAuthorization';
import IToken from '../interfaces/IToken';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  Token$ = new BehaviorSubject<[string,string]>(["",""])
  
  constructor(private httpApiKey: HttpClient, private httpApiToken: HttpClient){
  }

  getAPIKey(autorizationData:IAuthorization){
    return this.httpApiKey.post<IAPIKey>("https://api.asgk-group.ru/test-auth-only",
    autorizationData)
  }

  getToken(APIKey:string){
    return this.httpApiToken.get<IToken>("https://api.asgk-group.ru/v1/authorization", {
      headers:{
        "Content-Type":"application/json",
        "Authorization" : APIKey.toString()
      }
    })
  }

  setToken(token:string, apikey:string){
    this.Token$.subscribe(e=>console.log(e))
    if(token!="" || undefined) {
      this.Token$.next([token, apikey])
    }
  }
}


