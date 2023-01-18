import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUser from '../interfaces/IUser';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpUsers: HttpClient,private authorizationService:AuthorizationService) { }

  getUsers(token:string, apikey:string){
    
      return this.httpUsers.get<any>(`https://api.asgk-group.ru/v1/${token}/passes?limit=10`, {
      headers:{
        "Content-Type":"application/json",
        "Authorization" : apikey
      }})
   
    
  }

}
